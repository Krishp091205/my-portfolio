"use client";

import { useEffect, useState } from "react";
import { useSmoothScroll } from "@/components/smooth-scroll";

const NAV = [
  { id: "home", label: "~", num: "00" },
  { id: "skills", label: "skills/", num: "01" },
  { id: "work", label: "projects/", num: "02" },
  { id: "about", label: "about/", num: "03" },
  { id: "contact", label: "contact/", num: "04" },
] as const;

export function TerminalNav() {
  const { scrollTo } = useSmoothScroll();
  const [active, setActive] = useState<string>("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
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
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      const idx = NAV.findIndex((n) => n.id === active);
      if (idx === -1) return;
      if (e.key === "j") scrollTo(`#${NAV[(idx + 1) % NAV.length].id}`);
      if (e.key === "k") scrollTo(`#${NAV[(idx - 1 + NAV.length) % NAV.length].id}`);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [active, scrollTo]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${scrolled ? "border-b border-foreground/5 bg-background/55 backdrop-blur-xl" : "border-b border-transparent bg-transparent"}`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-6">
        <span className="shrink-0 whitespace-nowrap font-mono text-xs tracking-wide text-foreground/70">
          kris<span className="text-muted">@</span>portfolio3d
        </span>
        <span className="hidden h-px flex-1 bg-foreground/5 sm:block" />
        <nav className="flex min-w-0 items-center gap-1 overflow-x-auto md:gap-2">
          {NAV.map((n) => {
            const isActive = active === n.id;
            return (
              <button
                key={n.id}
                onClick={() => scrollTo(`#${n.id}`)}
                aria-current={isActive ? "true" : undefined}
                className={`group shrink-0 rounded px-3 py-1.5 font-mono text-xs transition-colors duration-300 ${
                  isActive
                    ? "text-foreground"
                    : "text-muted hover:text-foreground/80"
                }`}
              >
                <span
                  aria-hidden
                  className={`mr-1.5 align-middle text-[9px] ${isActive ? "text-accent" : "text-foreground/25 group-hover:text-foreground/50"}`}
                >
                  {n.num}
                </span>
                {n.label}
                {isActive && (
                  <span
                    aria-hidden
                    className="mx-auto mt-1 block h-px w-4 bg-accent/70"
                  />
                )}
              </button>
            );
          })}
        </nav>
        <span aria-hidden className="term-cursor hidden h-3 w-1.5 bg-accent/80 sm:block" />
      </div>
    </header>
  );
}