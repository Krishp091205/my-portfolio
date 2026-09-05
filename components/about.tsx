import { Reveal } from "@/components/reveal";
import { SectionTerm } from "@/components/section-term";
import { timeline } from "@/lib/data";

export function AboutSection() {
  return (
    <section id="about" className="relative overflow-hidden px-6 py-28">
      <div aria-hidden className="grid-bg absolute inset-0 opacity-60" />

      <div className="relative mx-auto max-w-6xl">
        <Reveal>
          <SectionTerm path="about/" title="On Me" index="03" />
        </Reveal>

        <div className="grid gap-16 md:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-8">
            <Reveal>
              <p className="text-2xl leading-snug text-foreground/90 md:text-[28px] md:leading-[1.35]">
                A cinematographer and frontend developer who treats the browser
                like a camera — aperture, exposure, depth.{" "}
                <span className="font-serif-accent italic text-foreground">
                  Code is my second lens.
                </span>
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="max-w-xl text-[15px] leading-7 text-muted">
                When I am not pushing grade curves in DaVinci or cutting
                timelines in Premiere, I am wiring up React Three Fiber scenes,
                designing interface systems, and shipping interactive
                experiences. Currently studying IT at TYBS — and always
                building.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="max-w-md border-l border-foreground/12 pl-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/35">
                  $ cat .philosophy
                </p>
                <p className="mt-3 text-[14px] leading-7 text-foreground/70">
                  Every interface is a scene. Every scroll is a camera move.
                  Direction does not stop at film — it is the craft behind
                  everything I build.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="relative pl-7">
              <div
                aria-hidden
                className="absolute bottom-4 left-[7px] top-2 w-px bg-gradient-to-b from-foreground/8 via-foreground/12 to-foreground/8"
              />
              <ol className="space-y-12">
                {timeline.map((step) => (
                  <li key={step.year} className="relative">
                    <span
                      aria-hidden
                      className="absolute -left-7 top-1.5 block h-[15px] w-[15px] rounded-full border border-foreground/25 bg-background transition-colors duration-500 hover:border-accent/70"
                      style={{ boxShadow: "0 0 0 rgba(0,255,136,0)" }}
                    />
                    <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/35">
                      {step.year}
                    </p>
                    <h3 className="mt-2 font-display text-lg font-medium text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-[14px] leading-7 text-muted">
                      {step.detail}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}