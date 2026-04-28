import { Params } from "@/components/menu/menu";
import prisma from "../prisma";

const CATEGORY_ORDER = [
  "Appetizers",
  "Main dishes",
  "Desserts",
  "Salads",
  "Drinks",
  "Others",
];

function getOrder(category: string[]) {
  const indexes = category
    .map((cat) => CATEGORY_ORDER.indexOf(cat))
    .filter((i) => i !== -1);

  const result = indexes.length > 0 ? Math.min(...indexes) : 999;

  // console.log("Dish categories:", category, "→ order:", result);
  return result;
}

export async function getDishes({
  category,
  product,
  page,
  amountPerPage,
}: Params) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {};
    if (product) {
      where.OR = [
        {
          name: {
            contains: product,
            mode: "insensitive",
          },
        },
        {
          products: {
            some: {
              name: {
                contains: product,
                mode: "insensitive",
              },
            },
          },
        },
      ];
    }
    if (category && category !== "ALL") {
      where.category = {
        hasSome: [category],
      };
    }

    const dishes = await prisma.dish.findMany({
      where,
      // skip: (parseInt(page || "1") - 1) * amountPerPage,
      // take: amountPerPage,
      // orderBy: {
      //   name: "desc",
      // },
      include: {
        products: true,
      },
    });
    const total = Math.ceil(
      (await prisma.dish.count({ where })) / amountPerPage
    );

    if (category === "ALL" || category === undefined) {
      dishes.sort((a, b) => getOrder(a.category) - getOrder(b.category));
    }
    const pageNumber = parseInt(page || "1");
    const start = (pageNumber - 1) * amountPerPage;
    const pagedDishes = dishes.slice(start, start + amountPerPage);

    return { dishes: pagedDishes, total };
  } catch (error) {
    console.log(error);
    throw new Error("Cant load dishes!");
  }
}

// export async function getTotalNumOfPages(
//   category?: string,
//   product?: string,
//   amountPerPage: number = 12
// ) {
//   try {
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     const where: any = {};
//     if (category) {
//       where.category = {
//         hasSome: [category],
//       };
//     }
//     if (product) {
//       where.products = {
//         some: {
//           name: {
//             contains: product,
//             mode: "insensitive",
//           },
//         },
//       };
//     }

//     const total = await prisma.dish.count({ where });
//     return Math.ceil(total / amountPerPage);
//   } catch (error) {
//     console.log(error);
//     throw new Error("Can`t get total number of dishes!");
//   }
// }
