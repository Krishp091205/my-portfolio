"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "motion/react";

export function Cursor() {
  const reduced = useReducedMotion();
  const [interactive, setInteractive] = useState(false);

  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const dotX = useSpring(x, { stiffness: 1100, damping: 60, mass: 0.2 });
  const dotY = useSpring(y, { stiffness: 1100, damping: 60, mass: 0.2 });
  const ringX = useSpring(x, { stiffness: 220, damping: 22, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 220, damping: 22, mass: 0.6 });

  useEffect(() => {
    if (reduced) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    document.documentElement.classList.add("cus");

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const onOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      const hit = Boolean(
        target?.closest?.("a, button, input, textarea, select, [data-cursor]")
      );
      setInteractive((prev) => {
        if (prev !== hit) return hit;
        return prev;
      });
      document.documentElement.classList.toggle("cus-interactive", hit);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    return () => {
      document.documentElement.classList.remove("cus", "cus-interactive");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
    };
  }, [reduced, x, y]);

  return (
    <>
      <motion.span
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[140] h-[5px] w-[5px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
        style={{ x: dotX, y: dotY }}
      />
      <motion.span
        aria-hidden
        className="cus-ring pointer-events-none fixed left-0 top-0 z-[139] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-foreground/25 transition-[border-color] duration-300"
        style={{ x: ringX, y: ringY }}
        animate={{
          scale: interactive ? 1.7 : 1,
          borderColor: interactive ? "rgba(0,255,136,0.6)" : "rgba(231,233,240,0.25)",
        }}
        transition={{ duration: 0.25 }}
      />
    </>
  );
}