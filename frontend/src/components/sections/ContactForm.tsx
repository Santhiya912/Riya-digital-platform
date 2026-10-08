"use client";

import { useState } from "react";
import { postForm, type ApiResult } from "@/lib/api";

const requirements = [
  "Web Development",
  "App Development",
  "Digital Marketing",
  "AR / VR",
  "3D Modeling",
  "UI/UX Design",
  "Other",
];

const input =
  "w-full rounded-lg border border-white/10 bg-surface-2 px-4 py-3 text-sm text-white outline-none transition focus:border-gold";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ApiResult | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;

    setLoading(true);
    setResult(null);

    const data = Object.fromEntries(new FormData(form));

    const res = await postForm("contact", data);

    setResult(res);
    setLoading(false);

    if (res.success) {
      form.reset();
    }
  }

  const fieldError = (f: string) =>
    result?.errors?.find((e) => e.field === f)?.message;

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <input
            name="name"
            placeholder="Your name *"
            className={input}
            required
          />
          {fieldError("name") && (
            <p className="mt-1 text-xs text-red-400">
              {fieldError("name")}
            </p>
          )}
        </div>

        <div>
          <input
            name="email"
            type="email"
            placeholder="Email *"
            className={input}
            required
          />
          {fieldError("email") && (
            <p className="mt-1 text-xs text-red-400">
              {fieldError("email")}
            </p>
          )}
        </div>

        <div>
          <input
            name="phone"
            placeholder="Phone *"
            className={input}
            required
          />
          {fieldError("phone") && (
            <p className="mt-1 text-xs text-red-400">
              {fieldError("phone")}
            </p>
          )}
        </div>

        <div>
          <input
            name="company"
            placeholder="Company"
            className={input}
          />
        </div>
      </div>

      <select
        name="requirement"
        className={input}
        required
        defaultValue=""
      >
        <option value="" disabled>
          Select your requirement *
        </option>

        {requirements.map((r) => (
          <option key={r} value={r} className="bg-black">
            {r}
          </option>
        ))}
      </select>

      <div>
        <textarea
          name="message"
          rows={5}
          placeholder="Tell us about your project * (min 10 characters)"
          className={input}
          required
        />

        {fieldError("message") && (
          <p className="mt-1 text-xs text-red-400">
            {fieldError("message")}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="rounded-full bg-gold px-8 py-3 font-semibold text-black transition hover:bg-gold-light disabled:opacity-60"
      >
        {loading ? "Sending..." : "Send Message"}
      </button>

      {result && (
        <p
          className={`text-sm ${
            result.success ? "text-green-400" : "text-red-400"
          }`}
        >
          {result.success
            ? "Thank you! We have received your message and will contact you soon."
            : result.message}
        </p>
      )}
    </form>
  );
}