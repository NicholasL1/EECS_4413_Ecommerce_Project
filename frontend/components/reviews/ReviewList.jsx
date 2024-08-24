import React from "react";
import ReviewCard from "./ReviewCard";
import { jwtDecode } from "jwt-decode";

// const reviews = [
//   {
//     _id: "66c823fddd5d8aaa4541ccd3",
//     user_id: "66c049b2aa64f7ced38914c5",
//     product_id: "668c75cd30fc9d0882a34d9d",
//     rating: 5,
//     name: "adaw",
//     title: "great shoe!",
//     comment: "stylish shoe and very comfortable!",
//     Date: "2022-05-01T00:00:00.000Z",
//   },
//   {
//     _id: "66c823fddd5d8aaa4541ccd3",
//     user_id: "66c049b2aa64f7ced38914c5",
//     product_id: "668c75cd30fc9d0882a34d9d",
//     rating: 5,
//     name: "adaw",
//     title: "great shoe!",
//     comment: "stylish shoe and very comfortable!",
//     Date: "2022-05-01T00:00:00.000Z",
//   },
//   {
//     _id: "66c823fddd5d8aaa4541ccd3",
//     user_id: "66c049b2aa64f7ced38914c5",
//     product_id: "668c75cd30fc9d0882a34d9d",
//     rating: 5,
//     name: "adaw",
//     title: "great shoe!",
//     comment: "stylish shoe and very comfortable!",
//     Date: "2022-05-01T00:00:00.000Z",
//   },
// ];
export default function ReviewList({ reviews, token, onDelete }) {
  let id = null;
  if (token) {
    id = jwtDecode(token).userData[0];
  }

  return (
    <div className="flex flex-col gap-4">
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
