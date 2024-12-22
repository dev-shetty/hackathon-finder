import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.cloudfront.net",
      },
    ],
  },
  transpilePackages: ["posthog-js"],
  /* config options here */
}

export default nextConfig
