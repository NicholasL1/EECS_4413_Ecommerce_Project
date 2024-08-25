import React from "react";
import ReviewCard from "./ReviewCard";
import { jwtDecode } from "jwt-decode";

export default function ReviewList({ reviews, token, onDelete }) {
  let id = null;

   
  if (token) {
    id = jwtDecode(token).userData[0];
  }

  return (
    <div className="flex flex-col gap-4 max-h-[calc(10*5rem)] overflow-y-auto">
      {reviews.map((review, index) => (
        <ReviewCard
          key={index}
          data={review}
          deletePossible={id === review.user_id}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
