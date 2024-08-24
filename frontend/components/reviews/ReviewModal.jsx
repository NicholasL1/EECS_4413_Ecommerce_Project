// ReviewModal.js
import React, { useState } from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ReviewModal = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    onSubmit({ title, rating, comment });
    setTitle("");
    setRating(1);
    setComment("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="w-full justify-between flex flex-row">
          <h2 className="text-2xl font-bold mb-4">Write a Review</h2>
          <FontAwesomeIcon
            size="xl"
            className="text-custom-black mt-1 cursor-pointer"
            icon={faTimes}
            onClick={onClose}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded w-full px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Rating</label>
          <select
            value={rating}
            onChange={(e) => setRating(parseInt(e.target.value))}
            className="border rounded w-full px-3 py-2"
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Comment</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="border rounded w-full px-3 py-2"
            rows="4"
          ></textarea>
        </div>
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ReviewModal;
