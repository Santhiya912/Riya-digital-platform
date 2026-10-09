"use client";
import { useState } from "react";
import { postForm, type ApiResult } from "@/lib/api";

const input =
  "w-full rounded-lg border border-white/10 bg-surface-2 px-4 py-3 text-sm text-white outline-none transition focus:border-gold";

export default function ConsultationForm() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ApiResult | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const res = await postForm("consultation", data);
    setResult(res);
    setLoading(false);
  }

  const fieldError = (f: string) => result?.errors?.find((e) => e.field === f)?.message;

  if (result?.success) {
    return (
      <div className="py-8 text-center">
        <h2 className="font-display text-3xl text-gold">Consultation requested!</h2>
        <p className="mt-3 text-muted">Thank you. Our team will contact you to confirm your slot.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <input name="name" placeholder="Your name *" className={input} required />
          {fieldError("name") && <p className="mt-1 text-xs text-red-400">{fieldError("name")}</p>}
        </div>
        <div>
          <input name="email" type="email" placeholder="Email *" className={input} required />
          {fieldError("email") && <p className="mt-1 text-xs text-red-400">{fieldError("email")}</p>}
        </div>
        <div>
          <input name="phone" placeholder="Phone *" className={input} required />
          {fieldError("phone") && <p className="mt-1 text-xs text-red-400">{fieldError("phone")}</p>}
        </div>
        <input name="company" placeholder="Company" className={input} />
      </div>
      <input name="preferredDate" type="date" className={input} />
      <textarea name="message" rows={4} placeholder="What would you like to discuss?" className={input} />
      <button
        type="submit"
        disabled={loading}
        className="rounded-full bg-gold px-8 py-3 font-semibold text-black transition hover:bg-gold-light disabled:opacity-60"
      >
        {loading ? "Booking..." : "Book My Free Consultation"}
      </button>
      {result && !result.success && <p className="text-sm text-red-400">{result.message}</p>}
    </form>
  );
}