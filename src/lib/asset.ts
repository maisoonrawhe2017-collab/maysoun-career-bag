/**
 * Asset path helper for GitHub Pages deployment.
 *
 * Use `asset("/projects/book/cover.png")` instead of writing the
 * raw path. It automatically prefixes the basePath so links work
 * both on localhost (`/projects/...`) and on GitHub Pages
 * (`/<repo-name>/projects/...`).
 *
 * The basePath is set at build time in next.config.ts and exposed
 * to the client via `process.env.NEXT_PUBLIC_BASE_PATH`.
 */
export const BASE_PATH =
  process.env.NEXT_PUBLIC_BASE_PATH || "";

export function asset(path: string): string {
  if (!path) return path;
  // Already absolute URL (https://...) — leave alone
  if (/^https?:\/\//i.test(path) || path.startsWith("//")) return path;
  // Already prefixed
  if (BASE_PATH && path.startsWith(BASE_PATH)) return path;
  // Ensure leading slash
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_PATH}${clean}`;
}
