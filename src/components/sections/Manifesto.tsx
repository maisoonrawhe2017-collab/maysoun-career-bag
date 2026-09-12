"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const manifestoLines = [
  "A bag is not a container.",
  "A bag is a constellation —",
  "every shard a discipline,",
  "every discipline a world.",
];

const stats = [
  { value: "09", label: "Creative Disciplines" },
  { value: "26", label: "Alphabet Creatures" },
  { value: "25+", label: "Course Modules" },
  { value: "5K+", label: "Students Reached" },
];

export function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.6], ["0%", "100%"]);

  return (
    <section
      ref={ref}
      id="manifesto"
      className="section-cinematic relative max-w-[1480px] mx-auto px-5 sm:px-8"
    >
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
        {/* Left: section index */}
        <div className="lg:col-span-3">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="sticky top-32"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono-label text-[10px] tracking-[0.4em] text-amber">
                CHAPTER 01
              </span>
              <span className="h-px flex-1 bg-gradient-to-r from-amber/40 to-transparent" style={{ background: "linear-gradient(90deg, rgba(232,160,74,0.4), transparent)" }} />
            </div>
            <h2 className="display-section text-[clamp(2rem,4vw,3.25rem)] text-foreground">
              The Bag
            </h2>
            <p className="font-arabic text-amber/80 text-lg mt-2" dir="rtl">
              الحقيبة
            </p>
            <p className="text-sm text-muted-foreground mt-6 max-w-xs leading-relaxed">
              Maysoun Namrote carries nine creative disciplines in a single
              bag. This is the manifesto of that bag — and the worlds inside it.
            </p>
          </motion.div>
        </div>

        {/* Right: manifesto text with reveal */}
        <div className="lg:col-span-9">
          <div className="relative">
            {/* Vertical progress line */}
            <div className="absolute left-0 top-2 bottom-2 w-px bg-white/10 overflow-hidden">
              <motion.div
                style={{ height: lineHeight }}
                className="w-px bg-gradient-to-b from-amber via-rose-gold to-violet-glow"
              />
            </div>

            <div className="pl-8 sm:pl-12">
              {manifestoLines.map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 1, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="display-section text-[clamp(1.75rem,4.5vw,3.5rem)] leading-tight text-foreground/90"
                >
                  {line}
                </motion.p>
              ))}

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8 text-lg text-muted-foreground max-w-2xl leading-relaxed"
              >
                Open the bag, and a children&apos;s book flies out alongside a
                smart mirror, a gold-chain infographic, a sausage alphabet, a
                beauty campaign, an avatar in mid-emotion, an entire digital
                academy, a butcher&apos;s editorial and a playable game. Each
                world is its own. Together they are Maysoun.
              </motion.p>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 1, delay: 0.4 }}
                className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/[0.06] border border-white/[0.06] rounded-2xl overflow-hidden"
              >
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="bg-[#0B0A12]/80 backdrop-blur-md p-5 sm:p-6 hover:bg-amber/[0.04] transition-colors"
                  >
                    <div className="font-display font-bold text-[clamp(2rem,3.5vw,3rem)] text-gradient-amber">
                      {s.value}
                    </div>
                    <div className="font-mono-label text-[10px] tracking-[0.18em] text-muted-foreground uppercase mt-1">
                      {s.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
