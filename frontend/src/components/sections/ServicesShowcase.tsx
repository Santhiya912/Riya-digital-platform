"use client";
import Link from "next/link";
import { motion } from "motion/react";
import { services } from "@/data/services";
import ServiceVisual from "./ServiceVisuals";

export default function ServicesShowcase() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-28">
      <p className="text-sm uppercase tracking-widest text-gold">What We Do</p>
      <h2 className="mt-3 font-display text-3xl font-bold md:text-5xl">
        Solutions Built Around Your Growth
      </h2>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <motion.div
            key={s.slug}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
            whileHover={{ y: -8 }}
          >
            <Link
              href={`/services/${s.slug}`}
              className="group block rounded-2xl border border-white/10 bg-surface p-6 transition-colors hover:border-gold/60"
            >
              <div className="h-32 overflow-hidden rounded-xl bg-surface-2 p-3">
                <ServiceVisual type={s.visual} />
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold group-hover:text-gold">
                {s.title}
              </h3>
              <p className="mt-2 text-sm text-muted">{s.tagline}</p>
              <span className="mt-4 inline-block text-sm text-gold">Learn more →</span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}