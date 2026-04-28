"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import CategoryTabs from "@/components/menu/categoryTabs";

export default function Search() {
  const ref = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const router = useRouter();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, 100);
    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (debouncedValue !== "") {
      params.set("product", debouncedValue); // q — имя параметра поиска
    }
    if (debouncedValue == "") {
      params.delete("product");
    }
    params.delete("page");
    router.push(`?${params.toString()}`, { scroll: false });
  }, [debouncedValue, router]);
  return (
    <div className="flex justify-center mt-4 mb-4" aria-label="_MENU">
      <CategoryTabs />
      <div className="relative w-full max-w-md">
        <input
          type="text"
          ref={ref}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          id="Search"
          className="mt-0.5 h-10 w-full rounded-2xl px-4 border-gray-300  shadow-sm sm:text-sm bg-white focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition outline-none"
          placeholder="Search..."
        />

        <span className="absolute inset-y-0 right-2 grid w-8 place-content-center">
          <button
            type="button"
            aria-label="Submit"
            onClick={() => ref.current?.focus()}
            className="rounded-full p-1.5 text-gray-700 transition-colors hover:bg-gray-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </button>
        </span>
      </div>
    </div>
  );
}
