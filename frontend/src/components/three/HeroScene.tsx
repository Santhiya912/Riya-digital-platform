"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function Network({ count }: { count: number }) {
  const tilt = useRef<THREE.Group>(null);
  const spin = useRef<THREE.Group>(null);

  const { points, lines } = useMemo(() => {
    const radius = 2;
    const golden = Math.PI * (3 - Math.sqrt(5));
    const pts: THREE.Vector3[] = [];

    // Fibonacci sphere: spreads points evenly on a sphere
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const t = golden * i;
      pts.push(
        new THREE.Vector3(Math.cos(t) * r, y, Math.sin(t) * r).multiplyScalar(radius)
      );
    }

    // Connect points that are close to each other
    const spacing = Math.sqrt((4 * Math.PI * radius * radius) / count);
    const maxDist = spacing * 1.6;
    const seg: number[] = [];
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        if (pts[i].distanceTo(pts[j]) < maxDist) {
          seg.push(pts[i].x, pts[i].y, pts[i].z, pts[j].x, pts[j].y, pts[j].z);
        }
      }
    }

    return {
      points: new Float32Array(pts.flatMap((p) => [p.x, p.y, p.z])),
      lines: new Float32Array(seg),
    };
  }, [count]);

  useFrame((state, delta) => {
    if (spin.current) spin.current.rotation.y += delta * 0.2;
    if (tilt.current) {
      // state.pointer is the mouse position from -1 to 1
      tilt.current.rotation.x = THREE.MathUtils.lerp(
        tilt.current.rotation.x,
        -state.pointer.y * 0.5,
        0.05
      );
      tilt.current.rotation.z = THREE.MathUtils.lerp(
        tilt.current.rotation.z,
        -state.pointer.x * 0.3,
        0.05
      );
    }
  });

  return (
    <group ref={tilt}>
      <group ref={spin}>
        <points>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[points, 3]} />
          </bufferGeometry>
          <pointsMaterial color="#D4AF37" size={0.08} sizeAttenuation />
        </points>
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[lines, 3]} />
          </bufferGeometry>
          <lineBasicMaterial color="#D4AF37" transparent opacity={0.3} />
        </lineSegments>
      </group>
    </group>
  );
}

export default function HeroScene({ count = 120 }: { count?: number }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
    >
      <Network count={count} />
    </Canvas>
  );
}