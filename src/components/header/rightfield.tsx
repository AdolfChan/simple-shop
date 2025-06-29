"use server";
import { auth } from "@/app/api/auth/auth";
import Link from "next/link";
import { Suspense } from "react";
import { ProfileHeader } from "../profile/profileheader";

export async function Right() {
  const session = await auth();
  return (
    <div className="flex items-center gap-4">
      {!session?.user && (
        <div>
          <div className="sm:flex sm:gap-4">
            <Link
              className="block rounded-md bg-[#6489da] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#4f6db3]"
              href="/login"
            >
              Login
            </Link>

            <Link
              className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-[#6489da] transition hover:text-[#4f6db3] sm:block"
              href="/register"
            >
              Register
            </Link>
          </div>

          <button className="block rounded-sm bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden">
            <span className="sr-only">Toggle menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      )}
      {session?.user && (
        <Suspense>
          <ProfileHeader image={session.user.image} />
        </Suspense>
      )}
    </div>
  );
}
