import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["www.bop.com.pk", "upload.wikimedia.org"], // Add the domain here
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
