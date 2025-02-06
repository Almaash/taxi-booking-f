"use client";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
  useClerk,
} from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { Car } from "lucide-react";

const NavBar = () => {
  const { signOut } = useClerk();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.push("/sign-in");
  };
  

  const handleNavigate = async () => {
    router.push("/");
  };

  const handleSignedInRedirect = () => {
    // Change this route to where you want to redirect the user after they sign in
    router.push("/");
  };

  // Automatically redirect after sign-in
  useEffect(() => {
    // Check if the user is signed in before performing the redirect
    // if (typeof window !== "undefined") {
    //   handleSignedInRedirect();
    // }
      handleSignedInRedirect();
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-10 flex justify-between items-center p-4 gap-4 h-16 bg-emerald-700 shadow">
      <div className="text-xl font-bold">
        <h1 onClick={handleNavigate} className="cursor-pointer flex gap-2 text-white">
          CABZZ <Car className="h-6 w-6" />
        </h1>
      </div>
      <div className="flex justify-end items-center gap-4">
        <SignedOut>
          <div className="text-white hover:text-black transition duration-300 ease-in-out p-2 rounded">
            <SignInButton />
          </div>
          <div className="text-white hover:text-black transition duration-300 ease-in-out p-2 rounded">
            <SignUpButton />
          </div>
        </SignedOut>
        <SignedIn>
          <div className="flex gap-4">
            <UserButton />
            <div className="hover:text-white transition duration-300 ease-in-out p-2 rounded">
              <button onClick={handleLogout}>Sign Out</button>
            </div>
          </div>
        </SignedIn>
      </div>
    </div>
  );
};

export default NavBar;
