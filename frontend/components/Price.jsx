import React from "react";
import HighToLow from "@/public/basketball.jpg";
import LowToHigh from "@/public/soccer.jpg";
import BestDeals from "@/public/deals.jpg";
import Link from "next/link";

const priceCardInfo = [
  {
    category: "Low to High",
    link: "/shoes?price=Low+to+High",
    background: HighToLow,
    height: "500px",
  },
  {
    category: "High to Low",
    link: "/shoes?price=High+to+Low",
    background: LowToHigh,
    height: "500px",
  },
  {
    category: "Our Best Deals",
    link: "/shoes?price=Deals",
    background: BestDeals,
    height: "300px",
  },
];

function PriceCard({ category, link, background, height }) {
  return (
    <Link href={link}>
      <div
        className="flex flex-col items-center justify-center p-4 shadow-lg rounded-lg hover:shadow-xl hover:scale-[1.05] transition-all duration-800 cursor-pointer bg-cover bg-center"
        style={{ backgroundImage: `url(${background.src})`, height: height }}
      >
        <h3 className="text-6xl font-semibold text-white">{category}</h3>
      </div>
    </Link>
  );
}

export default function Price() {
  return (
    <section className="relative px-4 py-16 m-auto w-full max-w-[1700px] max-h-screen">
      <h1 className="text-3xl font-semibold font-signika-negative mb-8">
        Shop By Price
      </h1>
      {/* Three cards */}
      <div className="flex flex-col">
        {/* Row 1: Two Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <PriceCard {...priceCardInfo[0]} />
          <PriceCard {...priceCardInfo[1]} />
        </div>
        {/* Row 2: One Card */}
        <div className="mt-4">
          <PriceCard {...priceCardInfo[2]} />
        </div>
      </div>
    </section>
  );
}
