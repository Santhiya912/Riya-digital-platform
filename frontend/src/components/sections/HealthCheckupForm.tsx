"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { postForm, type ApiResult } from "@/lib/api";

const input =
  "w-full rounded-lg border border-white/10 bg-surface-2 px-4 py-3 text-sm text-white outline-none transition focus:border-gold";

const steps = ["Business", "Digital Presence", "Marketing", "Technology", "Challenges"];
const channelOptions = ["SEO", "Social Media", "Google Ads", "Email", "Content", "None yet"];
const toolOptions = ["Website", "CRM", "Mobile App", "ERP", "E-commerce", "None yet"];

type Data = {
  name: string; industry: string; size: string; email: string; phone: string;
  hasWebsite: string; websiteUrl: string;
  channels: string[]; budget: string;
  tools: string[]; pain: string;
  challenges: string;
};

const empty: Data = {
  name: "", industry: "", size: "", email: "", phone: "",
  hasWebsite: "", websiteUrl: "",
  channels: [], budget: "",
  tools: [], pain: "",
  challenges: "",
};

export default function HealthCheckupForm() {
  const [step, setStep] = useState(0);
  const [d, setD] = useState<Data>(empty);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ApiResult | null>(null);

  const set = (k: keyof Data, v: string | string[]) => setD((p) => ({ ...p, [k]: v }));
  const toggle = (k: "channels" | "tools", v: string) =>
    set(k, d[k].includes(v) ? d[k].filter((x) => x !== v) : [...d[k], v]);

  function validate(): string {
    if (step === 0) {
      if (d.name.trim().length < 2) return "Please enter your business name.";
      if (!/^\S+@\S+\.\S+$/.test(d.email)) return "Please enter a valid email.";
      if (!/^[0-9+\-\s]{8,15}$/.test(d.phone)) return "Please enter a valid phone number.";
    }
    if (step === 1 && !d.hasWebsite) return "Please tell us if you have a website.";
    return "";
  }

  function next() {
    const err = validate();
    setError(err);
    if (!err) setStep((s) => s + 1);
  }

  async function submit() {
    setLoading(true);
    const payload = {
      business: { name: d.name, industry: d.industry, size: d.size, email: d.email, phone: d.phone },
      digitalPresence: { hasWebsite: d.hasWebsite, websiteUrl: d.websiteUrl },
      marketing: { channels: d.channels, budget: d.budget },
      technology: { tools: d.tools, pain: d.pain },
      challenges: d.challenges,
    };
    const res = await postForm("health-checkup", payload);
    setResult(res);
    setLoading(false);
  }

  if (result?.success) {
    return (
      <div className="py-10 text-center">
        <h2 className="font-display text-3xl text-gold">Thank you!</h2>
        <p className="mt-3 text-muted">
          We have received your Business Health Checkup. Our team will review it and contact you with
          your personalised report.
        </p>
      </div>
    );
  }

  const chip = (active: boolean) =>
    `cursor-pointer rounded-full border px-4 py-2 text-sm transition ${
      active ? "border-gold bg-gold text-black" : "border-white/20 text-muted hover:border-gold/60"
    }`;

  return (
    <div>
      {/* Progress */}
      <div className="mb-2 flex justify-between text-xs text-muted">
        <span>Step {step + 1} of {steps.length}</span>
        <span>{steps[step]}</span>
      </div>
      <div className="mb-8 h-1 w-full rounded bg-white/10">
        <div
          className="h-1 rounded bg-gold transition-all duration-500"
          style={{ width: `${((step + 1) / steps.length) * 100}%` }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.25 }}
          className="space-y-4"
        >
          {step === 0 && (
            <>
              <input className={input} placeholder="Business name *" value={d.name} onChange={(e) => set("name", e.target.value)} />
              <div className="grid gap-4 sm:grid-cols-2">
                <input className={input} placeholder="Industry" value={d.industry} onChange={(e) => set("industry", e.target.value)} />
                <select className={input} value={d.size} onChange={(e) => set("size", e.target.value)}>
                  <option value="">Team size</option>
                  {["1-10", "11-50", "51-200", "200+"].map((s) => (
                    <option key={s} value={s} className="bg-black">{s}</option>
                  ))}
                </select>
                <input className={input} type="email" placeholder="Email *" value={d.email} onChange={(e) => set("email", e.target.value)} />
                <input className={input} placeholder="Phone *" value={d.phone} onChange={(e) => set("phone", e.target.value)} />
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <p className="text-sm text-muted">Do you have a website? *</p>
              <div className="flex gap-3">
                {["Yes", "No", "Needs a revamp"].map((o) => (
                  <button type="button" key={o} className={chip(d.hasWebsite === o)} onClick={() => set("hasWebsite", o)}>
                    {o}
                  </button>
                ))}
              </div>
              {d.hasWebsite && d.hasWebsite !== "No" && (
                <input className={input} placeholder="Website URL" value={d.websiteUrl} onChange={(e) => set("websiteUrl", e.target.value)} />
              )}
            </>
          )}

          {step === 2 && (
            <>
              <p className="text-sm text-muted">Which marketing channels do you use?</p>
              <div className="flex flex-wrap gap-3">
                {channelOptions.map((c) => (
                  <button type="button" key={c} className={chip(d.channels.includes(c))} onClick={() => toggle("channels", c)}>
                    {c}
                  </button>
                ))}
              </div>
              <select className={input} value={d.budget} onChange={(e) => set("budget", e.target.value)}>
                <option value="">Monthly marketing budget</option>
                {["Below ₹25,000", "₹25,000 - ₹1,00,000", "Above ₹1,00,000"].map((b) => (
                  <option key={b} value={b} className="bg-black">{b}</option>
                ))}
              </select>
            </>
          )}

          {step === 3 && (
            <>
              <p className="text-sm text-muted">Which digital tools do you use?</p>
              <div className="flex flex-wrap gap-3">
                {toolOptions.map((t) => (
                  <button type="button" key={t} className={chip(d.tools.includes(t))} onClick={() => toggle("tools", t)}>
                    {t}
                  </button>
                ))}
              </div>
              <textarea className={input} rows={3} placeholder="Biggest technology pain point" value={d.pain} onChange={(e) => set("pain", e.target.value)} />
            </>
          )}

          {step === 4 && (
            <>
              <p className="text-sm text-muted">What are your biggest business challenges right now?</p>
              <textarea className={input} rows={5} placeholder="Tell us what is holding your growth back" value={d.challenges} onChange={(e) => set("challenges", e.target.value)} />
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
      {result && !result.success && (
        <div className="mt-4 text-sm text-red-400">
          <p>{result.message}</p>
          {result.errors?.map((e) => (
            <p key={e.field}>• {e.field}: {e.message}</p>
          ))}
        </div>
      )}

      <div className="mt-8 flex justify-between">
        <button
          type="button"
          onClick={() => { setError(""); setStep((s) => s - 1); }}
          disabled={step === 0}
          className="rounded-full border border-white/20 px-6 py-2 text-sm disabled:opacity-30"
        >
          Back
        </button>
        {step < steps.length - 1 ? (
          <button type="button" onClick={next} className="rounded-full bg-gold px-8 py-2 font-semibold text-black hover:bg-gold-light">
            Next
          </button>
        ) : (
          <button type="button" onClick={submit} disabled={loading} className="rounded-full bg-gold px-8 py-2 font-semibold text-black hover:bg-gold-light disabled:opacity-60">
            {loading ? "Submitting..." : "Submit"}
          </button>
        )}
      </div>
    </div>
  );
}