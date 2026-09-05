"use client";

import { useEffect, useState } from "react";
import { useSmoothScroll } from "@/components/smooth-scroll";

const NAV = [
  { id: "home", label: "~" },
  { id: "skills", label: "skills/" },
  { id: "work", label: "projects/" },
  { id: "about", label: "about/" },
  { id: "contact", label: "contact/" },
] as const;

export function TerminalNav() {
  const { scrollTo } = useSmoothScroll();
  const [active, setActive] = useState<string>("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    NAV.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      const idx = NAV.findIndex((n) => n.id === active);
      if (idx === -1) return;
      if (e.key === "j") {
        const next = NAV[(idx + 1) % NAV.length];
        scrollTo(`#${next.id}`);
      }
      if (e.key === "k") {
        const prev = NAV[(idx - 1 + NAV.length) % NAV.length];
        scrollTo(`#${prev.id}`);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [active, scrollTo]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-accent2/15 bg-background/70 backdrop-blur-md">
      <div className="mx-auto flex h-12 max-w-6xl items-center gap-3 px-4 font-mono text-xs">
        <span className="shrink-0 whitespace-nowrap text-accent2">
          root@portfolio3d
        </span>
        <span className="text-muted">:</span>
        <span className="shrink-0 whitespace-nowrap text-muted">
          ~/{NAV.find((n) => n.id === active)?.label ?? "~"}
        </span>
        <span className="text-accent">$</span>
        <nav className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto md:gap-2">
          {NAV.map((n) => {
            const isActive = active === n.id;
            return (
              <button
                key={n.id}
                onClick={() => scrollTo(`#${n.id}`)}
                className={`shrink-0 rounded px-2 py-1 transition-colors ${
                  isActive
                    ? "text-accent glow-lime"
                    : "text-muted hover:text-accent2"
                }`}
              >
                {n.label}
              </button>
            );
          })}
        </nav>
        <span aria-hidden className="ml-auto hidden shrink-0 whitespace-nowrap tabular-nums text-accent2/70 sm:inline">
          {active.toUpperCase()}
        </span>
        <span aria-hidden className="term-cursor inline-block h-3.5 w-2 bg-accent" />
      </div>
    </header>
  );
}