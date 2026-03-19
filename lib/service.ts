import { services } from "@/types/service";

export function createSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// 1. Core Service Categories (used on Homepage)
export const servicesItem: services[] = [
  {
    num: "01",
    title: "Build",
    tags: [
      "Custom websites",
      "Mobile apps",
      "AI products",
      "Web3",
      "E-commerce",
      "ERP systems",
    ],
  },
  {
    num: "02",
    title: "Design",
    tags: [
      "Brand identity",
      "UX / UI",
      "Motion graphics",
      "CGI",
      "Photography",
      "Social creative",
    ],
  },
  {
    num: "03",
    title: "Grow",
    tags: [
      "SEO",
      "Paid ads",
      "Social media",
      "Crypto marketing",
      "PR",
      "Email marketing",
    ],
  },
  {
    num: "04",
    title: "Plan",
    tags: [
      "Growth strategy",
      "Pitch decks",
      "Tokenomics",
      "Investor marketing",
      "Go-to-market strategy",
    ],
  },
  {
    num: "05",
    title: "Manage",
    tags: [
      "HubSpot / Salesforce",
      "Community management",
      "Brand operations",
      "Crisis communications",
    ],
  },
];

// 2. Dynamic Service Details Data Layer (used on /services/[slug])
export interface ServiceDetail {
  slug: string;
  category: string;
  title: string;
  description: string;
  benefits: string[];
  process: string[];
  image: string;
}

export const allServiceDetails: ServiceDetail[] = [
  {
    slug: createSlug("Build"),
    category: "Build",
    title: "Build",
    description:
      "We build products that work and brands that last. From your first website to a full-scale AI product, we bring your vision to life with clean code, smart architecture, and a relentless focus on performance.",
    benefits: [
      "Custom websites",
      "Mobile apps",
      "AI products",
      "Web3",
      "E-commerce",
      "ERP systems",
    ],
    process: [
      "Product planning",
      "Architecture design",
      "Development",
      "Launch & optimization",
    ],
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: createSlug("Design"),
    category: "Design",
    title: "Design",
    description:
      "Brands that mean something before anyone reads a word. We design with intention. Every visual choice — from the logo to the layout — is rooted in your brand's story and built to make an impression that lasts.",
    benefits: [
      "Brand identity",
      "UX / UI",
      "Motion graphics",
      "CGI",
      "Photography",
      "Social creative",
    ],
    process: [
      "Brand discovery",
      "Concept design",
      "System creation",
      "Asset delivery",
    ],
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: createSlug("Grow"),
    category: "Grow",
    title: "Grow",
    description:
      "Marketing that earns attention and converts it. We build marketing systems that compound over time — organic reach, paid performance, and community, all working together toward one goal: sustainable growth.",
    benefits: [
      "SEO",
      "Paid ads",
      "Social media",
      "Crypto marketing",
      "PR",
      "Email marketing",
    ],
    process: ["Channel strategy", "Campaign setup", "Execution", "Optimization"],
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: createSlug("Plan"),
    category: "Plan",
    title: "Plan",
    description:
      "The thinking that makes everything else work harder. Strategy is not a document. It is a decision-making framework that shapes everything your brand does. We build it with you, then help you execute it.",
    benefits: [
      "Growth strategy",
      "Pitch decks",
      "Tokenomics",
      "Investor marketing",
      "Go-to-market strategy",
    ],
    process: [
      "Research",
      "Strategic mapping",
      "Planning",
      "Execution guidance",
    ],
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: createSlug("Manage"),
    category: "Manage",
    title: "Manage",
    description:
      "The infrastructure that keeps growth from breaking your business. Growth creates complexity. We build the systems and processes that absorb it — so your team can keep building without the chaos catching up.",
    benefits: [
      "HubSpot / Salesforce",
      "Community management",
      "Brand operations",
      "Crisis communications",
    ],
    process: [
      "System setup",
      "Workflow design",
      "Integration",
      "Ongoing management",
    ],
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1600&q=80",
  },
];

export function getServiceDetailBySlug(slug: string): ServiceDetail {
  const foundService = allServiceDetails.find((s) => s.slug === slug);
  if (foundService) return foundService;

  const formattedTitle = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  return {
    slug,
    category: "Specialized Service",
    title: formattedTitle,
    description: `Bespoke end-to-end solutions focused specifically on ${formattedTitle}. We deploy our elite teams to architect highly customized outputs that align strictly with your business goals, ensuring every technical and creative aspect is flawlessly executed.`,
    benefits: [
      `Uncompromised focus on unlocking scalable ${formattedTitle} momentum.`,
      "Direct continuous integration alongside your internal team.",
      "Bespoke analytics mapping and rigorous post-deployment reviews.",
    ],
    process: [
      "Deep-Dive Discovery & Audit",
      "Strategic Architecture Mapping",
      "Rigorous Execution & QA",
      "Deployment & KPI Monitoring",
    ],
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1600&q=80",
  };
}

