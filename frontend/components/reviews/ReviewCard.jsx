import React from "react";
import ReviewStars from "../ui/ReviewStars";

const createDate = (dateStr) => {
  const date = new Date(dateStr);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);
  return formattedDate;
};

export default function ReviewCard({ data }) {
  return (
    <div className="w-full mx-auto bg-white p-7 rounded-3xl">
      <div className="flex flex-row justify-between">
        <h1 className="text-lg font-light">By: {data.name}</h1>
        <h1 className="right-0">{ReviewStars(data.rating)}</h1>
      </div>
      <h2 className="text-sm font-signika-negative font-extralight italic">
        Reviewed on {createDate(data.Date)}
      </h2>
      <h1 className="text-lg font-signika-negative font-bold">{data.title}</h1>
      <p className="">{data.comment}</p>
    </div>
  );
}
