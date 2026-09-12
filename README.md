# MAYSOUN — The Career Bag

A cinematic, immersive, 3D-driven portfolio for **Maisoon Namrote** (ميسون النمروطي) — a multidisciplinary creative carrying nine worlds in one bag: children's books, beauty, smart tech, food design, jewelry craft, typography, digital education, avatar animation, and game development.

Built with **Next.js 16**, **React 19**, **TypeScript**, **Three.js / React Three Fiber**, **Framer Motion**, and **Tailwind CSS 4**.

---

## Table of Contents

1. [Quick Start (Local)](#quick-start-local)
2. [Deploy to GitHub Pages](#deploy-to-github-pages)
3. [How It Works](#how-it-works)
4. [Project Structure](#project-structure)
5. [Available Scripts](#available-scripts)
6. [Customization](#customization)
7. [Troubleshooting](#troubleshooting)

---

## Quick Start (Local)

> Requirements: **Node.js 20+** and either **npm** or **bun**.

```bash
# 1. Install dependencies
npm install
# or: bun install

# 2. Start the dev server
npm run dev
# or: bun run dev

# 3. Open the site
# Visit http://localhost:3000
```

The dev server runs on port 3000. Hot reload is on — edit any file and see the change instantly.

---

## Deploy to GitHub Pages

This project is pre-configured for GitHub Pages. You have **two options**:

### Option A — Automatic (Recommended)

The repo includes a GitHub Actions workflow that builds and deploys the site automatically on every push to `main`.

**Steps:**

1. **Create a new repository on GitHub.**
   Name it whatever you like, e.g. `maysoun-career-bag`. The repo name becomes part of the URL: `https://<your-username>.github.io/maysoun-career-bag/`.

2. **Push this folder to the repo:**
   ```bash
   cd maysoun-career-bag
   git init
   git add .
   git commit -m "Initial commit — Maysoun Career Bag"
   git branch -M main
   git remote add origin https://github.com/<your-username>/maysoun-career-bag.git
   git push -u origin main
   ```

3. **Enable GitHub Pages with Actions:**
   - Go to your repo on GitHub → **Settings** → **Pages**.
   - Under **"Build and deployment"** → **Source**, select **"GitHub Actions"**.

4. **Wait for the workflow to finish.**
   - Click the **Actions** tab in your repo to watch the build.
   - When it's done, your site is live at:
     ```
     https://<your-username>.github.io/maysoun-career-bag/
     ```

That's it. Every future push to `main` redeploys automatically.

### Option B — Manual (Build Locally, Push the `out/` Folder)

Use this if you don't want to use Actions, or if Actions is disabled.

1. **Build the static site with the correct base path:**
   ```bash
   # Replace "maysoun-career-bag" with your actual repo name
   REPO_NAME=maysoun-career-bag npm run build:gh
   ```
   This creates an `out/` folder with all the static files, prefixed with `/<repo-name>/`.

2. **Add a `.nojekyll` file** (so GitHub doesn't hide `_next/` folders):
   ```bash
   touch out/.nojekyll
   ```

3. **Publish the `out/` folder to Pages** using the official Pages action, OR push it to a `gh-pages` branch:
   ```bash
   # Using the `gh-pages` npm package (install it first: npm i -g gh-pages)
   gh-pages -d out
   ```

4. In your repo: **Settings → Pages → Source = "Deploy from a branch"**, branch = `gh-pages`, folder = `/ (root)`.

### Special Case — User / Organization Pages

If you rename the repo to `<your-username>.github.io` (so the site is served from the root, with no `/repo-name/` prefix), use this build command instead:

```bash
npm run build:gh-user
```

This builds with no base path. Then push the `out/` contents to the `main` branch of your `<username>.github.io` repo.

---

## How It Works

### Static Export

The site is configured with `output: "export"` in [`next.config.ts`](./next.config.ts). When you run `npm run build`, Next.js produces a fully static set of HTML, CSS, JS, and asset files in the `out/` folder. No Node server is required to host it — any static host (GitHub Pages, Netlify, Vercel, Cloudflare Pages) works.

### Base Path Handling

GitHub Pages serves project repos from `https://<username>.github.io/<repo-name>/`. All asset URLs must be prefixed with `/<repo-name>/` or they'll 404.

This is handled automatically:

- `next.config.ts` reads `BASE_PATH` from env and sets Next's `basePath` + `assetPrefix`.
- A small helper, [`src/lib/asset.ts`](./src/lib/asset.ts), exposes an `asset()` function.
- All image/video paths in the project data go through `asset()`.
- The GitHub Actions workflow injects `BASE_PATH=/<repo-name>` automatically.

For local dev, `BASE_PATH` is empty and everything works at `http://localhost:3000/`.

### The 3D Background

The cinematic atmosphere is rendered with CSS gradients, animated shard layers, film grain, vignette, and a scroll-driven color wash — all compositor-thread, low-memory, and 60fps. A Three.js scene (HeroCrystal + ShardField + DustField + post-processing) is included in `src/components/scene/` and can be re-enabled for high-end devices if desired (see `AtmosphericBackground.tsx`).

---

## Project Structure

```
maysoun-career-bag/
├── .github/
│   └── workflows/
│       └── deploy.yml           ← GitHub Actions: build + deploy to Pages
├── public/
│   ├── logo.svg
│   ├── robots.txt
│   └── projects/                ← All images & videos for the 9 shards
│       ├── academy/
│       ├── avatar/
│       ├── beauty/
│       ├── book/                ← 26 letter PNGs + covers
│       ├── food/
│       ├── game/                ← Monster Hunter screenshots
│       ├── jewelry/
│       ├── mirror/
│       └── typography/
├── src/
│   ├── app/
│   │   ├── globals.css          ← Cinematic design system
│   │   ├── layout.tsx           ← Fonts, metadata, Toaster
│   │   └── page.tsx             ← The single-page composition
│   ├── components/
│   │   ├── cinematic/           ← IntroOverlay, SectionDivider, AtmosphericShard
│   │   ├── navigation/          ← Navbar, SectionIndicator
│   │   ├── scene/               ← AtmosphericBackground, SceneElements (3D)
│   │   ├── sections/            ← Hero, Manifesto, BookExperience, ShardsShowcase,
│   │   │                          AcademyExperience, Disciplines, Contact, Footer
│   │   │                          ProjectShowcase (per-shard renderer)
│   │   └── ui/                  ← shadcn/ui component set
│   ├── hooks/
│   │   ├── use-mobile.ts
│   │   └── use-toast.ts
│   └── lib/
│       ├── asset.ts             ← basePath-aware asset() helper
│       ├── projects.ts          ← All 9 shards + alphabet data
│       └── utils.ts             ← cn() class merge
├── .gitignore
├── components.json              ← shadcn/ui config
├── eslint.config.mjs
├── next.config.ts               ← Static export + basePath
├── package.json
├── postcss.config.mjs
├── README.md                    ← This file
├── tailwind.config.ts
└── tsconfig.json
```

---

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start the dev server at `http://localhost:3000` |
| `npm run lint` | Run ESLint |
| `npm run build` | Build static site to `out/` (no basePath — for user pages) |
| `npm run build:gh` | Build with `BASE_PATH=/$REPO_NAME` — for project pages |
| `npm run build:gh-user` | Build with no basePath — for `<user>.github.io` repos |
| `npm run serve:out` | Serve the built `out/` folder locally for testing |

### Testing the production build locally

After running `npm run build` (or `build:gh`), serve the `out/` folder to verify it works exactly like it will on GitHub Pages:

```bash
npm run serve:out
# Visit http://localhost:3000
```

---

## Customization

### Change the Repo Name

If you rename the GitHub repo, the base path changes automatically — the Actions workflow reads `github.event.repository.name` and injects it as `BASE_PATH`. No code changes needed.

### Add or Edit Projects

All 9 shards are defined in [`src/lib/projects.ts`](./src/lib/projects.ts). Each entry has: `id`, `title`, `titleAr` (Arabic), `tagline`, `category`, `year`, `accent` color, `glyph`, `description`, `details[]`, `media[]`, and optional `cta`.

Drop new images/videos into `public/projects/<shard>/` and reference them with `asset("/projects/<shard>/<file>")`.

### Change Colors / Typography

The design system lives in [`src/app/globals.css`](./src/app/globals.css). Key tokens:
- `--amber`, `--amber-bright`, `--amber-deep` — primary accent
- `--rose-gold`, `--cyber-green`, `--crimson`, `--violet-glow` — per-discipline accents
- `--ink` — deep background black

Fonts are loaded in [`src/app/layout.tsx`](./src/app/layout.tsx) via `next/font/google`: Playfair Display (display), Inter (body), JetBrains Mono (labels), Noto Kufi Arabic (Arabic).

### Re-enable the WebGL 3D Canvas

The 3D crystal + shard field are currently delivered via lightweight CSS to keep memory low. To re-enable the full Three.js scene, edit [`src/components/scene/AtmosphericBackground.tsx`](./src/components/scene/AtmosphericBackground.tsx) and uncomment the `<Canvas>` block. All the 3D components (`HeroCrystal`, `ShardField`, `DustField`, `CameraRig`, `CinematicLights`) are still in `SceneElements.tsx`, ready to go.

---

## Troubleshooting

### Images 404 on GitHub Pages but work locally

You're missing the `BASE_PATH`. Either:
- Use the GitHub Actions workflow (it sets it automatically), or
- Build with `REPO_NAME=<your-repo> npm run build:gh` for manual deploys.

### `_next/` folder is hidden on Pages

GitHub Pages uses Jekyll by default, which hides folders starting with `_`. The fix is a `.nojekyll` file in the output. The Actions workflow adds it automatically; for manual builds, run `touch out/.nojekyll` before pushing.

### The site loads but styling is broken

Make sure you built with `npm run build:gh` (not just `npm run build`) when deploying to a project repo. `build` doesn't add the `/<repo-name>/` prefix.

### "Toaster is not defined" error

This means the old shadcn `<Toaster />` is being imported in `layout.tsx` instead of `<SonnerToaster />`. The repo is already fixed — but if you regenerate components with shadcn CLI, double-check `layout.tsx` still imports `Toaster as SonnerToaster` from `@/components/ui/sonner`.

### Hydration mismatch warnings

These come from components that read `window.matchMedia` during render. The repo's `useReducedMotion` / `useIsMobile` / `SectionIndicator` hooks all defer to `useEffect` to avoid this. If you add new client-only logic, follow the same pattern.

### Want to deploy somewhere other than GitHub Pages?

The `out/` folder is plain static HTML — drop it on **Netlify**, **Vercel**, **Cloudflare Pages**, **S3**, or any static host. For non-Pages hosts, use `npm run build` (no `BASE_PATH`) since they serve from the root.

---

## Credits

- **Author & Creative Direction:** Maisoon Namrote (ميسون النمروطي)
- **Design & Development:** Built as a cinematic atelier experience
- **Tech:** Next.js 16, React 19, Three.js / R3F, Framer Motion, Tailwind CSS 4, shadcn/ui
- **Fonts:** Playfair Display, Inter, JetBrains Mono, Noto Kufi Arabic

© Maisoon Namrote · All Worlds Reserved.
