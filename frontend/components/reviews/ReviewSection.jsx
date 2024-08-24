import React, { useState, useEffect } from "react";
import ProductReviews from "./ProductReviews";
import ReviewServices from "@/services/reviewService";
import ReviewModal from "./ReviewModal";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

export const handleSubmitReview = async (review) => {
  if (!token) {
    toast.error("Please login to write a review");
    return;
  }

  const decodedToken = jwtDecode(token);
  const user_id = decodedToken.userData[0];

  // Check if the user already has a review
  const userHasReviewed = reviews.some((r) => r.user_id === user_id);

  if (userHasReviewed) {
    toast.error("You have already submitted a review for this product.");
    return;
  }

  const firstName = decodedToken.userData[4];
  const form = {
    product_id,
    user_id,
    title: review.title,
    name: firstName,
    rating: review.rating,
    comment: review.comment,
  };

  try {
    const response = await ReviewServices.addReview(token, form);

    if (response === "Invalid Token") {
      toast.error("Please login again to write a review");
    } else {
      toast.success("Review submitted successfully");
      fetchShoeReviews(product_id); // Refresh reviews after submission
      handleCloseModal();
    }
  } catch (error) {
    setError(error);
  }
};

export const handleDeleteReview = async (review_id) => {
  if (!token) {
    toast.error("Please login to delete a review");
    return;
  }
  try {
    const response = await ReviewServices.deleteReview(token, review_id);
    if (response === "Invalid Token") {
      toast.error("Please login again to delete this review");
    } else {
      toast.success(response);
      fetchShoeReviews(product_id);
    }
  } catch (error) {
    console.log(error);
  }
};

export default function ReviewSection({ product_id }) {
  const token = JSON.parse(sessionStorage.getItem("Authorization"));
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchShoeReviews = async (id) => {
    try {
      if (id) {
        const response = await ReviewServices.getProductReviews(token, id);
        setReviews(response);
      }
    } catch (error) {
      setError(error);
    }
  };

  const handleAddReview = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchShoeReviews(product_id);
  }, [product_id]);

  if (error) {
    console.log(error);
    return <div>Error getting shoe data</div>;
  }

  return (
    <div className="w-10/12 mx-auto">
      <div className="w-full justify-between flex flex-row mb-3">
        <h1 className="text-3xl font-signika-negative font-bold">Reviews</h1>
        <button
          className="text-white bg-blue-500 px-4 py-2 rounded-2xl font-semibold"
          onClick={handleAddReview}
        >
          + Write a review
        </button>
      </div>
      <ProductReviews
        reviews={reviews}
        token={token}
        onDelete={handleDeleteReview}
      />
      <ReviewModal
        token={token}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitReview}
      />
    </div>
  );
}
