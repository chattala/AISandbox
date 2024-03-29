import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { supabaseAdmin } from "./app/lib/supabase/admin";
import { Ratelimit } from "@upstash/ratelimit";
import redis from "./app/lib/redis/client";

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(10, "10 s"),
  prefix: "@upstash/ratelimit",
});

// this middleware refreshes the user's session and must be run
// for any Server Component route that uses `createServerComponentSupabaseClient`
// TODO : Need rate limiting before performing any database queries for /api/v1/execute, /api/v1/models
export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (req.nextUrl.pathname.startsWith("/api/v1/execute")) {
    const authorization = req.headers.get("Authorization");

    if (!authorization) {
      return NextResponse.json(
        { error: "API Key not provided in the `Authorization` header." },
        { status: 401 }
      );
    } else {
      const hashedApiKey = await crypto.subtle.digest(
        "SHA-256",
        new TextEncoder().encode(authorization)
      );

      const hash = Buffer.from(hashedApiKey).toString("hex");

      // Cached user id from redis
      // TODO : Ratelimting + caching seems to slow middleware from ~20ms to ~200-300ms, need to diagnose the latency
      let cachedResult = await redis.get<{
        user_id: string;
        api_key_id: string;
      }>(hash);

      let api_key_id = cachedResult?.api_key_id;
      let user_id = cachedResult?.user_id;

      // TODO : Could be problematic in case of redis database failure, all requests will be blocked
      let success = false;
      if (!user_id) {
        const { data: apiTableData, error } = await supabaseAdmin
          .from("apikeys")
          .select("*")
          .eq("hash", hash)
          .single();

        if (error) {
          return NextResponse.json(
            { error: "Invalid API Key" },
            { status: 401 }
          );
        }

        // 1 day expiry
        // TODO : Need to set expiry based on the user's plan or failed to pay stripe invoice
        user_id = apiTableData.user_id;
        api_key_id = apiTableData.id;
        redis.set(
          // NOTE: No await set to avoid blocking the request
          hash,
          {
            user_id,
            api_key_id,
          },
          {
            ex: 60 * 60 * 24,
          }
        );

        success = (await ratelimit.limit(apiTableData.user_id)).success;
      } else {
        // Takes around 300ms to execute, sometimes over 1 sec
        success = (await ratelimit.limit(user_id)).success;
      }

      // If data is found in cache or in database, log the api usage and return the response
      if (success) {
        // if (error) {
        //   return NextResponse.json({ error: error.message }, { status: 500 });
        // }

        res.headers.set("UserId", user_id as string);
        res.headers.set("APIKeyId", api_key_id as string);

        return res;
        // return NextResponse.json({ error: "Success" }, { status: 200 });
      } else {
        return NextResponse.json(
          { error: "Too many requests, please try again in few seconds" },
          { status: 429 }
        );
      }
    }
  }

  // Checking if the user is logged in in ui for /api/v1/[models] route.
  else if (req.nextUrl.pathname.startsWith("/api/v1/models")) {
    if (session) {
      // Return an unimplemented response for now
      // return NextResponse.json(
      //   { error: "Not implemented yet" },
      //   { status: 501 }
      // );

      // Probably should be in the execution.ts extraHeaders
      res.headers.set("UserId", session.user.id as string); // TODO : Is it going to cause any issues?
      return res;
    } else {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Dashboard
  } else if (req.nextUrl.pathname.startsWith("/dashboard") && !session) {
    return NextResponse.redirect(new URL("/login", req.url));

    // / , /login , /signup and other pages
  } else {
    return res;
  }
}

export const config = {
  matcher: ["/api/:path*", "/dashboard/:path*"],
};
