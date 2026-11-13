"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";

function Scene({ pointer, scroll }: { pointer: { current: { x: number; y: number } }; scroll: { current: number } }) {
  const group = useRef<any>(null);
  const knot = useRef<any>(null);
  const globe = useRef<any>(null);
  const nodes = useMemo(() => {
    const points = [];
    const count = 20;
    for (let index = 0; index < count; index += 1) {
      const phi = Math.acos(1 - (2 * (index + 0.5)) / count);
      const theta = Math.PI * (1 + Math.sqrt(5)) * index;
      points.push([
        Math.sin(phi) * Math.cos(theta) * 1.62,
        Math.cos(phi) * 1.62,
        Math.sin(phi) * Math.sin(theta) * 1.62,
      ]);
    }
    return points;
  }, []);

  useFrame((_, delta) => {
    const px = pointer.current.x;
    const py = pointer.current.y;
    if (group.current) {
      group.current.rotation.y += delta * 0.22;
      const targetX = py * 0.45 + scroll.current * 0.0004;
      group.current.rotation.x += (targetX - group.current.rotation.x) * 0.05;
      group.current.rotation.z += (px * 0.25 - group.current.rotation.z) * 0.05;
    }
    if (knot.current) knot.current.rotation.x += delta * 0.45;
    if (globe.current) globe.current.rotation.y += delta * 0.12;
  });

  return (
    <group ref={group} position={[1.55, 0.1, 0]}>
      <mesh ref={globe}>
        <sphereGeometry args={[1.32, 28, 18]} />
        <meshBasicMaterial color="#f97316" wireframe />
      </mesh>
      <mesh rotation={[Math.PI / 2.2, 0.15, 0]}>
        <torusGeometry args={[1.9, 0.012, 12, 96]} />
        <meshBasicMaterial color="#fb923c" />
      </mesh>
      <mesh rotation={[0.5, 0.8, 0.2]}>
        <torusGeometry args={[2.2, 0.008, 12, 96]} />
        <meshBasicMaterial color="#f59e0b" />
      </mesh>
      <mesh ref={knot}>
        <torusKnotGeometry args={[0.48, 0.13, 100, 12]} />
        <meshBasicMaterial color="#fb923c" wireframe />
      </mesh>
      {nodes.map((position) => (
        <mesh key={position.join(",")} position={position}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshBasicMaterial color="#f59e0b" />
        </mesh>
      ))}
    </group>
  );
}

export default function HeroCanvas({
  pointer,
  scroll,
  live,
}: {
  pointer: { current: { x: number; y: number } };
  scroll: { current: number };
  live: boolean;
}) {
  return (
    <Canvas
      className="hero-webgl"
      frameloop={live ? "always" : "never"}
      dpr={[1, 1.4]}
      camera={{ position: [0, 0.15, 5.4], fov: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
    >
      <Scene pointer={pointer} scroll={scroll} />
    </Canvas>
  );
}
