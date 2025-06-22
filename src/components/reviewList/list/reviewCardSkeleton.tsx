export default function ReviewCardSkeleton() {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm animate-pulse h-full">
      <div className="flex items-start mb-4">
        <div className="w-12 h-12 rounded-full bg-gray-200"></div>
        <div className="ml-4 flex-1">
          <div className="h-5 w-32 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 w-24 bg-gray-200 rounded"></div>
        </div>
      </div>
      <div className="flex gap-1 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <div key={star} className="w-6 h-6 bg-gray-200 rounded"></div>
        ))}
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-4/6"></div>
      </div>
    </div>
  );
}
