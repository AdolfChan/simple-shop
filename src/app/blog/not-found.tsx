export default function BlogNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h2 className="text-3xl font-bold text-[#6489da] mb-4">
        Blog page not found
      </h2>
      <p className="text-gray-600 mb-6">
        Sorry, the blog post or page you are looking for does not exist.
      </p>
      <a
        href="/blog"
        className="px-4 py-2 bg-[#6489da] text-white rounded hover:bg-[#4a6fb3] transition"
      >
        Back to Blog
      </a>
    </div>
  );
}
