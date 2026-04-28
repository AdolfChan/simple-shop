"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const categories = [
  { key: "all", label: "All" },
  { key: "appetizers", label: "Appetizers" },
  { key: "main", label: "Main dishes" },
  { key: "desserts", label: "Desserts" },
  { key: "salads", label: "Salads" },
  { key: "drinks", label: "Drinks" },
];

export default function CategoryTabs() {
  const def = useSearchParams();
  const [category, setCategory] = useState<string>(def.get("category") || "");
  const router = useRouter();
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (category === "All") {
      params.delete("category");
    }
    if (category !== "All") {
      params.set("category", category);
    }
    params.delete("page");
    router.push(`?${params.toString()}`, { scroll: false });
  }, [category, router]);
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex mx-10 items-center justify-center"
    >
      <ul className="flex items-center gap-1 text-lg font-semibold text-gray-800 font-serif">
        {categories.map((e, idx) => (
          <li key={e.key} className="flex items-center">
            <button
              onClick={() => setCategory(e.label)}
              className={`block transition-colors px-3 py-1 rounded-lg focus:outline-none hover:text-[#6489da] ${
                category === e.label ? " text-[#6489da]" : ""
              }`}
            >
              {e.label}
            </button>
            {idx !== categories.length - 1 && (
              <span className="mx-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6 text-gray-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m9 20.247 6-16.5"
                  />
                </svg>
              </span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
