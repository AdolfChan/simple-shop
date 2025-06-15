"use client";

import { useState } from "react";
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = Math.ceil(chefs.length / 3);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
  };

  return (
    <div className="w-full py-16 px-4 sm:px-6 lg:px-8">
      <h2 className="text-center font-bold text-3xl mb-12">Our Chefs</h2>

      <div className="relative max-w-7xl mx-auto">
        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6 text-[#6489da]"
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
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6 text-[#6489da]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>

        {/* Chefs Carousel */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 50}%)`,
              width: `${totalSlides * 100}%`,
            }}
          >
            {Array.from({ length: totalSlides }).map((_, slideIndex) => (
              <div
                key={slideIndex}
                className="w-full flex-shrink-0"
                style={{ width: `${100 / totalSlides}%` }}
              >
                <div className="grid grid-cols-3 gap-4 px-4">
                  {chefs
                    .slice(slideIndex * 3, slideIndex * 3 + 3)
                    .map((chef) => (
                      <div key={chef.id} className="flex flex-col items-center">
                        <div className="relative w-48 h-48 mb-4 rounded-full overflow-hidden">
                          <Image
                            src={chef.image}
                            alt={chef.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <h3 className="text-xl font-semibold text-center">
                          {chef.name}
                        </h3>
                        <p className="text-gray-600 text-center">
                          {chef.position}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center gap-2 mt-10">
          {Array.from({ length: totalSlides }).map((_, index) => (
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
          ))}
        </div>
      </div>
    </div>
  );
}
