import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#f7faff] flex flex-col items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-[#6489da] mb-4">404</h1>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Sorry, the page you are looking for doesn`t exist or has been moved.
        </p>
        <div className="space-x-4">
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-[#6489da] text-white rounded-lg hover:bg-[#4a6fb3] transition-colors duration-200"
          >
            Go Home
          </Link>
          <Link
            href="/blog"
            className="inline-block px-6 py-3 border border-[#6489da] text-[#6489da] rounded-lg hover:bg-[#6489da] hover:text-white transition-colors duration-200"
          >
            Visit Blog
          </Link>
        </div>
      </div>
    </div>
  );
}
