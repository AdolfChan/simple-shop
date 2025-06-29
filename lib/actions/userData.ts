import { auth } from "@/app/api/auth/auth";
import prisma from "../prisma";

export async function getUserProfileData() {
  try {
    const session = await auth();
    if (!session) {
      console.log("Session error!");
      throw new Error("Session error!");
    }
    const res = await prisma.user.findFirst({
      where: {
        id: session.user?.id,
      },
      include: {
        comment: true,
      },
    });
    return {
      name: res?.name,
      email: res?.email,
      image: res?.image,
      comments: res?.comment,
      description: res?.description,
    };
  } catch (error) {
    console.log(error);
    throw new Error("Can`t take user data!");
  }
}
