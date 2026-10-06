"use client";
import { Canvas } from "@react-three/fiber";
import { Billboard, OrbitControls, Text } from "@react-three/drei";
import { useMemo, useState } from "react";
import * as THREE from "three";

const techs = [
  "React", "Next.js", "Node.js", "MongoDB", "MySQL", "JavaScript",
  "TypeScript", "Three.js", "R3F", "WordPress", "Tailwind", "Figma",
  "Blender", "Flutter", "Express", "GSAP",
];

function Tag({ name, position }: { name: string; position: THREE.Vector3 }) {
  const [hover, setHover] = useState(false);

  return (
    <Billboard position={position}>
      <Text
        fontSize={0.3}
        color={hover ? "#F0D675" : "#D4AF37"}
        scale={hover ? 1.35 : 1}
        anchorX="center"
        anchorY="middle"
        onPointerOver={() => {
          setHover(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHover(false);
          document.body.style.cursor = "auto";
        }}
      >
        {name}
      </Text>
    </Billboard>
  );
}

function Tags({ list }: { list: string[] }) {
  // Spread tags evenly on a sphere (Fibonacci sphere)
  const positions = useMemo(() => {
    const golden = Math.PI * (3 - Math.sqrt(5));
    return list.map((_, i) => {
      const y = 1 - (i / (list.length - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const t = golden * i;
      return new THREE.Vector3(Math.cos(t) * r, y, Math.sin(t) * r).multiplyScalar(2.4);
    });
  }, [list]);

  return (
    <>
      {list.map((name, i) => (
        <Tag key={name} name={name} position={positions[i]} />
      ))}
      <mesh>
        <sphereGeometry args={[2.3, 24, 24]} />
        <meshBasicMaterial color="#D4AF37" wireframe transparent opacity={0.08} />
      </mesh>
    </>
  );
}

export default function TechSphere({ count = 16 }: { count?: number }) {
  return (
    <Canvas camera={{ position: [0, 0, 7], fov: 50 }} dpr={[1, 1.5]}>
      <Tags list={techs.slice(0, count)} />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1.2} />
    </Canvas>
  );
}