"use client";
import { RenderdynamicStars } from "../stars";
import { useState } from "react";

export default function LeaveReview() {
  const [review, setReview] = useState<string>("");
  const [rating, setRating] = useState<number>(5);
  const [wouldRecommend, setWouldRecommend] = useState<boolean>(false);

  async function sendReview() {
    const res = await fetch("/api/review", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: review,
        rating,
        wouldRecommend,
      }),
    });
    if (!res.ok) {
      alert("Error!");
    } else {
      setRating(5);
      setReview("");
      setWouldRecommend(false);
      window.location.reload();
    }
  }
  return (
    <>
      <h2 className="text-2xl font-bold mb-4 text-gray-800 text-left w-full">
        Leave your review
      </h2>
      <div className="w-full flex items-start">
        <RenderdynamicStars rating={rating} setRating={setRating} />
      </div>
      <textarea
        className="w-full h-32 mt-4 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#6489da] text-gray-700 text-base transition-all duration-200"
        placeholder="Type your review here..."
        onChange={(e) => setReview(e.target.value)}
      />
      <div className="flex flex-row items-center justify-start w-full p-2">
        <span>Do you recomend this place? </span>
        <input
          type="checkbox"
          checked={wouldRecommend}
          onChange={() => setWouldRecommend((v) => !v)}
          className="accent-[#6489da] mx-2 w-5 h-5 rounded border-gray-300 "
        />
        <button
          type="button"
          onClick={sendReview}
          className="ml-4 px-6 py-2 bg-[#6489da] text-white font-semibold rounded-lg shadow hover:bg-[#4f6db3] transition-colors duration-200 "
        >
          Send
        </button>
      </div>
    </>
  );
}
