import Image from "next/image";

export default function Blog() {
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
            <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
              What Our Customers Say
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
