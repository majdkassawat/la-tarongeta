import type { NextConfig } from "next";

// Static export served under https://yaqtin.net/la-tarongeta (same pattern as
// yaqtin-website's ai-readiness app). `npm run export:site` builds and copies
// the export into a yaqtin-website checkout.
const nextConfig: NextConfig = {
  output: "export",
  basePath: "/la-tarongeta",
  trailingSlash: false,
  images: { unoptimized: true },
};

export default nextConfig;
