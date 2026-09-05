"use client";

import { useEffect, useRef, useState } from "react";
import { motion, type Variants } from "motion/react";
import { useSmoothScroll } from "@/components/smooth-scroll";
import { HeroParticles } from "@/components/particle-field";
import { Magnetic } from "@/components/magnetic";
import { EASE } from "@/components/reveal";
import { useBoot } from "@/components/preloader";

const BOOT_LINES: { prompt: string; output: string[] }[] = [
  {
    prompt: "whoami",
    output: ["cinematographer · frontend dev · designer · TYBS IT student"],
  },
  {
    prompt: "neofetch --3d",
    output: [
      "OS ........ terminal@3d",
      "SHELL ..... zsh-r3f (realtime)",
      "STACK ..... Next.js · Three.js · Motion · Lenis",
      "STATUS .... shooting official",
    ],
  },
];

function BootTerminal() {
  const [step, setStep] = useState(0);
  const [typed, setTyped] = useState(0);

  useEffect(() => {
    if (step >= BOOT_LINES.length) return;
    const max = BOOT_LINES[step].prompt.length;
    const t = setTimeout(() => {
      if (typed < max) setTyped((v) => v + 1);
      else {
        setStep((v) => v + 1);
        setTyped(0);
      }
    }, 60);
    return () => clearTimeout(t);
  }, [step, typed]);

  const visible = BOOT_LINES.slice(0, step + 1);

  return (
    <div className="cinematic-card overflow-hidden rounded-xl">
      <div className="flex items-center gap-2 border-b border-foreground/5 px-5 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#3a3f52]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#3a3f52]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#40455c]" />
        <span className="ml-3 font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/30">
          session — portfolio3d
        </span>
      </div>
      <div className="p-6 font-mono text-[13px] leading-7">
        {visible.map((line, i) => {
          const isLatest = i === visible.length - 1;
          const showTyped = isLatest ? line.prompt.slice(0, typed) : line.prompt;
          const showOutput =
            isLatest ? step > i && typed >= line.prompt.length : true;
          return (
            <div key={i}>
              <p className="text-foreground/70">
                <span className="text-accent">$</span> {showTyped}
                {isLatest && (
                  <span
                    aria-hidden
                    className="term-cursor ml-1 inline-block h-3.5 w-1.5 bg-accent/80 align-middle"
                  />
                )}
              </p>
              {showOutput &&
                line.output.map((o, j) => (
                  <p key={j} className="pl-6 text-muted">
                    {o}
                  </p>
                ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.16, delayChildren: 0.18 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.2, ease: EASE },
  },
};

export function Hero() {
  const { scrollTo } = useSmoothScroll();
  const { booted } = useBoot();
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (booted && titleRef.current) {
      const t = window.setTimeout(
        () => titleRef.current?.classList.add("wm-show"),
        420
      );
      return () => window.clearTimeout(t);
    }
  }, [booted]);

  return (
    <section
      id="home"
      className="hero-stage relative flex min-h-dvh items-center overflow-hidden px-6 pt-16"
    >
      {/* reserved key-light the page settles under; hauls away as you scroll */}
      <div aria-hidden className="scene-light" />

      {/* environment enters slowly — never commanding */}
      <motion.div
        aria-hidden
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: booted ? 1 : 0 }}
        transition={{ duration: 2.4, ease: "easeOut", delay: 0.1 }}
      >
        <HeroParticles />
      </motion.div>

      {/* source light establishes focus */}
      <motion.div
        aria-hidden
        className="absolute left-[8%] top-[26%] h-[46vw] max-h-[640px] w-[46vw] max-w-[640px] rounded-full"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{
          opacity: booted ? 1 : 0,
          scale: booted ? 1 : 0.9,
        }}
        transition={{ duration: 2.2, ease: EASE, delay: 0.1 }}
        style={{
          background:
            "radial-gradient(circle, rgba(130,150,255,0.07), rgba(0,217,255,0.027) 45%, transparent 68%)",
        }}
      />

      <motion.div
        className="mx-auto grid w-full max-w-6xl items-center gap-14 md:grid-cols-[1.1fr_0.9fr]"
        variants={container}
        initial="hidden"
        animate={booted ? "show" : "hidden"}
      >
        <div>
          <motion.p
            variants={item}
            className="mb-8 font-mono text-xs uppercase tracking-[0.35em] text-muted"
          >
            <span className="text-accent">●</span> opening light — part 01
          </motion.p>

          <motion.h1
            ref={titleRef}
            variants={item}
            className="title-display font-display text-4xl font-medium leading-[1.05] text-foreground md:text-6xl"
          >
            <span className="word-mask">
              <span>I direct</span>
            </span>{" "}
            <span className="word-mask">
              <span>light,</span>
            </span>
            <br />
            <span className="word-mask">
              <span>pixels</span>
            </span>{" "}
            <span className="font-serif-accent italic">
              <span className="word-mask">
                <span>and</span>
              </span>
            </span>
            <br />
            <span className="word-mask">
              <span>interaction.</span>
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-7 max-w-md text-[15px] leading-7 text-muted"
          >
            Cinematographer and frontend developer — framing stories on set and
            in the browser. Currently an IT student at TYBS.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-10 flex flex-wrap gap-4 font-mono text-sm"
          >
            <Magnetic>
              <button
                onClick={() => scrollTo("#work")}
                className="group relative overflow-hidden rounded-full border border-foreground/15 px-6 py-3 text-foreground/90 transition-colors duration-500 hover:border-accent/40"
              >
                <span className="relative z-10">view work</span>
                <span
                  aria-hidden
                  className="absolute inset-0 -translate-x-full bg-accent/10 transition-transform duration-700 ease-out group-hover:translate-x-0"
                />
              </button>
            </Magnetic>
            <Magnetic>
              <button
                onClick={() => scrollTo("#contact")}
                className="rounded-full border border-foreground/10 px-6 py-3 text-muted transition-all duration-500 hover:border-foreground/30 hover:text-foreground"
              >
                open contact
              </button>
            </Magnetic>
          </motion.div>
        </div>

        <motion.div
          variants={item}
          className="w-full"
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.15 }}
        >
          <BootTerminal />
        </motion.div>
      </motion.div>

      <motion.button
        onClick={() => scrollTo("#skills")}
        aria-label="Scroll to skills"
        initial={{ opacity: 0 }}
        animate={{ opacity: booted ? 1 : 0 }}
        transition={{ duration: 1.4, ease: "easeOut", delay: 2.2 }}
        className="absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/35 transition-colors duration-500 hover:text-foreground/70"
      >
        scroll
        <span className="block h-9 w-px bg-gradient-to-b from-transparent via-foreground/30 to-transparent" />
      </motion.button>
    </section>
  );
}