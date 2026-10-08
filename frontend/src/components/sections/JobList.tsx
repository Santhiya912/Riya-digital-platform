"use client";
import { useState } from "react";
import Link from "next/link";
import { jobs } from "@/data/jobs";

const unique = (key: "department" | "designation" | "experience") => [
  "All",
  ...Array.from(new Set(jobs.map((j) => j[key]))),
];

const select =
  "rounded-lg border border-white/10 bg-surface-2 px-4 py-2 text-sm text-white outline-none focus:border-gold";

export default function JobList() {
  const [department, setDepartment] = useState("All");
  const [designation, setDesignation] = useState("All");
  const [experience, setExperience] = useState("All");

  const filtered = jobs.filter(
    (j) =>
      (department === "All" || j.department === department) &&
      (designation === "All" || j.designation === designation) &&
      (experience === "All" || j.experience === experience)
  );

  const filters = [
    { label: "Department", value: department, set: setDepartment, options: unique("department") },
    { label: "Designation", value: designation, set: setDesignation, options: unique("designation") },
    { label: "Experience", value: experience, set: setExperience, options: unique("experience") },
  ];

  return (
    <div>
      <div className="flex flex-wrap gap-4">
        {filters.map((f) => (
          <label key={f.label} className="text-xs text-muted">
            {f.label}
            <select className={`${select} mt-1 block`} value={f.value} onChange={(e) => f.set(e.target.value)}>
              {f.options.map((o) => (
                <option key={o} value={o} className="bg-black">{o}</option>
              ))}
            </select>
          </label>
        ))}
      </div>

      <div className="mt-10 grid gap-5">
        {filtered.length === 0 && <p className="text-muted">No openings match these filters.</p>}
        {filtered.map((j) => (
          <Link
            key={j.slug}
            href={`/careers/${j.slug}`}
            className="group rounded-2xl border border-white/10 bg-surface p-6 transition hover:border-gold/60"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-display text-xl font-semibold group-hover:text-gold">{j.title}</h2>
              <span className="text-sm text-gold">View details →</span>
            </div>
            <p className="mt-2 text-sm text-muted">{j.summary}</p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              {[j.department, j.designation, j.experience, j.type, j.location].map((t) => (
                <span key={t} className="rounded-full border border-white/15 px-3 py-1 text-muted">{t}</span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}