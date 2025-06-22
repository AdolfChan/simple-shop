import { NextResponse } from "next/server";
import { auth } from "../auth/auth";
import { reviewSchema } from "../../../../lib/validations/zodparse";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await request.json();
  console.log(data);
  try {
    const parsedData = reviewSchema.safeParse(data);
    if (!parsedData.success) {
      console.log(parsedData.data);
      throw new Error("Data is not correct!");
    }
    const review = await prisma?.review.create({
      data: {
        content: parsedData.data?.content,
        rating: parsedData.data.rating,
        wouldRecommend: parsedData.data.wouldRecommend,
        userId: session.user.id!,
      },
    });
    return NextResponse.json({ success: true, review });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to add review" },
      { status: 500 }
    );
  }
}
