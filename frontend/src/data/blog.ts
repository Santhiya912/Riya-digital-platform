export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  date: string; // YYYY-MM-DD
  readTime: string;
  featured?: boolean;
  content: string[]; // paragraphs
};

export const posts: Post[] = [
  {
    slug: "why-your-business-needs-a-modern-website",
    title: "Why Your Business Needs a Modern Website in 2026",
    excerpt: "A fast, well-designed website is now your best salesperson. Here is what modern really means.",
    category: "Web Development",
    tags: ["website", "performance", "conversion"],
    date: "2026-09-20",
    readTime: "5 min read",
    featured: true,
    content: [
      "Your website is often the first impression a customer has of your business. A slow or outdated site loses visitors within seconds.",
      "A modern website is fast, mobile-friendly, secure and designed around a clear goal, whether that is enquiries, bookings or sales.",
      "Investing in performance, clear messaging and good design directly improves conversion and trust.",
    ],
  },
  {
    slug: "web-vs-mobile-app-which-to-build-first",
    title: "Web App vs Mobile App: Which Should You Build First?",
    excerpt: "A simple framework to decide where to invest your first development budget.",
    category: "App Development",
    tags: ["mobile", "web", "strategy"],
    date: "2026-09-10",
    readTime: "4 min read",
    content: [
      "Many startups ask whether to launch on web or mobile first. The answer depends on your audience and how they use your product.",
      "If your users need quick, repeated access, a mobile app helps. If discovery and reach matter most, start with the web.",
      "Often the smartest path is a responsive web app first, then a mobile app once the idea is validated.",
    ],
  },
  {
    slug: "seo-basics-for-small-businesses",
    title: "SEO Basics Every Small Business Should Know",
    excerpt: "Practical steps to get found on Google without a huge budget.",
    category: "Digital Marketing",
    tags: ["seo", "marketing", "growth"],
    date: "2026-08-28",
    readTime: "6 min read",
    content: [
      "Search engine optimization helps customers find you when they are already looking for what you offer.",
      "Start with clear page titles, useful content, fast loading and a Google Business profile.",
      "Measure what works with analytics and improve steadily over time.",
    ],
  },
  {
    slug: "how-3d-is-changing-web-experiences",
    title: "How 3D Is Changing Web Experiences",
    excerpt: "From product viewers to immersive storytelling, 3D is moving into everyday websites.",
    category: "3D & AR/VR",
    tags: ["3d", "webgl", "innovation"],
    date: "2026-08-12",
    readTime: "5 min read",
    content: [
      "Technologies like WebGL and Three.js let websites show interactive 3D directly in the browser.",
      "Used well, 3D explains products, tells stories and makes brands memorable. Used badly, it slows the site down.",
      "The key is purpose and performance: lazy loading, light models and fallbacks for mobile.",
    ],
  },
  {
    slug: "ui-ux-mistakes-that-cost-you-customers",
    title: "UI/UX Mistakes That Cost You Customers",
    excerpt: "Common design problems that quietly reduce conversions, and how to fix them.",
    category: "UI/UX Design",
    tags: ["design", "ux", "conversion"],
    date: "2026-07-30",
    readTime: "4 min read",
    content: [
      "Confusing navigation, unclear buttons and slow forms are among the most common reasons users leave.",
      "Test your key flows with real users and simplify every step between a visitor and your goal.",
      "Small design improvements often produce the biggest gains in conversion.",
    ],
  },
];

export const categories = ["All", ...Array.from(new Set(posts.map((p) => p.category)))];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export function getRelated(post: Post, limit = 3) {
  return posts
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({
      p,
      score:
        (p.category === post.category ? 2 : 0) +
        p.tags.filter((t) => post.tags.includes(t)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.p);
}