import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/app/lib/supabase/admin";
import { Response } from "@/app/utils/response";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export const runtime = "edge";

// TODO : Removing fles from storage sometimes fails
// TODO : Doesn't delete account if all bills are not paid
export async function DELETE(request: NextRequest) {
  if (!cookies) return NextResponse.json(Response.Error("No cookies found"));

  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return NextResponse.json(Response.Error("No user found"));

  const { data, error } = await supabaseAdmin.auth.admin.deleteUser(user.id);

  if (error) {
    return NextResponse.json(Response.Error(error.message));
  } else {
    const { data: list, error: storageError } = await supabase.storage
      .from("projects")
      .list(`${user.id}`);

    if (storageError) {
      return NextResponse.json(Response.Error(storageError.message));
    }
    const filesToRemove = list.map((x) => `${user.id}/${x.name}`);

    const { data, error } = await supabase.storage
      .from("projects")
      .remove(filesToRemove);

    return NextResponse.json(Response.Success("Account deleted"));
  }
}

// https://blog.mansueli.com/supabase-user-self-deletion-empower-users-with-edge-functions
