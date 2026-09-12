"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { bookLetters } from "@/lib/projects";
import { asset } from "@/lib/asset";
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react";

export function BookExperience() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const coverRotate = useTransform(scrollYProgress, [0, 1], [-8, 6]);

  // Auto-advance every 4.5s when in view
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
          if (interval) clearInterval(interval);
          interval = setInterval(() => {
            setActive((p) => (p + 1) % bookLetters.length);
          }, 4500);
        } else {
          if (interval) {
            clearInterval(interval);
            interval = null;
          }
        }
      },
      { threshold: [0, 0.3, 0.6] }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => {
      obs.disconnect();
      if (interval) clearInterval(interval);
    };
  }, []);

  const go = (dir: number) => {
    setActive((p) => (p + dir + bookLetters.length) % bookLetters.length);
  };

  const current = bookLetters[active];

  return (
    <section
      ref={sectionRef}
      id="book"
      className="section-cinematic relative max-w-[1480px] mx-auto px-5 sm:px-8"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono-label text-[10px] tracking-[0.4em] text-amber">
              CHAPTER 02 · SHARD
            </span>
            <span className="h-px w-16 bg-amber/40" style={{ background: "rgba(232,160,74,0.4)" }} />
          </div>
          <h2 className="display-section text-[clamp(2.5rem,6vw,5rem)] leading-[0.95]">
            <span className="text-gradient-amber">Animal</span>
            <br />
            <span className="text-foreground">Alphabet</span>
          </h2>
          <p className="font-arabic text-rose-gold/80 text-xl mt-3" dir="rtl">
            حروف الحيوانات
          </p>
        </div>
        <div className="max-w-md">
          <p className="text-sm text-muted-foreground leading-relaxed">
            A 26-letter journey through a 3D-rendered animal kingdom. Each
            letter becomes a friendly creature — written and illustrated by
            Maisoon Namrote.
          </p>
          <div className="mt-4 flex items-center gap-4">
            <span className="font-mono-label text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
              Children&apos;s Book · 2024
            </span>
          </div>
        </div>
      </div>

      {/* Featured letter showcase */}
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Cover / welcome art */}
        <motion.div
          style={{ y: parallaxY }}
          className="lg:col-span-3 order-2 lg:order-1"
        >
          <motion.div
            style={{ rotate: coverRotate }}
            className="relative aspect-poster rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
          >
            <img
              src={asset("/projects/book/cover.png")}
              alt="Animal Alphabet book cover"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="font-mono-label text-[9px] tracking-[0.3em] text-amber uppercase mb-1">
                Book Cover
              </div>
              <div className="font-display font-bold text-lg text-foreground leading-tight">
                My Animal Alphabet
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Big featured letter */}
        <div className="lg:col-span-6 order-1 lg:order-2">
          <div className="relative aspect-square-cine max-w-xl mx-auto">
            {/* Glow */}
            <div
              className="absolute inset-0 rounded-full blur-3xl opacity-50 transition-colors duration-700"
              style={{ background: "radial-gradient(circle, rgba(232,160,74,0.35), transparent 60%)" }}
            />
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 0.9, rotateY: -30 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.95, rotateY: 30 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="relative h-full w-full flex items-center justify-center"
              >
                <img
                  src={current.src}
                  alt={`Letter ${current.letter} - ${current.creature}`}
                  className="relative z-10 max-h-full max-w-full object-contain drop-shadow-2xl"
                  style={{ filter: "drop-shadow(0 30px 60px rgba(232,160,74,0.4))" }}
                />
              </motion.div>
            </AnimatePresence>

            {/* Big letter overlay */}
            <div className="absolute top-4 left-4 z-20">
              <motion.div
                key={`letter-${active}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-display font-black text-[8rem] sm:text-[10rem] leading-none text-outline"
              >
                {current.letter}
              </motion.div>
            </div>

            {/* Creature name */}
            <div className="absolute bottom-4 right-4 z-20 text-right max-w-[70%]">
              <motion.div
                key={`name-${active}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="font-mono-label text-[10px] tracking-[0.3em] text-amber uppercase mb-1">
                  Creature {String(active + 1).padStart(2, "0")} / 26
                </div>
                <div className="font-display font-bold text-3xl text-foreground">
                  {current.creature}
                </div>
                <div className="font-display italic text-xs text-muted-foreground mt-1 max-w-[260px] ml-auto leading-snug">
                  &ldquo;{current.fact}&rdquo;
                </div>
              </motion.div>
            </div>

            {/* Nav arrows */}
            <button
              onClick={() => go(-1)}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full glass-panel-light grid place-items-center hover:bg-amber/20 transition-colors"
              aria-label="Previous letter"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => go(1)}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full glass-panel-light grid place-items-center hover:bg-amber/20 transition-colors"
              aria-label="Next letter"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Welcome art + metadata */}
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [-40, 60]) }}
          className="lg:col-span-3 order-3 space-y-4"
        >
          <div className="relative aspect-poster rounded-2xl overflow-hidden border border-white/10">
            <img
              src={asset("/projects/book/welcome.png")}
              alt="Welcome art"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
            <div className="absolute bottom-4 left-4">
              <div className="font-mono-label text-[9px] tracking-[0.3em] text-amber uppercase">
                Welcome Page
              </div>
            </div>
          </div>

          <div className="cinematic-card p-5">
            <BookOpen size={18} className="text-amber mb-3" />
            <div className="font-display font-bold text-sm text-foreground mb-1">
              Authored & Illustrated
            </div>
            <div className="text-xs text-muted-foreground leading-relaxed">
              Maisoon Namrote. 26 hand-crafted 3D letter-creatures, plus
              welcome, title and end pages with full art direction.
            </div>
          </div>

          <div className="cinematic-card p-5">
            <div className="font-mono-label text-[9px] tracking-[0.3em] text-amber uppercase mb-2">
              Companion
            </div>
            <div className="font-display font-bold text-sm text-foreground">
              Anty&apos;s Big Alphabet Adventure
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              A 3D ant mascot cover concept — companion to the alphabet book.
            </div>
          </div>
        </motion.div>
      </div>

      {/* Letter strip — full alphabet selector */}
      <div className="mt-16">
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono-label text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
            The Full Alphabet · Click to feature
          </span>
          <span className="font-mono-label text-[10px] tracking-[0.3em] text-amber uppercase">
            {String(active + 1).padStart(2, "0")} / 26
          </span>
        </div>
        <div
          ref={trackRef}
          className="grid grid-cols-7 sm:grid-cols-13 gap-2 overflow-x-auto pb-2"
          style={{ scrollbarWidth: "thin" }}
        >
          {bookLetters.map((l, i) => (
            <button
              key={l.letter}
              onClick={() => setActive(i)}
              className={`group relative aspect-square rounded-lg overflow-hidden border transition-all duration-500 ${
                active === i
                  ? "border-amber scale-105 shadow-lg shadow-amber/20"
                  : "border-white/10 hover:border-white/30"
              }`}
              style={
                active === i
                  ? { borderColor: "#E8A04A", boxShadow: "0 8px 30px rgba(232,160,74,0.25)" }
                  : undefined
              }
              aria-label={`Show letter ${l.letter}`}
            >
              <img
                src={l.src}
                alt={`Letter ${l.letter}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute top-1 left-1 font-mono-label text-[8px] text-amber/80 font-bold">
                {l.letter}
              </div>
              {active === i && (
                <motion.div
                  layoutId="letter-active-indicator"
                  className="absolute inset-0 ring-2 ring-amber rounded-lg pointer-events-none"
                  style={{ boxShadow: "inset 0 0 0 2px #E8A04A" }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Marquee strip */}
      <div className="mt-12 -mx-5 sm:-mx-8 overflow-hidden border-y border-white/[0.06] py-4">
        <div className="marquee-track">
          {[...bookLetters, ...bookLetters].map((l, i) => (
            <span
              key={i}
              className="font-display font-black text-4xl sm:text-5xl text-foreground/10 mx-6"
            >
              {l.letter}
              <span className="text-amber/30 mx-2">·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
