import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

/**
 * Generates a group of stars based on the rating number
 * @returns a group of stars
 */
export default function ReviewStars(rating, size) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - Math.ceil(rating);

  return (
    <div className="flex items-center">
      {Array.from({ length: fullStars }, (_, index) => (
        <FaStar
          key={`full-${index}`}
          className={`text-yellow-500 ${size ? size : "text-xl"} mx-1`}
        />
      ))}
      {hasHalfStar && (
        <FaStarHalfAlt
          key="half"
          className={`text-yellow-500 ${size ? size : "text-xl"} mx-1`}
        />
      )}
      {Array.from({ length: emptyStars }, (_, index) => (
        <FaRegStar
          key={`empty-${index}`}
          className={`text-gray-700 ${size ? size : "text-xl"} mx-1`}
        />
      ))}
      <span className="ml-2 text-md font-thin">({rating})</span>
    </div>
  );
}
