"use client";

import { useEffect, useRef, useState } from "react";

/* A shared scroll-progress hook (0 → 1 over the whole page) */
function useScrollProgress() {
  const ref = useRef(0);
  useEffect(() => {
    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      ref.current = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return ref;
}

/* ============================================================
   AtmosphericBackground
   ============================================================ */

export function AtmosphericBackground() {
  const scrollRef = useScrollProgress();
  // The cinematic atmosphere is delivered through CSS gradients, the CSS
  // shard layer, film grain, vignette and the scroll-driven color wash.
  // All of these run on the compositor thread and consume minimal memory.

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden
    >
      {/* Pure CSS gradient fallback / base layer */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(232,160,74,0.12) 0%, transparent 55%), " +
            "radial-gradient(ellipse at 100% 100%, rgba(176,112,232,0.10) 0%, transparent 60%), " +
            "radial-gradient(ellipse at 0% 70%, rgba(127,255,139,0.06) 0%, transparent 55%), " +
            "linear-gradient(180deg, #08080C 0%, #0C0A14 50%, #08080C 100%)",
        }}
      />

      {/* Animated CSS shard decorations (always on, cheap) */}
      <CssShardLayer count={28} />

      {/* Atmospheric color wash that shifts with scroll */}
      <ScrollAtmosphereLayer scrollRef={scrollRef} />

      {/* Subtle hero glow */}
      <div
        className="absolute left-1/2 top-[35%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(255,184,102,0.18) 0%, rgba(232,160,74,0.08) 40%, transparent 70%)",
          filter: "blur(40px)",
          animation: "pulse-glow 6s ease-in-out infinite",
        }}
      />
    </div>
  );
}

/* ============================================================
   CssShardLayer — cheap CSS-only floating shard decorations
   Always rendered as a fallback enhancement layer
   ============================================================ */
function CssShardLayer({ count = 14 }: { count?: number }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    queueMicrotask(() => setMounted(true));
  }, []);

  const shards = Array.from({ length: count }, (_, i) => {
    const colors = ["#E8A04A", "#FFB866", "#B070E8", "#7FFF8B", "#5FD9E8", "#E8B4A0"];
    return {
      id: i,
      left: `${(i * 7.3 + 5) % 95}%`,
      top: `${(i * 11.7 + 8) % 90}%`,
      size: 6 + ((i * 3) % 22),
      color: colors[i % colors.length],
      delay: i * 0.7,
      duration: 8 + (i % 6),
    };
  });
  if (!mounted) return null;
  return (
    <div className="absolute inset-0 overflow-hidden">
      {shards.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-sm"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            background: s.color,
            opacity: 0.18,
            transform: "rotate(45deg)",
            animation: `float ${s.duration}s ease-in-out ${s.delay}s infinite`,
            filter: "blur(1px)",
          }}
        />
      ))}
    </div>
  );
}

/* ============================================================
   ScrollAtmosphereLayer
   ============================================================ */

function ScrollAtmosphereLayer({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const s = scrollRef.current;
      const el = layerRef.current;
      if (el) {
        const hue = 30 + s * 280;
        el.style.background = `radial-gradient(ellipse 80% 60% at 50% 50%, hsla(${hue}, 70%, 55%, 0.06), transparent 70%)`;
        el.style.opacity = `${0.6 + Math.sin(s * Math.PI) * 0.4}`;
      }
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [scrollRef]);

  return <div ref={layerRef} className="absolute inset-0 transition-opacity duration-700" />;
}
