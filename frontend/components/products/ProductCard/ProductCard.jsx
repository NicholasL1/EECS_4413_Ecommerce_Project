import React from "react";
import "./ProductCard.css";
import nike from "@/public/nike.png";
import Image from "next/image";
import Link from "next/link";
import ReviewStars from "@/components/ui/ReviewStars";

const ProductCard = ({ product }) => {

  if (!product.image) {
    product.image = "";
  }

  return (
    <Link href={`/shoeView?id=${product._id}`}>
      <div className="flex relative flex-col items-center w-[250px] bg-white rounded-lg shadow-md hover:scale-[1.05] hover:cursor-pointer transition-all duration-300">
        <div className="w-full h-64 overflow-hidden bg-gray-300">
          {/*{product.image && (*/}
            <Image
            //src={product.image ? `data:image/png;base64,${product.image}` : nike}     // decodes the base64 image to render in the browser window
            src={`/${product.name} ${product.colour}.png`}
            //src={"/Adidas Nite Jogger.png"}
            alt={product.name}
            width={240}
            height={200}
          ></Image>
         {/* )}*/}
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