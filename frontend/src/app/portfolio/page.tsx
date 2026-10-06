import Link from "next/link";
import { projects } from "@/data/portfolio";

export const metadata = { title: "Portfolio | Riyadvi" };

export default function PortfolioPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 pb-24 pt-32">
      <p className="text-sm uppercase tracking-widest text-gold">Portfolio</p>
      <h1 className="mt-2 font-display text-5xl font-bold">Work That Drives Growth</h1>
      <p className="mt-4 max-w-2xl text-muted">
        A selection of projects where design, technology and strategy came together.
      </p>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <Link
            key={p.slug}
            href={`/portfolio/${p.slug}`}
            className="group rounded-2xl border border-white/10 bg-surface p-6 transition hover:-translate-y-2 hover:border-gold/60"
          >
            <div className="flex h-40 items-center justify-center rounded-xl bg-gradient-to-br from-gold/20 to-transparent font-display text-3xl font-bold text-gold">
              {p.name.charAt(0)}
            </div>
            <p className="mt-5 text-xs uppercase tracking-widest text-gold">{p.industry}</p>
            <h2 className="mt-1 font-display text-xl font-semibold group-hover:text-gold">{p.name}</h2>
            <p className="mt-2 text-sm text-muted">{p.summary}</p>
            <span className="mt-4 inline-block text-sm text-gold">View case study →</span>
          </Link>
        ))}
      </div>
    </main>
  );
}