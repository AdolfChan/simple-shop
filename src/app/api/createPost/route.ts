import { NextResponse } from "next/server";
import { auth } from "../auth/auth";
import prisma from "../../../../lib/prisma";

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const data = await request.json();
    await prisma.post.create({
      data: {
        content: data.content,
        headline: data.headline,
        tags: data.tags,
        image: data.image,
      },
    });
    console.log(data);
    return NextResponse.json(
      { message: "Post Created succesfully" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
