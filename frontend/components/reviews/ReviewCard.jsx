import React from "react";
import ReviewStars from "../ui/ReviewStars";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format, parseISO } from "date-fns";

const createDate = (dateStr) => {
  const date = parseISO(dateStr);
  return format(date, "MMMM d, yyyy");
};

export default function ReviewCard({ data, deletePossible = false, onDelete }) {
  return (
    <div className="w-full mx-auto bg-white p-7 rounded-3xl">
      <div className="flex flex-row justify-between">
        <h1 className="text-lg font-light">By: {data.name}</h1>
        <h1 className="right-0">{ReviewStars(data.rating)}</h1>
      </div>
      <h2 className="text-sm font-signika-negative font-extralight italic p-0">
        Reviewed on {createDate(data.date)}
      </h2>
      <h1 className="text-lg font-signika-negative font-bold">{data.title}</h1>
      <div className="w-full justify-between flex flex-row">
        <p className="">{data.comment}</p>
        {deletePossible && (
          <FontAwesomeIcon
            size="lg"
            className="text-red-500 mt-1 cursor-pointer"
            icon={faTrash}
            onClick={() => onDelete(data._id)}
          />
        )}
      </div>
    </div>
  );
}
