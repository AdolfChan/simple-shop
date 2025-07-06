"use client";

import { useRouter, useSearchParams } from "next/navigation";

const scrollToBlog = () => {
  const blogElem = document.querySelector('[aria-label="_BLOG"]');
  if (blogElem) blogElem.scrollIntoView({ behavior: "smooth" });
};

export default function Pagination({ total }: { total: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get("page") || "1");

  const handleNext = () => {
    router.push(`?page=${page + 1}`, { scroll: false });
    scrollToBlog();
  };

  const handlePrev = () => {
    router.push(`?page=${page - 1}`, { scroll: false });
    scrollToBlog();
  };

  const handleNum = (num: number) => {
    router.push(`?page=${num}`, { scroll: false });
    scrollToBlog();
  };

  //Pagination Style:

  return (
    <div>
      <div>
        <ul className="flex justify-center gap-1 text-gray-900">
          <li>
            <button
              className={
                `grid size-8 place-content-center rounded border transition-colors duration-200 text-gray-900 border-gray-200 rtl:rotate-180 ` +
                (page === 1
                  ? " bg-gray-100 border-gray-200 text-gray-400 opacity-60"
                  : " hover:bg-[#e6f0fa] hover:border-[#6489da]")
              }
              aria-label="Previous page"
              disabled={page === 1}
              onClick={() => handlePrev()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </li>
          {total < 7 ? (
            Array.from({ length: total }).map((_, index) => (
              <li key={index} onClick={() => handleNum(index + 1)}>
                <button
                  className={
                    `block size-8 rounded border text-center text-sm/8 font-medium transition-colors duration-200` +
                    (index + 1 === page
                      ? " bg-[#6489da] border-[#6489da] text-white hover:bg-[#4a6fb3] hover:border-[#4a6fb3]"
                      : " text-gray-900 border-gray-200 hover:bg-[#e6f0fa] hover:border-[#6489da]")
                  }
                >
                  {index + 1}
                </button>
              </li>
            ))
          ) : (
            <>
              {page > 3 && (
                <>
                  <li onClick={() => handleNum(1)}>
                    <button
                      className={
                        `block size-8 rounded border text-center text-sm/8 font-medium transition-colors duration-200` +
                        (page === 1
                          ? " bg-[#6489da] border-[#6489da] text-white hover:bg-[#4a6fb3] hover:border-[#4a6fb3]"
                          : " text-gray-900 border-gray-200 hover:bg-[#e6f0fa] hover:border-[#6489da]")
                      }
                    >
                      1
                    </button>
                  </li>
                  <li className="px-2">...</li>
                </>
              )}
              {Array.from({ length: 5 }, (_, i) => {
                const pg =
                  page <= 3
                    ? i + 1
                    : page + 2 <= total
                    ? page + i - 2
                    : total - 4 + i;
                if (pg < 1 || pg > total) return null; //Проверка на всякий
                return (
                  <li key={i} onClick={() => handleNum(pg)}>
                    <button
                      className={`block size-8 rounded border text-center text-sm/8 font-medium transition-colors duration-200 ${
                        pg === page
                          ? "bg-[#6489da] border-[#6489da] text-white hover:bg-[#4a6fb3] hover:border-[#4a6fb3]"
                          : "text-gray-900 border-gray-200 hover:bg-[#e6f0fa] hover:border-[#6489da]"
                      }`}
                    >
                      {pg}
                    </button>
                  </li>
                );
              })}
              {page < total - 2 && (
                <>
                  <li className="px-2">...</li>
                  <li onClick={() => handleNum(total)}>
                    <button
                      className={
                        `block size-8 rounded border text-center text-sm/8 font-medium transition-colors duration-200` +
                        (page === total
                          ? " bg-[#6489da] border-[#6489da] text-white hover:bg-[#4a6fb3] hover:border-[#4a6fb3]"
                          : " text-gray-900 border-gray-200 hover:bg-[#e6f0fa] hover:border-[#6489da]")
                      }
                    >
                      {total}
                    </button>
                  </li>
                </>
              )}
            </>
          )}

          <li>
            <button
              className={
                `grid size-8 place-content-center rounded border transition-colors duration-200 text-gray-900 border-gray-200 rtl:rotate-180 ` +
                (page === total
                  ? " bg-gray-100 border-gray-200 text-gray-400  opacity-60"
                  : " hover:bg-[#e6f0fa] hover:border-[#6489da]")
              }
              aria-label="Next page"
              disabled={page === total}
              onClick={() => handleNext()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
