import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000", "https://simple-shop-ten.vercel.app/"],
    },
  },
  webpack: (config) => {
    config.externals = [...(config.externals || []), { prisma: "prisma" }];
    return config;
  },
};

export default nextConfig;
