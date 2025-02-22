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
import React, { useEffect, useState } from "react";
import { Car } from "lucide-react";
import Image from "next/image";

const NavBar = () => {
  const { signOut, user } = useClerk();
  const router = useRouter();

  // Client-side mounted state
  const [isMounted, setIsMounted] = useState(false);

  // Set isMounted to true once the component is mounted on the client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLogout = async () => {
    await signOut();
    router.push("/sign-in");
  };

  const handleNavigate = async () => {
    router.push("/");
  };

  if (user === undefined && user != null) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Image src="/MapGrowing.gif" alt="map loading" width={30} height={30} />
      </div>
    );
  }

  return (
    <div className="sticky top-0 left-0 w-full z-10 flex justify-between items-center p-4 gap-4 h-16 bg-emerald-700 shadow">
      <div className="text-xl font-bold">
        <h1
          onClick={handleNavigate}
          className="cursor-pointer flex gap-2 text-white"
        >
          CABZZ <Car className="h-6 w-6" />
        </h1>
      </div>

      <div className="flex justify-end items-center gap-4 text-white">
        {/* Render SignedOut only after component has mounted on the client */}
        {isMounted && (
          <SignedOut>
            <div className="text-white hover:text-black transition duration-300 ease-in-out p-2 rounded">
              <SignInButton />
            </div>
            <div className="text-white hover:text-black transition duration-300 ease-in-out p-2 rounded">
              <SignUpButton />
            </div>
          </SignedOut>
        )}

        {/* Render SignedIn only after component has mounted on the client */}
        {isMounted && (
          <SignedIn>
            <div className="flex gap-4">
              <UserButton />
              <div className="hover:text-white transition duration-300 ease-in-out p-2 rounded">
                <button onClick={handleLogout}>Sign Out</button>
              </div>
            </div>
          </SignedIn>
        )}
      </div>
    </div>
  );
};

export default NavBar;
