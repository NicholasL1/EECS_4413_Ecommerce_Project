import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";

// components
import Nav from "./Nav";
import MobileNav from "./MobileNav";

export default function Header() {
  return (
    <header className="py-8 xl:py-8 bg-primary">
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
          <Link href="/signup">
            <Button className="bg-custom-red font-signika-negative text-lg text-custom-white hover:text-gray-700">
              Sign Up
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
