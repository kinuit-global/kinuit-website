export interface Project {
  slug: string;
  tag: string;
  title: string;
  challenge: string;
  solution: string;
  outcome: string;
  image: string;
  imageAlt: string;
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
    imageAlt: "Nexus Protocol brand identity and go-to-market strategy by Kinuit",
    client: "Nexus Protocol",
    year: "2023",
    services: ["Design", "Build", "Grow"]
  },
  {
    slug: "lumina-wellness",
    tag: "HEALTH-TECH · AI PRODUCT",
    title: "Lumina: AI-Driven Personalized Wellness",
    challenge: "Developing a scalable AI platform that provides actionable health insights while maintaining a premium feel.",
    solution: "Custom data visualization dashboard, AI engine integration, and an elegant, calm UI.",
    outcome: "Increased user engagement by 45% and secured $2M in seed funding post-launch.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Lumina AI wellness platform UI design by Kinuit",
    client: "Lumina Health",
    year: "2024",
    services: ["Design", "Build"]
  },
  {
    slug: "horizon-capital",
    tag: "FINTECH · INSTITUTIONAL BRIDGE",
    title: "Horizon: Institutional Wealth Management",
    challenge: "Building a trust-heavy platform for high-net-worth investors with complex reporting needs.",
    solution: "A robust, security-first dashboard with real-time analytics and automated tax reporting.",
    outcome: "Successfully onboarded 50+ institutional clients within the first 6 months.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Horizon Capital institutional wealth management platform development by Kinuit",
    client: "Horizon Capital",
    year: "2023",
    services: ["Plan", "Design", "Build"]
  },
  {
    slug: "vortex-exchange",
    tag: "WEB3 · NFT INFRASTRUCTURE",
    title: "Vortex: High-Speed Digital Asset Exchange",
    challenge: "Designing a high-throughput exchange that remains intuitive for retail users.",
    solution: "A optimized React frontend with low-latency sockets and a simplified trading bridge.",
    outcome: "Handled $100M+ in volume during the first month without downtime.",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Vortex high-speed digital asset exchange interface by Kinuit",
    client: "Vortex Labs",
    year: "2024",
    services: ["Build", "Grow"]
  },
  {
    slug: "aura-creative",
    tag: "LUXURY · DIGITAL SHOWCASE",
    title: "Aura: Digital Experience for Global Brands",
    challenge: "Creating a portfolio that reflects the luxury and precision of a world-class creative studio.",
    solution: "A bespoke, immersive website with high-end motion graphics and editorial typography.",
    outcome: "Won Awwwards 'Site of the Day' and tripled new business inquiries.",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Aura Creative luxury digital showcase website by Kinuit",
    client: "Aura Studio",
    year: "2024",
    services: ["Design", "Build"]
  },
  {
    slug: "stealth-project",
    tag: "DEFI · IN DEVELOPMENT",
    title: "Project Zero: Modern RWA Infrastructure",
    challenge: "Confidential development of a scalable platform for real-world asset tokenization.",
    solution: "Custom enterprise-grade architecture and a premium institutional user experience.",
    outcome: "Under active development. Stealth launch coming soon.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Project Zero RWA infrastructure stealth launch teaser by Kinuit",
    client: "Project Zero",
    year: "",
    services: ["Plan", "Design", "Build"]
  }
];


export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
