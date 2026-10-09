"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "motion/react";

// Load 3D only in the browser, in a separate chunk (code splitting)
const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => <div className="h-full w-full" />,
});

export default function Hero() {
  const [mode, setMode] = useState<"full" | "light" | "static">("light");

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 768px)").matches;
    setMode(reduced ? "static" : mobile ? "light" : "full");
  }, []);

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      <div className="absolute inset-0 -z-0 bg-[radial-gradient(circle_at_70%_50%,rgba(212,175,55,0.15),transparent_60%)]" />

      {/* 3D layer */}
      <div className="absolute inset-0 opacity-70 md:left-1/3 md:opacity-100">
        {mode !== "static" && <HeroScene count={mode === "full" ? 120 : 45} />}
      </div>

      {/* Text layer */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <p className="text-sm uppercase tracking-widest text-gold">
            Technology & Digital Solutions Partner
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold leading-tight md:text-6xl">
            Custom Software & Digital Solutions to{" "}
            <span className="text-gold">Grow Your Business</span>
          </h1>
          <p className="mt-6 text-lg text-muted">
            Web & App Development, UI/UX Design, and Business Strategy, all
            tailored to your needs.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/book-consultation"
              className="rounded-full bg-gold px-7 py-3 font-semibold text-black transition hover:bg-gold-light"
            >
              Book a Free Consultation
            </Link>
            <Link
              href="/services/web-development"
              className="rounded-full border border-gold/50 px-7 py-3 font-semibold text-gold transition hover:bg-gold/10"
            >
              Explore Our Solutions
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}