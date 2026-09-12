import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono, Noto_Kufi_Arabic } from "next/font/google";
import "./globals.css";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const notoKufiArabic = Noto_Kufi_Arabic({
  variable: "--font-noto-kufi",
  subsets: ["arabic"],
  weight: ["400", "500", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MAYSOUN — The Career Bag | A Cinematic Creative Portfolio",
  description:
    "An immersive 3D-driven cinematic portfolio showcasing the multidisciplinary creative universe of Maisoon Namrote — children's books, beauty, smart tech, food design, jewelry craft, typography, digital education, avatar animation, and game development.",
  keywords: [
    "Maisoon Namrote",
    "ميسون النمروطي",
    "Career Bag",
    "Creative Portfolio",
    "Children's Book Illustrator",
    "Beauty Designer",
    "Smart Mirror UX",
    "Food Advertising",
    "Jewelry Infographic",
    "Creative Typography",
    "Digital Academy",
    "Cinematic 3D Website",
    "WebGL",
    "Three.js",
  ],
  authors: [{ name: "Maisoon Namrote" }],
  openGraph: {
    title: "MAYSOUN — The Career Bag",
    description:
      "An immersive cinematic experience through the multidisciplinary creative universe of Maisoon Namrote.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MAYSOUN — The Career Bag",
    description:
      "An immersive cinematic experience through the multidisciplinary creative universe of Maisoon Namrote.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={`${inter.variable} ${playfair.variable} ${jetbrains.variable} ${notoKufiArabic.variable} antialiased font-sans`}
      >
        {children}
        <SonnerToaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "rgba(11, 10, 18, 0.95)",
              border: "1px solid rgba(232,160,74,0.3)",
              color: "#fff",
              backdropFilter: "blur(20px)",
            },
          }}
        />
      </body>
    </html>
  );
}
