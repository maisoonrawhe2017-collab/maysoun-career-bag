"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * IntroOverlay
 * A brief cinematic loading screen that fades away after the page is ready.
 * Sets the tone for the rest of the experience.
 */
export function IntroOverlay() {
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate load progress (page is already loaded via SSR; this is for show)
    let p = 0;
    const interval = setInterval(() => {
      p = Math.min(100, p + Math.random() * 18 + 8);
      setProgress(Math.floor(p));
      if (p >= 100) {
        clearInterval(interval);
        setTimeout(() => setDone(true), 500);
      }
    }, 110);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-[100] bg-[#08080C] flex flex-col items-center justify-center"
        >
          {/* Logo / mark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-16 h-16 mb-8"
          >
            <div
              className="absolute inset-0 rounded-md border border-amber/50 rotate-45 animate-pulse"
              style={{ borderColor: "rgba(232,160,74,0.5)" }}
            />
            <div
              className="absolute inset-2 rounded-sm bg-amber/15 rotate-45"
              style={{ background: "rgba(232,160,74,0.15)" }}
            />
            <span
              className="absolute inset-0 grid place-items-center font-display font-black text-amber text-2xl"
              style={{ color: "#E8A04A" }}
            >
              M
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-mono-label text-[10px] tracking-[0.4em] text-amber uppercase mb-6"
            style={{ color: "#E8A04A" }}
          >
            Opening the bag
          </motion.div>

          {/* Progress bar */}
          <div className="w-48 h-px bg-white/10 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-amber-bright to-amber"
              style={{ width: `${progress}%`, background: "linear-gradient(90deg, #FFB866, #E8A04A)" }}
            />
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="font-mono-label text-[9px] tracking-[0.4em] text-muted-foreground mt-3"
          >
            {String(progress).padStart(3, "0")} · Loading shards
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
