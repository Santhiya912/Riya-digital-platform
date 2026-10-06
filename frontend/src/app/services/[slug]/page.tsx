import { notFound } from "next/navigation";
import Link from "next/link";
import { services, getService } from "@/data/services";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  return (
    <main className="mx-auto max-w-5xl px-6 pb-24 pt-32">
      <p className="text-sm uppercase tracking-widest text-gold">Service</p>
      <h1 className="mt-2 font-display text-5xl font-bold">{service.title}</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted">{service.tagline}</p>

      <section className="mt-16 grid gap-8 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-surface p-6">
          <h2 className="font-display text-xl text-gold">The Problem</h2>
          <p className="mt-3 text-muted">{service.problem}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-surface p-6">
          <h2 className="font-display text-xl text-gold">Our Solution</h2>
          <p className="mt-3 text-muted">{service.solution}</p>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="font-display text-2xl">Key Features</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {service.features.map((f) => (
            <li key={f} className="rounded-lg border border-white/10 p-4 text-muted">{f}</li>
          ))}
        </ul>
      </section>

      <section className="mt-16">
        <h2 className="font-display text-2xl">Industry Use Cases</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {service.useCases.map((u) => (
            <span key={u} className="rounded-full border border-gold/40 px-4 py-2 text-sm text-gold">{u}</span>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="font-display text-2xl">Technology Stack</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {service.techStack.map((t) => (
            <span key={t} className="rounded-md bg-surface-2 px-4 py-2 text-sm">{t}</span>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="font-display text-2xl">Our Process</h2>
        <ol className="mt-6 grid gap-4 md:grid-cols-4">
          {service.process.map((p, i) => (
            <li key={p.step} className="rounded-xl border border-white/10 bg-surface p-5">
              <span className="text-gold">0{i + 1}</span>
              <h3 className="mt-2 font-semibold">{p.step}</h3>
              <p className="mt-1 text-sm text-muted">{p.description}</p>
            </li>
          ))}
        </ol>
      </section>

      <div className="mt-20 text-center">
        <Link
          href="/contact"
          className="rounded-full bg-gold px-8 py-3 font-semibold text-black hover:bg-gold-light"
        >
          Get a Quote
        </Link>
      </div>
    </main>
  );
}