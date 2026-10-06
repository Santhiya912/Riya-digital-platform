export type Project = {
  slug: string;
  name: string;
  client: string;
  industry: string;
  summary: string;
  challenge: string;
  solution: string;
  technologies: string[];
  results: string[];
  relatedServices: string[]; // service slugs
  presentation: "standard" | "3d";
};

export const projects: Project[] = [
  {
    slug: "puratap",
    name: "Puratap",
    client: "Puratap",
    industry: "Water Purification",
    summary: "A modern product website for a water purification brand.",
    challenge: "The brand needed a clear online presence that explained its products and generated leads.",
    solution: "We designed a fast, responsive website with clear product pages and enquiry forms.",
    technologies: ["Next.js", "React", "Node.js", "MongoDB"],
    results: ["Higher enquiry volume", "Faster page loading", "Mobile-friendly experience"],
    relatedServices: ["web-development", "ui-ux-design"],
    presentation: "3d",
  },
  {
    slug: "wanaromah",
    name: "Wanaromah Perfumers",
    client: "Wanaromah Perfumers",
    industry: "Fragrance & Retail",
    summary: "An elegant e-commerce experience for a perfume brand.",
    challenge: "The brand wanted its premium feel to carry into the online store.",
    solution: "A refined storefront with rich product visuals and a simple checkout flow.",
    technologies: ["WordPress", "WooCommerce", "Tailwind"],
    results: ["Premium brand presence", "Improved online sales", "Better product discovery"],
    relatedServices: ["web-development", "digital-marketing"],
    presentation: "standard",
  },
  {
    slug: "laxmi-astro-ai",
    name: "Laxmi Astro AI",
    client: "Laxmi Astro AI",
    industry: "Astrology & AI",
    summary: "An AI-powered astrology platform.",
    challenge: "Deliver personalised astrology insights in a simple, trustworthy interface.",
    solution: "A mobile-first app with AI-driven readings and clean UX.",
    technologies: ["React Native", "Node.js", "AI APIs"],
    results: ["Engaging user experience", "Personalised insights", "Scalable architecture"],
    relatedServices: ["app-development", "ui-ux-design"],
    presentation: "standard",
  },
  {
    slug: "studio11",
    name: "Studio11",
    client: "Studio11",
    industry: "Salon & Lifestyle",
    summary: "A stylish website for a modern studio.",
    challenge: "Showcase services and make booking easy.",
    solution: "A visual-first website with service pages and booking enquiries.",
    technologies: ["Next.js", "Tailwind"],
    results: ["More booking enquiries", "Strong visual identity"],
    relatedServices: ["web-development", "ui-ux-design"],
    presentation: "standard",
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}