import prisma from "../prisma";

export async function getPosts(page: number = 1, amount: number = 6) {
  try {
    const posts = await prisma.post.findMany({
      skip: (page - 1) * amount,
      take: amount,
      orderBy: {
        date: "desc",
      },
      select: {
        headline: true,
        tags: true,
        image: true,
        date: true,
        id: true,
        preview: true,
      },
    });
    return posts;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to load posts!");
  }
}

export async function getPost(id: string[]) {
  try {
    console.log(id[0]);
    const post = await prisma.post.findUnique({
      where: {
        id: id[0],
      },
      select: {
        id: true,
        headline: true,
        content: true,
        tags: true,
        image: true,
        date: true,
      },
    });
    return post;
  } catch (error) {
    console.log(error);
    throw new Error("Can`t load post");
  }
}

export async function getTotal(amount: number = 6) {
  try {
    const total = await prisma.post.count();
    return Math.ceil(total / amount);
  } catch (error) {
    console.log(error);
    throw new Error("Can`t get total number of pages of posts!");
  }
}
