"use client";
import { useState } from "react";
import { postForm, type ApiResult } from "@/lib/api";

const input =
  "w-full rounded-lg border border-white/10 bg-surface-2 px-4 py-3 text-sm text-white outline-none transition focus:border-gold";

export default function ApplyForm({ position }: { position: string }) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ApiResult | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const res = await postForm("applications", data);
    setResult(res);
    setLoading(false);
  }

  const fieldError = (f: string) => result?.errors?.find((e) => e.field === f)?.message;

  if (result?.success) {
    return (
      <div className="py-6 text-center">
        <h3 className="font-display text-2xl text-gold">Application received!</h3>
        <p className="mt-2 text-muted">Thank you for applying. Our team will get in touch soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <input name="name" placeholder="Full name *" className={input} required />
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
        <input name="position" defaultValue={position} readOnly className={`${input} opacity-70`} />
      </div>
      <input name="resumeUrl" placeholder="Resume link (Google Drive / LinkedIn / portfolio)" className={input} />
      <textarea name="message" rows={4} placeholder="Why do you want to join us?" className={input} />
      <button
        type="submit"
        disabled={loading}
        className="rounded-full bg-gold px-8 py-3 font-semibold text-black transition hover:bg-gold-light disabled:opacity-60"
      >
        {loading ? "Submitting..." : "Submit Application"}
      </button>
      {result && !result.success && <p className="text-sm text-red-400">{result.message}</p>}
    </form>
  );
}