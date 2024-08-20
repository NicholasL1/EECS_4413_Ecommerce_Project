import React from "react";
import CategoryCard from "./ui/CategoryCard";
import MensBackground from "@/public/mens-background.jpg";
import WomensBackground from "@/public/womens-background.jpg";
import KidsBackground from "@/public/kids-background.jpg";

const categories = [
  {
    category: "Men's",
    link: "/shoes?gender=Men's",
    background: MensBackground,
  },
  {
    category: "Women's",
    link: "/shoes?gender=Women's",
    background: WomensBackground,
  },
  {
    category: "Kid's",
    link: "/shoes?gender=Kid's",
    background: KidsBackground,
  },
];

function Categories() {
  return (
    <section className="relative px-4 py-16 m-auto w-full max-w-[1700px]">
      <h1 className="text-3xl font-semibold font-signika-negative text-custom-black">
        Shop By Category
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        {categories.map((cardInfo, index) => (
          <CategoryCard key={index} {...cardInfo} />
        ))}
      </div>
    </section>
  );
}

export default Categories;
