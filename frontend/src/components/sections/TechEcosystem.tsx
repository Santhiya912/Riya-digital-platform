"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const TechSphere = dynamic(() => import("@/components/three/TechSphere"), {
  ssr: false,
  loading: () => <div className="h-full w-full" />,
});

const fallback = [
  "React", "Next.js", "Node.js", "MongoDB", "MySQL", "JavaScript",
  "Three.js", "WordPress", "Tailwind", "Figma",
];

export default function TechEcosystem() {
  const [mode, setMode] = useState<"full" | "light" | "static">("light");

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 768px)").matches;
    setMode(reduced ? "static" : mobile ? "light" : "full");
  }, []);

  return (
    <section className="bg-surface py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 lg:grid-cols-2">
        <div>
          <p className="text-sm uppercase tracking-widest text-gold">Technology</p>
          <h2 className="mt-3 font-display text-3xl font-bold md:text-5xl">
            A Modern Stack for Modern Business
          </h2>
          <p className="mt-5 text-muted">
            We choose proven, scalable technologies, from web and mobile to 3D
            and immersive experiences, so your product is fast, secure and ready
            to grow. Drag the sphere to explore.
          </p>
        </div>

        <div className="h-[420px] w-full">
          {mode === "static" ? (
            <div className="flex h-full flex-wrap content-center justify-center gap-3">
              {fallback.map((t) => (
                <span key={t} className="rounded-full border border-gold/40 px-4 py-2 text-sm text-gold">
                  {t}
                </span>
              ))}
            </div>
          ) : (
            <TechSphere count={mode === "full" ? 16 : 10} />
          )}
        </div>
      </div>
    </section>
  );
}