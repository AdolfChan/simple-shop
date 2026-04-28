export default function MenuSkeleton({ length }: { length: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-2 mx-6">
      {Array.from({ length: length }).map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-md w-full flex flex-col h-full min-h-[320px] max-h-[600px] p-4"
        >
          <div className="relative w-full aspect-[16/9] mb-3 bg-gray-200 animate-pulse">
            {/*Image*/}
          </div>

          <div className="mb-2 w-1/3 h-5 bg-gray-200 animate-pulse rounded-full">
            {/*Name of dish*/}
          </div>

          <div className="bg-gray-200 mb-2 w-full h-5 rounded-full animate-pulse">
            {/*Desc*/}
          </div>

          <div className="flex flex-wrap gap-2 mb-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <span
                key={index}
                className="flex items-center bg-gray-200 text-xs font-medium px-2.5 py-0.5 rounded-full animate-pulse"
              >
                <div className="relative w-5 h-5 rounded-full overflow-hidden mr-2 shrink-0">
                  {/*Image*/}
                </div>

                {/*Products*/}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
