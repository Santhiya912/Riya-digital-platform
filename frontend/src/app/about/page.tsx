import Timeline from "@/components/sections/Timeline";
import { values, stats } from "@/data/about";

export const metadata = { title: "About | Riyadvi" };

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 pb-24 pt-32">
      <p className="text-sm uppercase tracking-widest text-gold">About Riyadvi</p>
      <h1 className="mt-2 font-display text-5xl font-bold">Technology, Design and Business Thinking</h1>
      <p className="mt-6 max-w-3xl text-lg text-muted">
        Founded in 2021, Riyadvi Software Technologies helps businesses grow through custom software,
        design and digital strategy. We act as a long-term technology partner, not just a vendor.
      </p>

      <section className="mt-16 grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-surface p-6">
          <h2 className="font-display text-xl text-gold">Our Mission</h2>
          <p className="mt-3 text-muted">
            To deliver exceptional service and products that consistently exceed customer expectations.
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-surface p-6">
          <h2 className="font-display text-xl text-gold">Our Vision</h2>
          <p className="mt-3 text-muted">
            To be the most trusted and customer-centric company, creating long-lasting relationships with our clients.
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-surface p-6">
          <h2 className="font-display text-xl text-gold">Our Goal</h2>
          <p className="mt-3 text-muted">
            To continuously improve and innovate, so our customers always receive the best experience.
          </p>
        </div>
      </section>

      <section className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-gold/30 p-5 text-center">
            <p className="font-display text-3xl font-bold text-gold">{s.value}</p>
            <p className="mt-1 text-xs text-muted">{s.label}</p>
          </div>
        ))}
      </section>

      <section className="mt-12 rounded-2xl border border-gold/40 bg-gold/5 p-6">
        <p className="text-xs uppercase tracking-widest text-gold">Recognition</p>
        <h2 className="mt-1 font-display text-xl">Star of Excellence Award, 2024</h2>
        <p className="mt-2 text-sm text-muted">
          Awarded by the National Integrity Cultural Academy for advancing digital solutions and ethical business practices.
        </p>
      </section>

      <section className="mt-20">
        <h2 className="font-display text-3xl font-bold">Our Values</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <div key={v.title} className="rounded-xl border border-white/10 bg-surface p-5">
              <h3 className="font-semibold text-gold">{v.title}</h3>
              <p className="mt-2 text-sm text-muted">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-24">
        <h2 className="mb-12 text-center font-display text-3xl font-bold">Our Journey Since 2021</h2>
        <Timeline />
      </section>
    </main>
  );
}