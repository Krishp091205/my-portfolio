"use client";

import { useRef, type ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { Box, Film, GraduationCap, PenTool } from "lucide-react";
import { SectionTerm } from "@/components/section-term";
import { skills, type Skill } from "@/lib/data";

function OrbitNode({
  shape,
  color,
  radius,
  speed,
  phase,
}: {
  shape: Skill["icon"];
  color: string;
  radius: number;
  speed: number;
  phase: number;
}) {
  const group = useRef<THREE.Group>(null);

  useFrame(({ clock }, delta) => {
    const t = clock.getElapsedTime();
    if (!group.current) return;
    const a = t * speed + phase;
    group.current.position.x = Math.cos(a) * radius;
    group.current.position.z = Math.sin(a) * radius;
    group.current.position.y = Math.sin(t * 1.1 + phase) * 0.3;
    group.current.rotation.y += delta * 0.5;
    group.current.rotation.x += delta * 0.2;
  });

  let geo: ReactNode = null;
  let fill: ReactNode = null;
  if (shape === "cube") {
    geo = <boxGeometry args={[0.85, 0.85, 0.85]} />;
    fill = <boxGeometry args={[0.8, 0.8, 0.8]} />;
  } else if (shape === "sphere") {
    geo = <sphereGeometry args={[0.6, 20, 20]} />;
    fill = <sphereGeometry args={[0.58, 20, 20]} />;
  } else if (shape === "cone") {
    geo = <coneGeometry args={[0.6, 1, 4]} />;
    fill = <coneGeometry args={[0.58, 0.96, 4]} />;
  } else {
    geo = <torusGeometry args={[0.55, 0.22, 12, 32]} />;
    fill = <torusGeometry args={[0.55, 0.2, 12, 32]} />;
  }

  return (
    <group ref={group}>
      <mesh>
        {geo}
        <meshBasicMaterial wireframe color={color} transparent opacity={0.9} />
      </mesh>
      <mesh scale={0.985}>
        {fill}
        <meshBasicMaterial color={color} transparent opacity={0.08} />
      </mesh>
    </group>
  );
}

function CenterCore() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    const s = 0.32 + Math.sin(t * 1.6) * 0.05;
    ref.current.scale.setScalar(s);
    ref.current.rotation.y += 0.004;
    ref.current.rotation.z += 0.002;
  });

  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.1, 1]} />
      <meshBasicMaterial wireframe color="#00d9ff" transparent opacity={0.7} />
    </mesh>
  );
}

export function SkillsSection() {
  return (
    <section id="skills" className="relative min-h-dvh overflow-hidden px-4 py-24">
      <div aria-hidden className="grid-bg absolute inset-0" />

      <div className="relative mx-auto max-w-6xl">
        <SectionTerm path="skills/" title="ls ./skills" accent="text-accent glow-lime" />

        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="relative h-[420px] overflow-hidden rounded-lg border border-accent2/10">
            <Canvas
              dpr={[1, 1.75]}
              camera={{ position: [0, 0, 7.5], fov: 55 }}
              gl={{ antialias: true, alpha: true }}
            >
              <OrbitControls enableZoom={false} enablePan={false} />
              <CenterCore />
              {skills.map((s, i) => (
                <OrbitNode
                  key={s.title}
                  shape={s.icon}
                  color={s.color}
                  radius={2.4 + i * 0.25}
                  speed={0.42 + i * 0.09}
                  phase={(i / skills.length) * Math.PI * 2}
                />
              ))}
            </Canvas>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {skills.map((s) => (
              <SkillCard key={s.title} skill={s} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillCard({ skill }: { skill: Skill }) {
  const Icon =
    skill.icon === "cube"
      ? Box
      : skill.icon === "sphere"
        ? Film
        : skill.icon === "cone"
          ? PenTool
          : GraduationCap;

  return (
    <article
      className="neon-card rounded-lg p-5 font-mono group"
      style={{ "--glow": skill.color } as React.CSSProperties}
    >
      <div className="mb-3 flex items-center justify-between">
        <Icon className="h-5 w-5" style={{ color: skill.color }} />
        <span className="text-xs text-muted">{skill.path}</span>
      </div>
      <h3 className="text-sm font-bold text-foreground">{skill.title}</h3>
      <ul className="mt-3 flex flex-wrap gap-1.5">
        {skill.tech.map((t) => (
          <li
            key={t}
            className="rounded bg-white/5 px-2 py-0.5 text-[11px] text-muted"
          >
            {t}
          </li>
        ))}
      </ul>
    </article>
  );
}