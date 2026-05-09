import type { NextConfig } from "next";

const repoName = "cloud-play-plus";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: "export",
  basePath: `/${repoName}`,
  assetPrefix: `/${repoName}`,
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
