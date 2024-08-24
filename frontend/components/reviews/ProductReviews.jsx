import React from "react";
import ReviewList from "./ReviewList";

export default function ProductReviews({ data }) {
  const totalReviews = 150;

  const starRatings = [
    {
      star: 5,
      ratings: 30,
      percentage: Math.round((30 / totalReviews) * 100),
    },
    {
      star: 4,
      ratings: 100,
      percentage: Math.round((100 / totalReviews) * 100),
    },
    {
      star: 3,
      ratings: 5,
      percentage: Math.round((5 / totalReviews) * 100),
    },
    {
      star: 2,
      ratings: 0,
      percentage: Math.round((0 / totalReviews) * 100),
    },
    {
      star: 1,
      ratings: 15,
      percentage: Math.round((15 / totalReviews) * 100),
    },
  ];
  return (
    <div className="mx-auto flex flex-col md:flex-row items-start md:space-x-4 w-10/12">
      {/* Container for Review Summary and Filters */}
      <div className="w-full md:w-1/3 flex flex-col space-y-4">
        {/* Review Summary Box */}
        <div className="bg-white rounded-2xl shadow-md p-4 w-full">
          <h2 className="text-xl font-bold font-signika-negative p-0">
            Customer Reviews
          </h2>
          <div className="text-yellow-500 text-2xl font-semibold">
            4.5
            <span className="text-gray-600 text-sm"> out of 5</span>
          </div>
          <p className="text-sm text-gray-500">
            Based on {totalReviews} reviews
          </p>
          <div className="mt-4">
            {/* Star ratings distribution */}
            {starRatings.map((ratingInfo, index) => (
              <div className="flex items-center">
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
          <h2 className="text-xl font-bold font-signika-negative">
            Filter Reviews
          </h2>
          <div className="mt-4">
            <button className="bg-blue-500 text-white py-2 px-4 rounded mb-2 w-full">
              Newest
            </button>
            <button className="bg-blue-500 text-white py-2 px-4 rounded mb-2 w-full">
              Oldest
            </button>
            <button className="bg-blue-500 text-white py-2 px-4 rounded mb-2 w-full">
              Highest Rated
            </button>
            <button className="bg-blue-500 text-white py-2 px-4 rounded w-full">
              Lowest Rated
            </button>
          </div>
        </div>
      </div>

      {/* Review List */}
      <div className="w-full md:flex-grow mt-4 lg:mt-0">
        <ReviewList />
      </div>
    </div>
  );
}
