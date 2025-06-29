// src/middleware.ts
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    raw: true,
    cookieName: "next-auth.session-token",
    secureCookie: process.env.NODE_ENV === "production",
  });
  console.log("TOKEN MIDDLEWARE", token);
  const { pathname } = req.nextUrl;
  const protectedPaths = ["/profile"];
  console.log("HEADERS", Object.fromEntries(req.headers.entries()));
  const isProtectedPath = protectedPaths.some((path) =>
    pathname.startsWith(path)
  );

  if (isProtectedPath && !token) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/profile"],
};
