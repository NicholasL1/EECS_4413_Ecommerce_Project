"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { CiMenuFries } from "react-icons/ci";
import { Button } from "./ui/button";
import { addAdminLink, addUserLink } from "@/lib/utils";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";

const links = [
  {
    name: "home",
    path: "/",
  },
  {
    name: "shoes",
    path: "/shoes",
  },
  {
    name: "cart",
    path: "/cart",
  },
];

const MobileNav = ({ buttonText, buttonLink, logoutFunction }) => {
  const pathname = usePathname();

  // On mount, add Admin link if token is admin
  useEffect(() => {
    addAdminLink(links);
    addUserLink(links);
  }, []);

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
            if (link.name === "cart") {
              return (
                <Link href={link.path} key={index}>
                  <FontAwesomeIcon
                    size="xl"
                    className="text-custom-black"
                    icon={faCartShopping}
                  />
                </Link>
              );
            }

            // if (link.name === "admin" && !renderAdminLink) {
            //   return
            // }

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
          <Link href={buttonLink} prefetch={false}>
            <Button
              className="bg-custom-red font-signika-negative text-lg text-custom-white hover:text-gray-700"
              onClick={logoutFunction}
            >
              {buttonText}
            </Button>
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
