"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useActionState } from "react";
import { register, State } from "../../../lib/actions/register";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { signIn } from "next-auth/react";

export default function Register() {
  const router = useRouter();
  const initialState: State = {
    message: "",
    errors: {},
    email: "",
    password: "",
  };
  const [state, formaction] = useActionState(register, initialState);

  useEffect(() => {
    if (state.message === "Регистрация успешна!") {
      async function sign() {
        const response = await signIn("credentials", {
          email: state.email,
          password: state.password,
          redirect: false,
          callbackUrl: "/",
        });
        if (response?.error) {
          console.log("Ошибка входа:", response.error);
        } else {
          // Редирект только после успешного входа
          router.push("/");
          // Принудительно обновляем страницу, чтобы обновить состояние аутентификации
          //router.refresh();
        }
      }
      sign();
    }
  }, [state, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa] py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg"
      >
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link
              href="/login"
              className="font-medium text-[#6489da] hover:text-[#4f6db3]"
            >
              sign in to your account
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" action={formaction}>
          <div className="rounded-md  space-y-4">
            <div>
              <label htmlFor="name" className="sr-only">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#6489da] focus:border-[#6489da] focus:z-10 sm:text-sm"
                placeholder="Full Name"
              />
            </div>
            {state.errors.name && (
              <div className="text-amber-800">Введите корректное имя!</div>
            )}
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#6489da] focus:border-[#6489da] focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            {state.errors.email && (
              <div className="text-amber-800">Неправильный адрес почты!</div>
            )}
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#6489da] focus:border-[#6489da] focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
            {state.errors.password && (
              <div className="text-amber-800">Неккоректный пароль!</div>
            )}
            <div>
              <label htmlFor="confirmPassword" className="sr-only">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#6489da] focus:border-[#6489da] focus:z-10 sm:text-sm"
                placeholder="Confirm Password"
              />
            </div>
            {state.errors.password && (
              <div className="text-amber-800">Пароли не совпадают!</div>
            )}
          </div>
          <div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-[#6489da] hover:bg-[#4f6db3] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6489da]"
            >
              Sign up
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
