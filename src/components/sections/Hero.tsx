"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ChevronDown } from "lucide-react";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const subY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24"
    >
      {/* Eyebrow */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{ opacity }}
        className="flex items-center gap-3 mb-8"
      >
        <span className="h-px w-12 bg-gradient-to-r from-transparent to-amber" style={{ background: "linear-gradient(90deg, transparent, #E8A04A)" }} />
        <span className="font-mono-label text-[11px] tracking-[0.4em] text-amber uppercase">
          Career Bag · Est. 2024
        </span>
        <span className="h-px w-12 bg-gradient-to-l from-transparent to-amber" style={{ background: "linear-gradient(90deg, #E8A04A, transparent)" }} />
      </motion.div>

      {/* Main title */}
      <motion.div style={{ y: titleY, opacity, scale }} className="relative text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 60, filter: "blur(20px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.4, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="display-hero text-[clamp(3.5rem,14vw,12rem)] leading-[0.88]"
        >
          <span className="block text-gradient-amber">MAYSOUN</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="hairline mx-auto my-6 max-w-md"
        />

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="font-display italic text-[clamp(1.25rem,3vw,2rem)] text-foreground/85 max-w-3xl mx-auto leading-tight"
        >
          A multidisciplinary creative —<br className="hidden sm:block" />
          <span className="text-amber"> nine worlds </span>
          carried in one bag.
        </motion.p>
      </motion.div>

      {/* Subtitle / arabic */}
      <motion.div
        style={{ y: subY, opacity }}
        className="mt-10 flex flex-col items-center gap-4"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 2 }}
          className="font-arabic text-lg sm:text-xl text-muted-foreground"
          dir="rtl"
        >
          ميسون النمروطي · حقيبة مهنة إبداعية
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.4 }}
          className="flex flex-wrap items-center justify-center gap-2 max-w-2xl px-4"
        >
          {[
            "Illustration",
            "Beauty",
            "UX / UI",
            "Food",
            "Jewelry",
            "Typography",
            "Education",
            "Animation",
            "Games",
          ].map((t, i) => (
            <span
              key={t}
              className="px-3 py-1 rounded-full text-[10px] font-mono-label tracking-[0.2em] uppercase border border-white/10 text-muted-foreground/80 backdrop-blur-sm"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {t}
            </span>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 3 }}
      >
        <span className="font-mono-label text-[10px] tracking-[0.4em] text-muted-foreground uppercase">
          Scroll to enter
        </span>
        <div className="scroll-line" />
        <ChevronDown size={14} className="text-amber/60 animate-pulse" style={{ color: "rgba(232,160,74,0.6)" }} />
      </motion.div>

      {/* Corner markers — cinematic framing */}
      <div className="pointer-events-none absolute top-24 left-5 sm:left-8">
        <div className="flex items-center gap-2 font-mono-label text-[10px] tracking-[0.3em] text-muted-foreground/60 uppercase">
          <span className="w-2 h-2 rounded-full bg-amber animate-pulse-glow" />
          REC · LIVE
        </div>
      </div>
      <div className="pointer-events-none absolute top-24 right-5 sm:right-8 text-right">
        <div className="font-mono-label text-[10px] tracking-[0.3em] text-muted-foreground/60 uppercase">
          35.0°N · 36.0°E
        </div>
        <div className="font-mono-label text-[10px] tracking-[0.3em] text-muted-foreground/40 uppercase mt-1">
          Studio · Online
        </div>
      </div>
    </section>
  );
}
