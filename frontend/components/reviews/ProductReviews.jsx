import React, { useState, useEffect } from "react";
import ReviewList from "./ReviewList";

export default function ProductReviews({ reviews, token, onDelete }) {
  const [sortedReviews, setSortedReviews] = useState(reviews);
  const [sortCriteria, setSortCriteria] = useState("Default");

  const totalReviews = reviews.length;

  // Initialize starRatings with zero values
  const starRatings = [1, 2, 3, 4, 5].map((star) => ({
    star,
    ratings: 0,
    percentage: 0,
  }));

  // Count the number of reviews for each star rating
  reviews.forEach((review) => {
    const ratingIndex = starRatings.findIndex((r) => r.star === review.rating);
    if (ratingIndex !== -1) {
      starRatings[ratingIndex].ratings += 1;
    }
  });

  // Calculate percentages
  starRatings.forEach((ratingInfo) => {
    ratingInfo.percentage =
      totalReviews > 0
        ? Math.round((ratingInfo.ratings / totalReviews) * 100)
        : 0;
  });

  // Calculate the average rating
  const calculateAverageRating = () => {
    if (totalReviews === 0) return 0;
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (totalRating / totalReviews).toFixed(1); // Round to 1 decimal place
  };

  const averageRating = calculateAverageRating();

  // Sorting function
  const sortReviews = (criteria) => {
    const sorted = [...reviews].sort((a, b) => {
      switch (criteria) {
        case "Newest":
          return new Date(b.date) - new Date(a.date);
        case "Oldest":
          return new Date(a.date) - new Date(b.date);
        case "Highest Rated":
          return b.rating - a.rating;
        case "Lowest Rated":
          return a.rating - b.rating;
        default:
          return 0; // No sorting if criteria is "Default"
      }
    });
    setSortedReviews(sorted);
  };

  // Handle filter button clicks
  const handleFilterClick = (criteria) => {
    setSortCriteria(criteria);
    sortReviews(criteria);
  };

  // Initialize sortedReviews on component mount and when reviews change
  useEffect(() => {
    setSortedReviews(reviews);
  }, [reviews]);

  return (
    <div className="flex flex-col md:flex-row items-start md:space-x-4 w-full">
      {/* Container for Review Summary and Filters */}
      <div className="w-full md:w-1/3 flex flex-col space-y-4">
        {/* Review Summary Box */}
        <div className="bg-white rounded-2xl shadow-md p-4 w-full">
          <h2 className="text-xl font-bold font-signika-negative p-0">
            Customer Reviews
          </h2>
          <div className="text-yellow-500 text-2xl font-semibold">
            {averageRating}
            <span className="text-gray-600 text-sm"> out of 5</span>
          </div>
          <p className="text-sm text-gray-500">
            Based on {totalReviews} reviews
          </p>
          <div className="mt-4">
            {/* Star ratings distribution */}
            {starRatings.map((ratingInfo) => (
              <div key={ratingInfo.star} className="flex items-center">
                <span className="text-gray-600 text-sm mr-2 whitespace-nowrap">
                  {ratingInfo.star} star
                </span>
                <div className="w-[75%] md:w-[65%] h-2 bg-gray-300 rounded">
                  <div
                    className="h-2 bg-yellow-500 rounded"
                    style={{ width: `${ratingInfo.percentage}%` }}
                  ></div>
                </div>
                <span className="text-gray-600 text-sm ml-2 whitespace-nowrap float-right">
                  {ratingInfo.percentage}% ({ratingInfo.ratings})
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Filters Box */}
        <div className="bg-white rounded-2xl shadow-md p-4 w-full sm:mb-4">
          <h2 className="text-xl font-bold font-signika-negative p-0">
            Filter Reviews
          </h2>
          <div className="mt-4">
            <button
              className={`bg-custom-red text-white py-2 px-4 rounded mb-2 w-full ${
                sortCriteria === "Newest" ? "bg-red-700" : ""
              }`}
              onClick={() => handleFilterClick("Newest")}
            >
              Newest
            </button>
            <button
              className={`bg-custom-red text-white py-2 px-4 rounded mb-2 w-full ${
                sortCriteria === "Oldest" ? "bg-red-700" : ""
              }`}
              onClick={() => handleFilterClick("Oldest")}
            >
              Oldest
            </button>
            <button
              className={`bg-custom-red text-white py-2 px-4 rounded mb-2 w-full ${
                sortCriteria === "Highest Rated" ? "bg-red-700" : ""
              }`}
              onClick={() => handleFilterClick("Highest Rated")}
            >
              Highest Rated
            </button>
            <button
              className={`bg-custom-red text-white py-2 px-4 rounded w-full ${
                sortCriteria === "Lowest Rated" ? "bg-red-700" : ""
              }`}
              onClick={() => handleFilterClick("Lowest Rated")}
            >
              Lowest Rated
            </button>
          </div>
        </div>
      </div>

      {/* Review List */}
      <div className="w-full md:flex-grow mt-4 lg:mt-0 p-0">
        <ReviewList reviews={sortedReviews} token={token} onDelete={onDelete} />
      </div>
    </div>
  );
}
