"use client";

import dynamic from "next/dynamic";
import { Navbar } from "@/components/navigation/Navbar";
import { SectionIndicator } from "@/components/navigation/SectionIndicator";
import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { BookExperience } from "@/components/sections/BookExperience";
import { ShardsShowcase } from "@/components/sections/ShardsShowcase";
import { AcademyExperience } from "@/components/sections/AcademyExperience";
import { Disciplines } from "@/components/sections/Disciplines";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { IntroOverlay } from "@/components/cinematic/IntroOverlay";

// WebGL canvas is loaded only on the client to avoid SSR issues.
const AtmosphericBackground = dynamic(
  () => import("@/components/scene/AtmosphericBackground").then((m) => m.AtmosphericBackground),
  { ssr: false }
);

export default function Page() {
  return (
    <div className="relative min-h-screen-flex">
      {/* Cinematic intro overlay */}
      <IntroOverlay />

      {/* Persistent WebGL atmospheric background */}
      <AtmosphericBackground />

      {/* Film grain + vignette overlays */}
      <div className="film-grain" aria-hidden />
      <div className="vignette" aria-hidden />

      {/* Subtle content veil — darkens the 3D background behind text for readability */}
      <div
        className="fixed inset-0 z-[5] pointer-events-none"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 70% 100% at 50% 0%, transparent 0%, rgba(8,8,12,0.45) 80%), " +
            "linear-gradient(180deg, rgba(8,8,12,0) 0%, rgba(8,8,12,0.35) 30%, rgba(8,8,12,0.55) 100%)",
        }}
      />

      {/* All content sits above the canvas */}
      <div className="relative z-10">
        <Navbar />
        <SectionIndicator />
        <main className="flex-1">
          <Hero />
          <Manifesto />
          <BookExperience />
          <ShardsShowcase />
          <AcademyExperience />
          <Disciplines />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
