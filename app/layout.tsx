import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk, Instrument_Serif } from "next/font/google";
import { MotionConfig } from "motion/react";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/smooth-scroll";
import { CinematicBurst } from "@/components/cine/director";
import { TerminalNav } from "@/components/terminal-nav";
import { CursorLight } from "@/components/cursor-light";
import { Cursor } from "@/components/cursor";
import { Preloader } from "@/components/preloader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const siteUrl =
  process.env.SITE_URL ||
  process.env.VERCEL_URL ||
  "https://krishp091205.github.io/my-portfolio/app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Krish — Cinematographer & Frontend Developer",
  description:
    "A cinematic portfolio — cinematographer, frontend developer, website designer and TYBS IT student.",
  openGraph: {
    title: "Krish — Cinematographer & Frontend Developer",
    description:
      "A cinematic portfolio — cinematographer, frontend developer, website designer and TYBS IT student.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <MotionConfig reducedMotion="user">
          <Preloader>
            <div aria-hidden className="atmosphere" />
            <div aria-hidden className="grain" />
            <CursorLight />
            <Cursor />
            <SmoothScrollProvider>
              <TerminalNav />
              <main className="relative z-10">{children}</main>
              <CinematicBurst />
            </SmoothScrollProvider>
          </Preloader>
        </MotionConfig>
      </body>
    </html>
  );
}