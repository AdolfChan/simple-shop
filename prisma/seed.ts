import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const productData = [
    { name: "Dark Chocolate", image: "/ingredients/dark_chocolate.jpg" },
    { name: "Butter", image: "/ingredients/butter.jpg" },
    { name: "Flour", image: "/ingredients/flour.jpg" },
    { name: "Sugar", image: "/ingredients/sugar.jpg" },
    { name: "Mascarpone", image: "/ingredients/mascarpone.jpg" },
    { name: "Ladyfingers", image: "/ingredients/ladyfingers.jpg" },
    { name: "Espresso", image: "/ingredients/espresso.jpg" },
    { name: "Cocoa Powder", image: "/ingredients/cocoa_powder.jpg" },
    { name: "Custard Cream", image: "/ingredients/custard_cream.jpg" },
    { name: "Strawberry", image: "/ingredients/strawberry.jpg" },
    { name: "Blueberry", image: "/ingredients/blueberry.jpg" },
    { name: "Banana", image: "/ingredients/banana.jpg" },
    { name: "Mint", image: "/ingredients/mint.jpg" },
    { name: "Lemon", image: "/ingredients/lemon.jpg" },
    { name: "Coffee", image: "/ingredients/coffee.jpg" },
    { name: "Milk", image: "/ingredients/milk.jpg" },
    { name: "Ice Cubes", image: "/ingredients/ice_cubes.jpg" },
    { name: "Yogurt", image: "/ingredients/yogurt.jpg" },
    { name: "Honey", image: "/ingredients/honey.jpg" },
  ];

  await prisma.product.createMany({
    data: productData,
    skipDuplicates: true,
  });

  console.log("✅ Products seeded successfully");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding products:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
