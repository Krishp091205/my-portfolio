"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function ParticleField({ count = 260 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const rng = mulberry32(7);
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (rng() - 0.5) * 30;
      arr[i * 3 + 1] = (rng() - 0.5) * 20;
      arr[i * 3 + 2] = (rng() - 0.5) * 20 - 4;
    }
    return arr;
  }, [count]);

  const colors = useMemo(() => {
    const palette = ["#00ff88", "#00d9ff", "#ff00ff"];
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const c = new THREE.Color(palette[i % palette.length]);
      arr[i * 3] = c.r;
      arr[i * 3 + 1] = c.g;
      arr[i * 3 + 2] = c.b;
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.012;
    ref.current.rotation.x = Math.sin(ref.current.rotation.y * 0.3) * 0.05;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.4}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export function HeroParticles() {
  return (
    <div aria-hidden className="absolute inset-0">
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: false, alpha: true }}
      >
        <ParticleField />
      </Canvas>
    </div>
  );
}