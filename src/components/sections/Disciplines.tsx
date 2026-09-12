"use client";

import { motion } from "framer-motion";
import { disciplines } from "@/lib/projects";

export function Disciplines() {
  return (
    <section id="disciplines" className="section-cinematic relative max-w-[1480px] mx-auto px-5 sm:px-8">
      {/* Header */}
      <div className="grid lg:grid-cols-12 gap-10 mb-12">
        <div className="lg:col-span-5">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono-label text-[10px] tracking-[0.4em] text-amber">
              CHAPTER 05 · CRAFT
            </span>
            <span className="h-px flex-1 bg-amber/30" style={{ background: "rgba(232,160,74,0.3)" }} />
          </div>
          <h2 className="display-section text-[clamp(2.25rem,5vw,4rem)] leading-[0.95]">
            The <span className="text-gradient-amber italic">craft</span>
            <br />
            behind the bag.
          </h2>
        </div>
        <div className="lg:col-span-7 lg:pt-8">
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl leading-relaxed">
            Nine disciplines, honed across years of practice. Each one earns
            its place in the bag through shipped work — books, products,
            courses, films. Below, an honest map of where the craft sits today.
          </p>
        </div>
      </div>

      {/* Disciplines list with animated bars */}
      <div className="space-y-3">
        {disciplines.map((d, i) => (
          <motion.div
            key={d.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="group grid grid-cols-12 items-center gap-4 py-4 border-b border-white/[0.06] hover:border-amber/30 transition-colors"
          >
            <div className="col-span-1 font-mono-label text-[10px] tracking-[0.3em] text-muted-foreground">
              {String(i + 1).padStart(2, "0")}
            </div>
            <div className="col-span-7 sm:col-span-5">
              <span className="font-display font-bold text-base sm:text-lg text-foreground group-hover:text-amber transition-colors">
                {d.label}
              </span>
            </div>
            <div className="col-span-3 sm:col-span-5">
              <div className="relative h-1 bg-white/[0.06] rounded-full overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{ background: "linear-gradient(90deg, #FFB866, #E8A04A, #B8742A)" }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${d.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.2 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </div>
            <div className="col-span-1 text-right font-mono-label text-xs text-amber font-bold">
              {d.level}%
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tagline footer */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.4 }}
        className="mt-16 text-center"
      >
        <p className="font-display italic text-2xl sm:text-3xl text-foreground/70 max-w-2xl mx-auto leading-snug">
          &ldquo;The bag stays open. The next shard is always in progress.&rdquo;
        </p>
      </motion.div>
    </section>
  );
}
