"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type ShotPanel = {
  id: string;
  depth: "near" | "mid" | "far";
  /** offset from viewport center, in px */
  x: number;
  y: number;
  /** rotation in deg */
  rot: number;
  /** css width string, e.g. "min(78vw, 300px)" */
  width: string;
  el: React.ReactNode;
  accent: string;
};

/* reconstruction marker — lit once the focused panel resolves */
function PanelMarker({ hue, lit }: { hue: string; lit: boolean }) {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border opacity-0"
      style={{
        borderColor: hue,
        boxShadow: `0 0 26px ${hue}55`,
        transition: "opacity 600ms cubic-bezier(0.16,1,0.3,1)",
        opacity: lit ? 1 : 0,
      }}
    />
  );
}

/**
 * BURST STAGE — CSS 3D camera fly-through.
 *
 *  parent  : perspective(1400px) — the single camera
 *  group   : preserve-3d; transform translateZ drives the DOLLY
 *  panels  : own translateZ + x/y offsets — separation & parallax
 *
 *  IMPACT   ~0.05–0.45s — light flash + micro push
 *  BURST    ~0.4s+      — panels split outward along Z (near/mid/far)
 *  FLY-THRU ~0.4–2.0s   — spring dollies through Z; layers pass beside
 *  RECON    ~2.05s+     — panels fade to markers, wipe covers, onDone
 */
export function BurstStage({
  panels,
  bg,
  zMax,
  wipeMs,
  onDone,
}: {
  panels: ShotPanel[];
  bg: string;
  zMax: number;
  wipeMs: number;
  onDone: () => void;
}) {
  const doneRef = useRef(false);
  const [flash, setFlash] = useState(false);
  const [lift, setLift] = useState(false);
  const [wipe, setWipe] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setFlash(true), 40));
    timers.push(setTimeout(() => setFlash(false), 460));
    timers.push(setTimeout(() => setLift(true), 420));
    timers.push(setTimeout(() => setGone(true), 2050));
    timers.push(setTimeout(() => setWipe(true), 2060));
    timers.push(
      setTimeout(() => {
        if (doneRef.current) return;
        doneRef.current = true;
        onDone();
      }, 2060 + wipeMs)
    );
    return () => timers.forEach(clearTimeout);
  }, [onDone, wipeMs]);

  const compact = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: coarse)").matches,
    []
  );
  const m = compact ? 0.55 : 1;
  const zScale = compact ? 0.5 : 1;

  const base: Record<ShotPanel["depth"], number> = {
    far: 460 * zScale,
    mid: 0,
    near: -200 * zScale,
  };

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[120] select-none overflow-hidden"
      style={{ perspective: 1400 * (compact ? 0.78 : 1) }}
    >
      {/* deep atmosphere */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(58% 42% at 50% 46%, ${bg}1a, #05060c 72%), #05060c`,
          transform: lift ? `scale(${1 + 0.06 * m})` : "scale(1.03)",
          transition: lift
            ? "transform 2200ms cubic-bezier(0.16,1,0.3,1)"
            : "transform 1400ms cubic-bezier(0.16,1,0.3,1)",
        }}
      />

      {/* camera fly-through */}
      <div
        className="absolute inset-0"
        style={{
          transformStyle: "preserve-3d",
          transform: lift ? `translateZ(${-zMax}px)` : "none",
          transition: lift
            ? "transform 1500ms cubic-bezier(0.16,1,0.3,1)"
            : "none",
        }}
      >
        {panels.map((p) => (
          <div
            key={p.id}
            data-depth={p.depth}
            className="absolute left-1/2 top-1/2"
            style={{
              width: p.width,
              transform: `translate(-50%,-50%) translate3d(${p.x * m}px, ${p.y * m}px, ${base[p.depth]}px) rotate(${p.rot * m}deg)`,
              transition: lift
                ? `transform 1550ms cubic-bezier(0.16,1,0.3,1), opacity 300ms ease 1700ms`
                : "none",
              opacity: gone ? 0 : 1,
            }}
          >
            {p.el}
          </div>
        ))}
      </div>

      {/* impact flash + light bridge */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-700"
        style={{
          background: `radial-gradient(110% 70% at 50% 50%, ${bg}55, transparent 70%)`,
          opacity: flash ? 0.9 : 0,
        }}
      />
      <PanelMarker hue={bg} lit={gone} />

      {/* reconstruction wipe */}
      <div
        className="absolute inset-0"
        style={{
          background: "#02030a",
          transform: wipe ? "scaleY(1)" : "scaleY(0)",
          transformOrigin: "bottom",
          transition: `transform ${wipeMs}ms cubic-bezier(0.7,0,0.2,1)`,
        }}
      />
    </div>
  );
}

export type { ShotPanel };