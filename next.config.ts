import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      new URL("https://holy-bat-942abf6332.media.strapiapp.com/**"),
    ],
  },
};

export default nextConfig;
