"use client";

import React from "react";
import { useAuthContext } from "@/context/AuthProvider";
import { useRouter } from "next/navigation";
import { removeToken } from "@/lib/helpers"; // Replace with your actual authentication utilities
import { Button } from "./ui/button";
import Link from "next/link";
import { useToast } from "./ui/use-toast";

const Auth: React.FC = () => {
  const { toast } = useToast();
  const { user, logout } = useAuthContext();
  const router = useRouter();

  const handleLogout = async () => {
    removeToken();

    try {
      logout();
      router.refresh();
      toast({ title: `Successfully signed out` });
    } catch (error) {
      console.error("Logout failed", error);
      // Handle logout failure if necessary
    }
  };

  return (
    <div className="flex gap-x-4 mx-2 font-medium">
      {user ? (
        <div className="flex w-full h-full items-center">
          <div>{user.username}</div>
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      ) : (
        <div className="flex gap-x-4 w-full h-full items-center">
          <Link href="/sign-in" type="link">
            Login
          </Link>
          <Link href="/sign-up">Sign Up</Link>
        </div>
      )}
    </div>
  );
};

export default Auth;
