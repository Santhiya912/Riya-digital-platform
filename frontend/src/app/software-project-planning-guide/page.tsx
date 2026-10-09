import LeadMagnetForm from "@/components/sections/LeadMagnetForm";

export const metadata = { title: "Software Project Planning Guide | Riyadvi" };

const points = [
  "How to define scope and requirements",
  "Budgeting and timeline planning",
  "Choosing the right technology and team",
  "Avoiding the most common project risks",
];

export default function GuidePage() {
  return (
    <main className="mx-auto max-w-6xl px-6 pb-24 pt-32">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="text-sm uppercase tracking-widest text-gold">Free Guide</p>
          <h1 className="mt-2 font-display text-4xl font-bold md:text-5xl">
            Download Software Project Planning Guide
          </h1>
          <p className="mt-4 text-muted">
            A practical guide to planning your software project the right way, before you spend a rupee.
          </p>
          <ul className="mt-8 space-y-3">
            {points.map((p) => (
              <li key={p} className="flex gap-3 text-sm">
                <span className="text-gold">✓</span>
                <span className="text-muted">{p}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-white/10 bg-surface p-6 sm:p-8">
          <LeadMagnetForm />
        </div>
      </div>
    </main>
  );
}
