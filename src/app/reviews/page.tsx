import { Suspense } from "react";
import Image from "next/image";
import { getReviewsStats } from "../../../lib/actions/review";
import { ReviewList } from "@/components/reviewList/list/reviewList";
import { SetReview } from "@/components/reviewList/leaveReview/setReviewCard";

export default async function ReviewsPage() {
  const { count, avg, wouldRecomend, totalPages } = await getReviewsStats();

  return (
    <div>
      <div className="min-h-screen bg-[#f8f9fa]">
        {/* Hero Section */}
        <div className="relative h-[40vh] w-full">
          <Image
            src="/photo-1576866206724-c696f4c9fa06.avif"
            alt="Restaurant Atmosphere"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-bold font-serif text-white text-center">
              What Our Customers Say
            </h1>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-lg p-6 shadow-sm text-center">
              <h3 className="text-3xl font-bold text-[#6489da] mb-2">
                {avg.toFixed(2)}
              </h3>
              <p className="text-gray-600">Average Rating</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm text-center">
              <h3 className="text-3xl font-bold text-[#6489da] mb-2">
                {count?.toString()}
              </h3>
              <p className="text-gray-600">Total Reviews</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm text-center">
              <h3 className="text-3xl font-bold text-[#6489da] mb-2">
                {wouldRecomend}%
              </h3>
              <p className="text-gray-600">Would Recommend</p>
            </div>
          </div>

          {/* Reviews Section */}
          <Suspense>
            <ReviewList totalPages={totalPages} />
          </Suspense>
        </div>
      </div>
      <Suspense>
        <SetReview />
      </Suspense>
    </div>
  );
}
