"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { login, State } from "../../../lib/actions/login";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Register() {
  const initialState: State = { message: "", errors: {} };
  const [error, setError] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(false);

    const formData = new FormData(e.currentTarget);
    const result = await login(initialState, formData);

    if (
      !result.errors?.email &&
      !result.errors?.password &&
      result.email &&
      result.password
    ) {
      const response = await signIn("credentials", {
        email: result.email,
        password: result.password,
        redirect: false,
        callbackUrl: "/",
      });
      if (!response.error) {
        window.location.replace(response.url ?? "/");
      } else {
        setError(true);
      }
    } else {
      setError(true);
    }
  }

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
            Sign in your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link
              href="/register"
              className="font-medium text-[#6489da] hover:text-[#4f6db3]"
            >
              create your account
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
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
          {error && (
            <div className="text-red-500">Неправильный email или пароль!</div>
          )}
          <div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-[#6489da] hover:bg-[#4f6db3] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6489da]"
            >
              Login
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
