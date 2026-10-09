import type { VisualType } from "@/components/sections/ServiceVisuals";
export type Service = {
  slug: string;
  title: string;
  tagline: string;
  problem: string;
  solution: string;
  features: string[];
  useCases: string[];
  techStack: string[];
  process: { step: string; description: string }[];
  visual: VisualType;
};

export const services: Service[] = [
  {
    slug: "web-development",
    title: "Web Development",
    tagline: "Fast, scalable websites that convert visitors into customers.",
    problem: "Slow, outdated websites lose visitors and sales.",
    solution:
      "We build modern, high-performance websites and web apps tailored to your business goals.",
    features: ["Custom design", "SEO-ready", "CMS integration", "Fast loading"],
    useCases: ["Corporate sites", "E-commerce", "Web portals"],
    techStack: ["Next.js", "React", "Node.js", "MongoDB"],
    process: [
      { step: "Discover", description: "Understand your goals and users." },
      { step: "Design", description: "Wireframes and visual design." },
      { step: "Develop", description: "Clean, scalable code." },
      { step: "Launch", description: "Test, deploy and support." },
    ],
    visual: "browser",
  },
  {
    slug: "app-development",
    title: "App Development",
    tagline: "Mobile apps your customers love to use.",
    problem: "Businesses struggle to reach customers on mobile.",
    solution: "We build smooth, secure Android and iOS apps.",
    features: ["Cross-platform", "Push notifications", "API integration", "Secure"],
    useCases: ["Booking apps", "Delivery apps", "Business apps"],
    techStack: ["React Native", "Flutter", "Node.js", "Firebase"],
    process: [
      { step: "Discover", description: "Define features and users." },
      { step: "Design", description: "App UI/UX flows." },
      { step: "Develop", description: "Build and test." },
      { step: "Launch", description: "Store release and support." },
    ],
    visual: "phone",
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    tagline: "Grow your reach, leads and revenue.",
    problem: "Great businesses stay invisible online.",
    solution: "SEO, social media and ads that bring measurable growth.",
    features: ["SEO", "Social media", "Paid ads", "Analytics"],
    useCases: ["Lead generation", "Brand awareness", "Online sales"],
    techStack: ["Google Ads", "Meta Ads", "Analytics", "SEO tools"],
    process: [
      { step: "Audit", description: "Review your current presence." },
      { step: "Strategy", description: "Plan channels and goals." },
      { step: "Execute", description: "Run campaigns." },
      { step: "Optimize", description: "Measure and improve." },
    ],
    visual: "growth",
  },
  {
    slug: "ar-vr",
    title: "AR / VR",
    tagline: "Immersive experiences that make brands unforgettable.",
    problem: "Traditional media struggles to engage modern audiences.",
    solution: "We build AR and VR experiences for marketing, training and showcases.",
    features: ["AR filters", "VR tours", "Product demos", "Interactive training"],
    useCases: ["Real estate tours", "Product try-on", "Training"],
    techStack: ["Unity", "Three.js", "WebXR", "Blender"],
    process: [
      { step: "Concept", description: "Define the experience." },
      { step: "Model", description: "Create 3D assets." },
      { step: "Build", description: "Develop interactions." },
      { step: "Deploy", description: "Launch on devices or web." },
    ],
    visual: "vr",
  },
  {
    slug: "3d-modeling",
    title: "3D Modeling",
    tagline: "Realistic 3D models for products, spaces and brands.",
    problem: "Flat images can't show a product's full detail.",
    solution: "We create detailed 3D models and animations.",
    features: ["Product models", "Walkthroughs", "Rendering", "Animation"],
    useCases: ["Product visualization", "Architecture", "Advertising", "Game assets"],
    techStack: ["Blender", "Three.js", "Spline", "Substance"],
    process: [
      { step: "Brief", description: "Collect references." },
      { step: "Model", description: "Build the 3D asset." },
      { step: "Texture", description: "Materials and lighting." },
      { step: "Deliver", description: "Final render or web-ready file." },
    ],
    visual: "model",
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    tagline: "Interfaces that look great and feel effortless.",
    problem: "Confusing interfaces drive users away.",
    solution: "User-focused design that improves experience and conversions.",
    features: ["Research", "Wireframes", "Prototypes", "Design systems"],
    useCases: ["Web apps", "Mobile apps", "Dashboards"],
    techStack: ["Figma", "Adobe XD", "Framer", "Tailwind"],
    process: [
      { step: "Research", description: "Understand users." },
      { step: "Wireframe", description: "Structure the flow." },
      { step: "Design", description: "Visual interface." },
      { step: "Test", description: "Validate and refine." },
    ],
    visual: "ui",
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}