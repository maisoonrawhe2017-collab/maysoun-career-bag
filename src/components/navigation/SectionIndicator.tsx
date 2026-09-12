"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const sectionLabels: Record<string, string> = {
  hero: "ORIGIN",
  manifesto: "THE BAG",
  book: "ALPHABET",
  shards: "SHARDS",
  academy: "ACADEMY",
  disciplines: "CRAFT",
  contact: "CONTACT",
};

/**
 * SectionIndicator
 * A vertical floating label on the right side that shows the current section.
 * Only visible on large screens.
 */
export function SectionIndicator() {
  const [active, setActive] = useState("hero");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Mount flag set via microtask to avoid SSR/CSR mismatch
    const id = window.setTimeout(() => setMounted(true), 0);
    const observers: IntersectionObserver[] = [];
    Object.keys(sectionLabels).forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) setActive(id);
          });
        },
        { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => {
      window.clearTimeout(id);
      observers.forEach((o) => o.disconnect());
    };
  }, []);

  return (
    <AnimatePresence>
      {mounted && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center gap-3 pointer-events-none"
          aria-hidden
        >
          <div className="font-mono-label text-[9px] tracking-[0.4em] text-muted-foreground/60 uppercase rotate-180" style={{ writingMode: "vertical-rl" }}>
            Now Showing
          </div>
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-amber/40 to-transparent" style={{ background: "linear-gradient(180deg, transparent, rgba(232,160,74,0.4), transparent)" }} />
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="font-mono-label text-[10px] tracking-[0.4em] text-amber uppercase font-bold"
              style={{ writingMode: "vertical-rl", color: "#E8A04A" }}
            >
              {sectionLabels[active] || ""}
            </motion.div>
          </AnimatePresence>
          <div className="w-px h-12 bg-gradient-to-b from-amber/40 via-amber/40 to-transparent" style={{ background: "linear-gradient(180deg, rgba(232,160,74,0.4), transparent)" }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
