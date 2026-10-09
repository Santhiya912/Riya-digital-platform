import BlogList from "@/components/sections/BlogList";

export const metadata = { title: "Blog | Riyadvi" };

export default function BlogPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 pb-24 pt-32">
      <p className="text-sm uppercase tracking-widest text-gold">Blog</p>
      <h1 className="mt-2 font-display text-5xl font-bold">Insights for Growing Businesses</h1>
      <p className="mt-4 max-w-2xl text-muted">
        Ideas on web, apps, marketing, design and immersive technology.
      </p>
      <div className="mt-12">
        <BlogList />
      </div>
    </main>
  );
}