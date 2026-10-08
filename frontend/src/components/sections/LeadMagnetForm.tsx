"use client";
import { useState } from "react";
import { postForm, type ApiResult } from "@/lib/api";

const input =
  "w-full rounded-lg border border-white/10 bg-surface-2 px-4 py-3 text-sm text-white outline-none transition focus:border-gold";

export default function LeadMagnetForm() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ApiResult | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const res = await postForm("lead-magnet", data);
    setResult(res);
    setLoading(false);
  }

  const fieldError = (f: string) =>
    result?.errors?.find((e) => e.field === f)?.message;

  if (result?.success) {
    return (
      <div className="py-6 text-center">
        <h2 className="font-display text-2xl text-gold">Your guide is ready!</h2>
        <p className="mt-3 text-muted">Thank you. Click below to download your copy.</p>
        <a
          href="/guides/software-project-planning-guide.pdf"
          download
          className="mt-6 inline-block rounded-full bg-gold px-8 py-3 font-semibold text-black hover:bg-gold-light"
        >
          Download PDF
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <input name="name" placeholder="Your name *" className={input} required />
        {fieldError("name") && <p className="mt-1 text-xs text-red-400">{fieldError("name")}</p>}
      </div>
      <div>
        <input name="company" placeholder="Company *" className={input} required />
        {fieldError("company") && <p className="mt-1 text-xs text-red-400">{fieldError("company")}</p>}
      </div>
      <div>
        <input name="email" type="email" placeholder="Email *" className={input} required />
        {fieldError("email") && <p className="mt-1 text-xs text-red-400">{fieldError("email")}</p>}
      </div>
      <div>
        <input name="phone" placeholder="Phone *" className={input} required />
        {fieldError("phone") && <p className="mt-1 text-xs text-red-400">{fieldError("phone")}</p>}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-gold px-8 py-3 font-semibold text-black transition hover:bg-gold-light disabled:opacity-60"
      >
        {loading ? "Please wait..." : "Download the Guide"}
      </button>

      {result && !result.success && (
        <p className="text-sm text-red-400">{result.message}</p>
      )}
    </form>
  );
}