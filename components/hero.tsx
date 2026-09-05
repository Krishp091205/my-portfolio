"use client";

import { useEffect, useState } from "react";
import { useSmoothScroll } from "@/components/smooth-scroll";
import { HeroParticles } from "@/components/particle-field";

const BOOT_LINES: { prompt: string; output: string[] }[] = [
  {
    prompt: "whoami",
    output: ["kris — cinematographer / frontend dev / designer / TYBS IT student"],
  },
  {
    prompt: "neofetch --3d",
    output: [
      "OS ........ linux-terminal@3d",
      "SHELL ..... zsh-r3f (realtime)",
      "STACK ..... Next.js · Three.js · Motion",
      "AESTHETIC .. cyber-retro",
      "STATUS .... shipping",
    ],
  },
];

function useTypedText(text: string, speed = 38, startDelay = 0) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(t);
  }, [startDelay]);

  useEffect(() => {
    if (!started) return;
    if (count >= text.length) return;
    const t = setTimeout(() => setCount((c) => c + 1), speed);
    return () => clearTimeout(t);
  }, [started, count, text, speed]);

  return text.slice(0, count);
}

function BootTerminal() {
  const [step, setStep] = useState(0);
  const [typed, setTyped] = useState(0);

  useEffect(() => {
    if (step >= BOOT_LINES.length) return;
    const max = BOOT_LINES[step].prompt.length;
    const t = setTimeout(() => {
      if (typed < max) {
        setTyped((t) => t + 1);
      } else {
        setStep((s) => s + 1);
        setTyped(0);
      }
    }, 55);
    return () => clearTimeout(t);
  }, [step, typed]);

  const visible = BOOT_LINES.slice(0, Math.min(step + 1, BOOT_LINES.length));

  return (
    <div className="neon-card w-full max-w-xl rounded-lg p-5 font-mono text-[13px] leading-6">
      <div className="mb-3 flex items-center gap-2 border-b border-accent2/10 pb-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-2 text-[11px] text-muted">portfolio3d — bash</span>
      </div>

      {visible.map((line, i) => {
        const isLatest = i === visible.length - 1;
        const showTyped = isLatest ? line.prompt.slice(0, typed) : line.prompt;
        const showOutput = isLatest ? step > i && typed >= line.prompt.length : true;
        return (
          <div key={i}>
            <p>
              <span className="text-accent2">kris</span>
              <span className="text-muted">@</span>
              <span className="text-muted">portfolio3d</span>
              <span className="text-accent">:$ </span>
              <span className="text-foreground">{showTyped}</span>
              {isLatest && (
                <span aria-hidden className="term-cursor ml-0.5 inline-block h-3 w-1.5 bg-accent align-middle" />
              )}
            </p>
            {showOutput &&
              line.output.map((o, j) => (
                <p key={j} className="pl-4 text-accent2/90">
                  {o}
                </p>
              ))}
          </div>
        );
      })}
    </div>
  );
}

const HEADLINE = "I build worlds at the intersection of code & camera.";

export function Hero() {
  const { scrollTo } = useSmoothScroll();
  const headline = useTypedText(HEADLINE, 34, 2600);

  return (
    <section id="home" className="relative flex min-h-dvh items-center overflow-hidden px-4 pt-16">
      <HeroParticles />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 md:grid-cols-2">
        <div>
          <p className="mb-4 font-mono text-sm text-accent3 glow-magenta">
            $ ls ./intro
          </p>
          <h1
            data-text={HEADLINE}
            className="glitch text-3xl font-black leading-tight text-foreground md:text-5xl"
          >
            {headline}
            <span aria-hidden className="term-cursor ml-1 inline-block h-6 w-2.5 bg-accent align-middle" />
          </h1>
          <p className="mt-5 max-w-md font-mono text-sm leading-6 text-muted">
            <span className="text-accent">[</span> cinematography, interactive frontend
            & design — rendered live in three dimensions{" "}
            <span className="text-accent">]</span>
          </p>

          <div className="mt-8 flex flex-wrap gap-3 font-mono text-sm">
            <button
              onClick={() => scrollTo("#work")}
              className="rounded border border-accent px-4 py-2 text-accent glow-lime transition hover:bg-accent hover:text-background"
            >
              cd projects/
            </button>
            <button
              onClick={() => scrollTo("#contact")}
              className="rounded border border-accent2/40 px-4 py-2 text-accent2 transition hover:bg-accent2/10"
            >
              cat contact →
            </button>
          </div>
        </div>

        <BootTerminal />
      </div>

      <button
        onClick={() => scrollTo("#skills")}
        aria-label="Scroll to skills"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-xs text-muted transition hover:text-accent"
      >
        <span className="mb-2 block text-center">Scroll to explore</span>
        <span className="mx-auto block h-8 w-5 rounded-full border border-current p-1">
          <span className="block h-2 w-full animate-bounce rounded-full bg-accent" />
        </span>
      </button>
    </section>
  );
}