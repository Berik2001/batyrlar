import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Значок dev-режима мешает снимать скриншоты интерфейса
  devIndicators: false,
  images: {
    // Превью роликов отдаёт YouTube
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com" }],
  },
  /* config options here */
};

export default nextConfig;
