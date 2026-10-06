"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stages = [
  { title: "Business Challenge", text: "We start by understanding where your business is stuck and what you want to achieve." },
  { title: "Strategy", text: "A clear roadmap: goals, audience, priorities and measurable outcomes." },
  { title: "Design", text: "Interfaces and brand experiences that people trust and enjoy using." },
  { title: "Technology", text: "Scalable, secure engineering built on modern tools." },
  { title: "Launch", text: "Careful testing and a smooth go-live with full support." },
  { title: "Growth", text: "We measure, optimize and keep improving as your business grows." },
];

export default function Transformation() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(".stage");
      const total = items.length;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${window.innerHeight * total * 0.6}`,
          scrub: true,
          pin: true,
        },
      });

      // Progress bar fills across the whole scroll
      tl.to(".progress-fill", { scaleX: 1, ease: "none", duration: total }, 0);

      // Each stage lights up in turn
      items.forEach((el, i) => {
        tl.to(el, { opacity: 1, y: 0, scale: 1, duration: 0.6 }, i);
        tl.to(el.querySelector(".dot"), { backgroundColor: "#D4AF37", scale: 1.4, duration: 0.3 }, i);
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-black px-6">
      <div className="mx-auto w-full max-w-6xl">
        <p className="text-sm uppercase tracking-widest text-gold">Our Approach</p>
        <h2 className="mt-3 font-display text-3xl font-bold md:text-5xl">
          From Business Challenge to Growth
        </h2>

        <div className="relative mt-14 h-0.5 w-full bg-white/10">
          <div className="progress-fill absolute inset-0 origin-left scale-x-0 bg-gold" />
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
          {stages.map((s, i) => (
            <div
              key={s.title}
              className="stage translate-y-8 scale-95 rounded-xl border border-white/10 bg-surface p-5 opacity-20"
            >
              <div className="dot mb-4 h-3 w-3 rounded-full bg-white/30" />
              <span className="text-xs text-gold">0{i + 1}</span>
              <h3 className="mt-1 font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}