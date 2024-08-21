"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

// components
import Nav from "./Nav";
import MobileNav from "./MobileNav";

export default function Header() {
  const [buttonText, setButtonText] = useState("Sign Up");
  const [buttonLink, setButtonLink] = useState("/signup");

  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("Authorization")) {
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
    if (
      typeof window !== "undefined" &&
      localStorage.getItem("Authorization")
    ) {
      localStorage.removeItem("Authorization");
      setButtonText("Sign Up");
      setButtonLink("/signup");
      window.location.href = "/";
    }
  };

  return (
    <header className="py-8 bg-primary">
      <div className="w-full flex justify-between px-4 xl:px-8">
        <Link href="/paymentPage">Go to Payment Page</Link>
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
          <Link href={buttonLink}>
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
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
