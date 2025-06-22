import CheefStaff from "@/components/cheefStaff/cheefStaff";
import Footer from "@/components/footer";
import Header from "@/components/header/header";
import ScrollDownBtn from "@/components/interactiveButtons/scrollDownButton";
import AboutReviews from "@/components/reviewList/aboutReview/Areviews";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex flex-col gap-[32px] items-center sm:items-start">
        {/* Image and divs above section */}
        <div className="w-full h-screen relative">
          <Image
            src="/photo-1576866206724-c696f4c9fa06.avif"
            alt="Main banner"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
            <div className="text-white text-5xl font-bold text-center [text-shadow:_2px_2px_4px_rgb(0_0_0_/_40%)] [-webkit-text-stroke:_1px_black]">
              <p>Crafted with Passion, Served with Care</p>
            </div>
            <div className="flex gap-4">
              <Link
                href="/menu"
                className="inline-block rounded-full border-2 border-[#6489da] bg-[#6489da] px-8 py-3 text-base font-semibold text-white hover:bg-[#6489da]/90 hover:border-[#52519a] hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(100,137,218,0.5)]"
              >
                View Menu
              </Link>
              <Suspense>
                <ScrollDownBtn />
              </Suspense>
            </div>
          </div>
        </div>

        {/* How does it work section */}
        <div
          aria-label="description"
          className="w-full py-16 px-4 sm:px-6 lg:px-8"
        >
          <h2 className="text-3xl font-bold text-center mb-12">
            How does it work?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 mb-4 text-[#6489da]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Choose tasty food</h3>
              <p className="text-gray-600">
                Browse our menu and select your favorite dishes
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 mb-4 text-[#6489da]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Place an order</h3>
              <p className="text-gray-600">
                Add items to cart and complete your order
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 mb-4 text-[#6489da]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Wait for delivery</h3>
              <p className="text-gray-600">
                Our courier will deliver your order quickly
              </p>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 mb-4 text-[#6489da]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Enjoy your meal</h3>
              <p className="text-gray-600">
                Savor the delicious food we prepared for you
              </p>
            </div>
          </div>
        </div>
        <Suspense>
          <CheefStaff />
        </Suspense>
        <Suspense>
          <AboutReviews />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
