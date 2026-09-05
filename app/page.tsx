import { Hero } from "@/components/hero";
import { SkillsSection } from "@/components/skills-3d";
import { WorkSection } from "@/components/work";
import { AboutSection } from "@/components/about";
import { ContactSection } from "@/components/contact";

export default function Home() {
  return (
    <div className="relative">
      <div aria-hidden className="scanlines fixed inset-0 z-[60]" />

      <Hero />
      <SkillsSection />
      <WorkSection />
      <AboutSection />
      <ContactSection />

      <footer className="relative border-t border-accent2/10 px-4 py-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 font-mono text-xs text-muted">
          <p>
            <span className="text-accent2">kris</span>@portfolio3d{" "}
            <span className="text-accent">:~$</span> logout
          </p>
          <p className="tabular-nums">
            © {new Date().getFullYear()} — shot & shipped by Krish
          </p>
        </div>
      </footer>
    </div>
  );
}