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
    slug: "defi-brand-launch",
    tag: "WEB3 · BRAND + LAUNCH",
    title: "Brand identity, website, and go-to-market campaign",
    challenge: "A launch-ready brand for a DeFi protocol entering a crowded market.",
    solution: "Full brand identity, website build, and launch campaign from one brief.",
    outcome: "Live in 6 weeks. $2.1M raised in the first 90 days.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1600&q=80",
    client: "Nexus Protocol",
    year: "2023",
    services: ["Design", "Build", "Grow"]
  },
  {
    slug: "enterprise-ai-platform",
    tag: "AI PLATFORM · DESIGN + ENGINEERING",
    title: "Next-gen interface for enterprise machine learning",
    challenge: "Complex data models needed an intuitive, user-friendly dashboard for non-technical managers.",
    solution: "Complete UX/UI overhaul and robust React frontend engineering.",
    outcome: "Reduced user onboarding time by 40% and increased engagement.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
    client: "Aura Analytics",
    year: "2024",
    services: ["Plan", "Design", "Build"]
  },
  {
    slug: "fintech-mobile-banking",
    tag: "FINTECH APP · PRODUCT + GROWTH",
    title: "Seamless mobile banking experience and acquisition",
    challenge: "A legacy financial app losing market share to modern digital-only banks.",
    solution: "A mobile-first product redesign paired with a targeted paid acquisition funnel.",
    outcome: "Acquired 150,000 new active users in the first quarter post-launch.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    client: "Vault Bank",
    year: "2023",
    services: ["Design", "Build", "Grow"]
  },
  {
    slug: "luxury-ecommerce-headless",
    tag: "E-COMMERCE · REBRAND + DEVELOPMENT",
    title: "Headless commerce architecture mapping premium luxury",
    challenge: "A high-end fashion retailer hindered by slow page loads and outdated brand presence.",
    solution: "A complete visual rebrand deployed on a lightning-fast headless Next.js stack.",
    outcome: "Increased conversion rates by 212% with sub-second page loads.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    client: "Atelier Maison",
    year: "2024",
    services: ["Build", "Manage", "Design"]
  }
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
