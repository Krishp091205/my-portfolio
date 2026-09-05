"use client";

import { useRef, useState } from "react";
import { ArrowUpRight, Film, Pause, Play } from "lucide-react";
import Link from "next/link";
import { SectionTerm } from "@/components/section-term";
import { Reveal } from "@/components/reveal";
import { projects, REEL, type Project } from "@/lib/data";

export function WorkSection() {
  return (
    <section id="work" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionTerm path="projects/" title="Selected Work" index="02" />
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mb-14 max-w-2xl text-[15px] leading-7 text-muted">
            A few scenes from two sets — the frontend and the film studio. No
            statistics, no exaggeration — just work worth watching.
          </p>
        </Reveal>

        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 0.12}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-24">
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-foreground/40">
            frames — director&apos;s reel
          </p>
          <ReelCard />
        </Reveal>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const ref = useRef<HTMLElement>(null);

  function onMove(e: React.MouseEvent<HTMLElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }

  return (
    <article ref={ref} onMouseMove={onMove} className="group relative">
      <Link
        href={`/work/${project.slug}`}
        aria-label={`${project.title} — case study`}
        className="cinematic-card block overflow-hidden rounded-2xl"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-background">
          <div className="absolute inset-0 transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.045]">
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background: `radial-gradient(circle at 28% 24%, ${project.color}14, transparent 55%), linear-gradient(160deg, #080a14, #0a0d1c)`,
              }}
            />
            <div aria-hidden className="grid-bg absolute inset-0 opacity-70" />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(420px circle at var(--mx, 60%) var(--my, 40%), rgba(255,255,255,0.05), transparent 70%)",
              }}
            />
          </div>

          <span className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-foreground/10 bg-background/50 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/60 backdrop-blur-md">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: project.color }}
            />
            {project.badge ?? "case study"}
          </span>

          <span className="absolute bottom-4 right-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/40 transition-all duration-500 group-hover:text-foreground/80">
            open <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>

        <div className="p-7 md:p-9">
          <h3
            data-text={project.title}
            className="glitch title-display font-display text-2xl font-medium text-foreground md:text-3xl"
          >
            {project.title}
          </h3>
          <p className="mt-3 text-[14px] leading-7 text-muted">
            {project.blurb}
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <li
                key={t}
                className="rounded-full border border-foreground/8 px-3 py-1 font-mono text-[11px] text-foreground/50"
              >
                {t}
              </li>
            ))}
          </ul>
          <span className="mt-7 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-foreground/60 transition-colors duration-500 group-hover:text-accent">
            enter case <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </Link>
    </article>
  );
}

function ReelCard() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);

  function play() {
    videoRef.current?.play().catch(() => {});
  }

  function pause() {
    videoRef.current?.pause();
  }

  function toggle() {
    if (paused) {
      pause();
    } else {
      play();
    }
    setPaused((v) => !v);
  }

  return (
    <div
      className="cinematic-card filmstrip group relative rounded-2xl"
      onMouseEnter={play}
      onMouseLeave={pause}
    >
      <div className="relative flex aspect-video items-center justify-center overflow-hidden bg-black">
        <video
          ref={videoRef}
          src={REEL.video}
          poster={REEL.poster}
          preload="metadata"
          playsInline
          loop
          muted
          controls={false}
          className="absolute inset-0 h-full w-full object-cover opacity-80 transition-opacity duration-700 group-hover:opacity-100"
        />
        <div aria-hidden className="absolute inset-0 bg-black/20" />
        <button
          type="button"
          onClick={toggle}
          aria-label={paused ? "pause reel" : "play reel"}
          className="relative flex h-16 w-16 items-center justify-center rounded-full border border-foreground/20 bg-background/40 text-foreground/70 backdrop-blur-md transition-all duration-700 group-hover:border-foreground/40 group-hover:text-foreground"
        >
          {paused ? (
            <Pause className="h-6 w-6" />
          ) : (
            <Play className="ml-0.5 h-6 w-6" />
          )}
        </button>
      </div>
      <div className="flex items-center justify-between border-t border-foreground/5 px-6 py-4 font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/40">
        <span className="flex items-center gap-2">
          <Film className="h-3.5 w-3.5" />
          reel — 2026 workprint
        </span>
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-accent/70" />
          rec
        </span>
      </div>
    </div>
  );
}