import { notFound } from "next/navigation";
import Link from "next/link";
import { projects, getProject } from "@/data/portfolio";
import { services } from "@/data/services";
import CaseStudyVisual from "@/components/sections/CaseStudyVisual";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const related = services.filter((s) => project.relatedServices.includes(s.slug));

  return (
    <main className="mx-auto max-w-5xl px-6 pb-24 pt-32">
      <Link href="/portfolio" className="text-sm text-muted hover:text-gold">← Back to portfolio</Link>
      <p className="mt-6 text-sm uppercase tracking-widest text-gold">{project.industry}</p>
      <h1 className="mt-2 font-display text-5xl font-bold">{project.name}</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted">{project.summary}</p>

      <div className="mt-10 h-80 overflow-hidden rounded-2xl border border-white/10 bg-surface">
        <CaseStudyVisual type={project.presentation} letter={project.name.charAt(0)} />
      </div>
      {project.presentation === "3d" && (
        <p className="mt-2 text-center text-xs text-muted">Drag to rotate</p>
      )}

      <section className="mt-12 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-surface p-6">
          <h2 className="font-display text-xl text-gold">Client</h2>
          <p className="mt-3 text-muted">{project.client}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-surface p-6">
          <h2 className="font-display text-xl text-gold">Industry</h2>
          <p className="mt-3 text-muted">{project.industry}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-surface p-6">
          <h2 className="font-display text-xl text-gold">Challenge</h2>
          <p className="mt-3 text-muted">{project.challenge}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-surface p-6">
          <h2 className="font-display text-xl text-gold">Solution</h2>
          <p className="mt-3 text-muted">{project.solution}</p>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl">Technologies</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {project.technologies.map((t) => (
            <span key={t} className="rounded-md bg-surface-2 px-4 py-2 text-sm">{t}</span>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl">Results</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-3">
          {project.results.map((r) => (
            <li key={r} className="rounded-lg border border-gold/30 p-4 text-sm text-gold">{r}</li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl">Related Services</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {related.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="rounded-full border border-gold/40 px-4 py-2 text-sm text-gold hover:bg-gold/10"
            >
              {s.title}
            </Link>
          ))}
        </div>
      </section>

      <div className="mt-16 text-center">
        <Link href="/contact" className="rounded-full bg-gold px-8 py-3 font-semibold text-black hover:bg-gold-light">
          Start a Similar Project
        </Link>
      </div>
    </main>
  );
}