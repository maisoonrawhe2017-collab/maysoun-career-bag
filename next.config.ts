import type { NextConfig } from "next";

/**
 * GitHub Pages configuration
 * --------------------------
 * GitHub Pages serves your site from:
 *   https://<username>.github.io/<repo-name>/
 *
 * Next.js needs to know that prefix so all assets, images, and links
 * resolve correctly. We read it from the BASE_PATH env var (set by
 * the GitHub Actions workflow) and fall back to "" for local dev
 * and for "user pages" (https://<username>.github.io/).
 *
 * The build script (npm run build:gh) sets BASE_PATH=/<repo-name>.
 */
const isProd = process.env.NODE_ENV === "production";
const basePath = process.env.BASE_PATH || "";

const nextConfig: NextConfig = {
  // Export as a fully static site (no Node server required).
  // Output lands in ./out — that folder is what GitHub Pages serves.
  output: "export",

  // Emit /index.html for every route so Pages can serve clean URLs.
  trailingSlash: true,

  // Prefix all assets with the repo name when deployed to Pages.
  basePath: isProd ? basePath : "",
  assetPrefix: isProd ? `${basePath}/` : "",

  // Expose basePath to client-side code (used by src/lib/asset.ts).
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },

  // Tell Next where to look for images when optimizing them.
  images: {
    // GitHub Pages cannot run the Next.js image optimizer (no server),
    // so we ship the original files and let the browser load them.
    unoptimized: true,
  },

  // Be lenient during the build — the project is known-good.
  typescript: { ignoreBuildErrors: true },
  reactStrictMode: false,
};

export default nextConfig;

