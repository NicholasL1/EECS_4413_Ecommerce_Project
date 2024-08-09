"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { CiMenuFries } from "react-icons/ci";
import { Button } from "./ui/button";
import { addAdminLink } from "@/lib/utils";

const links = [
  {
    name: "home",
    path: "/home",
  },
  {
    name: "shoes",
    path: "/shoes",
  },
  {
    name: "contact",
    path: "/contact",
  },
];

addAdminLink(links)

const MobileNav = () => {
  const pathname = usePathname();
  return (
    <Sheet className="sheet bg-custom-white">
      <SheetTrigger className="flex justify-center items-center">
        <CiMenuFries className="text-[32px] text-accent" />
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        {/* logo */}
        <div className="mt-32 mb-40 text-center text-2xl">
          <Link href="/">
            <h1>
              Where to<span className="text-accent">?</span>
            </h1>
          </Link>
        </div>
        {/* nav */}
        <nav className="flex flex-col justify-center items-center gap-8">
          {links.map((link, index) => {
            return (
              <Link
                href={link.path}
                key={index}
                className={` ${
                  link.path === pathname &&
                  "text-accent border-b-2 border-accent"
                } font-signika-negative font-bold text-xl capitalize hover:text-red-500 transition-all`}
              >
                {link.name}
              </Link>
            );
          })}
          <Link href="/signup">
            <Button className="bg-custom-red font-signika-negative text-lg text-custom-white hover:text-gray-700">
              Sign Up
            </Button>
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
