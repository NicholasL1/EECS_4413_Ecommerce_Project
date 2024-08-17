"use client";

import Link from "next/link";
import { usePathname } from "next/navigation"; // Correct import
import { addAdminLink } from "@/lib/utils";

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
    name: "contact",
    path: "/contact",
  },
];

addAdminLink(links);

export default function Nav() {
  const pathname = usePathname(); // Correct function name
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
    </nav>
  );
}
