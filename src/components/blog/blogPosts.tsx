import Link from "next/link";
import { getPosts } from "../../../lib/actions/blog";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function BlogPosts({
  page,
  total,
}: {
  page?: number;
  total?: number;
}) {
  const amount = 9; //Amount per page
  const posts = await getPosts(page, amount);
  if (page && total && page > total) {
    return notFound();
  }
  return (
    <div aria-label="_BLOG" className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md">
            <Image
              src={post.image ? post.image : "/chefs/chef1.jpg"}
              alt="/chefs/chef1.jpg"
              width={800}
              height={1000}
              priority
              className="w-full h-auto object-cover rounded-t-lg"
            />
            <div className="p-6">
              <h3 className="text-2xl font-extrabold mb-3 font-serif text-gray-900 tracking-tight leading-snug">
                {post.headline}
              </h3>
              <p className="text-base md:text-lg text-gray-700 font-light leading-relaxed mb-4 font-sans">
                {post.preview}
              </p>
              <div className="flex mt-5 justify-center items-center">
                <Link
                  href={`/blog/${post.id}`}
                  className="inline-block px-4 py-2 text-blue-600 font-semibold rounded-md hover:bg-blue-50 hover:text-blue-800 transition-colors duration-150 font-sans"
                >
                  Read More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
