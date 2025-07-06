import { getPost } from "../../../../lib/actions/blog";
import Image from "next/image";
import Link from "next/link";

async function PostPage({ params }: { params: { id: string[] } }) {
  const post = await getPost(params.id);
  if (!post) return <></>;
  const formattedDate = post.date
    ? new Date(post.date).toLocaleDateString("en", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f9fa] to-[#e3eafc]">
      <main className="md:max-w-3xl lg:max-w-4xl mx-auto py-14 px-4">
        <article className="space-y-8 bg-white/90 rounded-2xl shadow-xl p-6 border border-gray-100">
          <Image
            src={
              post.image || "/posts/adam-bartoszewicz-KoAV43S5ok8-unsplash.jpg"
            }
            width={800}
            height={400}
            alt="/posts/adam-bartoszewicz-KoAV43S5ok8-unsplash.jpg"
            className="w-full  h-auto object-cover rounded-xl shadow-lg mb-6 transition-transform duration-300 hover:scale-101"
          />

          <div className="flex flex-wrap gap-3 text-base text-gray-600 mb-2 px-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="bg-[#6489da]/10 text-[#6489da] cursor-pointer px-3 py-1 rounded-full font-semibold shadow-sm text-base tracking-wide hover:bg-[#6489da]/20 transition-colors duration-200"
              >
                #{tag}
              </span>
            ))}
            <span className="text-gray-400 text-base flex justify-center items-center ">
              • {formattedDate}
            </span>
          </div>

          <h1 className="px-2 text-4xl font-extrabold font-serif text-gray-900 mb-4 leading-tight drop-shadow-sm">
            {post.headline}
          </h1>

          <div className="px-2 prose prose-lg max-w-none text-gray-800 text-xl leading-relaxed font-sans">
            {/* Здесь контент — можно даже с markdown */}
            <p>{post.content}</p>
          </div>
        </article>

        <div className="pt-10 text-center">
          <Link
            href="/blog"
            className="inline-block text-[#6489da] cursor-pointer hover:text-[#6489da] hover:scale-101 font-medium text-lg transition-colors duration-300"
          >
            ← Вернуться ко всем постам
          </Link>
        </div>
      </main>
    </div>
  );
}
export default PostPage;
