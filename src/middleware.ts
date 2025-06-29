// src/middleware.ts
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  // Отладочная информация
  console.log("=== MIDDLEWARE DEBUG ===");
  console.log("URL:", req.url);
  console.log("Pathname:", req.nextUrl.pathname);
  console.log("Protocol:", req.nextUrl.protocol);
  console.log("AUTH_SECRET exists:", !!process.env.AUTH_SECRET);
  console.log("NEXTAUTH_URL:", process.env.NEXTAUTH_URL);

  // Проверяем все cookies
  const allCookies = req.cookies.getAll();
  console.log(
    "All cookies:",
    allCookies.map((c) => c.name)
  );

  try {
    const token = await getToken({
      req,
      secret: process.env.AUTH_SECRET,
      secureCookie: process.env.NEXTAUTH_URL?.startsWith("https:") ?? false,
    });

    console.log("Token exists:", !!token);
    console.log(
      "Token data:",
      token
        ? { id: token.id, email: token.email, name: token.name }
        : "No token"
    );

    const { pathname } = req.nextUrl;
    const protectedPaths = ["/profile"];

    const isProtectedPath = protectedPaths.some((path) =>
      pathname.startsWith(path)
    );

    console.log("Is protected path:", isProtectedPath);

    if (isProtectedPath && !token) {
      console.log("❌ REDIRECTING TO LOGIN - No token found");
      const loginUrl = new URL("/login", req.url);
      return NextResponse.redirect(loginUrl);
    }

    console.log("✅ ALLOWING REQUEST");
    return NextResponse.next();
  } catch (error) {
    console.error("❌ MIDDLEWARE ERROR:", error);
    // В случае ошибки, перенаправляем на логин
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: ["/profile/:path*", "/profile"],
};
