"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { EASE } from "@/components/reveal";

type BootState = { booted: boolean };
const BootContext = createContext<BootState>({ booted: true });

export function useBoot() {
  return useContext(BootContext);
}

const BOOT_STEPS = [
  "booting scene…",
  "loading atmosphere",
  "mounting cameras",
  "calibrating light",
  "ready",
];

export function Preloader({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  const [booted, setBooted] = useState(false);
  const [gone, setGone] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    if (reduced) {
      timers.push(setTimeout(() => setBooted(true), 0));
      timers.push(setTimeout(() => setGone(true), 32));
      return () => timers.forEach(clearTimeout);
    }
    BOOT_STEPS.forEach((_, i) => {
      timers.push(setTimeout(() => setStep(i), 220 + i * 260));
    });
    timers.push(setTimeout(() => setBooted(true), 220 + BOOT_STEPS.length * 260));
    timers.push(
      setTimeout(() => setGone(true), 220 + BOOT_STEPS.length * 260 + 800)
    );
    return () => timers.forEach(clearTimeout);
  }, [reduced]);

  useEffect(() => {
    if (booted) return;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [booted]);

  return (
    <BootContext.Provider value={{ booted }}>
      {children}
      {!gone && (
        <motion.div
          aria-hidden
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          initial={{ y: 0 }}
          animate={{ y: gone ? "-100%" : 0 }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <div className="w-64 rounded-xl border border-foreground/8 bg-white/[0.015] p-5 font-mono text-xs leading-6">
            <p className="text-foreground/40">kris@portfolio3d</p>
            <p className="text-accent glow-lime">$ loading ./scene</p>
            <div className="mt-3 h-4 space-y-2">
              {BOOT_STEPS.slice(0, step + 1).map((s) => (
                <p key={s} className="text-foreground/60">
                  {s}
                </p>
              ))}
            </div>
            <div className="mt-4">
              <div className="h-px bg-foreground/10">
                <div
                  className="h-px bg-accent/70 transition-all duration-300"
                  style={{
                    width: `${Math.round(((step + 1) / BOOT_STEPS.length) * 100)}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </BootContext.Provider>
  );
}