import React from "react";
import "./ProductCard.css";
import nike from "@/public/nike.png";
import Image from "next/image";
import Link from "next/link";
import ReviewStars from "@/components/ui/ReviewStars";

const ProductCard = ({ product }) => {
  return (
    <Link href={`/shoeView?id=${product._id}`}>
      <div className="flex relative flex-col items-center w-[250px] bg-white rounded-lg shadow-md hover:scale-[1.05] hover:cursor-pointer transition-all duration-300">
        <div className="w-full h-64 overflow-hidden bg-gray-300">
          <Image
            src={product.image ? product.image : nike}
            alt={product.name}
            className="w-full h-full object-cover"
          ></Image>
        </div>
        <div className="text-lg w-full rounded-lg text-gray-800 pl-2 pt-3">
          <div className="flex flex-row justify-between mb-1">
            <p className="font-bold text-lg">{product.name}</p>
            <div className="flex flex-col pr-2">
              {product.dealPrice ? (
                <div>
                  <p className="font-bold text-xl text-green-600">
                    ${product.dealPrice}
                  </p>
                  <p className="font-bold text-xl text-black line-through">
                    ${product.price}
                  </p>
                </div>
              ) : (
                <p className="font-bold text-xl pr-5 text-green-600">
                  ${product.price}
                </p>
              )}
            </div>
          </div>
          <div>{ReviewStars(product.rating)}</div>
          <p className="text-base text-gray-600 mt-2">
            {product.gender} - {product.category}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
