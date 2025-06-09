"use server";
import { registerSchema } from "../validations/zodparse";
import prisma from "../prisma";
import bcrypt from "bcryptjs";

export type State = {
  message: string | null;
  errors: {
    name?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
  };
  email: string;
  password: string;
};

export async function register(prevState: State, formData: FormData) {
  const rawFormData = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };

  const validatedData = registerSchema.safeParse(rawFormData);

  if (!validatedData.success) {
    return {
      errors: validatedData.error.flatten().fieldErrors,
      message: "Пожалуйста, исправьте ошибки в форме.",
      email: "",
      password: "",
    };
  }

  try {
    const user = await prisma.user.create({
      data: {
        email: validatedData.data.email,
        name: validatedData.data.name,
        password: await bcrypt.hash(validatedData.data.password, 12),
      },
    });

    console.log("User created:", user);

    return {
      errors: {},
      message: "Регистрация успешна!",
      email: String(user.email),
      password: String(rawFormData.password),
    };
  } catch (error) {
    console.log(error);
    return {
      errors: {},
      message: "Произошла ошибка при регистрации.",
      email: "",
      password: "",
    };
  }
}
