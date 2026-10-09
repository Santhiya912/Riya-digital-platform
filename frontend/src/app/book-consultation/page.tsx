import ConsultationForm from "@/components/sections/ConsultationForm";

export const metadata = { title: "Book a Free Consultation | Riyadvi" };

export default function ConsultationPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 pb-24 pt-32">
      <p className="text-sm uppercase tracking-widest text-gold">Free Consultation</p>
      <h1 className="mt-2 font-display text-4xl font-bold md:text-5xl">Book a Free Consultation</h1>
      <p className="mt-4 text-muted">
        Tell us a little about your business and we will schedule a call to discuss your goals.
      </p>
      <div className="mt-10 rounded-2xl border border-white/10 bg-surface p-6 sm:p-8">
        <ConsultationForm />
      </div>
    </main>
  );
}