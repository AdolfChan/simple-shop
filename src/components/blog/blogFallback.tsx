//animate-pulse
export default function BlogSkeleton() {
  const length = parseInt(process.env.POSTS_PER_PAGE_IN_BLOG || "9");
  return (
    <div
      aria-label="_BLOG"
      className="container mx-auto px-4 py-8 animate-pulse"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: length }).map((post, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md">
            <div className="w-full h-90 bg-gray-200 rounded-t-lg" />
            <div className="p-6">
              <div className="h-6 w-3/4 bg-gray-200 rounded mb-3  animate-pulse"></div>
              <div className="h-4 w-full bg-gray-200 rounded mb-4  animate-pulse"></div>
              <div className="flex mt-5 justify-center items-center  animate-pulse">
                <div className="h-8 w-24 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
