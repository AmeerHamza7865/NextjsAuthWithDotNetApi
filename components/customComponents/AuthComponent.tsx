"use client"; // This is important since we're using client-side APIs

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import AccountProfile from "./UserProfile";

export function AuthButtons() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // This code runs only on the client side after hydration
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
  }, []);

  if (isAuthenticated) {
    return  <div className="flex items-center space-x-4">
            <AccountProfile/>

    </div>; // Don't render anything if authenticated
  }

  return (
    <div className="flex items-center space-x-4">
      <Link href={"/login"}><Button variant="outline">Login</Button></Link>  
      <Link href={"/signup"}><Button>Sign Up</Button></Link>  
    </div>
  );
}