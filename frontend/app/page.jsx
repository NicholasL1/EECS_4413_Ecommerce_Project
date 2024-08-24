"use client";

import Carousel from "@/components/Carousel";
import Categories from "@/components/Categories";
import Price from "@/components/Price";

export default function Home() {
  return (
    <main className="">
      {/* Hero Carousel */}
      <Carousel />
      {/* Men's, Women's, and Kids collections */}
      <Categories />
      {/* Shoes by price */}
      <Price />
    </main>
  );
}
