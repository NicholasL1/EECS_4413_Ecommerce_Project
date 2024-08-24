"use client";

import Link from "next/link";
import { usePathname } from "next/navigation"; // Correct import
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addAdminLink } from "@/lib/utils";
import { addUserLink } from "@/lib/utils";

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
];

export default function Nav() {
  const pathname = usePathname(); // Correct function name

  // Ensure pathname is not undefined or null
  if (pathname === undefined || pathname === null) {
    return null; // Or some placeholder
  }

  // On mount, add Admin link if token is admin
  useEffect(() => {
    addAdminLink(links);
    addUserLink(links);
  }, []);

  return (
    <nav className="flex gap-8">
      {links.map((link, index) => {
        return (
          <Link
            href={link.path}
            key={index}
            className={`${
              link.path === pathname && "text-accent border-b-2 border-accent"
            } capitalize font-signika-negative font-bold text-xl hover:text-custom-red-hover transition-all`}
          >
            {link.name}
          </Link>
        );
      })}
      <Link href="/cart" key={links.length + 1}>
        <FontAwesomeIcon
          size="xl"
          className="text-custom-black"
          icon={faCartShopping}
        />
      </Link>
    </nav>
  );
}
