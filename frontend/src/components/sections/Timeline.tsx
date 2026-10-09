"use client";
import { motion } from "motion/react";
import { milestones } from "@/data/about";

export default function Timeline() {
  return (
    <div className="relative mx-auto max-w-3xl">
      <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-gold via-gold/40 to-transparent md:left-1/2" />
      {milestones.map((m, i) => (
        <motion.div
          key={m.year}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className={`relative mb-12 pl-12 md:w-1/2 md:pl-0 ${
            i % 2 === 0 ? "md:pr-12 md:text-right" : "md:ml-auto md:pl-12"
          }`}
        >
          <span
            className={`absolute left-[10px] top-2 h-3 w-3 rounded-full bg-gold shadow-[0_0_12px_#D4AF37] md:left-auto ${
              i % 2 === 0 ? "md:-right-1.5" : "md:-left-1.5"
            }`}
          />
          <p className="font-display text-2xl font-bold text-gold">{m.year}</p>
          <h3 className="mt-1 font-semibold">{m.title}</h3>
          <p className="mt-1 text-sm text-muted">{m.text}</p>
        </motion.div>
      ))}
    </div>
  );
}