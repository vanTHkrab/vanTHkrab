"use client";

import * as React from "react";
import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import { Line, Sphere, Points, PointMaterial } from "@react-three/drei";
import type { Points as PointsType, Mesh } from "three";
import { CatmullRomCurve3, Vector3 } from "three";

// Node component representing a service/database/API
function DataNode({
  position,
  color,
  scale = 1,
  pulseSpeed = 1,
}: {
  position: [number, number, number];
  color: string;
  scale?: number;
  pulseSpeed?: number;
}) {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const baseY = position[1];

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y =
        baseY + Math.sin(state.clock.elapsedTime * pulseSpeed) * 0.1;
      meshRef.current.rotation.y += 0.002;
      const pulse = 1 + Math.sin(state.clock.elapsedTime * pulseSpeed * 2) * 0.05;
      meshRef.current.scale.setScalar(scale * pulse * (hovered ? 1.2 : 1));
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <octahedronGeometry args={[0.3, 0]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={hovered ? 0.4 : 0.2}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
}

// Connection line between nodes with animated particle
function ConnectionLine({
  start,
  end,
  color,
  speed = 1,
}: {
  start: [number, number, number];
  end: [number, number, number];
  color: string;
  speed?: number;
}) {
  const particleRef = useRef<Mesh>(null);
  const progressRef = useRef(Math.random());

  const points = useMemo(() => {
    const midPoint: [number, number, number] = [
      (start[0] + end[0]) / 2,
      (start[1] + end[1]) / 2 + 0.5,
      (start[2] + end[2]) / 2,
    ];
    return [start, midPoint, end];
  }, [start, end]);

  const curve = useMemo(() => {
    return new CatmullRomCurve3(points.map((p) => new Vector3(...p)));
  }, [points]);

  useFrame((_, delta) => {
    if (particleRef.current) {
      progressRef.current = (progressRef.current + delta * speed * 0.3) % 1;
      const point = curve.getPoint(progressRef.current);
      particleRef.current.position.copy(point);
    }
  });

  return (
    <group>
      <Line points={points} color={color} lineWidth={1} transparent opacity={0.3} />
      <Sphere ref={particleRef} args={[0.05, 8, 8]}>
        <meshBasicMaterial color={color} />
      </Sphere>
    </group>
  );
}

// Floating particles in the background
function FloatingParticles({ count = 100 }: { count?: number }) {
  const particlesRef = useRef<PointsType>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <Points ref={particlesRef} positions={positions} stride={3}>
      <PointMaterial size={0.03} color="#888888" transparent opacity={0.5} sizeAttenuation />
    </Points>
  );
}

// Camera controller for subtle movement
function CameraController() {
  const { camera } = useThree();
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(() => {
    camera.position.x += (mouseRef.current.x * 0.5 - camera.position.x) * 0.02;
    camera.position.y += (-mouseRef.current.y * 0.3 - camera.position.y) * 0.02;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// Main scene composition
function Scene() {
  const nodes = useMemo(
    () => [
      { pos: [0, 0, 0] as [number, number, number], color: "#6366f1" },
      { pos: [-2, 1, -1] as [number, number, number], color: "#22c55e" },
      { pos: [2, 1, -1] as [number, number, number], color: "#f59e0b" },
      { pos: [-2, -1, 1] as [number, number, number], color: "#ec4899" },
      { pos: [2, -1, 1] as [number, number, number], color: "#06b6d4" },
      { pos: [0, 2, -2] as [number, number, number], color: "#8b5cf6" },
      { pos: [-3, 0, 0] as [number, number, number], color: "#ef4444" },
      { pos: [3, 0, 0] as [number, number, number], color: "#14b8a6" },
    ],
    []
  );

  const connections = useMemo(
    () => [
      { start: nodes[0].pos, end: nodes[1].pos, color: "#6366f1" },
      { start: nodes[0].pos, end: nodes[2].pos, color: "#6366f1" },
      { start: nodes[0].pos, end: nodes[3].pos, color: "#6366f1" },
      { start: nodes[0].pos, end: nodes[4].pos, color: "#6366f1" },
      { start: nodes[1].pos, end: nodes[5].pos, color: "#22c55e" },
      { start: nodes[2].pos, end: nodes[5].pos, color: "#f59e0b" },
      { start: nodes[3].pos, end: nodes[7].pos, color: "#ec4899" },
      { start: nodes[4].pos, end: nodes[6].pos, color: "#06b6d4" },
      { start: nodes[6].pos, end: nodes[0].pos, color: "#ef4444" },
      { start: nodes[7].pos, end: nodes[4].pos, color: "#14b8a6" },
    ],
    [nodes]
  );

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={0.6} />
      <pointLight position={[-10, -10, -10]} intensity={0.3} />

      <CameraController />
      <FloatingParticles count={80} />

      {nodes.map((node, i) => (
        <DataNode
          key={i}
          position={node.pos}
          color={node.color}
          scale={i === 0 ? 1.3 : 1}
          pulseSpeed={0.5 + Math.random() * 0.5}
        />
      ))}

      {connections.map((conn, i) => (
        <ConnectionLine
          key={i}
          start={conn.start}
          end={conn.end}
          color={conn.color}
          speed={0.8 + Math.random() * 0.4}
        />
      ))}
    </>
  );
}

// Performance check hook
function useIsLowPerformance() {
  const [isLow, setIsLow] = useState(false);

  useEffect(() => {
    const checkPerformance = () => {
      const cores = navigator.hardwareConcurrency || 4;
      if (cores <= 2) return true;

      const nav = navigator as Navigator & { deviceMemory?: number };
      if (nav.deviceMemory && nav.deviceMemory < 4) return true;

      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

      return isMobile;
    };

    setIsLow(checkPerformance());
  }, []);

  return isLow;
}

// Static fallback component
function StaticFallback() {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">
          Architecture
        </h2>
        <h3 className="text-3xl sm:text-4xl font-bold mb-4">Backend Systems</h3>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
          Building distributed systems that scale—from API gateways to message queues,
          databases to caching layers.
        </p>
        <div className="relative h-64 rounded-xl bg-linear-to-br from-primary/5 to-accent/5 border border-border/50 flex items-center justify-center">
          <div className="flex flex-wrap gap-4 justify-center">
            {["API", "Auth", "DB", "Cache", "Queue"].map((label) => (
              <div
                key={label}
                className="px-4 py-2 rounded-lg bg-card/50 border border-border/50 text-sm"
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function BackendCanvas() {
  const shouldReduceMotion = useReducedMotion();
  const isLowPerformance = useIsLowPerformance();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || shouldReduceMotion || isLowPerformance) {
    return <StaticFallback />;
  }

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">
            Architecture
          </h2>
          <h3 className="text-3xl sm:text-4xl font-bold mb-4">
            Backend Systems Visualization
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            An interactive representation of modern backend architecture—services, data
            flow, and infrastructure working in harmony.
          </p>
        </div>

        <div className="relative h-100 sm:h-125 rounded-2xl overflow-hidden border border-border/50 bg-linear-to-br from-background via-background to-muted/20">
          <Canvas
            camera={{ position: [0, 0, 8], fov: 50 }}
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: true }}
          >
            <Scene />
          </Canvas>

          <div className="absolute inset-0 pointer-events-none bg-linear-to-t from-background via-transparent to-transparent opacity-60" />

          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2 justify-center">
            {[
              { color: "#6366f1", label: "Gateway" },
              { color: "#22c55e", label: "Services" },
              { color: "#8b5cf6", label: "Database" },
              { color: "#ef4444", label: "Cache" },
              { color: "#14b8a6", label: "Queue" },
            ].map(({ color, label }) => (
              <div
                key={label}
                className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-background/80 backdrop-blur-sm text-xs"
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                <span className="text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-4">
          Hover over nodes to interact • Move your mouse to explore
        </p>
      </div>
    </section>
  );
}
