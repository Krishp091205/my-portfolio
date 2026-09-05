"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "motion/react";
import { useSmoothScroll } from "@/components/smooth-scroll";
import { BurstStage, type ShotPanel } from "@/components/cine/burst-stage";
import {
  CodePanel,
  DataPanel,
  SystemPanel,
  ProjectPanel,
  CameraPanel,
  StatsPanel,
  SkillsPanel,
  IconChip,
  LayerBackdrop,
} from "@/components/cine/layers";

/* ------------------------------------------------------------------
   CINEMATIC DIRECTOR — storyboards for the major scene changes.
   Every shot documents: trigger → pre-burst → impact → layers →
   camera → light → reconstruction → settle.
   ------------------------------------------------------------------ */

type Shot = {
  id: string;
  enter: string;
  /** palette: deep atmosphere hue + light bridge color */
  bg: string;
  panels: ShotPanel[];
};

const PANEL_WIDTHS = {
  sm: "min(34vw, 200px)",
  md: "min(46vw, 280px)",
  lg: "min(60vw, 360px)",
};

function FullSizedPanel({ children }: { children: ReactNode }) {
  return <div className="h-full">{children}</div>;
}

const SHOTS: Shot[] = [
  /* READ: frameless visual canister entering the technical brain */
  {
    id: "hero-to-skills",
    enter: "skills",
    bg: "#00d9ff",
    panels: [
      {
        id: "code-main",
        depth: "mid",
        x: -360,
        y: 0,
        rot: -8,
        width: PANEL_WIDTHS.lg,
        accent: "#00ff88",
        el: (
          <FullSizedPanel>
            <CodePanel />
          </FullSizedPanel>
        ),
      },
      {
        id: "sys-core",
        depth: "mid",
        x: 360,
        y: 0,
        rot: 7,
        width: PANEL_WIDTHS.md,
        accent: "#ff00ff",
        el: (
          <FullSizedPanel>
            <SystemPanel />
          </FullSizedPanel>
        ),
      },
      {
        id: "camera-probe",
        depth: "near",
        x: 0,
        y: 260,
        rot: 3,
        width: PANEL_WIDTHS.md,
        accent: "#00d9ff",
        el: (
          <FullSizedPanel>
            <CameraPanel />
          </FullSizedPanel>
        ),
      },
      {
        id: "data-goal",
        depth: "far",
        x: 0,
        y: -250,
        rot: -4,
        width: PANEL_WIDTHS.md,
        accent: "#00d9ff",
        el: (
          <FullSizedPanel>
            <DataPanel />
          </FullSizedPanel>
        ),
      },
      {
        id: "layer-backdrop",
        depth: "far",
        x: -320,
        y: 160,
        rot: 6,
        width: "min(30vw,180px)",
        accent: "#00d9ff",
        el: <LayerBackdrop hue="#00d9ff" />,
      },
      {
        id: "icon-gauge",
        depth: "near",
        x: 400,
        y: -220,
        rot: -10,
        width: "auto",
        accent: "#ff00ff",
        el: <IconChip icon="gauge" hue="#ff00ff" />,
      },
    ],
  },
  /* READ: the technical brain detonates into delivered projects */
  {
    id: "skills-to-projects",
    enter: "work",
    bg: "#ff00ff",
    panels: [
      {
        id: "data-accel",
        depth: "mid",
        x: -340,
        y: 0,
        rot: -7,
        width: PANEL_WIDTHS.md,
        accent: "#00d9ff",
        el: (
          <FullSizedPanel>
            <DataPanel />
          </FullSizedPanel>
        ),
      },
      {
        id: "projects-live",
        depth: "far",
        x: 0,
        y: -220,
        rot: -2,
        width: PANEL_WIDTHS.lg,
        accent: "#00ff88",
        el: (
          <FullSizedPanel>
            <ProjectPanel />
          </FullSizedPanel>
        ),
      },
      {
        id: "stats-core",
        depth: "mid",
        x: 340,
        y: 0,
        rot: 8,
        width: PANEL_WIDTHS.md,
        accent: "#00ff88",
        el: (
          <FullSizedPanel>
            <StatsPanel />
          </FullSizedPanel>
        ),
      },
      {
        id: "code-echo",
        depth: "near",
        x: -400,
        y: 260,
        rot: 5,
        width: PANEL_WIDTHS.sm,
        accent: "#00ff88",
        el: (
          <FullSizedPanel>
            <CodePanel />
          </FullSizedPanel>
        ),
      },
      {
        id: "layer-backdrop",
        depth: "far",
        x: 320,
        y: 200,
        rot: -5,
        width: "min(30vw,180px)",
        accent: "#ff00ff",
        el: <LayerBackdrop hue="#ff00ff" />,
      },
    ],
  },
  /* READ: projects pour past the camera, ending on the human/green farewell */
  {
    id: "projects-to-contact",
    enter: "about",
    bg: "#00ff88",
    panels: [
      {
        id: "camera-focus",
        depth: "near",
        x: 0,
        y: -260,
        rot: -3,
        width: PANEL_WIDTHS.lg,
        accent: "#00d9ff",
        el: (
          <FullSizedPanel>
            <CameraPanel />
          </FullSizedPanel>
        ),
      },
      {
        id: "skills-echo",
        depth: "mid",
        x: -340,
        y: 0,
        rot: -6,
        width: PANEL_WIDTHS.md,
        accent: "#ff00ff",
        el: (
          <FullSizedPanel>
            <SkillsPanel />
          </FullSizedPanel>
        ),
      },
      {
        id: "data-glide",
        depth: "mid",
        x: 340,
        y: 0,
        rot: 7,
        width: PANEL_WIDTHS.md,
        accent: "#00d9ff",
        el: (
          <FullSizedPanel>
            <DataPanel />
          </FullSizedPanel>
        ),
      },
      {
        id: "project-trail",
        depth: "far",
        x: 0,
        y: 300,
        rot: 4,
        width: PANEL_WIDTHS.sm,
        accent: "#00ff88",
        el: (
          <FullSizedPanel>
            <ProjectPanel />
          </FullSizedPanel>
        ),
      },
      {
        id: "icon-camera",
        depth: "near",
        x: 400,
        y: 220,
        rot: 9,
        width: "auto",
        accent: "#00d9ff",
        el: <IconChip icon="camera" hue="#00d9ff" />,
      },
    ],
  },
];

export function CinematicBurst() {
  const { stop, start } = useSmoothScroll();
  const reduced = useReducedMotion();
  const [active, setActive] = useState<Shot | null>(null);
  const [node, setNode] = useState(0);
  const buffered = useRef<Shot["id"] | null>(null);
  const running = useRef(false);

  function handleShot(id: string) {
    if (reduced) return;
    if (active) {
      buffered.current = id;
      return;
    }
    const shot = SHOTS.find((s) => s.id === id);
    if (!shot) return;
    running.current = true;
    stop();
    setActive(shot);
    setNode((n) => n + 1);
  }

  function handleDone() {
    running.current = false;
    setActive(null);
    start();
    if (buffered.current) {
      const next = buffered.current;
      buffered.current = null;
      handleShot(next);
    }
  }

  /* boundary observer — fires when a shot's enter-section top enters the band */
  useEffect(() => {
    if (reduced) return;
    const seen = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        const id = SHOTS.find((s) => s.enter === entry.target.id)?.id;
        if (!id) return;
        const top = entry.boundingClientRect.top;
        const vh = window.innerHeight;
        if (entry.isIntersecting) {
          if (!seen.has(id)) {
            seen.add(id);
            handleShot(id);
          }
        } else if (top > vh * 0.72) {
          seen.delete(id);
        }
      },
      { rootMargin: "-5% 0px -40% 0px" }
    );
    SHOTS.forEach((s) => {
      const el = document.getElementById(s.enter);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [reduced]);

  return (
    <>
      {active && (
        <BurstStage
          key={node}
          bg={active.bg}
          panels={active.panels}
          zMax={1200}
          wipeMs={650}
          onDone={handleDone}
        />
      )}
    </>
  );
}