"use server";
import { loginSchema } from "../validations/zodparse";

export type State = {
  message: string | null;
  errors: {
    email?: string[];
    password?: string[];
  };
  email?: string;
  password?: string;
};

export async function login(prevState: State, formdata: FormData) {
  const rawData = {
    email: formdata.get("email"),
    password: formdata.get("password"),
  };

  const validatedData = loginSchema.safeParse(rawData);
  if (!validatedData.success) {
    return {
      message: "Пожалуйста, исправьте ошибки в форме.",
      errors: validatedData.error.flatten().fieldErrors,
      email: "",
      password: "",
    };
  }
  return {
    message: "",
    errors: {},
    email: validatedData.data.email,
    password: validatedData.data.password,
  };
}
