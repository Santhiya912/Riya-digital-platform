import JobList from "@/components/sections/JobList";

export const metadata = { title: "Careers | Riyadvi" };

export default function CareersPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 pb-24 pt-32">
      <p className="text-sm uppercase tracking-widest text-gold">Careers</p>
      <h1 className="mt-2 font-display text-5xl font-bold">Build the Future With Us</h1>
      <p className="mt-4 max-w-2xl text-muted">
        Join a team that combines technology, design and business thinking.
      </p>
      <div className="mt-12">
        <JobList />
      </div>
    </main>
  );
}