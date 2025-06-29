import { NextResponse } from "next/server";
import { auth } from "../auth/auth";
import { changeProfileSchema } from "../../../../lib/validations/zodparse";
import prisma from "../../../../lib/prisma";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await request.json();
  try {
    const parsed = changeProfileSchema.safeParse(data);

    if (!parsed.success) throw new Error("Неккоректные данные!");

    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        description: parsed.data.description,
        image: parsed.data.avatar,
      },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to add review" },
      { status: 500 }
    );
  }
}
