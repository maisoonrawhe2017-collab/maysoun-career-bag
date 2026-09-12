"use client";

import { motion } from "framer-motion";

/**
 * SectionDivider
 * A cinematic transition element between major sections.
 */
type Props = {
  glyph?: string;
  label?: string;
};

export function SectionDivider({ glyph = "✦", label }: Props) {
  return (
    <div className="relative flex items-center justify-center py-12" aria-hidden>
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center gap-4"
      >
        <span className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent to-amber/50" style={{ background: "linear-gradient(90deg, transparent, rgba(232,160,74,0.5))" }} />
        <span className="font-display text-amber text-lg" style={{ color: "#E8A04A" }}>
          {glyph}
        </span>
        {label && (
          <span className="font-mono-label text-[9px] tracking-[0.4em] text-amber/70 uppercase" style={{ color: "rgba(232,160,74,0.7)" }}>
            {label}
          </span>
        )}
        <span className="h-px w-16 sm:w-24 bg-gradient-to-l from-transparent to-amber/50" style={{ background: "linear-gradient(90deg, rgba(232,160,74,0.5), transparent)" }} />
      </motion.div>
    </div>
  );
}
