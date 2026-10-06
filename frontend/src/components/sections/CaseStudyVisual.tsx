"use client";
import dynamic from "next/dynamic";

const CaseStudy3D = dynamic(() => import("@/components/three/CaseStudy3D"), {
  ssr: false,
  loading: () => <div className="h-full w-full" />,
});

export default function CaseStudyVisual({ type, letter }: { type: "standard" | "3d"; letter: string }) {
  if (type === "3d") return <CaseStudy3D />;
  return (
    <div className="flex h-full items-center justify-center bg-gradient-to-br from-gold/20 to-transparent font-display text-8xl font-bold text-gold">
      {letter}
    </div>
  );
}