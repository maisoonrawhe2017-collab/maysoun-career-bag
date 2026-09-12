"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";

const sections = [
  { id: "hero", label: "Origin", index: "00" },
  { id: "manifesto", label: "The Bag", index: "01" },
  { id: "book", label: "Alphabet", index: "02" },
  { id: "shards", label: "Shards", index: "03" },
  { id: "academy", label: "Academy", index: "04" },
  { id: "disciplines", label: "Craft", index: "05" },
  { id: "contact", label: "Contact", index: "06" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("hero");
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) setActive(s.id);
          });
        },
        { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const go = (id: string) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left"
        style={{
          scaleX: progress,
          background:
            "linear-gradient(90deg, #FFB866 0%, #E8A04A 40%, #B070E8 75%, #5FD9E8 100%)",
        }}
      />

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "py-3 bg-[#08080C]/70 backdrop-blur-xl border-b border-white/[0.06]"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-[1480px] mx-auto px-5 sm:px-8 flex items-center justify-between">
          {/* Logo / mark */}
          <button
            onClick={() => go("hero")}
            className="group flex items-center gap-3 cursor-pointer"
            aria-label="Maysoun — back to top"
          >
            <div className="relative w-9 h-9 grid place-items-center">
              <div className="absolute inset-0 rounded-md border border-amber/40 rotate-45 group-hover:rotate-[135deg] transition-transform duration-700" style={{ borderColor: "rgba(232,160,74,0.4)" }} />
              <div className="absolute inset-1 rounded-sm bg-amber/10 backdrop-blur-sm rotate-45" style={{ background: "rgba(232,160,74,0.1)" }} />
              <span className="font-display font-black text-amber relative z-10 text-lg" style={{ color: "#E8A04A" }}>M</span>
            </div>
            <div className="hidden sm:flex flex-col leading-none">
              <span className="font-display font-bold text-sm tracking-wide text-foreground">MAYSOUN</span>
              <span className="font-mono-label text-[10px] tracking-[0.25em] text-muted-foreground mt-0.5">CAREER BAG</span>
            </div>
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => go(s.id)}
                className={`group relative px-4 py-2 text-xs font-mono-label tracking-[0.18em] uppercase transition-colors ${
                  active === s.id ? "text-amber" : "text-muted-foreground hover:text-foreground"
                }`}
                style={active === s.id ? { color: "#E8A04A" } : undefined}
              >
                <span className="opacity-50 mr-1.5">{s.index}</span>
                {s.label}
                {active === s.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute -bottom-px left-3 right-3 h-px"
                    style={{ background: "linear-gradient(90deg, transparent, #E8A04A, transparent)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => go("contact")}
              className="hidden md:inline-flex items-center gap-2 px-5 py-2 text-xs font-mono-label tracking-[0.2em] uppercase border border-amber/40 text-amber hover:bg-amber hover:text-ink transition-all duration-500 rounded-full"
              style={{ borderColor: "rgba(232,160,74,0.4)", color: "#E8A04A" }}
            >
              Get in Touch
            </button>
            <button
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden p-2 text-foreground"
              aria-label="Toggle menu"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 lg:hidden bg-[#08080C]/95 backdrop-blur-2xl flex items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-2 w-full px-8">
              {sections.map((s, i) => (
                <motion.button
                  key={s.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.05 }}
                  onClick={() => go(s.id)}
                  className="group flex items-center gap-4 py-3 text-2xl font-display font-bold text-foreground hover:text-amber transition-colors"
                >
                  <span className="font-mono-label text-xs text-amber/60 tracking-[0.3em]">{s.index}</span>
                  {s.label}
                </motion.button>
              ))}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + sections.length * 0.05 }}
                onClick={() => go("contact")}
                className="mt-6 px-8 py-3 border border-amber/40 text-amber rounded-full font-mono-label text-xs tracking-[0.2em] uppercase"
                style={{ borderColor: "rgba(232,160,74,0.4)", color: "#E8A04A" }}
              >
                Get in Touch
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
