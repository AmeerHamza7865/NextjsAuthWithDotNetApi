"use client";

import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { AuthButtons } from "./AuthComponent";
import { useState,useEffect } from "react";

export function Navbar() {

const [loginSession, setLoginSession] = useState<string | null>(null);

  useEffect(() => {
    // This code only runs on the client side
    setLoginSession(localStorage.getItem('authToken'));
  }, []);
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 font-bold">
          <span className="text-blue-600">Acme</span>
          <span>Corp</span>
        </Link>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link
                href="/"
                passHref
                className={navigationMenuTriggerStyle()}
                legacyBehavior={false} // Explicitly set to false (optional)
              >
                <NavigationMenuLink asChild>
                  <span>Home</span>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            {loginSession && 
            

              <NavigationMenuItem>
                <Link
                  href="/dashboard"
                  passHref
                  className={navigationMenuTriggerStyle()}
                  legacyBehavior={false} // Explicitly set to false (optional)
                >
                  <NavigationMenuLink asChild>
                    <span>Dashboard</span>
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

          
            
            }
               <NavigationMenuItem>
                <Link
                  href="/pricing"
                  passHref
                  className={navigationMenuTriggerStyle()}
                  legacyBehavior={false} // Explicitly set to false (optional)
                >
                  <NavigationMenuLink asChild>
                    <span>Pricing</span>
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link
                  href="/about"
                  passHref
                  className={navigationMenuTriggerStyle()}
                  legacyBehavior={false} // Explicitly set to false (optional)
                >
                  <NavigationMenuLink asChild>
                    <span>About</span>
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        
        <div className="flex items-center space-x-4">
          
        {/* <Link href={"/login"}><Button variant="outline">Login</Button></Link>  

        <Link href={"/signup"}><Button>Sign Up</Button></Link>   */}
        <AuthButtons/>
        </div>  

      </div>
    </header>
  );
}