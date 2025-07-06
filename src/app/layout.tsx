import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";
import Header from "@/components/header/header";
// import { SessionProvider } from "next-auth/react";
// import { auth } from "./api/auth/auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Food Shop",
  description: "Restaurant to order food",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const session = await auth();

  return (
    <html lang="en" className="bg-[#f8f9fa]" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#f8f9fa]`}
      >
        {/* <SessionProvider session={session}> */}
        <Header />
        {children}
        <Footer />
        {/* </SessionProvider> */}
      </body>
    </html>
  );
}
