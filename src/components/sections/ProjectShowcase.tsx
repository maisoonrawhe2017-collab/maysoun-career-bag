"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, Play } from "lucide-react";
import type { ProjectShard } from "@/lib/projects";
import { AtmosphericShard } from "@/components/cinematic/AtmosphericShard";

type Props = {
  project: ProjectShard;
  index: number;
};

export function ProjectShowcase({ project, index }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const isEven = index % 2 === 0;
  const imgY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const numScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 0.95]);
  const numOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.2]);

  return (
    <article
      ref={ref}
      id={project.id}
      className="relative py-20 sm:py-32"
      style={{ ["--shard" as any]: project.accent }}
    >
      {/* Atmospheric shard backdrop */}
      <AtmosphericShard
        accent={project.accent}
        glyph={project.glyph}
        label={`Shard ${project.index} · ${project.title}`}
        align={isEven ? "right" : "left"}
      />

      {/* Big watermark number */}
      <motion.div
        style={{ scale: numScale, opacity: numOpacity }}
        className="pointer-events-none absolute -top-10 sm:-top-20 right-0 select-none z-0"
      >
        <span
          className="font-display font-black text-[clamp(8rem,22vw,20rem)] leading-none"
          style={{
            color: "transparent",
            WebkitTextStroke: `1.5px ${project.accent}40`,
          }}
        >
          {project.index}
        </span>
      </motion.div>

      <div className={`relative z-10 grid lg:grid-cols-12 gap-8 lg:gap-12 items-center ${isEven ? "" : "lg:[direction:rtl]"}`}>
        {/* Media column */}
        <div className="lg:col-span-7 [direction:ltr]">
          <ProjectMedia project={project} imgY={imgY} />
        </div>

        {/* Text column */}
        <div className="lg:col-span-5 [direction:ltr]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-5">
              <span
                className="font-mono-label text-[10px] tracking-[0.4em] uppercase"
                style={{ color: project.accent }}
              >
                Shard {project.index}
              </span>
              <span
                className="h-px flex-1"
                style={{ background: `linear-gradient(90deg, ${project.accent}66, transparent)` }}
              />
              <span className="font-mono-label text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
                {project.year}
              </span>
            </div>

            {/* Title */}
            <h3 className="display-section text-[clamp(2.25rem,5vw,4rem)] leading-[0.95]">
              <span className="text-foreground">{project.title}</span>
            </h3>
            {project.titleAr && (
              <p
                className="font-arabic text-xl mt-2"
                dir="rtl"
                style={{ color: `${project.accent}cc` }}
              >
                {project.titleAr}
              </p>
            )}

            {/* Tagline */}
            <p className="font-display italic text-lg sm:text-xl text-foreground/70 mt-5 leading-snug">
              {project.tagline}
            </p>

            {/* Category */}
            <div
              className="inline-flex items-center gap-2 mt-5 px-3 py-1 rounded-full text-[10px] font-mono-label tracking-[0.2em] uppercase border"
              style={{
                borderColor: `${project.accent}40`,
                color: project.accent,
                background: `${project.accent}10`,
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: project.accent }}
              />
              {project.category}
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mt-6">
              {project.description}
            </p>

            {/* Details list */}
            <ul className="mt-6 space-y-2.5">
              {project.details.map((d, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                  className="flex items-start gap-3 text-sm text-foreground/80"
                >
                  <span
                    className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0"
                    style={{ background: project.accent }}
                  />
                  {d}
                </motion.li>
              ))}
            </ul>

            {/* CTA */}
            {project.cta && (
              <a
                href={project.cta.href}
                target={project.cta.href.startsWith("http") ? "_blank" : undefined}
                rel={project.cta.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group inline-flex items-center gap-3 mt-8 px-6 py-3 rounded-full font-mono-label text-xs tracking-[0.2em] uppercase transition-all duration-500"
                style={{
                  border: `1px solid ${project.accent}60`,
                  color: project.accent,
                }}
              >
                <span>{project.cta.label}</span>
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </a>
            )}
          </motion.div>
        </div>
      </div>
    </article>
  );
}

/* ============================================================
   ProjectMedia — handles images and videos
   ============================================================ */

function ProjectMedia({
  project,
  imgY,
}: {
  project: ProjectShard;
  imgY: any;
}) {
  if (project.media.length === 0) {
    // For projects with no media (like the game), render a stylized placeholder
    return (
      <div
        className="relative aspect-cinematic rounded-2xl overflow-hidden border border-white/10 grid place-items-center"
        style={{
          background: `radial-gradient(ellipse at center, ${project.accentSoft}, transparent 70%), linear-gradient(135deg, #0B0A14, #14101E)`,
        }}
      >
        <div
          className="font-display font-black text-[12rem] leading-none"
          style={{
            color: "transparent",
            WebkitTextStroke: `2px ${project.accent}80`,
          }}
        >
          {project.glyph}
        </div>
        <div className="absolute bottom-6 left-6 right-6">
          <div className="font-mono-label text-[10px] tracking-[0.3em] uppercase" style={{ color: project.accent }}>
            Interactive Experience
          </div>
          <div className="font-display text-xl text-foreground mt-1">{project.title}</div>
        </div>
      </div>
    );
  }

  // Single media
  if (project.media.length === 1) {
    const m = project.media[0];
    return (
      <motion.div style={{ y: imgY }} className="relative">
        <div
          className="relative aspect-cinematic rounded-2xl overflow-hidden border border-white/10 group"
          style={{ boxShadow: `0 30px 80px -30px ${project.accent}40` }}
        >
          {m.type === "image" ? (
            <img
              src={m.src}
              alt={m.alt}
              className="w-full h-full object-cover transition-transform duration-[1.4s] group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <video
              src={m.src}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
          <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
            <div>
              <div className="font-mono-label text-[9px] tracking-[0.3em] uppercase mb-1" style={{ color: project.accent }}>
                {project.category.split("·")[0].trim()}
              </div>
              <div className="font-display text-lg text-foreground">{project.title}</div>
            </div>
            {m.type === "video" && (
              <div className="w-10 h-10 rounded-full grid place-items-center backdrop-blur-md" style={{ background: `${project.accent}30` }}>
                <Play size={14} className="text-foreground ml-0.5" fill="currentColor" />
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  // Multiple media — first one big, others in a strip
  const [first, ...rest] = project.media;
  return (
    <motion.div style={{ y: imgY }} className="space-y-3">
      <div
        className="relative aspect-cinematic rounded-2xl overflow-hidden border border-white/10 group"
        style={{ boxShadow: `0 30px 80px -30px ${project.accent}40` }}
      >
        {first.type === "image" ? (
          <img
            src={first.src}
            alt={first.alt}
            className="w-full h-full object-cover transition-transform duration-[1.4s] group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <video
            src={first.src}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
        <div className="absolute top-5 left-5">
          <div className="font-mono-label text-[9px] tracking-[0.3em] uppercase" style={{ color: project.accent }}>
            Featured · 01 / {project.media.length}
          </div>
        </div>
      </div>
      {rest.length > 0 && (
        <div className="grid grid-cols-2 gap-3">
          {rest.slice(0, 4).map((m, i) => (
            <div
              key={i}
              className="relative aspect-[4/3] rounded-xl overflow-hidden border border-white/10 group"
            >
              {m.type === "image" ? (
                <img
                  src={m.src}
                  alt={m.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              ) : (
                <video
                  src={m.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
              <div className="absolute bottom-2 left-2 font-mono-label text-[8px] tracking-[0.3em] uppercase text-foreground/80">
                {String(i + 2).padStart(2, "0")} / {String(project.media.length).padStart(2, "0")}
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
