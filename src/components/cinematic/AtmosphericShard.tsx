"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type Props = {
  accent: string;       // hex
  glyph?: string;       // single big char
  label?: string;       // section eyebrow
  align?: "left" | "right";
};

/**
 * AtmosphericShard
 * Renders a soft ambient color wash that anchors each project section.
 * Used as a background decoration layer behind project showcases.
 */
export function AtmosphericShard({ accent, glyph, label, align = "right" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const glowY = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [0, 0.7, 0.7, 0]);

  return (
    <div
      ref={ref}
      className={`pointer-events-none absolute inset-0 overflow-hidden ${align === "right" ? "" : ""}`}
      aria-hidden
    >
      {/* Big color glow */}
      <motion.div
        style={{
          y: glowY,
          opacity: glowOpacity,
          background: `radial-gradient(circle 500px at ${align === "right" ? "85%" : "15%"} 50%, ${accent}22, transparent 70%)`,
        }}
        className="absolute inset-0"
      />
      {/* Tiny accent line top */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-50"
        style={{ background: `linear-gradient(90deg, transparent, ${accent}55, transparent)` }}
      />
      {/* Big watermark glyph */}
      {glyph && (
        <div
          className={`absolute ${align === "right" ? "right-0" : "left-0"} top-1/2 -translate-y-1/2 font-display font-black text-[24rem] leading-none select-none opacity-[0.04]`}
          style={{ color: accent }}
        >
          {glyph}
        </div>
      )}
      {/* Label tag */}
      {label && (
        <div
          className={`absolute top-6 ${align === "right" ? "right-6" : "left-6"} font-mono-label text-[9px] tracking-[0.4em] uppercase opacity-30`}
          style={{ color: accent }}
        >
          {label}
        </div>
      )}
    </div>
  );
}
