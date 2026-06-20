import type { NextConfig } from "next";

const nextConfig: any = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: '500mb',
    },
  },
  images: {
    unoptimized: process.env.NODE_ENV === 'development',
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "ui-avatars.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
