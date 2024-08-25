import React, { useState, useEffect } from "react";
import ProductReviews from "./ProductReviews";
import ReviewServices from "@/services/reviewService";
import ReviewModal from "./ReviewModal";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { getToken } from "@/lib/utils";

export default function ReviewSection({ product_id }) {
  const token = getToken();
  const [reviews, setReviews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmitReview = async (review) => {
    const token = getToken();
    if (token == "undefined") {
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
      user_id: user_id,
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
        fetchShoeReviews(product_id)
        handleCloseModal();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteReview = async (review_id) => {
    const token = getToken();
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
        fetchShoeReviews(product_id);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
