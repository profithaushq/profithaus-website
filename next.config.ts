import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 92 is used for the hero photograph so it is not squashed a second time
    qualities: [75, 92],
  },
};

export default nextConfig;
