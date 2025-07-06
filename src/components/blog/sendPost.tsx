"use client";

export default function SendPost() {
  const content = `
    The restaurant industry is constantly evolving, and our team is dedicated to staying ahead of the curve. From the moment you walk through our doors, you are greeted by an atmosphere that blends tradition with innovation. Our chefs are passionate about crafting dishes that not only satisfy your hunger but also tell a story of culture, creativity, and care.

    This season, we are excited to introduce a new menu inspired by local ingredients and global flavors. Each dish is thoughtfully prepared, ensuring a memorable dining experience for every guest. Whether you are joining us for a family dinner, a romantic evening, or a special celebration, our staff is committed to making your visit exceptional.

    Beyond the food, we believe in creating a sense of community. Our events calendar is filled with live music nights, cooking classes, and tasting events that bring people together. We invite you to explore, connect, and savor every moment at our restaurant.

    Thank you for being a part of our journey. We look forward to welcoming you again and again!`;
  const headline = "The Restaurant Industry is Evolving";
  const tags = ["Events", "Live Music", "Masterclass"];
  const image = "/pexels-jill-burrow-6773321.jpg";
  const sendPost = async () => {
    const response = await fetch("/api/createPost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content, headline, tags, image }),
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <div className="flex justify-center items-center">
      <button
        onClick={() => sendPost()}
        className="bg-blue-500 text-white p-2 rounded-md cursor-pointer transition duration-150 hover:bg-blue-600 active:bg-blue-700"
      >
        Send Post
      </button>
    </div>
  );
}
