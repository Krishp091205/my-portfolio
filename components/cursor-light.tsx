"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useReducedMotion,
} from "motion/react";

export function CursorLight() {
  const reduced = useReducedMotion();
  const x = useMotionValue(-600);
  const y = useMotionValue(-600);
  const sx = useSpring(x, { stiffness: 90, damping: 20, mass: 0.8 });
  const sy = useSpring(y, { stiffness: 90, damping: 20, mass: 0.8 });
  const background = useMotionTemplate`radial-gradient(640px circle at ${sx}px ${sy}px, rgba(130,150,255,0.055), rgba(0,217,255,0.03) 38%, transparent 70%)`;

  useEffect(() => {
    if (reduced) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduced, x, y]);

  return (
    <motion.div
      aria-hidden
      className="cursor-light pointer-events-none fixed inset-0 z-[5]"
      style={{ background }}
    />
  );
}