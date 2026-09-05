import { Hero } from "@/components/hero";
import { SkillsSection } from "@/components/skills-3d";
import { WorkSection } from "@/components/work";
import { AboutSection } from "@/components/about";
import { ContactSection } from "@/components/contact";

export default function Home() {
  return (
    <div className="relative">
      <Hero />
      <SkillsSection />
      <WorkSection />
      <AboutSection />
      <ContactSection />

      <footer className="relative border-t border-foreground/5 px-6 py-10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/30">
          <p>
            <span className="text-foreground/60">kris</span>@portfolio3d —
            director of light &amp; code
          </p>
          <p>© {new Date().getFullYear()} — shot &amp; shipped by Krish</p>
        </div>
      </footer>
    </div>
  );
}