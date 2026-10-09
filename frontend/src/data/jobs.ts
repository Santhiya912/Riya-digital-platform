export type Job = {
  slug: string;
  title: string;
  department: string;
  designation: "Intern" | "Junior" | "Mid-level" | "Senior" | "Lead";
  experience: "Fresher" | "1-3 years" | "3-5 years" | "5+ years";
  location: string;
  type: "Full-time" | "Internship" | "Contract";
  summary: string;
  responsibilities: string[];
  requirements: string[];
};

export const jobs: Job[] = [
  {
    slug: "full-stack-developer",
    title: "Full Stack Developer",
    department: "Engineering",
    designation: "Mid-level",
    experience: "1-3 years",
    location: "Chennai, Tamil Nadu",
    type: "Full-time",
    summary: "Build and ship web applications using React, Next.js, Node.js and MongoDB.",
    responsibilities: [
      "Develop responsive frontends with Next.js and Tailwind",
      "Build REST APIs with Node.js and Express",
      "Work with MongoDB and optimize queries",
      "Collaborate with designers on interactive experiences",
    ],
    requirements: [
      "Strong JavaScript / TypeScript fundamentals",
      "Experience with React and Node.js",
      "Understanding of REST APIs and databases",
      "Good communication skills",
    ],
  },
  {
    slug: "ui-ux-designer",
    title: "UI/UX Designer",
    department: "Design",
    designation: "Junior",
    experience: "1-3 years",
    location: "Chennai, Tamil Nadu",
    type: "Full-time",
    summary: "Design intuitive, beautiful interfaces for web and mobile products.",
    responsibilities: [
      "Create wireframes, prototypes and design systems",
      "Conduct user research and usability testing",
      "Hand off designs to developers",
    ],
    requirements: [
      "Proficiency in Figma",
      "Portfolio with web / app projects",
      "Understanding of responsive design",
    ],
  },
  {
    slug: "digital-marketing-executive",
    title: "Digital Marketing Executive",
    department: "Marketing",
    designation: "Junior",
    experience: "Fresher",
    location: "Remote",
    type: "Full-time",
    summary: "Plan and run SEO, social and paid campaigns for clients.",
    responsibilities: [
      "Manage social media and content calendars",
      "Run and optimize Google / Meta ad campaigns",
      "Report on traffic and lead performance",
    ],
    requirements: [
      "Basic knowledge of SEO and analytics",
      "Good writing skills",
      "Eagerness to learn",
    ],
  },
  {
    slug: "3d-artist-intern",
    title: "3D Artist Intern",
    department: "Design",
    designation: "Intern",
    experience: "Fresher",
    location: "Chennai, Tamil Nadu",
    type: "Internship",
    summary: "Create 3D models and animations for web and AR/VR projects.",
    responsibilities: [
      "Model and texture 3D assets in Blender",
      "Optimize models for web delivery",
      "Support the team on AR/VR projects",
    ],
    requirements: [
      "Basic Blender skills",
      "Portfolio of 3D work",
      "Creative mindset",
    ],
  },
];

export function getJob(slug: string) {
  return jobs.find((j) => j.slug === slug);
}