"use client";

import { motion } from "framer-motion";
import { projects } from "@/lib/projects";
import { ProjectShowcase } from "./ProjectShowcase";

export function ShardsShowcase() {
  // All projects except the book (which has its own dedicated section)
  const shards = projects.filter((p) => p.id !== "animal-alphabet");

  return (
    <section id="shards" className="section-cinematic relative max-w-[1480px] mx-auto px-5 sm:px-8">
      {/* Section header */}
      <div className="text-center mb-12 sm:mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center gap-3 mb-5"
        >
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-amber" style={{ background: "linear-gradient(90deg, transparent, #E8A04A)" }} />
          <span className="font-mono-label text-[10px] tracking-[0.4em] text-amber uppercase">
            Chapter 03 · The Shards
          </span>
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-amber" style={{ background: "linear-gradient(90deg, #E8A04A, transparent)" }} />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="display-section text-[clamp(2.5rem,7vw,6rem)] leading-[0.92]"
        >
          <span className="text-foreground">Eight worlds</span>
          <br />
          <span className="text-gradient-amber italic">in one bag.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto mt-6"
        >
          Each shard is a discipline — its own visual language, its own
          audience, its own world. Together they form Maisoun&apos;s creative universe.
        </motion.p>
      </div>

      {/* Shards index — quick nav */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex flex-wrap items-center justify-center gap-2 mb-20"
      >
        {shards.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-mono-label tracking-[0.2em] uppercase border border-white/10 text-muted-foreground hover:text-foreground hover:border-white/30 transition-all duration-500"
          >
            <span
              className="w-1.5 h-1.5 rounded-full transition-transform group-hover:scale-150"
              style={{ background: s.accent }}
            />
            <span className="opacity-50">{s.index}</span>
            {s.title}
          </a>
        ))}
      </motion.div>

      {/* Project showcases */}
      <div className="relative">
        {/* Vertical timeline line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-amber/20 to-transparent hidden lg:block" />

        {shards.map((p, i) => (
          <ProjectShowcase key={p.id} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
