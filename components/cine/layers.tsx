"use client";

import { Box, Camera, Code, Film, Gauge, HardDrive, Type } from "lucide-react";
import { skills, projects, timeline } from "@/lib/data";

/* ------------------------------------------------------------------
   CINEMATIC LAYERS — believable mini-interfaces
   These are the "interfaces inside the world". Each panel is a real
   software surface (code, data, system, per-platform, creative),
   not a glorified glowing rectangle.
   ------------------------------------------------------------------ */

const DOT = <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-current" />;

function Chrome({
  label,
  accent,
  children,
  className = "",
}: {
  label: string;
  accent: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex h-full flex-col overflow-hidden rounded-lg border border-foreground/12 bg-[#070910]/80 backdrop-blur-sm ${className}`}
    >
      <div className="flex shrink-0 items-center gap-2 border-b border-foreground/8 px-3 py-2">
        <span aria-hidden className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[#3a3f52]" />
          <span className="h-2 w-2 rounded-full bg-[#31364a]" />
          <span className="h-2 w-2 rounded-full bg-[#262b3d]" />
        </span>
        <span
          className="ml-1 flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-foreground/45"
          style={{ color: accent }}
        >
          {DOT}
          {label}
        </span>
      </div>
      <div className="min-h-0 flex-1 overflow-hidden p-3">{children}</div>
    </div>
  );
}

/* LAYER — DATA: running metrics, charts, counters */
export function DataPanel() {
  return (
    <Chrome label="data.stream" accent="#00d9ff">
      <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/35">
        live metrics
      </p>
      <div className="mt-2 grid grid-cols-3 gap-1.5 font-mono">
        {[
          ["fps", "144"],
          ["lat", "12ms"],
          ["load", "0.4s"],
        ].map(([k, v]) => (
          <div
            key={k}
            className="rounded border border-foreground/8 bg-white/[0.02] px-1.5 py-1"
          >
            <p className="text-[8px] uppercase text-foreground/35">{k}</p>
            <p className="text-[11px] text-foreground/85">{v}</p>
          </div>
        ))}
      </div>
      <svg
        aria-hidden
        viewBox="0 0 160 48"
        className="mt-2 w-full"
        preserveAspectRatio="none"
      >
        <path
          d="M0 36 L14 30 L28 33 L42 22 L56 26 L70 14 L84 18 L98 9 L112 14 L126 6 L140 10 L160 3"
          fill="none"
          stroke="#00d9ff"
          strokeWidth="1.5"
          strokeLinejoin="round"
          opacity="0.9"
        />
        <path
          d="M0 36 L14 30 L28 33 L42 22 L56 26 L70 14 L84 18 L98 9 L112 14 L126 6 L140 10 L160 3 L160 48 L0 48 Z"
          fill="url(#cine-data-fill)"
          opacity="0.18"
        />
        <defs>
          <linearGradient id="cine-data-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#00d9ff" stopOpacity="0.5" />
            <stop offset="1" stopColor="#00d9ff" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
      <div className="mt-1.5 h-1 w-full overflow-hidden rounded bg-foreground/8">
        <div className="h-full w-3/4 bg-accent" />
      </div>
    </Chrome>
  );
}

/* LAYER — CODE: believable editor frame */
export function CodePanel() {
  return (
    <Chrome label="editor.tsx" accent="#00ff88">
      <p className="font-mono text-[9px] leading-relaxed">
        <span className="text-foreground/35">01 </span>
        <span className="text-accent2">import</span>
        <span className="text-foreground/70"> {"{ useFrame }"} </span>
        <span className="text-accent2">from</span>
        <span className="text-muted"> &quot;@react-three/fiber&quot;</span>
      </p>
      <p className="font-mono text-[9px] leading-relaxed">
        <span className="text-foreground/35">02 </span>
        <span className="text-accent2">const</span>
        <span className="text-foreground/70"> scene = </span>
        <span className="text-accent2">new</span>
        <span className="text-foreground/70"> Director()</span>
      </p>
      <p className="font-mono text-[9px] leading-relaxed">
        <span className="text-foreground/35">03 </span>
        <span className="text-foreground/70">scene.cut(</span>
        <span className="text-accent3">&quot;skills&quot;</span>
        <span className="text-foreground/70">)</span>
      </p>
      <p className="font-mono text-[9px] leading-relaxed">
        <span className="text-foreground/35">04 </span>
        <span className="text-foreground/70">camera.push(</span>
        <span className="text-accent">1.8</span>
        <span className="text-foreground/70">)</span>
      </p>
      <p className="font-mono text-[9px] leading-relaxed">
        <span className="text-foreground/35">05 </span>
        <span className="text-accent3">burst</span>
        <span className="text-foreground/70">.layers()</span>
      </p>
      <div className="mt-2 flex gap-1.5">
        {["R3F", "Motion", "Lenis"].map((t) => (
          <span
            key={t}
            className="rounded-full border border-foreground/8 px-1.5 py-0.5 font-mono text-[8px] text-foreground/55"
          >
            {t}
          </span>
        ))}
      </div>
    </Chrome>
  );
}

/* LAYER — SYSTEM: architecture + status */
export function SystemPanel() {
  return (
    <Chrome label="sys.core" accent="#ff00ff">
      <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.18em] text-foreground/40">
        <span>render graph</span>
        <span className="text-accent">ok</span>
      </div>
      <div className="mt-2 space-y-1 font-mono text-[9px]">
        {[
          ["pipeline", 74],
          ["shader", 38],
          ["scene-buf", 52],
          ["gpu", 61],
        ].map(([k, v]) => (
          <div key={k as string}>
            <div className="flex justify-between text-foreground/50">
              <span>{k}</span>
              <span>{v}%</span>
            </div>
            <div className="mt-0.5 h-1 overflow-hidden rounded bg-foreground/8">
              <div
                className="h-full rounded"
                style={{ width: `${v}%`, background: "#ff00ff" }}
              />
            </div>
          </div>
        ))}
      </div>
      <p className="mt-2 font-mono text-[8px] text-foreground/35">
        layers routed · 4 nodes · 0 warnings
      </p>
    </Chrome>
  );
}

/* LAYER — CAMERA / CREATIVE: lens work */
export function CameraPanel() {
  return (
    <Chrome label="viewfinder" accent="#00d9ff">
      <div className="relative aspect-[4/3] overflow-hidden rounded border border-foreground/8 bg-black">
        <div aria-hidden className="absolute inset-[4px] border border-foreground/10" />
        <span
          aria-hidden
          className="absolute inset-y-0 left-1/2 w-px bg-foreground/15"
        />
        <span
          aria-hidden
          className="absolute inset-x-0 top-1/2 h-px bg-foreground/15"
        />
        <span aria-hidden className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent" />
        <div className="absolute bottom-1.5 left-1.5 font-mono text-[8px] text-foreground/50">
          50mm · f/1.8 · 1/50
        </div>
      </div>
      <p className="mt-2 font-mono text-[8px] uppercase tracking-[0.18em] text-foreground/40">
        grade · rec709 → film
      </p>
    </Chrome>
  );
}

/* LAYER — PROJECT: real project chips */
export function ProjectPanel() {
  return (
    <Chrome label="projects.live" accent="#00ff88">
      <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/35">
        shipping
      </p>
      <ul className="mt-2 space-y-1.5">
        {projects.slice(0, 3).map((p) => (
          <li
            key={p.slug}
            className="flex items-center gap-2 rounded border border-foreground/8 px-1.5 py-1"
          >
            <span
              aria-hidden
              className="h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ background: p.color }}
            />
            <span className="font-mono text-[9px] text-foreground/75">
              {p.title}
            </span>
          </li>
        ))}
      </ul>
    </Chrome>
  );
}

/* LAYER — DATA-2 / stats: believable counters */
export function StatsPanel() {
  return (
    <Chrome label="index.stats" accent="#00d9ff">
      <div className="grid grid-cols-2 gap-1.5">
        {[
          ["films cut", "24+"],
          ["frames graded", "180K"],
          ["builds shipped", "30+"],
          ["scenes shot", "5"],
        ].map(([k, v]) => (
          <div key={k} className="rounded border border-foreground/8 px-2 py-1.5">
            <p className="font-mono text-[9px] uppercase text-foreground/35">
              {k}
            </p>
            <p className="font-mono text-[12px] text-foreground/85">{v}</p>
          </div>
        ))}
      </div>
    </Chrome>
  );
}

/* LAYER — SKILLS chip cloud (for the technical brain) */
export function SkillsPanel() {
  return (
    <Chrome label="capabilities" accent="#ff00ff">
      <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/35">
        registry
      </p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {skills.map((s) => (
          <span
            key={s.title}
            className="rounded-full border border-foreground/8 px-2 py-1 font-mono text-[8px]"
            style={{ color: s.color }}
          >
            {s.title}
          </span>
        ))}
      </div>
      <div className="mt-2 border-t border-foreground/8 pt-2">
        <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-foreground/35">
          timeline
        </p>
        <ul className="mt-1 space-y-1">
          {timeline.map((t) => (
            <li key={t.year} className="flex gap-2 font-mono text-[8px] text-foreground/55">
              <span style={{ color: t.color }}>{t.year}</span>
              <span className="truncate">{t.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </Chrome>
  );
}

/* Mini icon chips used by the storyboard */
export function IconChip({
  icon,
  hue,
}: {
  icon: "code" | "type" | "box" | "camera" | "film" | "gauge" | "drive";
  hue: string;
}) {
  const map = {
    code: Code,
    type: Type,
    box: Box,
    camera: Camera,
    film: Film,
    gauge: Gauge,
    drive: HardDrive,
  };
  const Icon = map[icon];
  return (
    <span
      aria-hidden
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-foreground/10 bg-[#070910]/80"
      style={{ color: hue }}
    >
      <Icon className="h-4 w-4" />
    </span>
  );
}

export function LayerBackdrop({ hue }: { hue: string }) {
  return (
    <div
      aria-hidden
      style={{
        background: `radial-gradient(60% 60% at 50% 50%, ${hue}14, transparent 70%)`,
      }}
      className="absolute inset-0"
    />
  );
}