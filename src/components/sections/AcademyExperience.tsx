"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { GraduationCap, Clock, Users, Award, BookMarked, ChevronRight } from "lucide-react";

const modules = [
  {
    n: "01",
    title: "Foundations",
    titleAr: "الأساسيات",
    duration: "Week 1",
    color: "#E8A04A",
    points: [
      "Introduction to data entry as a profession",
      "Microsoft Office essentials (Word, Excel, PowerPoint)",
      "File organization and management",
      "Keyboard mastery fundamentals",
    ],
  },
  {
    n: "02",
    title: "Speed & Accuracy",
    titleAr: "السرعة والدقة",
    duration: "Weeks 2-3",
    color: "#FFB866",
    points: [
      "Touch typing with all ten fingers",
      "Daily interactive keyboard drills",
      "Word prediction & auto-correction",
      "50+ shortcuts to double your speed",
      "Target: 60+ WPM at 99% accuracy",
    ],
  },
  {
    n: "03",
    title: "Advanced Software",
    titleAr: "البرامج المتقدمة",
    duration: "Weeks 4-5",
    color: "#E8B4A0",
    points: [
      "Advanced Excel — formulas, functions, pivots",
      "Charts and data visualization",
      "Document formatting & collaboration",
      "Google Sheets cross-training",
    ],
  },
  {
    n: "04",
    title: "AI & Automation",
    titleAr: "الذكاء والذكاء الاصطناعي",
    duration: "Weeks 6-7",
    color: "#7FFF8B",
    points: [
      "OCR — image-to-data extraction",
      "Smart verification & error detection",
      "Automation pipelines",
      "Save 70% of manual entry time",
    ],
  },
  {
    n: "05",
    title: "Ethics & Security",
    titleAr: "الأمان والأخلاقيات",
    duration: "Week 7",
    color: "#B070E8",
    points: [
      "Data confidentiality",
      "Integrity & non-falsification",
      "Accountability & documentation",
      "Legal compliance — local & international",
      "Signed ethics charter",
    ],
  },
  {
    n: "06",
    title: "Career Launch",
    titleAr: "الانطلاق المهني",
    duration: "Week 8",
    color: "#5FD9E8",
    points: [
      "Freelancing on Upwork, Fiverr, Khamsat, Mostaql",
      "Pricing, profile & client acquisition",
      "Certified international diploma",
      "First paid project execution",
    ],
  },
];

const stats = [
  { icon: Clock, label: "Duration", value: "8 Weeks" },
  { icon: Users, label: "Students", value: "5,000+" },
  { icon: Award, label: "Certification", value: "International" },
  { icon: BookMarked, label: "Modules", value: "15 Lessons" },
];

export function AcademyExperience() {
  const [active, setActive] = useState(0);

  return (
    <section id="academy" className="section-cinematic relative max-w-[1480px] mx-auto px-5 sm:px-8">
      {/* Header */}
      <div className="text-center mb-12 sm:mb-16">
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-amber" style={{ background: "linear-gradient(90deg, transparent, #E8A04A)" }} />
          <span className="font-mono-label text-[10px] tracking-[0.4em] text-amber uppercase">
            Chapter 04 · The Academy
          </span>
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-amber" style={{ background: "linear-gradient(90deg, #E8A04A, transparent)" }} />
        </div>
        <h2 className="display-section text-[clamp(2.5rem,7vw,6rem)] leading-[0.92]">
          <span className="text-foreground">Digital</span>{" "}
          <span className="text-gradient-amber">Academy</span>
        </h2>
        <p className="font-arabic text-rose-gold/80 text-xl mt-3" dir="rtl">
          دورة المهارات الرقمية المتكاملة
        </p>
        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto mt-5">
          A pair of vocational courses designed and authored by Maysoun —
          an 8-week Data Entry program and a foundational Digital Skills course.
        </p>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/[0.06] border border-white/[0.06] rounded-2xl overflow-hidden mb-12">
        {stats.map((s) => (
          <div key={s.label} className="bg-[#0B0A12]/80 backdrop-blur-md p-5 sm:p-6 text-center">
            <s.icon size={20} className="mx-auto mb-2 text-amber" style={{ color: "#E8A04A" }} />
            <div className="font-display font-bold text-xl sm:text-2xl text-foreground">{s.value}</div>
            <div className="font-mono-label text-[9px] tracking-[0.2em] text-muted-foreground uppercase mt-1">
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Interactive module explorer */}
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-10">
        {/* Module list */}
        <div className="lg:col-span-5">
          <div className="font-mono-label text-[10px] tracking-[0.3em] text-muted-foreground uppercase mb-4">
            DATA-PRO · 8-Week Curriculum
          </div>
          <div className="space-y-2">
            {modules.map((m, i) => (
              <button
                key={m.n}
                onClick={() => setActive(i)}
                className={`group w-full text-left p-4 rounded-xl border transition-all duration-500 ${
                  active === i
                    ? "border-transparent bg-white/[0.04]"
                    : "border-white/[0.06] hover:border-white/15 hover:bg-white/[0.02]"
                }`}
                style={
                  active === i
                    ? { borderColor: `${m.color}40`, background: `${m.color}10` }
                    : undefined
                }
              >
                <div className="flex items-center gap-4">
                  <div
                    className="font-display font-black text-3xl flex-shrink-0"
                    style={{ color: active === i ? m.color : "rgba(255,255,255,0.2)" }}
                  >
                    {m.n}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`font-display font-bold text-base sm:text-lg ${active === i ? "text-foreground" : "text-foreground/80"}`}>
                        {m.title}
                      </span>
                      <span className="font-mono-label text-[9px] tracking-[0.2em] text-muted-foreground uppercase flex-shrink-0">
                        {m.duration}
                      </span>
                    </div>
                    <div className="font-arabic text-xs text-muted-foreground mt-0.5" dir="rtl">
                      {m.titleAr}
                    </div>
                  </div>
                  <ChevronRight
                    size={16}
                    className="flex-shrink-0 transition-transform duration-500"
                    style={{
                      color: active === i ? m.color : "rgba(255,255,255,0.3)",
                      transform: active === i ? "translateX(4px)" : "translateX(0)",
                    }}
                  />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Module detail panel */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-full"
            >
              <div
                className="cinematic-card p-7 sm:p-10 h-full"
                style={{
                  background: `radial-gradient(ellipse at top right, ${modules[active].color}18, transparent 60%), linear-gradient(180deg, rgba(11,10,18,0.8), rgba(8,8,12,0.95))`,
                  borderColor: `${modules[active].color}30`,
                }}
              >
                {/* Module header */}
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <div className="font-mono-label text-[10px] tracking-[0.3em] uppercase mb-2" style={{ color: modules[active].color }}>
                      Module {modules[active].n}
                    </div>
                    <h3 className="display-section text-3xl sm:text-4xl text-foreground">
                      {modules[active].title}
                    </h3>
                    <p className="font-arabic text-base mt-1" dir="rtl" style={{ color: `${modules[active].color}cc` }}>
                      {modules[active].titleAr}
                    </p>
                  </div>
                  <GraduationCap size={32} style={{ color: modules[active].color }} />
                </div>

                {/* Curriculum points */}
                <div className="space-y-3">
                  {modules[active].points.map((p, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                      className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]"
                    >
                      <span
                        className="font-mono-label text-[10px] font-bold mt-0.5 flex-shrink-0"
                        style={{ color: modules[active].color }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm text-foreground/85 leading-relaxed">{p}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Progress indicator */}
                <div className="mt-8 pt-6 border-t border-white/[0.06]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono-label text-[9px] tracking-[0.3em] text-muted-foreground uppercase">
                      Curriculum Progress
                    </span>
                    <span className="font-mono-label text-[10px] font-bold" style={{ color: modules[active].color }}>
                      {Math.round(((active + 1) / modules.length) * 100)}%
                    </span>
                  </div>
                  <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: `linear-gradient(90deg, ${modules[active].color}, ${modules[active].color}80)` }}
                      initial={{ width: 0 }}
                      animate={{ width: `${((active + 1) / modules.length) * 100}%` }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
