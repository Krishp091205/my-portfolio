import { SectionTerm } from "@/components/section-term";
import { timeline } from "@/lib/data";

export function AboutSection() {
  return (
    <section id="about" className="relative min-h-dvh overflow-hidden px-4 py-24">
      <div aria-hidden className="grid-bg absolute inset-0" />

      <div className="relative mx-auto max-w-6xl">
        <SectionTerm path="about/" title="cat ./about.md" accent="text-accent3 glow-magenta" />

        <div className="grid gap-12 md:grid-cols-2">
          <div className="space-y-4 font-mono text-sm leading-7">
            <p>
              <span className="text-accent2">$ echo $WHO_AM_I</span>
            </p>
            <p>
              A <span className="glow-magenta text-accent3">cinematographer</span> and{" "}
              <span className="glow-cyan text-accent2">frontend developer</span> who
              treats a browser like a camera — aperture, exposure, depth of field…{" "}
              <span className="text-accent">translate</span>,{" "}
              <span className="text-accent">rotate</span>,{" "}
              <span className="text-accent">animate</span>.
            </p>
            <p className="text-muted">
              When I am not grading footage in DaVinci or cutting timelines in Premiere,
              I am wiring up React Three Fiber scenes, designing UI systems, and shipping
              interactive experiences as a TYBS IT student.
            </p>
            <p>
              <span className="text-accent2">$ cat .philosophy</span>
            </p>
            <p className="border-l-2 border-accent pl-4 text-muted">
              Every interface is a scene. Every scroll is a camera move. Direction does
              not stop at film — it is the craft behind everything I build.
            </p>
          </div>

          <div className="relative pl-6">
            <div
              aria-hidden
              className="absolute bottom-2 left-[7px] top-2 w-px bg-gradient-to-b from-accent2 via-accent3 to-accent"
            />
            <ol className="space-y-10">
              {timeline.map((step) => (
                <li key={step.year} className="relative pl-8">
                  <span
                    aria-hidden
                    className="absolute left-0 top-1 h-[15px] w-[15px] rounded-full border-2"
                    style={{ background: "#0a0e27", borderColor: step.color, boxShadow: `0 0 12px ${step.color}66` }}
                  />
                  <p className="font-mono text-[11px] uppercase tracking-widest" style={{ color: step.color }}>
                    {step.year}
                  </p>
                  <h3 className="mt-1 font-mono text-base font-bold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 font-mono text-[13px] leading-6 text-muted">
                    {step.detail}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}