import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, Film, Terminal } from "lucide-react";
import Link from "next/link";
import { projects } from "@/lib/data";
import { SectionTerm } from "@/components/section-term";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} — Krish`,
    description: project.blurb,
  };
}

export default async function CasePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();
  const projectIndex = projects.indexOf(project);

  return (
    <section className="relative px-6 pb-32 pt-40">
      <div className="mx-auto max-w-6xl">
        <SectionTerm
          path={`work/${slug}.tsx/`}
          title={project.title}
          index={`0${projectIndex + 1} — case`}
        />

        <div className="mt-10 grid gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="space-y-6">
            <p className="max-w-xl text-lg leading-8 text-muted">
              {project.blurb}
            </p>

            {project.detail.map((d, i) => (
              <div key={d} className="flex gap-4">
                <span
                  className="mt-1 font-mono text-xs text-foreground/40"
                  style={{ color: project.color }}
                >
                  0{i + 1}
                </span>
                <p className="flex-1 text-[15px] leading-7 text-foreground/75">
                  {d}
                </p>
              </div>
            ))}

            <ul className="flex flex-wrap gap-2 pt-4">
              {project.tags.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-foreground/8 px-3 py-1 font-mono text-[11px] text-foreground/50"
                >
                  {t}
                </li>
              ))}
            </ul>

            <div className="rounded-xl border border-foreground/8 bg-white/[0.015] p-5 font-mono text-xs leading-6 text-muted">
              <p className="text-foreground/60">
                $ cat {project.slug}.md — details
              </p>
              <p className="mt-1 text-accent glow-lime">
                → full write-up, assets &amp; timestamps coming soon.
              </p>
            </div>
          </article>

          <aside>
            <div
              className="cinematic-card overflow-hidden rounded-2xl"
              style={{
                background: `radial-gradient(circle at 30% 25%, ${project.color}14, transparent 60%), linear-gradient(160deg, #080a14, #0a0d1c)`,
              }}
            >
              <div className="grid-bg relative flex aspect-[16/10] items-center justify-center opacity-90">
                <span
                  aria-hidden
                  className="flex h-16 w-16 items-center justify-center rounded-full border border-foreground/10"
                >
                  <Film className="h-6 w-6 text-foreground/40" />
                </span>
              </div>
              <div className="flex items-center justify-between border-t border-foreground/5 px-6 py-4 font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/40">
                <span>{project.badge ?? "case study"}</span>
                <span className="flex items-center gap-2">
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: project.color }}
                  />
                  {project.slug}
                </span>
              </div>
            </div>
          </aside>
        </div>

        <nav className="mt-20 flex items-center justify-between border-t border-foreground/8 pt-8">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-foreground/60 transition-colors duration-500 hover:text-accent"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> all work
          </Link>
          <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/30">
            <Terminal className="h-3.5 w-3.5" />
            generated at build time
          </span>
        </nav>
      </div>
    </section>
  );
}