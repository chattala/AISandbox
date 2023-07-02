"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";

// TODO : Remove the async
const Header = () => {
  const supabase = createClientComponentClient();
  const [user, setUser] = useState<null | User>(null);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setUser(user);
      }
    };

    getUser();
  }, []);

  return (
    <div className="fixed top-3 flex flex-row items-center justify-between w-[800px] backdrop-blur-sm bg-background/70 rounded-full py-2 pl-4 pr-2">
      <Link href="/" className="text-2xl font-bold">
        AISandbox
      </Link>

      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/docs" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Documentation
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/api" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                API
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/pricing" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Pricing
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div>
        {user ? (
          <Link href="/dashboard">
            <Button className="rounded-full">Dashboard</Button>
          </Link>
        ) : (
          <>
            <Link href="/login">
              <Button variant={"ghost"} className="rounded-full">
                Log In
              </Button>
            </Link>

            <Link href="/signup">
              <Button className="rounded-full">Get Started</Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
