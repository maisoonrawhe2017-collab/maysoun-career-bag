"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowUpRight, Mail, Instagram, Gamepad2, Send } from "lucide-react";
import { toast } from "sonner";

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast.error("Please fill in all fields before sending.");
      return;
    }
    setSubmitting(true);
    // Simulate graceful submit (no backend expected for this portfolio)
    await new Promise((r) => setTimeout(r, 900));
    toast.success("Message received. Maisoon will be in touch soon.");
    setName("");
    setEmail("");
    setMessage("");
    setSubmitting(false);
  };

  return (
    <section id="contact" className="section-cinematic relative max-w-[1480px] mx-auto px-5 sm:px-8">
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        {/* Left — invitation */}
        <div className="lg:col-span-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="font-mono-label text-[10px] tracking-[0.4em] text-amber">
                CHAPTER 06 · CONTACT
              </span>
              <span className="h-px flex-1 bg-amber/30" style={{ background: "rgba(232,160,74,0.3)" }} />
            </div>
            <h2 className="display-section text-[clamp(2.5rem,7vw,6rem)] leading-[0.92]">
              <span className="text-foreground">Let&apos;s</span>
              <br />
              <span className="text-gradient-amber italic">get in touch.</span>
            </h2>
            <p className="text-base text-muted-foreground mt-6 max-w-md leading-relaxed">
              Commission a children&apos;s book. Design a smart product. Build
              a course. Or simply open a conversation. The bag is open for new
              work.
            </p>

            {/* Direct channels */}
            <div className="mt-10 space-y-3">
              {[
                { icon: Mail, label: "Email", value: "hello@maisoon.studio", href: "mailto:hello@maisoon.studio" },
                { icon: Instagram, label: "Instagram", value: "@maisoon.studio", href: "https://instagram.com" },
                { icon: Gamepad2, label: "Game", value: "Play Monster Hunter", href: "https://maisoonrawhe2017-collab.github.io/maisoon--game/" },
              ].map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-4 rounded-xl border border-white/[0.06] hover:border-amber/30 hover:bg-amber/[0.04] transition-all duration-500"
                >
                  <div className="w-10 h-10 rounded-lg grid place-items-center bg-amber/10 border border-amber/20" style={{ background: "rgba(232,160,74,0.1)", borderColor: "rgba(232,160,74,0.2)" }}>
                    <c.icon size={16} className="text-amber" style={{ color: "#E8A04A" }} />
                  </div>
                  <div className="flex-1">
                    <div className="font-mono-label text-[9px] tracking-[0.3em] text-muted-foreground uppercase">
                      {c.label}
                    </div>
                    <div className="text-sm text-foreground font-medium">
                      {c.value}
                    </div>
                  </div>
                  <ArrowUpRight size={16} className="text-muted-foreground group-hover:text-amber group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right — form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6"
        >
          <form onSubmit={handleSubmit} className="cinematic-card p-7 sm:p-10 space-y-6">
            <div>
              <label htmlFor="contact-name" className="font-mono-label text-[10px] tracking-[0.3em] text-muted-foreground uppercase block mb-2">
                Your Name
              </label>
              <input
                id="contact-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                className="w-full bg-transparent border-b border-white/15 focus:border-amber transition-colors py-2 text-foreground placeholder:text-muted-foreground/40 outline-none"
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="font-mono-label text-[10px] tracking-[0.3em] text-muted-foreground uppercase block mb-2">
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane@studio.com"
                className="w-full bg-transparent border-b border-white/15 focus:border-amber transition-colors py-2 text-foreground placeholder:text-muted-foreground/40 outline-none"
              />
            </div>
            <div>
              <label htmlFor="contact-message" className="font-mono-label text-[10px] tracking-[0.3em] text-muted-foreground uppercase block mb-2">
                Project / Message
              </label>
              <textarea
                id="contact-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                placeholder="Tell me about the world you want to build…"
                className="w-full bg-transparent border-b border-white/15 focus:border-amber transition-colors py-2 text-foreground placeholder:text-muted-foreground/40 outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="group w-full flex items-center justify-center gap-3 py-4 rounded-full font-mono-label text-xs tracking-[0.25em] uppercase transition-all duration-500 disabled:opacity-50"
              style={{
                background: "linear-gradient(135deg, #FFB866, #E8A04A)",
                color: "#08080C",
              }}
            >
              {submitting ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-ink/30 border-t-ink rounded-full animate-spin" />
                  Sending…
                </>
              ) : (
                <>
                  Send Message
                  <Send size={14} className="transition-transform duration-500 group-hover:translate-x-1" />
                </>
              )}
            </button>

            <p className="text-[10px] text-muted-foreground/60 text-center font-mono-label tracking-[0.2em] uppercase">
              Typical reply · within 48 hours
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
