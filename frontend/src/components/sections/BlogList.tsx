"use client";
import { useState } from "react";
import Link from "next/link";
import { posts, categories } from "@/data/blog";

const allTags = Array.from(new Set(posts.flatMap((p) => p.tags)));

const fmt = (d: string) =>
  new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

export default function BlogList() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [tag, setTag] = useState("");

  const filtered = posts.filter((p) => {
    const text = `${p.title} ${p.excerpt} ${p.tags.join(" ")}`.toLowerCase();
    return (
      text.includes(q.toLowerCase()) &&
      (cat === "All" || p.category === cat) &&
      (!tag || p.tags.includes(tag))
    );
  });

  const featured = posts.find((p) => p.featured);
  const showFeatured = featured && !q && cat === "All" && !tag;
  const list = showFeatured ? filtered.filter((p) => p.slug !== featured.slug) : filtered;

  const chip = (active: boolean) =>
    `rounded-full border px-4 py-1.5 text-sm transition ${
      active ? "border-gold bg-gold text-black" : "border-white/20 text-muted hover:border-gold/60"
    }`;

  return (
    <div>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search articles..."
        className="w-full rounded-lg border border-white/10 bg-surface-2 px-4 py-3 text-sm outline-none focus:border-gold"
      />

      <div className="mt-5 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button key={c} className={chip(cat === c)} onClick={() => setCat(c)}>
            {c}
          </button>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap gap-2 text-xs">
        {allTags.map((t) => (
          <button
            key={t}
            onClick={() => setTag(tag === t ? "" : t)}
            className={`rounded-md px-3 py-1 ${tag === t ? "bg-gold text-black" : "bg-surface-2 text-muted hover:text-gold"}`}
          >
            #{t}
          </button>
        ))}
      </div>

      {showFeatured && (
        <Link
          href={`/blog/${featured.slug}`}
          className="group mt-10 block rounded-2xl border border-gold/40 bg-gradient-to-br from-gold/10 to-transparent p-8 transition hover:border-gold"
        >
          <p className="text-xs uppercase tracking-widest text-gold">Featured · {featured.category}</p>
          <h2 className="mt-2 font-display text-3xl font-bold group-hover:text-gold">{featured.title}</h2>
          <p className="mt-3 max-w-2xl text-muted">{featured.excerpt}</p>
          <p className="mt-4 text-xs text-muted">{fmt(featured.date)} · {featured.readTime}</p>
        </Link>
      )}

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.length === 0 && <p className="text-muted">No articles found.</p>}
        {list.map((p) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="group rounded-2xl border border-white/10 bg-surface p-6 transition hover:-translate-y-1 hover:border-gold/60"
          >
            <p className="text-xs uppercase tracking-widest text-gold">{p.category}</p>
            <h3 className="mt-2 font-display text-lg font-semibold group-hover:text-gold">{p.title}</h3>
            <p className="mt-2 text-sm text-muted">{p.excerpt}</p>
            <p className="mt-4 text-xs text-muted">{fmt(p.date)} · {p.readTime}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}