import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function CategoryCard({
  thumbnail,
  category,
  link,
  background,
}) {
  return (
    <Link href={link}>
      <div
        className="flex flex-col items-center justify-center p-4 shadow-lg rounded-lg hover:shadow-xl hover:scale-[1.05] transition-all duration-800 cursor-pointer"
        style={{
          backgroundImage: `url(${background.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="w-[300px] h-[300px] relative"></div>
        <h3 className="text-lg font-semibold mt-4 text-white">
          Shop {category} shoes
        </h3>
      </div>
    </Link>
  );
}
