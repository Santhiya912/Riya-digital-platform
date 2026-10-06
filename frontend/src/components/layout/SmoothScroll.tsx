"use client";
import { ReactLenis, useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function LenisSync() {
  // Tell ScrollTrigger every time Lenis scrolls
  useLenis(() => {
    ScrollTrigger.update();
  });
  return null;
}

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactLenis root options={{ lerp: 0.1, smoothWheel: true }}>
      <LenisSync />
      {children}
    </ReactLenis>
  );
}