import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
    email: z.string().email("Введите корректный email"),
    password: z
      .string()
      .min(6, "Пароль должен содержать минимум 6 символов")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Пароль должен содержать минимум одну заглавную букву, одну строчную букву и одну цифру"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.string().email("Введите корректный email"),
  password: z.string().min(1, "Введите пароль"),
});

export const changeProfileSchema = z.object({
  email: z.string().email("Введите корректный email!"),
  name: z.string().min(4, "Введите корректное имя!"),
  description: z
    .string()
    .min(2, "Описание должно содержать больше двух символов!"),
  avatar: z.string(),
});

export const reviewSchema = z.object({
  content: z
    .string()
    .min(5, "Длина отзыва должна быть больше 20 символов")
    .max(100, "Длина отзыва должна быть меньше 50 символов"),
  rating: z
    .number()
    .min(1, "Не корректная оценка")
    .max(5, "Не корректная оценка"),
  wouldRecommend: z.boolean(),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
