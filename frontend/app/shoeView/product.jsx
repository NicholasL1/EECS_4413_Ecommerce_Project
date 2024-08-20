import React from "react";

import Link from "next/link";
import Image from "next/image";
import AffirmLogo from "@/public/affirm-logo.svg";
import imageStub from "@/public/nike.png";
import ReviewStars from "@/components/ui/ReviewStars";

export default function product({ shoeData, alternatives, id }) {
  console.log(alternatives);
  return (
    <div className="w-10/12 flex flex-col md:flex-row p-16 bg-gray-300 mx-auto rounded-3xl">
      {/* Shoe display picture */}
      <div className="w-full md:w-2/3 flex items-center justify-center">
        <div
          className="w-full max-w-[600px] relative aspect-square mx-auto"
          style={{
            backgroundImage: `url(${imageStub.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
      </div>

      {/* Shoe information (title, category, brand, price, rating, colour, sizing, etc.) */}
      <div className="relative md:w-1/2 bg-white flex flex-col rounded-2xl min-h-[600px] p-4 md:p-6">
        <div className="lg;h-[60px] flex flex-col md:flex-row justify-between items-start">
          <a
            href={`/shoes?category=${shoeData.category}`}
            className="text-gray-400 italic font-signika-negative underline cursor-pointer hover:text-gray-300"
          >
            {shoeData.category}
          </a>
          <div className="flex mt-4 md:mt-0 flex-col">
            <span className="font-bold flex">
              {ReviewStars(shoeData.rating)}
            </span>
            {/* TODO: See all reviews */}
            <a
              href={"/"}
              className="text-gray-400 float-left md:float-right lg:float-right underline text-sm"
            >
              See all reviews
            </a>
          </div>
        </div>
        <div className="flex flex-col mt-4">
          <h1 className="text-3xl md:text-4xl font-bold font-signika-negative">
            {shoeData.name}
          </h1>
          <h3 className="text-lg text-gray-700 font-signika-negative mt-2 p-0 m-0">
            {shoeData.gender}
          </h3>
          <a
            href={`/shoes?brand=${shoeData.brand}`}
            className="text-sm text-gray-500 font-signika-negative mt-1 underline italic cursor-pointer hover:text-gray-400"
          >
            Shop {shoeData.brand} shoes
          </a>
          <h1 className="mt-4 text-3xl md:text-4xl font-semibold font-signika-negative text-green-600">
            ${shoeData.price}
          </h1>
          <h3 className="text-sm text-gray-500 font-signika-negative mt-1 ml-0 mr-0 mb-0 p-0">
            {shoeData.stock} Left In Stock!
          </h3>
          <h4 className="text-lg font-signika-negative mt-4 flex items-center">
            Or 4 interest-free payments of ${shoeData.price / 4} bi-weekly with{" "}
            <Image
              src={AffirmLogo}
              alt="Affirm"
              className="inline w-auto h-6 ml-2 mb-2"
            />
            <a href="https://www.affirm.com/en-ca/" target="_blank">
              <span className="text-gray-500 text-lg font-signika-negative underline ml-2 italic">
                Learn More.
              </span>
            </a>
          </h4>

          {/* Render the shoe colours */}
          <h1 className="text-lg font-signika-negative font-bold mt-6">
            Select a Colour:
          </h1>
          <div className="flex mt-2 flex-wrap gap-4">
            {alternatives.map((shoe, index) => (
              <Link href={`/shoeView?id=${shoe._id}`} key={index}>
                <div
                  className={`inline-flex flex-col items-center justify-center aspect-square w-20 border ${
                    shoe._id === id
                      ? "border-black border-2"
                      : "border-gray-200"
                  }`}
                >
                  <Image
                    src={imageStub} // TODO: Replace with shoe.image
                    alt={shoe.colour}
                    className="w-full h-auto object-cover rounded"
                  />
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
            {alternatives.map((shoe, index) => (
              <Link href={`/shoeView?id=${shoe._id}`} key={index}>
                <div
                  className={`inline-flex flex-col items-center justify-center aspect-square w-20 border rounded-full ${
                    shoe._id === id
                      ? "border-black border-2"
                      : "border-gray-200"
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
          <button className="mt-8 w-full bg-custom-red text-white font-bold py-2 px-4 rounded">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
