"use client";
import Link from "next/link";
import { motion } from "motion/react";

const journey = ["Strategy", "Design", "Development", "Marketing", "Optimization", "Growth"];
const years = [
  { y: "2021", t: "Founded" },
  { y: "2022", t: "Apps and Marketing" },
  { y: "2023", t: "Australia" },
  { y: "2024", t: "Star of Excellence" },
];

export default function WhyRiyadvi() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-28">
      <p className="text-sm uppercase tracking-widest text-gold">Why Riyadvi</p>
      <h2 className="mt-3 font-display text-3xl font-bold md:text-5xl">Since 2021, Growing With Our Clients</h2>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {years.map((x, i) => (
          <motion.div
            key={x.y}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="rounded-xl border border-white/10 bg-surface p-5"
          >
            <p className="font-display text-2xl font-bold text-gold">{x.y}</p>
            <p className="mt-1 text-sm text-muted">{x.t}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-16">
        <h3 className="font-display text-2xl font-bold">End-to-End Solutions</h3>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          {journey.map((s, i) => (
            <motion.div
              key={s}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="flex items-center gap-3"
            >
              <span className="rounded-full border border-gold/50 px-5 py-2 text-sm text-gold">{s}</span>
              {i < journey.length - 1 && <span className="text-gold/50">→</span>}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-16 rounded-2xl border border-gold/40 bg-gradient-to-br from-gold/10 to-transparent p-8">
        <p className="text-xs uppercase tracking-widest text-gold">Business Health Checkup</p>
        <h3 className="mt-2 font-display text-2xl font-bold">Where are your biggest digital opportunities?</h3>
        <p className="mt-3 max-w-2xl text-muted">
          Answer a few questions and we will identify gaps in your website, marketing and technology.
        </p>
        <Link
          href="/business-health-checkup"
          className="mt-6 inline-block rounded-full bg-gold px-7 py-3 font-semibold text-black hover:bg-gold-light"
        >
          Take the Checkup
        </Link>
      </div>
    </section>
  );
}