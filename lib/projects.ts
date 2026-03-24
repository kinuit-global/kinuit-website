export interface Project {
  slug: string;
  tag: string;
  title: string;
  challenge: string;
  solution: string;
  outcome: string;
  image: string;
  client: string;
  year: string;
  services: string[];
}

export const projects: Project[] = [
  {
    slug: "nexus-protocol",
    tag: "WEB3 · BRAND + INTERFACE",
    title: "Nexus Protocol: Brand Identity & Go-to-Market",
    challenge: "A launch-ready brand for a DeFi protocol entering a competitive market.",
    solution: "Full brand system, high-performance website, and strategic launch assets.",
    outcome: "Successfully launched with a cohesive brand identity and production-ready interface.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1600&q=80",
    client: "Nexus Protocol",
    year: "2023",
    services: ["Design", "Build", "Grow"]
  },
  {
    slug: "stealth-project",
    tag: "DEFI · IN DEVELOPMENT",
    title: "Project Zero: Modern RWA Infrastructure",
    challenge: "Confidential development of a scalable platform for real-world asset tokenization.",
    solution: "Custom enterprise-grade architecture and a premium institutional user experience.",
    outcome: "Under active development. Stealth launch scheduled for Q4 2024.",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1600&q=80",
    client: "Project Zero",
    year: "2024",
    services: ["Plan", "Design", "Build"]
  }
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
