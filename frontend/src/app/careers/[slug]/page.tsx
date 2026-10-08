import { notFound } from "next/navigation";
import Link from "next/link";
import { jobs, getJob } from "@/data/jobs";
import ApplyForm from "@/components/sections/ApplyForm";

export function generateStaticParams() {
  return jobs.map((j) => ({ slug: j.slug }));
}

export default async function JobPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = getJob(slug);
  if (!job) notFound();

  return (
    <main className="mx-auto max-w-4xl px-6 pb-24 pt-32">
      <Link href="/careers" className="text-sm text-muted hover:text-gold">← All openings</Link>
      <p className="mt-6 text-sm uppercase tracking-widest text-gold">{job.department}</p>
      <h1 className="mt-2 font-display text-4xl font-bold md:text-5xl">{job.title}</h1>
      <div className="mt-4 flex flex-wrap gap-2 text-xs">
        {[job.designation, job.experience, job.type, job.location].map((t) => (
          <span key={t} className="rounded-full border border-white/15 px-3 py-1 text-muted">{t}</span>
        ))}
      </div>
      <p className="mt-6 text-lg text-muted">{job.summary}</p>

      <section className="mt-12 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-surface p-6">
          <h2 className="font-display text-xl text-gold">Responsibilities</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted">
            {job.responsibilities.map((r) => <li key={r}>{r}</li>)}
          </ul>
        </div>
        <div className="rounded-2xl border border-white/10 bg-surface p-6">
          <h2 className="font-display text-xl text-gold">Requirements</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted">
            {job.requirements.map((r) => <li key={r}>{r}</li>)}
          </ul>
        </div>
      </section>

      <section id="apply" className="mt-12 rounded-2xl border border-white/10 bg-surface p-6 sm:p-8">
        <h2 className="font-display text-2xl">Apply for this role</h2>
        <div className="mt-6">
          <ApplyForm position={job.title} />
        </div>
      </section>
    </main>
  );
}