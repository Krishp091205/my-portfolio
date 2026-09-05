"use client";

import { useState, type FormEvent } from "react";
import { Code, Camera, MonitorPlay, Mail, Send } from "lucide-react";
import { SectionTerm } from "@/components/section-term";
import { socials } from "@/lib/data";

const ICONS = {
  github: Code,
  instagram: Camera,
  youtube: MonitorPlay,
  mail: Mail,
} as const;

type Status = "idle" | "sending" | "done";

export function ContactSection() {
  const [status, setStatus] = useState<Status>("idle");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const msg = String(fd.get("message") ?? "").trim();
    if (!name || !email || !msg) return;

    setStatus("sending");
    window.setTimeout(() => setStatus("done"), 1100);
  }

  return (
    <section id="contact" className="relative min-h-dvh px-4 py-24">
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-accent2/5 to-transparent" />

      <div className="relative mx-auto max-w-6xl">
        <SectionTerm path="contact/" title="vim ./contact.txt" accent="text-accent glow-lime" />

        <p className="-mt-6 mb-10 font-mono text-sm text-muted">
          <span className="text-accent">:</span>wq — then say hi, I write back fast.
        </p>

        <div className="grid items-start gap-10 md:grid-cols-2">
          <div className="space-y-4 font-mono text-sm leading-7 text-muted">
            <p>
              <span className="text-accent2">$ grep -r &quot;open to work&quot; .</span>
            </p>
            <p>
              Freelance cinematography, frontend builds, and design work — TYBS projects
              welcome.
            </p>
            <div className="pt-2">
              <p className="mb-3 text-xs uppercase tracking-widest text-accent2">
                $ links --social
              </p>
              <ul className="flex flex-wrap gap-3">
                {socials.map((s) => {
                  const Icon = ICONS[s.icon];
                  return (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        aria-label={s.label}
                        className="neon-card flex h-11 w-11 items-center justify-center rounded-full"
                      >
                        <Icon className="h-5 w-5 text-accent2 transition group-hover:text-accent" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className="relative">
            {status === "done" && <SuccessBurst />}
            <form onSubmit={onSubmit} className="neon-card space-y-5 rounded-lg p-6">
              <label className="block">
                <span className="mb-1.5 block font-mono text-xs text-muted">
                  name <span className="text-accent">$</span>
                </span>
                <input
                  name="name"
                  required
                  placeholder="anon"
                  className="w-full rounded border border-accent2/20 bg-transparent px-3 py-2 font-mono text-sm text-foreground outline-none transition focus:border-accent focus:shadow-[0_0_18px_rgba(0,255,136,0.25)] placeholder:text-muted/40"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block font-mono text-xs text-muted">
                  email <span className="text-accent">$</span>
                </span>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="you@inbox.dev"
                  className="w-full rounded border border-accent2/20 bg-transparent px-3 py-2 font-mono text-sm text-foreground outline-none transition focus:border-accent2 focus:shadow-[0_0_18px_rgba(0,217,255,0.25)] placeholder:text-muted/40"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block font-mono text-xs text-muted">
                  message <span className="text-accent">$</span>
                </span>
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder="attach brief or logline…"
                  className="w-full resize-none rounded border border-accent2/20 bg-transparent px-3 py-2 font-mono text-sm text-foreground outline-none transition focus:border-accent3 focus:shadow-[0_0_18px_rgba(255,0,255,0.25)] placeholder:text-muted/40"
                />
              </label>

              <button
                type="submit"
                disabled={status !== "idle"}
                className="inline-flex w-full items-center justify-center gap-2 rounded border border-accent bg-accent/10 px-4 py-2.5 font-mono text-sm font-bold text-accent transition hover:bg-accent hover:text-background disabled:opacity-60"
              >
                {status === "sending" ? (
                  <span className="term-cursor">transferring…</span>
                ) : (
                  <>
                    ./send_message <Send className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function SuccessBurst() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-10 overflow-hidden rounded-lg">
      {Array.from({ length: 18 }).map((_, i) => {
        const angle = (i / 18) * Math.PI * 2;
        const dist = 80 + (i % 5) * 36;
        return (
          <span
            key={i}
            className="burst-dot absolute left-1/2 top-1/3 h-2 w-2 rounded-sm"
            style={
              {
                background: ["#00ff88", "#00d9ff", "#ff00ff"][i % 3],
                "--dx": `${Math.cos(angle) * dist}px`,
                "--dy": `${Math.sin(angle) * dist}px`,
              } as React.CSSProperties
            }
          />
        );
      })}
    </div>
  );
}