"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ProductServices from "@/services/ProductServices";
import Product from "./product";
import ReviewSection from "@/components/reviews/ReviewSection";

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

export default function ShoePage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [shoeData, setShoeData] = useState(null);
  const [alternatives, setAlternatives] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchShoeInfo = async () => {
    try {
      if (id) {
        const response = await ProductServices.getShoeInfo(id);
        setShoeData(response);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchShoeAlternatives = async () => {
    try {
      if (shoeData) {
        const filter = {
          brand: shoeData.brand,
          name: shoeData.name,
          gender: shoeData.gender,
        };
        const alternativeData = await ProductServices.getAlternativeProducts(
          filter
        );
        setAlternatives(alternativeData.data);
      }
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchShoeInfo();
  }, [id]);

  useEffect(() => {
    if (shoeData) {
      fetchShoeAlternatives();
    }
  }, [shoeData]);

  if (!shoeData) {
    return (
      <div className="flex w-full h-full items-center justify-center">
        <p>No shoe data available.</p>
      </div>
    );
  }

  if (error) {
    console.log(error);
    return <div>Error getting shoe data</div>;
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
      <div>
        <Product shoeData={shoeData} alternatives={alternatives} id={id} />
      </div>
      <div className="mt-5" id="reviews">
        <ReviewSection product_id={id} />
      </div>
    </div>
  );
}
