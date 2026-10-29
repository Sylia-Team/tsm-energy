import path from "node:path";
import type { NextConfig } from "next";
import { getSecurityHeaders } from "./lib/security/headers";

const nextConfig: NextConfig = {
  // Sortie autonome réservée à l'image Docker (le Dockerfile définit
  // NEXT_OUTPUT) : elle fait échouer le build sur Vercel.
  output: process.env.NEXT_OUTPUT === "standalone" ? "standalone" : undefined,
  reactStrictMode: true,
  poweredByHeader: false,
  turbopack: {
    root: path.join(__dirname),
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "12mb",
    },
  },
  images: {
    formats: ["image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 7,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: getSecurityHeaders(process.env.NODE_ENV !== "production"),
      },
    ];
  },
};

export default nextConfig;
