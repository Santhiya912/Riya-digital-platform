import HealthCheckupForm from "@/components/sections/HealthCheckupForm";

export const metadata = { title: "Business Health Checkup | Riyadvi" };

export default function HealthCheckupPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 pb-24 pt-32">
      <p className="text-sm uppercase tracking-widest text-gold">Business Health Checkup</p>
      <h1 className="mt-2 font-display text-4xl font-bold md:text-5xl">
        Is Your Business Ready for Its Next Digital Growth Stage?
      </h1>
      <p className="mt-4 text-muted">
        Answer a few quick questions and we will identify the biggest digital opportunities for your
        business.
      </p>
      <div className="mt-10 rounded-2xl border border-white/10 bg-surface p-6 sm:p-8">
        <HealthCheckupForm />
      </div>
    </main>
  );
}