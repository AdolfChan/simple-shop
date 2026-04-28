import Search from "@/components/menu/search";
import MenuList from "@/components/menu/menu";
import Image from "next/image";
import MenuSkeleton from "@/components/menu/menuSkeleton";
import { Suspense } from "react";

const amountPerPage = 9;
export default async function Menu({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; product?: string; page?: string }>;
}) {
  const params = await searchParams;
  return (
    <div className="flex flex-col min-h-screen bg-[#f8f9fa]">
      <div className="relative w-full h-[40vh]">
        <Image
          src="/photo-1576866206724-c696f4c9fa06.avif"
          alt="Restaurant Atmosphere"
          fill
          className="object-cover"
          priority
        ></Image>
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-white text-center">
            Our Menu
          </h1>
        </div>
      </div>

      {/* Search */}
      <Search />
      <Suspense fallback={<MenuSkeleton length={amountPerPage} />}>
        <MenuList {...{ ...params, amountPerPage }} />
      </Suspense>
    </div>
  );
}
