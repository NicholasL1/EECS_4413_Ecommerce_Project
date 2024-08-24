"use client"; // This directive is necessary for Next.js to know this is a client component

import React, { useEffect, useState } from "react";
import ReviewServices from "@/services/reviewService";
import ReviewList from "@/components/reviews/ReviewList";
import { handleDeleteReview } from "@/components/reviews/ReviewSection";
import { jwtDecode } from "jwt-decode"; // Make sure to use jwtDecode correctly

export default function Page() {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Fetch the token from sessionStorage on client side
    const storedToken = JSON.parse(sessionStorage.getItem("Authorization"));
    if (storedToken) {
      setToken(storedToken);
    } else {
      setError("Please login to view your reviews");
    }
  }, []);

  useEffect(() => {
    if (token) {
      const user_id = jwtDecode(token).userData[0];

      const fetchUserReviews = async () => {
        try {
          const response = await ReviewServices.getUserReviews(token, user_id);
          setReviews(response);
        } catch (error) {
          setError(error);
        }
      };

      fetchUserReviews();
    }
  }, [token]); // Run this effect whenever the token is set

  if (error) {
    console.log(error);
    return <div>Error getting review data</div>;
  }

  if (!reviews || reviews.length === 0) {
    return (
      <div className="flex w-full h-full items-center justify-center">
        <p className="text-3xl font-bold">No reviews available.</p>
      </div>
    );
  }

  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-8/12 flex flex-col justify-center">
        <h1 className="text-3xl font-signika-negative font-bold mb-4">
          My Reviews:
        </h1>
        {/* Make sure to pass necessary props */}
        <ReviewList
          reviews={reviews}
          token={token}
          onDelete={handleDeleteReview}
        />
      </div>
    </div>
  );
}
