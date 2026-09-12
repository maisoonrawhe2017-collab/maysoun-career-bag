/**
 * Cross-platform GitHub Pages build script.
 *
 * Works on Windows (PowerShell + cmd), macOS, and Linux.
 * Reads the repo name from REPO_NAME env var (or falls back to
 * "maysoun-career-bag"), then runs `next build` with the correct
 * BASE_PATH / NEXT_PUBLIC_BASE_PATH environment variables.
 *
 * Usage:
 *   # Mac/Linux:
 *   REPO_NAME=my-repo npm run build:gh
 *
 *   # Windows PowerShell:
 *   $env:REPO_NAME="my-repo"; npm run build:gh
 *
 *   # Windows cmd:
 *   set REPO_NAME=my-repo && npm run build:gh
 *
 *   # Or if you don't set REPO_NAME, it defaults to "maysoun-career-bag":
 *   npm run build:gh
 */

import { execSync } from "node:child_process";
import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const projectRoot = resolve(__dirname, "..");

// Read repo name from env (works on all platforms)
const repoName = process.env.REPO_NAME || "maysoun-career-bag";
const basePath = `/${repoName}`;

console.log("");
console.log("──────────────────────────────────────────────────");
console.log("  Building MAYSOUN — The Career Bag");
console.log("  for GitHub Pages");
console.log("──────────────────────────────────────────────────");
console.log(`  Repo name : ${repoName}`);
console.log(`  Base path : ${basePath}`);
console.log(`  Live URL  : https://<your-username>.github.io${basePath}/`);
console.log("──────────────────────────────────────────────────");
console.log("");

// Inject env vars into this process, then run next build.
// The next.config.ts reads BASE_PATH from process.env.
process.env.NODE_ENV = "production";
process.env.BASE_PATH = basePath;
process.env.NEXT_PUBLIC_BASE_PATH = basePath;

// Run next build — inherits our env vars
execSync("next build", {
  stdio: "inherit",
  cwd: projectRoot,
  env: process.env,
});

// Add the .nojekyll file so GitHub Pages doesn't hide _next/ folders
const outDir = join(projectRoot, "out");
if (!existsSync(outDir)) {
  console.error("✗ Build output folder 'out/' was not created. The build may have failed.");
  process.exit(1);
}
const nojekyllPath = join(outDir, ".nojekyll");
writeFileSync(nojekyllPath, "", "utf8");
console.log(`✓ Created ${nojekyllPath}`);

console.log("");
console.log("──────────────────────────────────────────────────");
console.log("  ✓ BUILD COMPLETE");
console.log("──────────────────────────────────────────────────");
console.log("");
console.log("  Next steps:");
console.log("    1. Install gh-pages (one-time):  npm install -g gh-pages");
console.log("    2. Deploy to GitHub Pages:       gh-pages -d out");
console.log("    3. In GitHub repo: Settings → Pages → Source = gh-pages branch");
console.log("");
console.log(`  Your site will be live at: https://<your-username>.github.io${basePath}/`);
console.log("");
