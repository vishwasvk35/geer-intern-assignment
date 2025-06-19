import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },{
        hostname: 'images.unsplash.com',
      }
    ],
  },
};

export default nextConfig;