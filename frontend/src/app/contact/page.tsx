import ContactForm from "@/components/sections/ContactForm";

export const metadata = {
  title: "Contact | Riyadvi",
};

// Replace this with the real Riyadvi WhatsApp number.
// Country code only, without + or spaces.
const WHATSAPP = "9108072487427";

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 pb-24 pt-32">
      <p className="text-sm uppercase tracking-widest text-gold">
        Contact
      </p>

      <h1 className="mt-2 font-display text-5xl font-bold">
        Let&apos;s Build Something Great
      </h1>

      <p className="mt-4 max-w-2xl text-muted">
        Tell us about your requirement and our team will get back to you
        shortly.
      </p>

      <div className="mt-14 grid gap-10 lg:grid-cols-5">
        <div className="rounded-2xl border border-white/10 bg-surface p-6 sm:p-8 lg:col-span-3">
          <ContactForm />
        </div>

        <aside className="space-y-4 lg:col-span-2">
          <a
            href={`https://wa.me/${WHATSAPP}?text=Hi%20Riyadvi%2C%20I%20would%20like%20to%20discuss%20a%20project.`}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-2xl border border-white/10 bg-surface p-6 transition hover:border-gold/60"
          >
            <h2 className="font-display text-lg text-gold">
              Chat on WhatsApp
            </h2>

            <p className="mt-2 text-sm text-muted">
              Quick questions? Message us directly.
            </p>
          </a>

          <div className="rounded-2xl border border-white/10 bg-surface p-6">
            <h2 className="font-display text-lg text-gold">
              Book a Call
            </h2>

            <p className="mt-2 text-sm text-muted">
              Pick a time that suits you. (Calendly link will be added here.)
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}