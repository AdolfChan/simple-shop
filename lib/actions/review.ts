"use server";

import { auth } from "@/app/api/auth/auth";
import prisma from "../prisma";

export async function getReviewsStats() {
  try {
    const [stats, recommend, totalCount] = await Promise.all([
      prisma?.review.aggregate({
        _avg: {
          rating: true,
        },
        _count: true,
      }),
      prisma?.review.count({
        where: {
          wouldRecommend: true,
        },
      }),
      prisma?.review.count(),
    ]);
    const recommendCount = recommend === undefined ? 0 : recommend;
    const recommendProcentile =
      stats?._count && stats?._count > 0
        ? Math.round((recommendCount / stats._count) * 100)
        : 0;

    return {
      count: stats?._count,
      avg: stats?._avg.rating ?? 0,
      wouldRecomend: recommendProcentile,
      totalPages:
        totalCount !== undefined ? Math.ceil(totalCount / totalCount) : 1,
    };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to load stats!");
  }
}

export async function getReviews(page: number = 1, amount: number = 6) {
  try {
    const [reviews, totalCount] = await Promise.all([
      prisma?.review.findMany({
        skip: (page - 1) * amount,
        take: amount,
        orderBy: {
          date: "desc",
        },
        select: {
          id: true,
          date: true,
          content: true,
          rating: true,
          user: {
            select: {
              name: true,
              image: true,
            },
          },
        },
      }),
      prisma?.review.count(),
    ]);
    return {
      reviews,
      totalCount,
      totalPages: totalCount !== undefined ? Math.ceil(totalCount / amount) : 1,
      currentPage: page,
    };
  } catch (error) {
    console.log(error);
    throw new Error("Cant get Reviews");
  }
}
export async function setReview(content: string, rating: number) {
  try {
    const session = await auth();
    if (!session?.user) {
      throw new Error("Unauthorized!");
    }
    const review = await prisma?.review.create({
      data: {
        content: content,
        rating: rating,
        userId: session.user.id!,
      },
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });
    return review;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to add review!");
  }
}

export async function getUser() {
  try {
    const session = await auth();
    if (!session?.user) {
      throw new Error("Unauthorized!");
    }
    return {
      name: session.user.name,
      image: session.user.image,
    };
  } catch (error) {
    console.log(error);
    throw new Error("Error! Can`t get user!");
  }
}
