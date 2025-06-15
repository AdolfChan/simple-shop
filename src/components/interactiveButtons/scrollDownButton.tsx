"use client";
export default function ScrollDownBtn() {
  const scrollToContent = () => {
    const imageSection = document.querySelector("[aria-label=description]");
    if (imageSection) {
      imageSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <button
      onClick={scrollToContent}
      className="inline-block rounded-full border-2 border-gray-600 bg-gray-600 px-8 py-3 text-base font-semibold text-white hover:bg-gray-600/90 hover:scale-105 transition-colors duration-300"
    >
      Learn More
    </button>
  );
}
