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
        <meshBasicMaterial wireframe color={color} transparent opacity={0.65} />
      </mesh>
      <mesh scale={0.985}>
        {fill}
        <meshBasicMaterial color={color} transparent opacity={0.04} />
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
      <meshBasicMaterial wireframe color="#00d9ff" transparent opacity={0.45} />
    </mesh>
  );
}

export function SkillsSection() {
  return (
    <section id="skills" className="relative min-h-dvh overflow-hidden px-6 py-28">
      <div aria-hidden className="grid-bg absolute inset-0 opacity-70" />

      <div className="relative mx-auto max-w-6xl">
        <SectionTerm path="skills/" title="Capabilities" index="01" />

        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="cinematic-card relative h-[420px] overflow-hidden rounded-2xl">
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
                  radius={3 + i * 0.35}
                  speed={0.28 + i * 0.06}
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
    <article className="cinematic-card group rounded-xl p-6">
      <div className="flex items-center justify-between">
        <Icon className="h-4 w-4" style={{ color: skill.color }} />
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/30">
          {skill.path}
        </span>
      </div>
      <h3 className="mt-6 font-display text-lg font-medium text-foreground">
        {skill.title}
      </h3>
      <ul className="mt-4 flex flex-wrap gap-2">
        {skill.tech.map((t) => (
          <li
            key={t}
            className="rounded-full border border-foreground/8 px-3 py-1 font-mono text-[11px] text-foreground/45"
          >
            {t}
          </li>
        ))}
      </ul>
    </article>
  );
}