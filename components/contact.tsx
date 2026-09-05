"use client";

import { useState } from "react";
import { Code, Camera, MonitorPlay, Mail, Copy, Check, Send } from "lucide-react";
import { SectionTerm } from "@/components/section-term";
import { Reveal } from "@/components/reveal";
import { Magnetic } from "@/components/magnetic";
import { socials, EMAIL } from "@/lib/data";

const ICONS = {
  github: Code,
  instagram: Camera,
  youtube: MonitorPlay,
  mail: Mail,
} as const;

const FIELD =
  "w-full border-b border-foreground/12 bg-transparent py-3 font-mono text-sm text-foreground outline-none transition-colors duration-500 placeholder:text-foreground/25 focus:border-accent/60";

export function ContactSection() {
  const [draft, setDraft] = useState(false);
  const [copied, setCopied] = useState(false);

  function toggleDraft() {
    setDraft((v) => !v);
    setCopied(false);
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section id="contact" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionTerm path="contact/" title="Get in Touch" index="04" />
        </Reveal>

        <div className="grid gap-16 md:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-10">
            <Reveal>
              <p className="max-w-sm text-[15px] leading-7 text-muted">
                Freelance cinematography, frontend builds, and design work.
                TYBS and campus projects especially welcome.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/35">
                find me — elsewhere
              </p>
              <ul className="flex flex-wrap gap-3">
                {socials.map((s) => {
                  const Icon = ICONS[s.icon];
                  return (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        aria-label={s.label}
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-foreground/10 text-foreground/50 transition-all duration-500 hover:border-foreground/40 hover:text-foreground"
                      >
                        <Icon className="h-[18px] w-[18px]" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </Reveal>

            <Reveal delay={0.15}>
              <button
                type="button"
                onClick={copyEmail}
                className="group flex w-full items-center justify-between rounded-xl border border-foreground/8 bg-white/[0.015] p-5 text-left transition-colors duration-500 hover:border-accent/30"
                aria-live="polite"
              >
                <code className="font-mono text-xs text-muted">
                  <span className="text-foreground/60">$ echo $CONTACT_EMAIL</span>
                  <span className="mt-1 block truncate text-accent glow-lime">
                    {EMAIL}
                  </span>
                </code>
                <span className="ml-4 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-foreground/10 text-foreground/50 transition-all duration-500 group-hover:border-accent/40 group-hover:text-accent">
                  {copied ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </span>
              </button>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="relative">
              {draft && <PulseRing />}
              <form
                action={`mailto:${EMAIL}`}
                method="post"
                encType="text/plain"
                className="space-y-8"
              >
                <div className="grid gap-8 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1 flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/35">
                      name <span className="text-accent/70">01</span>
                    </span>
                    <input name="name" required placeholder="Your name" className={FIELD} />
                  </label>
                  <label className="block">
                    <span className="mb-1 flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/35">
                      email <span className="text-accent/70">02</span>
                    </span>
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="you@somewhere.com"
                      className={FIELD}
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="mb-1 flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/35">
                    message <span className="text-accent/70">03</span>
                  </span>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder="A logline of your idea…"
                    className={`${FIELD} resize-none`}
                  />
                </label>

                <Magnetic>
                  <button
                    type="submit"
                    onClick={toggleDraft}
                    className="group relative w-full overflow-hidden rounded-full border border-foreground/15 py-3.5 font-mono text-xs uppercase tracking-[0.25em] text-foreground/85 transition-all duration-500 hover:border-accent/40"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      open in your mail client <Send className="h-3.5 w-3.5" />
                    </span>
                    <span
                      aria-hidden
                      className="absolute inset-0 -translate-x-full bg-accent/[0.06] transition-transform duration-700 ease-out group-hover:translate-x-0"
                    />
                  </button>
                </Magnetic>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function PulseRing() {
  return (
    <div aria-hidden className="pointer-events-none absolute -top-6 left-1/2 z-0 h-24 w-24 -translate-x-1/2">
      <span className="pulse-ring absolute inset-0 rounded-full border border-accent/30" />
      <span
        className="pulse-ring absolute inset-0 rounded-full border border-accent/20"
        style={{ animationDelay: "0.35s" }}
      />
    </div>
  );
}