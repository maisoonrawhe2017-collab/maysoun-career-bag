"use client";

import { motion } from "framer-motion";

const footerLinks = [
  { label: "Origin", href: "#hero" },
  { label: "The Bag", href: "#manifesto" },
  { label: "Alphabet", href: "#book" },
  { label: "Shards", href: "#shards" },
  { label: "Academy", href: "#academy" },
  { label: "Craft", href: "#disciplines" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-white/[0.06] bg-[#08080C]/80 backdrop-blur-xl">
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #E8A04A 50%, transparent)" }}
      />

      <div className="max-w-[1480px] mx-auto px-5 sm:px-8 py-16">
        {/* Massive MAYSOUN type */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <h2 className="display-hero text-[clamp(4rem,16vw,14rem)] leading-[0.85] text-outline">
            MAYSOUN
          </h2>
          <p className="font-display italic text-lg sm:text-xl text-muted-foreground -mt-2">
            The Career Bag · 2024 — {new Date().getFullYear()}
          </p>
          <p className="font-arabic text-amber/80 text-base mt-2" dir="rtl">
            ميسون النمروطي · حقيبة مهنة إبداعية
          </p>
        </motion.div>

        {/* Footer grid */}
        <div className="grid sm:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="font-mono-label text-[10px] tracking-[0.3em] text-amber uppercase mb-3">
              The Studio
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              A multidisciplinary creative carrying nine worlds in one
              bag — children&apos;s books, beauty, smart tech, food, jewelry,
              typography, education, animation and games.
            </p>
          </div>

          {/* Sitemap */}
          <div>
            <div className="font-mono-label text-[10px] tracking-[0.3em] text-amber uppercase mb-3">
              Sitemap
            </div>
            <ul className="space-y-2">
              {footerLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-muted-foreground hover:text-amber transition-colors link-underline"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Colophon */}
          <div>
            <div className="font-mono-label text-[10px] tracking-[0.3em] text-amber uppercase mb-3">
              Colophon
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Next.js 16 · React 19 · TypeScript</li>
              <li>Three.js · React Three Fiber · GLSL</li>
              <li>Framer Motion · Tailwind CSS 4</li>
              <li>Playfair Display · Inter · Noto Kufi</li>
              <li className="pt-2 text-xs opacity-60">
                Designed and built as a cinematic experience.
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono-label text-[10px] tracking-[0.3em] text-muted-foreground/60 uppercase">
            © {new Date().getFullYear()} Maisoon Namrote · All Worlds Reserved
          </p>
          <div className="flex items-center gap-4">
            <span className="font-mono-label text-[10px] tracking-[0.3em] text-muted-foreground/60 uppercase">
              Crafted with intention
            </span>
            <span className="w-2 h-2 rounded-full bg-amber animate-pulse-glow" style={{ background: "#E8A04A" }} />
          </div>
        </div>
      </div>
    </footer>
  );
}
