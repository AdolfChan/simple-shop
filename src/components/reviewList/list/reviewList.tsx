"use client";

import { useEffect, useState } from "react";
import { getReviews } from "../../../../lib/actions/review";
import ReviewCard from "./reviewCard";
import ReviewCardSkeleton from "./reviewCardSkeleton";

export type ReviewsType = {
  reviews:
    | {
        id: string;
        date: Date;
        content: string;
        rating: number;
        user: {
          name: string;
          image: string | null;
        };
      }[]
    | undefined;
  totalCount: number | undefined;
  totalPages: number;
  currentPage: number;
};

export function ReviewList({ totalPages }: { totalPages: number }) {
  const [page, setPage] = useState(1);
  const [reviews, setReviews] = useState<ReviewsType>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getReviews(page);
        setReviews(data);
      } catch (error) {
        console.log(error);
        throw new Error("Failed to load reviews");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [page]);

  return (
    <div className="w-full min-h-[600px] flex flex-col">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-grow ">
        {isLoading
          ? // Show skeletons while loading
            Array.from({ length: 6 }).map((_, index) => (
              <ReviewCardSkeleton key={index} />
            ))
          : // Show actual reviews when loaded
            reviews?.reviews?.map((element, index) => (
              <ReviewCard key={index} {...element} />
            ))}
      </div>

      {/* Pagination */}
      <div className="mt-12 flex justify-center items-center gap-4 h-12">
        <button
          onClick={() => setPage(page - 1)}
          className="px-6 py-2 bg-[#6489da] text-white rounded-md hover:bg-[#4f6db3] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={page === 1 || isLoading}
        >
          Previous
        </button>
        <span className="text-gray-600">
          Page {page} of {reviews ? reviews.totalPages : totalPages}
        </span>
        <button
          onClick={() => setPage(page + 1)}
          className="px-6 py-2 bg-[#6489da] text-white rounded-md hover:bg-[#4f6db3] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={
            page === (reviews ? reviews.totalPages : totalPages) || isLoading
          }
        >
          Next
        </button>
      </div>
    </div>
  );
}
