import type { NextConfig } from "next";

// Static export: `npm run build` writes plain HTML/CSS/JS to `out/`,
// which is uploaded to shared hosting (public_html) — no Node server needed.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
