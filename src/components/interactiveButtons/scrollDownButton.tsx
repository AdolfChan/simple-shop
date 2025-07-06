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
      className="inline-block rounded-full bg-white/20 border-2 border-white/40 px-10 py-4 text-lg font-semibold text-white backdrop-blur-md hover:bg-white/40 hover:text-white transition-all duration-300 hover:scale-105"
    >
      Learn More
    </button>
  );
}
