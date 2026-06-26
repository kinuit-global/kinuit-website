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
  },
  {
    slug: "branding-agency-uae",
    category: "Design",
    title: "Branding Agency UAE",
    description: "Build a brand that commands attention. As a premier branding agency in the UAE, we engineer cohesive brand identities, visual style systems, and localized positioning strategies designed to help ambitious Middle East and global businesses stand out.",
    benefits: [
      "Localized brand strategy tailored to Middle Eastern and international consumers.",
      "Complete visual identity systems including logos, typography, and guidelines.",
      "Seamless support for bilingual layouts (Arabic and English translation support).",
      "Comprehensive digital asset rollouts to accelerate your market presence."
    ],
    expertise: [
      "Brand positioning",
      "Bilingual brand operations",
      "Visual style guides",
      "Trademark packaging"
    ],
    process: [
      "Market discovery & local analysis",
      "Concept design & typography system",
      "Bilingual guidelines preparation",
      "Asset rollout & execution support"
    ],
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1600&q=80"
  },
  {
    slug: "saas-marketing-agency",
    category: "Grow",
    title: "SaaS Marketing Agency",
    description: "Accelerate your monthly recurring revenue. We function as a specialized SaaS marketing agency, building data-driven organic and paid acquisition systems designed to lower customer acquisition cost (CAC) and scale customer lifetime value (LTV).",
    benefits: [
      "Product-led growth (PLG) onboarding and activation optimizations.",
      "High-intent search engine optimization and B2B SaaS content writing.",
      "Targeted retargeting and demo acquisition paid ad funnels.",
      "Comprehensive attribution setup to track direct MRR growth."
    ],
    expertise: [
      "Product-led growth campaigns",
      "Attribution analytics mapping",
      "SaaS content strategy",
      "LTV/CAC ratio optimizations"
    ],
    process: [
      "Funnel friction diagnostics",
      "Attribution & analytics setup",
      "Multi-channel pilot campaigns",
      "Continuous optimization loops"
    ],
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1600&q=80"
  },
  {
    slug: "fintech-marketing-agency",
    category: "Grow",
    title: "Fintech Marketing Agency",
    description: "Establish financial authority and acquire users. As a specialized Fintech marketing agency, we navigate complex compliance requirements to build highly engaging, conversion-optimized campaigns for payment gateways, neo-banks, and wealthtech applications.",
    benefits: [
      "Trust-building content strategy positioning you as a financial authority.",
      "Compliance-first marketing strategies avoiding ad account suspensions.",
      "Conversion rate optimization (CRO) for digital registration forms.",
      "Multichannel marketing combining paid performance with organic SEO."
    ],
    expertise: [
      "Compliance verification setups",
      "KYC funnel optimization",
      "Financial thought leadership",
      "Security positioning"
    ],
    process: [
      "Compliance & security audits",
      "Funnel registration analysis",
      "Multi-channel ad execution",
      "Ongoing trust-building optimization"
    ],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80"
  },
  {
    slug: "web-design-agency-dubai",
    category: "Build",
    title: "Web Design Agency Dubai",
    description: "Stunning designs engineered with zero latency. We operate as a premier web design agency in Dubai, launching custom Next.js websites, high-converting e-commerce platforms, and corporate web spaces specifically optimized for UAE load speeds and search engine positioning.",
    benefits: [
      "Bespoke, premium UI/UI designs tailored to modern Dubai brands.",
      "Lightning-fast Next.js engineering for perfect Core Web Vitals.",
      "Full RTL / Arabic bilingual layout compatibility.",
      "Search-first structure to rank organically in UAE search pages."
    ],
    expertise: [
      "Next.js custom web engineering",
      "Bilingual RTL web designs",
      "Conversion-optimized UI/UX",
      "Local server hosting setup"
    ],
    process: [
      "UI/UX wireframing & conceptualization",
      "Bilingual copywriting",
      "React/Next.js frontend development",
      "Performance tuning & launching"
    ],
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80"
  },
  {
    slug: "seo-agency-india",
    category: "Grow",
    title: "SEO Agency India",
    description: "Rank for high-intent keywords and build organic compounding traffic. We operate as a premier SEO agency in India, deploying modern, technical site audits, semantic content structures, and white-hat link acquisition campaigns designed to dominate global SERPs.",
    benefits: [
      "Technical audits covering schema markups, speed, and indexing issues.",
      "Semantic content marketing targeting high-converting search keywords.",
      "Ethical, high-authority backlink outreach to build domain ratings.",
      "Transparent dashboards tracking keywords, clicks, and conversion ROI."
    ],
    expertise: [
      "Technical SEO auditing",
      "Semantic keywords research",
      "White-hat link acquisition",
      "Analytics conversion tracking"
    ],
    process: [
      "Complete site audit & diagnostics",
      "On-page keyword alignment",
      "Content hub creation",
      "Outreach & link building campaigns"
    ],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80"
  },
  {
    slug: "ai-marketing-agency",
    category: "Grow",
    title: "AI Marketing Agency",
    description: "Leverage machine learning to scale growth. As a specialized AI marketing agency, we design and deploy smart campaigns, automated customer segments, and generative content structures that optimize conversion workflows and lower overall operating costs.",
    benefits: [
      "AI-driven customer segmentation to target high-value buyers.",
      "Automated conversion personalization on website landing pages.",
      "Predictive analytics tracking upcoming marketing performance trends.",
      "Smart content generation pipelines powered by curated language engines."
    ],
    expertise: [
      "Machine learning analytics",
      "Marketing stack automation",
      "Dynamic ad personalizations",
      "Generative pipeline integrations"
    ],
    process: [
      "Analytics framework review",
      "Automation tool integration",
      "Campaign parameter optimization",
      "Continuous performance feedback loops"
    ],
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1600&q=80"
  },
  {
    slug: "social-media-agency-uk",
    category: "Grow",
    title: "Social Media Agency UK",
    description: "Build an active community and scale social sales. We operate as a premier social media agency in the UK, creating custom creative content, motion graphics, and highly targeted ad campaigns that increase brand awareness and engagement across major UK markets.",
    benefits: [
      "Premium creative assets including custom graphics and short-form videos.",
      "Proactive UK community management to capture audience trust.",
      "Coordinated paid social campaigns (Meta, TikTok, and LinkedIn Ads).",
      "Consistent content calendars matching your brand voice."
    ],
    expertise: [
      "Short-form video production",
      "UK trend optimizations",
      "Paid social acquisition",
      "Community group management"
    ],
    process: [
      "Creative concept brainstorm",
      "Content production & planning",
      "Targeted ad campaign launch",
      "Daily community monitoring & adjustment"
    ],
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1600&q=80"
  },
  {
    slug: "growth-agency-usa",
    category: "Grow",
    title: "Growth Agency USA",
    description: "Unlock rapid, data-backed scaling. We operate as an elite growth agency in the USA, executing rapid A/B experiments, funnel optimizations, and customer acquisition loops that target high-growth markets and build consistent business revenue.",
    benefits: [
      "Comprehensive conversion rate optimization (CRO) across landing pages.",
      "Rapid A/B testing frameworks validating user behavior signals.",
      "Full funnel analytics tracking every user action from visit to referral.",
      "Scalable growth loops designed to generate organic user invitations."
    ],
    expertise: [
      "Conversion funnel analysis",
      "A/B experimentation strategy",
      "Customer referral loop systems",
      "USA customer acquisition campaigns"
    ],
    process: [
      "Funnel registration analysis",
      "A/B test pipeline execution",
      "Growth loop integration",
      "Performance scaling & implementation"
    ],
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80"
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

