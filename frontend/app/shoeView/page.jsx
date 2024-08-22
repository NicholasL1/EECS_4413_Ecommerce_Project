"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ProductServices from "@/services/ProductServices";
import Product from "./product";

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

  const [shoeData, setShoeData] = useState(null); // state to hold shoe data
  const [alternatives, setAlternatives] = useState([]); // state to hold alternative shoes
  const [error, setError] = useState(null); // state to handle errors
  const [loading, setLoading] = useState(true); // state to manage loading

  // Fetch the shoe info based on the provided id
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

  // Fetch alternative shoes based on the loaded shoe data
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

  // Trigger the fetchShoeInfo function when the id changes
  useEffect(() => {
    fetchShoeInfo();
  }, [id]);

  // Trigger the fetchShoeAlternatives function only when shoeData is loaded
  useEffect(() => {
    if (shoeData) {
      fetchShoeAlternatives();
    }
  }, [shoeData]);

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
      <Product shoeData={shoeData} alternatives={alternatives} id={id} />
    </div>
  );
}
