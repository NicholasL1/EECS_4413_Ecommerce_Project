"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ProductServices from "@/services/productServices";
import Product from "./product";
import ReviewStars from "@/components/ui/ReviewStars";

const shoeResponses = [
  { id: "1", image: "/nike.png", size: 11, colour: "black" },
  {
    id: "668c75cd30fc9d0882a34da0",
    image: "/nike.png",
    size: 10,
    colour: "white",
  },
  { id: "3", image: "/nike.png", size: 9, colour: "red" },
];

const stubData = {
  brand: "Brand",
  size: 0,
  name: "Name",
  colour: "Colour",
  gender: "Gender",
  stock: 190,
  price: 100,
  rating: 5,
  category: "Category",
};

export default function ShoePage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shoeData, setShoeData] = useState(stubData);

  const reviewStars = ReviewStars(shoeData.rating, "text-2xl");

  useEffect(() => {
    const fetchShoeInfo = async () => {
      try {
        if (id) {
          const response = await ProductServices.getShoeInfo(id);
          setShoeData(response);
        }
      } catch (err) {
        setError(err);
      }
    };

    setLoading(false);
    fetchShoeInfo();
  }, [id]);

  // Ensure fallback rendering during loading and errors
  if (!shoeData) {
    return (
      <div className="flex w-full h-full items-center justify-center">
        <p>No shoe data available.</p>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (loading) {
    return (
      <div className="flex w-full h-full items-center justify-center">
        <img src="/spinner.svg" alt="Loading..." />
      </div>
    );
  }

  return (
    <div>
      <Product
        shoeData={shoeData}
        shoeResponses={shoeResponses}
        id={id}
        reviewStars={reviewStars}
      />
    </div>
  );
}
