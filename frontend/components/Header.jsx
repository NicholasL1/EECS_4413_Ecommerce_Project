"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

// components
import Nav from "./Nav";
import MobileNav from "./MobileNav";
import { getToken } from "@/lib/utils";
import Cookies from "js-cookie";

export default function Header() {
  const [buttonText, setButtonText] = useState("Sign Up");
  const [buttonLink, setButtonLink] = useState("/signup");

  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (getToken() != "undefined") {
        setButtonText("Log Out");
        setButtonLink("");
      } else if (pathname === "/signup") {
        setButtonText("Log In");
        setButtonLink("/login");
      } else {
        console.log(pathname);
        setButtonText("Sign Up");
        setButtonLink("/signup");
      }
    }
  }, [pathname]);

  const handleLogout = () => {
    const token = getToken();

    if (typeof window !== "undefined" && token != "undefined") {
      Cookies.remove("Authorization");
      setButtonText("Sign Up");
      setButtonLink("/signup");
      window.location.href = "/";
    }
  };

  return (
    <header className="py-8 bg-primary">
      <div className="w-full flex justify-between px-4 xl:px-8">
        {/** logo */}
        <Link href="/">
          <Image
            src="/logo.png"
            alt="logo"
            width={225}
            height={89}
            className="object-contain"
          />
        </Link>
        {/* desktop nav & sign up button */}
        <div className="hidden xl:flex items-center gap-8">
          <Nav />
          <Link href={buttonLink} prefetch={false}>
            <Button
              onClick={handleLogout}
              className="bg-custom-red font-signika-negative text-lg text-custom-white hover:text-gray-700"
            >
              {buttonText}
            </Button>
          </Link>
        </div>
        {/* mobile nav */}
        <div className="xl:hidden">
          <MobileNav
            buttonText={buttonText}
            buttonLink={buttonLink}
            logoutFunction={handleLogout}
          />
        </div>
      </div>
    </header>
  );
}
