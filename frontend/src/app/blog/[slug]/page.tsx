import { notFound } from "next/navigation";
import Link from "next/link";
import { posts, getPost, getRelated } from "@/data/blog";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = getRelated(post);
  const date = new Date(post.date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <main className="mx-auto max-w-3xl px-6 pb-24 pt-32">
      <Link href="/blog" className="text-sm text-muted hover:text-gold">← All articles</Link>
      <p className="mt-6 text-sm uppercase tracking-widest text-gold">{post.category}</p>
      <h1 className="mt-2 font-display text-4xl font-bold md:text-5xl">{post.title}</h1>
      <p className="mt-4 text-sm text-muted">{date} · {post.readTime}</p>

      <article className="mt-10 space-y-5 text-lg leading-relaxed text-muted">
        {post.content.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </article>

      <div className="mt-8 flex flex-wrap gap-2">
        {post.tags.map((t) => (
          <span key={t} className="rounded-md bg-surface-2 px-3 py-1 text-xs text-muted">#{t}</span>
        ))}
      </div>

      <section className="mt-16">
        <h2 className="font-display text-2xl font-bold">Related Articles</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          {related.map((r) => (
            <Link
              key={r.slug}
              href={`/blog/${r.slug}`}
              className="rounded-xl border border-white/10 bg-surface p-5 transition hover:border-gold/60"
            >
              <p className="text-xs text-gold">{r.category}</p>
              <h3 className="mt-1 text-sm font-semibold">{r.title}</h3>
            </Link>
          ))}
        </div>
      </section>

      <div className="mt-16 text-center">
        <Link href="/contact" className="rounded-full bg-gold px-8 py-3 font-semibold text-black hover:bg-gold-light">
          Talk to Our Team
        </Link>
      </div>
    </main>
  );
}