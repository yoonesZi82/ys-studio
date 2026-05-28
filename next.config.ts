import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Next.js 16 file tracing can drop Prisma's .so.node engine on Vercel (→ 503 from API routes).
  outputFileTracingIncludes: {
    "/api/**/*": ["./app/generated/prisma/**/*"],
    "/*": ["./app/generated/prisma/**/*"],
  },
  serverExternalPackages: ["@prisma/client", "prisma"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fakestoreapi.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
