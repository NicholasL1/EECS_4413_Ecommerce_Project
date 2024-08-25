"use client"; // This directive is necessary for Next.js to know this is a client component

import React, { useEffect, useState } from "react";
import ReviewServices from "@/services/reviewService";
import ReviewList from "@/components/reviews/ReviewList";
import { jwtDecode } from "jwt-decode"; // Make sure to use jwtDecode correctly
import { getToken } from "@/lib/utils";

export default function Page() {
  const [user_id, setUser_id] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);

  const fetchUserReviews = async (user_id) => {
    try {
      const response = await ReviewServices.getUserReviews(token, user_id);
      setReviews(response);
    } catch (error) {
      setError(error);
    }
  };

  const handleDeleteReview = async (review_id) => {
    if (token == "undefined") {
      toast.error("Please login to delete a review");
      return;
    }
    try {
      const response = await ReviewServices.deleteReview(token, review_id);
      if (response === "Invalid Token") {
        toast.error("Please login again to delete this review");
      } else {
        toast.success(response);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Fetch the token from sessionStorage on client side
    const storedToken = getToken();
    if (storedToken != "unde") {
      setToken(storedToken);
      setUser_id(jwtDecode(storedToken).userData[0]);
    } else {
      setError("Please login to view your reviews");
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchUserReviews(user_id);
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
