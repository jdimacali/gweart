"use client";

import React from "react";
import { useAuthContext } from "@/context/AuthProvider";
import { useRouter } from "next/navigation";
import { removeToken } from "@/lib/helpers"; // Replace with your actual authentication utilities
import { Button } from "./ui/button";
import Link from "next/link";

const Auth: React.FC = () => {
  const { user } = useAuthContext();
  const router = useRouter();

  const handleLogout = () => {
    removeToken();
    router.push("/signin");
  };

  return (
    <div className="flex gap-x-4 mx-2">
      {user ? (
        <>
          <Button>{user.username}</Button>
          <Button onClick={handleLogout}>Logout</Button>
        </>
      ) : (
        <>
          <Link href="/sign-in" type="link">
            Login
          </Link>
          <Link href="/sign-up">SignUp</Link>
        </>
      )}
    </div>
  );
};

export default Auth;
