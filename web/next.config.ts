import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Превью роликов отдаёт YouTube
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com" }],
  },
  /* config options here */
};

export default nextConfig;
