import { Film, ArrowUpRight } from "lucide-react";
import { SectionTerm } from "@/components/section-term";
import { projects } from "@/lib/data";

export function WorkSection() {
  return (
    <section id="work" className="relative min-h-dvh px-4 py-24">
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-transparent via-accent3/5 to-transparent" />

      <div className="relative mx-auto max-w-6xl">
        <SectionTerm path="projects/" title="ls ./projects" accent="text-accent2 glow-cyan" />

        <p className="-mt-6 mb-10 max-w-2xl font-mono text-sm leading-6 text-muted">
          <span className="text-accent3">[</span> selected work — frontend builds and
          finished frames <span className="text-accent3">]</span>
        </p>

        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((p) => (
            <article
              key={p.title}
              className="neon-card group relative rounded-lg overflow-hidden"
            >
              <div
                aria-hidden
                className="relative h-44 w-full overflow-hidden"
                style={{ background: `radial-gradient(circle at 20% 30%, ${p.color}22, transparent 60%), #0a0e27` }}
              >
                <div
                  className="absolute inset-0 opacity-20 transition-opacity duration-500 group-hover:opacity-40"
                  style={{
                    backgroundImage: `linear-gradient(${p.color}33 1px, transparent 1px), linear-gradient(90deg, ${p.color}33 1px, transparent 1px)`,
                    backgroundSize: "26px 26px",
                  }}
                />
                <span className="absolute bottom-3 left-3 rounded border border-white/10 px-2 py-0.5 font-mono text-[10px] text-foreground/70">
                  ./{p.title.toLowerCase().replace(/[^a-z0-9]/g, "-")}.frame
                </span>
                {p.badge && (
                  <span
                    className="absolute right-3 top-3 rounded px-2 py-0.5 font-mono text-[10px] font-bold text-background"
                    style={{ background: p.color }}
                  >
                    {p.badge}
                  </span>
                )}
              </div>

              <div className="p-5">
                <h3
                  data-text={p.title}
                  className="glitch text-lg font-black text-foreground"
                >
                  {p.title}
                </h3>
                <p className="mt-2 font-mono text-[13px] leading-6 text-muted">
                  {p.blurb}
                </p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <li
                      key={t}
                      className="rounded bg-white/5 px-2 py-0.5 font-mono text-[11px] text-accent2/80"
                    >
                      {t}
                    </li>
                  ))}
                </ul>

                <a
                  href={p.href}
                  className="mt-5 inline-flex items-center gap-1.5 font-mono text-xs text-accent transition-all hover:tracking-wider hover:text-accent3"
                >
                  open portal <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16">
          <p className="mb-4 font-mono text-sm text-accent3 glow-magenta">
            $ ls ./cinema/reels.mp4
          </p>
          <div className="grid gap-5 md:grid-cols-2">
            <ReelCard label="reel-01-2024" />
            <ReelCard label="reel-02-2025" />
          </div>
        </div>
      </div>
    </section>
  );
}

function ReelCard({ label }: { label: string }) {
  return (
    <div className="neon-card group relative overflow-hidden rounded-lg">
      <div
        aria-hidden
        className="relative flex h-52 items-center justify-center overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,0,255,0.12), transparent 45%), radial-gradient(circle at 80% 20%, rgba(0,217,255,0.18), transparent 55%)",
        }}
      >
        <div className="grid-bg absolute inset-0 opacity-60" />
        <span className="relative flex h-14 w-14 items-center justify-center rounded-full border border-accent3/50 bg-accent3/10 transition group-hover:scale-110 group-hover:bg-accent3/30">
          <Film className="h-6 w-6 text-accent3" />
        </span>
        <span className="absolute bottom-3 left-3 font-mono text-[10px] text-foreground/60">
          ● REC — {label}
        </span>
      </div>
      <div className="flex items-center justify-between p-4 font-mono text-xs text-muted">
        <span>{label}</span>
        <span className="text-accent2 transition group-hover:text-accent">
          play → open in cinematography
        </span>
      </div>
    </div>
  );
}