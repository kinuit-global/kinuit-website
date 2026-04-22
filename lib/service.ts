import { services } from "@/types/service";
import { Blocks, PenTool, Rocket, Workflow } from "lucide-react";

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
    icon: Blocks,
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
    icon: PenTool,
    tags: [
      "Brand identity",
      "UX / UI",
      "Motion graphics",
      "CGI",
      "Photography",
      "Social creative",
      "Brand operations"
    ],
  },
  {
    num: "03",
    title: "Grow",
    icon: Rocket,
    tags: [
      "SEO",
      "Paid ads",
      "Social media",
      "Crypto marketing",
      "PR",
      "Email marketing",
      "Community management"
    ],
  },
  {
    num: "04",
    title: "Plan",
    icon: Workflow,
    tags: [
      "Growth strategy",
      "Pitch decks",
      "Tokenomics",
      "Investor marketing",
      "Go-to-market strategy",
      "HubSpot / Salesforce",
      "Crisis communications",
    ],
  },
  // {
  //   num: "05",
  //   title: "Manage",
  //   tags: [
  //     "HubSpot / Salesforce",
  //     "Community management",
  //     "Brand operations",
  //     "Crisis communications",
  //   ],
  // },
];

// 2. Dynamic Service Details Data Layer (used on /services/[slug])
export interface ServiceDetail {
  slug: string;
  category: string;
  title: string;
  description: string;
  benefits: string[];
  expertise?: string[]; // New: specifically for sub-service links
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
      "Future-proof technical architecture tailored to your unique scaling needs.",
      "High-performance codebases that reduce technical debt and maximize speed.",
      "Seamless integration with your existing tools and enterprise workflows.",
      "Security-first development practices to protect your data and users.",
    ],
    expertise: [
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
      "Cohesive brand systems that communicate authority and premium quality.",
      "User-centric interfaces that reduce friction and drive measurable conversion.",
      "High-impact motion and CGI that captures attention in crowded markets.",
      "Scalable design operations that maintain consistency across all channels.",
    ],
    expertise: [
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
      "Brand operations"
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
      "Data-driven growth audits that identify untapped market opportunities.",
      "Multichannel campaign coordination for maximum brand reach and impact.",
      "Conversion rate optimization (CRO) that turns traffic into actual revenue.",
      "Transparent reporting and KPI tracking to measure real business ROI.",
    ],
    expertise: [
      "SEO",
      "Paid ads",
      "Social media",
      "Crypto marketing",
      "PR",
      "Email marketing",
      "Community management"
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
      "Strategic clarity that aligns your entire team behind a single goal.",
      "Go-to-market frameworks that reduce risk and accelerate time-to-market.",
      "Investor-ready positioning that articulates your unique value proposition.",
      "Operational strategy that streamlines internal workflows for maximum output.",
    ],
    expertise: [
      "Growth strategy",
      "Pitch decks",
      "Tokenomics",
      "Investor marketing",
      "Go-to-market strategy"
    ],
    process: [
      "Research",
      "Strategic mapping",
      "Planning",
      "Execution guidance",
      "HubSpot / Salesforce",
      "Crisis communications"
    ],
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80",
  }
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
      "Dedicated expertise focused on your specific industry challenges.",
    ],
    // Expertise omitted for leaf nodes to avoid 404 links
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

