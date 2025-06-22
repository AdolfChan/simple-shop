"use client";
import { useEffect, useState } from "react";
import { getReviews } from "../../../../lib/actions/review";
import { ReviewsType } from "../list/reviewList";
import ReviewCardSkeleton from "../list/reviewCardSkeleton";
import ReviewCard from "../list/reviewCard";

const CARD_WIDTH = 320;
const GAP = 24; // gap-6
const REVIEW_COUNT = 10;

export default function AboutReviews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reviews, setReviews] = useState<ReviewsType>();
  const [isLoading, setIsLoading] = useState(true);
  const [reviewPerView, setReviewPerView] = useState(3);

  // меняем reviewPerView в зависимости от ширины экрана
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 768) {
        setReviewPerView(1);
      } else if (window.innerWidth < 1024) {
        setReviewPerView(2);
      } else {
        setReviewPerView(3);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const get = async () => {
      try {
        const data = await getReviews(1, REVIEW_COUNT);
        setReviews(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    get();
  }, []);

  // корректируем currentIndex если уменьшилось reviewPerView
  useEffect(() => {
    setCurrentIndex((prev) =>
      Math.min(prev, Math.max(REVIEW_COUNT - reviewPerView, 0))
    );
  }, [reviewPerView]);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, REVIEW_COUNT - reviewPerView));
  };

  const numDots = Math.max(REVIEW_COUNT - reviewPerView + 1, 0);
  const sliderWidth = reviewPerView * CARD_WIDTH + (reviewPerView - 1) * GAP;
  const translateX = currentIndex * (CARD_WIDTH + GAP);

  return (
    <div className="w-full py-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <h2 className="text-center font-bold text-3xl mb-12">Our Reviews</h2>
      <div className="flex items-center justify-center mb-4 gap-2">
        {/* Левая стрелка */}
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
            currentIndex === 0
              ? "bg-gray-200 opacity-50"
              : "bg-white/80 hover:bg-white"
          }`}
          aria-label="Previous reviews"
          style={{ minWidth: 44, minHeight: 44 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className={`w-6 h-6 ${
              currentIndex === 0 ? "text-gray-400" : "text-[#6489da]"
            }`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        {/* Слайдер */}
        <div className="overflow-hidden" style={{ width: sliderWidth }}>
          <div
            className="flex transition-transform duration-500 ease-in-out gap-6"
            style={{
              transform: `translateX(-${translateX}px)`,
            }}
          >
            {isLoading
              ? Array.from({ length: REVIEW_COUNT }).map((_, index) => (
                  <div
                    key={index}
                    style={{ width: CARD_WIDTH }}
                    className="flex-shrink-0"
                  >
                    <ReviewCardSkeleton />
                  </div>
                ))
              : reviews?.reviews?.map((element, index) => (
                  <div
                    key={index}
                    style={{ width: CARD_WIDTH }}
                    className="flex-shrink-0"
                  >
                    <ReviewCard {...element} />
                  </div>
                ))}
          </div>
        </div>
        {/* Правая стрелка */}
        <button
          onClick={handleNext}
          disabled={currentIndex >= REVIEW_COUNT - reviewPerView}
          className={`p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
            currentIndex >= REVIEW_COUNT - reviewPerView
              ? "bg-gray-200 opacity-50"
              : "bg-white/80 hover:bg-white"
          }`}
          aria-label="Next reviews"
          style={{ minWidth: 44, minHeight: 44 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className={`w-6 h-6 ${
              currentIndex >= REVIEW_COUNT - reviewPerView
                ? "text-gray-400"
                : "text-[#6489da]"
            }`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
      <div className="flex gap-2 mt-4">
        {Array.from({ length: numDots }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-3 h-3 rounded-full border border-gray-300 ${
              currentIndex === idx ? "bg-blue-500" : "bg-gray-300"
            } transition`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
