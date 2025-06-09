// src/middleware.ts
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  const { pathname } = req.nextUrl;
  const protectedPaths = ["/profile"];

  const isProtectedPath = protectedPaths.some((path) =>
    pathname.startsWith(path)
  );
  if (isProtectedPath && !token) {
    console.log("Redirecting to login");
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/profile"],
};
