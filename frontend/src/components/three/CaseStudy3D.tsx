"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function Object3D() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.4;
  });

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={1}>
      <mesh ref={ref}>
        <torusKnotGeometry args={[1, 0.35, 128, 24]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.2} />
      </mesh>
    </Float>
  );
}

export default function CaseStudy3D() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }} dpr={[1, 1.5]}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 3, 5]} intensity={2} />
      <directionalLight position={[-3, -2, -4]} intensity={1} color="#F0D675" />
      <Object3D />
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  );
}