"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import ReviewStars from "@/components/ui/ReviewStars";
import Link from "next/link";
import AffirmLogo from "@/public/affirm-logo.svg";
import Image from "next/image";

const stubData = {
  id: 1,
  brand: "Nike",
  size: 11,
  name: "Nike Air Max 270",
  colour: "Red",
  gender: "Men's",
  stock: 190,
  price: 173.5,
  rating: 3.5,
  category: "Casual Basketball Sneakers",
  image: "/nike.png",
};

const shoeResponses = [
  {
    id: 1,
    image: "/nike.png",
    size: 11,
    colour: "black",
  },
  {
    id: 2,
    image: "/nike.png",
    size: 10,
    colour: "white",
  },
  {
    id: 3,
    image: "/nike.png",
    size: 9,
    colour: "red",
  },
];

export default function ShoePage() {
  const searchParams = useSearchParams();
  const id = parseInt(searchParams.get("id"), 10); // Convert id to an integer

  return (
    <div className="w-10/12 h-3/4 flex flex-col md:flex-row p-16 bg-gray-300 mx-auto rounded-3xl">
      {/* Shoe display picture */}
      <div className="w-full md:w-2/3 flex items-center justify-center">
        <div
          className="w-full max-w-[600px] relative aspect-square mx-auto"
          style={{
            backgroundImage: `url(${stubData.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
      </div>
      {/* Shoe information (title, category, brand, price, rating, colour, sizing, etc.) */}
      <div className="relative w-full md:w-1/2 bg-white flex flex-col rounded-2xl min-h-[600px] p-4 md:p-6">
        <div className="flex flex-col md:flex-row w-full justify-between items-start">
          {/* TODO: Shop by category, call search (maybe with query params?) */}
          <Link href={"/"}>
            <h3 className="text-gray-400 italic font-signika-negative underline cursor-pointer">
              {stubData.category}
            </h3>
          </Link>
          <div className="flex mt-4 md:mt-0 flex-col">
            <span className="font-bold flex">
              {ReviewStars(stubData.rating)}
            </span>
            {/* TODO: Add link to reviews when it is implemented */}
            <Link href={"/"}>
              <span className="text-gray-400 float-left md:float-right underline text-sm">
                See all reviews
              </span>
            </Link>
          </div>
        </div>
        <div className="flex flex-col w-full mt-4">
          <h1 className="text-3xl md:text-4xl font-bold font-signika-negative">
            {stubData.name}
          </h1>
          <h3 className="text-lg text-gray-700 font-signika-negative mt-2">
            {stubData.gender}
          </h3>
          <h3 className="text-sm text-gray-500 font-signika-negative mt-1 underline italic cursor-pointer">
            Shop {stubData.brand} shoes
          </h3>
          <h1 className="mt-4 text-3xl md:text-4xl font-semibold font-signika-negative text-green-600">
            ${stubData.price}
          </h1>
          <h3 className="text-sm text-gray-500 font-signika-negative mt-1">
            {stubData.stock} Left In Stock!
          </h3>
          <h4 className="text-lg font-signika-negative mt-4 flex items-center">
            Or 4 interest-free payments of {stubData.price / 4} bi-weekly with{" "}
            <Image
              src={AffirmLogo}
              alt="Affirm"
              className="inline w-auto h-6 ml-2 mb-2"
            />
            <Link href="https://www.affirm.com/en-ca/" target="_blank">
              <span className="text-gray-500 text-lg font-signika-negative underline ml-2 italic">
                Learn More.
              </span>
            </Link>
          </h4>
          {/* Render the shoe colours */}
          <h1 className="text-lg font-signika-negative font-bold mt-6">
            Select a Colour:
          </h1>
          <div className="flex mt-2 flex-wrap gap-4">
            {shoeResponses.map((shoe, index) => (
              <Link href={`/shoe?id=${shoe.id}`} key={index}>
                <div
                  className={`inline-flex flex-col items-center justify-center aspect-square w-20 border ${
                    shoe.id === id ? "border-black border-4" : "border-gray-200"
                  }`}
                >
                  {/* Shoe Image */}
                  <img
                    src={shoe.image} // Replace with your image source
                    alt={shoe.colour}
                    className="w-full h-auto object-cover rounded"
                  />
                  {/* Shoe Colour Label */}
                  <p className="text-sm font-medium text-center mt-2">
                    {shoe.colour}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          {/* Render the shoe sizes */}
          <h1 className="text-lg font-signika-negative font-bold mt-6">
            Select a Size:
          </h1>
          <div className="flex mt-2 flex-wrap gap-4">
            {shoeResponses.map((shoe, index) => (
              <Link href={`/shoe?id=${shoe.id}`} key={index}>
                <div
                  className={`inline-flex flex-col items-center justify-center aspect-square w-20 border rounded-full ${
                    shoe.id === id ? "border-black border-2" : "border-gray-200"
                  }`}
                >
                  <h1 className="text-2xl font-bold">{shoe.size}</h1>
                  <p className="text-sm font-medium text-center mt-2">
                    {shoe.colour}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          {/* TODO: Add functionality for adding to cart */}
          <button className="mt-8 w-full bg-custom-red text-white font-bold py-2 px-4 rounded">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
