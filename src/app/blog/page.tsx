// import SendPost from "@/components/blog/sendPost";

import BlogPosts from "@/components/blog/blogPosts";
import Pagination from "@/components/blog/pagination";
import Image from "next/image";
import { getTotal } from "../../../lib/actions/blog";
import { Suspense } from "react";
import BlogSkeleton from "@/components/blog/blogFallback";

export default async function Blog({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = parseInt(params.page || "1", 10);
  const total = await getTotal(9); //amount on each page

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <div className="relative h-[40vh] w-full">
        <Image
          src="/photo-1576866206724-c696f4c9fa06.avif"
          alt="Restaurant Atmosphere"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-white text-center">
            Discover Our World
          </h1>
        </div>
      </div>
      <Suspense fallback={<BlogSkeleton />}>
        <BlogPosts page={page} total={total} />
      </Suspense>
      <Pagination total={total} />
    </div>
  );
}
