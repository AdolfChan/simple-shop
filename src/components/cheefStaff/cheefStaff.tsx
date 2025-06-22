"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const chefs = [
  {
    id: 1,
    name: "John Smith",
    image: "/chefs/chef1.jpg",
    position: "Head Chef",
  },
  {
    id: 2,
    name: "Maria Garcia",
    image: "/chefs/chef2.jpg",
    position: "Sous Chef",
  },
  {
    id: 3,
    name: "David Chen",
    image: "/chefs/chef3.jpg",
    position: "Pastry Chef",
  },
  {
    id: 4,
    name: "Sarah Johnson",
    image: "/chefs/chef4.jpg",
    position: "Sauce Chef",
  },
  {
    id: 5,
    name: "Michael Brown",
    image: "/chefs/chef5.jpg",
    position: "Grill Chef",
  },
  {
    id: 6,
    name: "Emma Wilson",
    image: "/chefs/chef6.jpg",
    position: "Vegetable Chef",
  },
];

export default function CheefStaff() {
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 768) {
        setChefsPerView(1);
      } else if (window.innerWidth < 1024) {
        setChefsPerView(2);
      } else {
        setChefsPerView(3);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [chefsPerView, setChefsPerView] = useState(3);
  const totalChefs = chefs.length;
  const maxIndex = totalChefs - chefsPerView; // чтобы не прокрутить за границу

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="w-full py-16 px-4 sm:px-6 lg:px-8">
      <h2 className="text-center font-bold text-3xl mb-12">Our Chefs</h2>

      <div className="relative max-w-7xl mx-auto">
        {/* Chefs Carousel */}
        <div className="overflow-hidden ">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              width: `${(chefs.length * 100) / chefsPerView}%`,
              transform: `translateX(-${(currentIndex * 100) / chefs.length}%)`,
            }}
          >
            {chefs.map((chef) => (
              <div
                key={chef.id}
                className="flex flex-col items-center"
                style={{ width: `${100 / chefs.length}%` }}
              >
                <div className="relative w-48 h-48 mb-4 rounded-full overflow-hidden">
                  <Image
                    src={chef.image}
                    alt={chef.name}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                    loading="eager"
                  />
                </div>
                <h3 className="text-xl font-semibold text-center">
                  {chef.name}
                </h3>
                <p className="text-gray-600 text-center">{chef.position}</p>
              </div>
            ))}
          </div>
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className={`absolute left-4 top-1/3 -translate-y-1/2 z-10 p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
              currentIndex === 0
                ? "bg-gray-200  opacity-50"
                : "bg-white/80 hover:bg-white"
            }`}
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

          <button
            onClick={nextSlide}
            disabled={currentIndex === maxIndex}
            className={`absolute right-4 top-1/3 -translate-y-1/2 z-10 p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
              currentIndex === maxIndex
                ? "bg-gray-200  opacity-50"
                : "bg-white/80 hover:bg-white"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className={`w-6 h-6 ${
                currentIndex === maxIndex ? "text-gray-400" : "text-[#6489da]"
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

        {/* Slide Indicators */}
        <div className="flex justify-center gap-2 mt-10">
          {Array.from({ length: chefs.length - chefsPerView + 1 }).map(
            (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? "bg-[#6489da] scale-125"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}
