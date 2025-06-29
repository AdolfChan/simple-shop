import { NextResponse } from "next/server";
import { auth } from "../auth/auth";
import { changeProfileSchema } from "../../../../lib/validations/zodparse";
import prisma from "../../../../lib/prisma";

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();
    console.log("Received data:", data);

    const parsed = changeProfileSchema.safeParse(data);

    if (!parsed.success) {
      console.log("Validation error:", parsed.error);
      return NextResponse.json(
        { error: "Invalid data", details: parsed.error.errors },
        { status: 400 }
      );
    }

    const updateData: {
      name: string;
      email: string;
      description?: string;
      image?: string;
    } = {
      name: parsed.data.name,
      email: parsed.data.email,
    };

    // Only include description if it's not null/undefined
    if (
      parsed.data.description !== null &&
      parsed.data.description !== undefined
    ) {
      updateData.description = parsed.data.description;
    }

    // Only include image if it's not null/undefined
    if (parsed.data.avatar !== null && parsed.data.avatar !== undefined) {
      updateData.image = parsed.data.avatar;
    }

    console.log("Updating user with data:", updateData);

    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: updateData,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      {
        error: "Failed to change user",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
