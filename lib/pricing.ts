export type PricingPackage = {
  id: string;
  name: string;
  price: string;
  description?: string;
  features: string[];
  cta?: string;
  popular?: boolean;
};

export type PricingCategory = {
  id: string;
  label: string;
  packages: PricingPackage[];
};

export const PRICING_DATA: PricingCategory[] = [
  {
    id: "build",
    label: "Build",
    packages: [
      {
        id: "build-static",
        name: "Static Website",
        price: "$300",
        description: "Perfect for personal brands and small businesses needing a clean web presence.",
        features: [
          "Up to 5 Pages (Home, About, Services, Case Studies, Contact)",
          "Mobile-Responsive Design",
          "Basic SEO Meta Tags Setup",
          "Contact Form Integration",
          "Performance Optimization",
          "One (1) Round of Revision",
          "Deployment to Client's Hosting"
        ]
      },
      {
        id: "build-dynamic",
        name: "Dynamic Website",
        price: "$750",
        description: "A content-driven site with full management capabilities.",
        features: [
          "Up to 10 CMS Pages (Sanity, Contentful, or Strapi)",
          "Integrated Case Studies Module",
          "Dedicated Admin Panel",
          "Comprehensive SEO Setup",
          "Lead Capture System",
          "DNS Configuration",
          "Two (2) Rounds of Revision",
          "Performance Optimized"
        ]
      },
      {
        id: "build-custom",
        name: "Custom Website",
        price: "$1500",
        popular: true,
        description: "High-end custom architecture for enterprise-grade performance.",
        features: [
          "Unlimited Custom-Architected Pages",
          "Custom Interactions & Animations",
          "Full CMS Integration",
          "Advanced SEO Strategy",
          "Core Web Vitals Optimization",
          "Third-party API Integrations",
          "Three (3) Rounds of Revisions",
          "2 Weeks Post-Launch Support"
        ]
      },
      {
        id: "build-ecommerce",
        name: "E-commerce Website",
        price: "$1000",
        description: "Full-scale online store with secure payment integration.",
        features: [
          "Product Catalog (Up to 50 SKUs Setup)",
          "Cart & Secure Checkout Flow",
          "Razorpay / Stripe Integration",
          "Order Management Dashboard",
          "Mobile-First Responsive Design",
          "SEO Product Optimization",
          "Two (2) Rounds of Revision",
          "Deployment + Rigorous Testing"
        ]
      },
      {
        id: "build-mobile",
        name: "Mobile App (Android/iOS)",
        price: "$3000",
        description: "Native-quality mobile experiences for your business.",
        features: [
          "Native or React Native Development",
          "Complete UI/UX Design",
          "User Auth (Email & Social Login)",
          "Full Backend API Integration",
          "Push Notifications System",
          "App/Play Store Submission Support",
          "2 Weeks Post-Launch Support"
        ]
      },
      {
        id: "build-web3",
        name: "Web3 / DApp Development",
        price: "$2000",
        description: "Decentralized solutions for the future of the web.",
        features: [
          "Smart Contract (EVM or Solana)",
          "Popular Wallet Connectors Integration",
          "DApp Frontend Development",
          "Token Standard (ERC-20/ERC-721)",
          "Testnet & Mainnet Deployment",
          "Thorough Security Review",
          "Technical Documentation"
        ]
      },
      {
        id: "build-erp",
        name: "ERP System",
        price: "$4000",
        description: "Enterprise Resource Planning for complex operational needs.",
        features: [
          "Full Requirements Analysis",
          "Custom Modules (HR, Finance, CRM, etc.)",
          "Role-based Security & Permissions",
          "Dynamic Dashboards & Reporting",
          "Legacy Data Migration",
          "Two Dedicated Staff Training Sessions",
          "One Full Month Post-Launch Support"
        ]
      }
    ]
  },
  {
    id: "design",
    label: "Design",
    packages: [
      {
        id: "design-starter",
        name: "Brand Identity (Starter)",
        price: "$400",
        features: [
          "3 Initial Logo Concepts",
          "2 Rounds of Revisions",
          "Core Color Palette Definition",
          "Typography System (2 fonts)",
          "Favicon & App Icon Design",
          "Assets: PNG, SVG, PDF"
        ]
      },
      {
        id: "design-visual",
        name: "Brand & Visual Identity",
        price: "$850",
        features: [
          "Business Card Design",
          "A4 Letterhead",
          "Professional Email Signature",
          "Proposal/Quote Template",
          "Presentation Master (PPT/Slides)",
          "Social Media Kit",
          "All Source Files Included"
        ]
      },
      {
        id: "design-full",
        name: "Brand Identity (Full)",
        price: "$1200",
        popular: true,
        features: [
          "Complete Logo Suite",
          "Deep Color & Typography System",
          "Business Card & Email Signature",
          "Social Media Kit",
          "Single Page Brochure",
          "Signage Board Design",
          "Brand Guidelines PDF (20-30 pages)",
          "2 Physical Asset Mockups",
          "All Source Files Included"
        ]
      },
      {
        id: "design-uxui",
        name: "UX/UI Design",
        price: "$650",
        features: [
          "User Flow Mapping",
          "Low-fidelity Wireframes",
          "High-fidelity Mockups (All Screens)",
          "Interactive Prototype (Figma)",
          "Design System / Component Library",
          "Developer Handoff Files"
        ]
      },
      {
        id: "design-static-sm",
        name: "Social Media Static",
        price: "$10",
        features: [
          "One Custom Static Graphic",
          "Brand-aligned Design",
          "Includes 1 Revision",
          "24 Hour Delivery"
        ]
      },
      {
        id: "design-motion-short",
        name: "Motion Graphics (Short)",
        price: "$50",
        features: [
          "20-30 Second Video",
          "Brand-aligned Motion Design",
          "Licensed Music/SFX",
          "Subtitle Overlay",
          "Vertical + Square Formats",
          "5 Rounds of Revision"
        ]
      },
      {
        id: "design-motion-brand",
        name: "Motion Graphics (Brand Video)",
        price: "$200",
        features: [
          "60 Second Brand Video",
          "Storyboard & Script Development",
          "Voiceover Direction",
          "Full Brand Motion Language",
          "Licensed Music/SFX",
          "4K Option Available",
          "5 Rounds of Revision"
        ]
      }
    ]
  },
  {
    id: "grow",
    label: "Grow",
    packages: [
      {
        id: "grow-seo",
        name: "SEO Monthly Retainer",
        price: "$300/mo",
        features: [
          "Technical SEO Audit (Month 1)",
          "Keyword Research (Up to 30/mo)",
          "On-Page Optimization (10 pages/mo)",
          "4 SEO-optimized Case Studies",
          "Backlink Outreach (5 links/mo)",
          "Rank Tracking & Analytics Reports",
          "Search Console Monitoring"
        ]
      },
      {
        id: "grow-ads-setup",
        name: "Paid Ads Setup",
        price: "$200",
        features: [
          "Pixel & Conversion Tracking Setup",
          "3 Campaigns / 9 Ad Sets Structure",
          "6 Unique Ad Copy Variations",
          "A/B Testing Framework Setup",
          "Creative Visual Direction",
          "First-week Performance Review"
        ]
      },
      {
        id: "grow-ads-mgmt",
        name: "Paid Ads Management",
        price: "$225/mo",
        features: [
          "Ongoing Campaign Optimization",
          "Weekly Budget Reallocation",
          "New Ad Creative Direction (4/mo)",
          "A/B Testing New Audiences",
          "Bi-weekly Performance Reports",
          "Monthly Strategy Review Call"
        ]
      },
      {
        id: "grow-smm",
        name: "Social Media Management",
        price: "$500/mo",
        popular: true,
        features: [
          "4 Platforms Management",
          "40 Posts per Month",
          "8 Reels / Short Videos",
          "Platform-Specific Strategy",
          "Daily Community Management",
          "Influencer Shortlist",
          "Monthly Strategy Report"
        ]
      }
    ]
  },
  {
    id: "plan",
    label: "Plan",
    packages: [
      {
        id: "plan-bundle-starter",
        name: "Starter Bundle",
        price: "$600",
        description: "Social Media + Website (No Shoot)",
        features: [
          "5 Page Static Website",
          "10 Reels + 5 Carousels + 5 Statics",
          "Full Content Plan",
          "2 Platforms Profile Setup",
          "Social Media Handling",
          "Basic Competitor Insights",
          "Monthly Performance Tracking"
        ]
      },
      {
        id: "plan-bundle-growth",
        name: "Growth Bundle",
        price: "$1200",
        popular: true,
        description: "Social Media + Website (No Shoot)",
        features: [
          "10 Page Dynamic Website + CMS",
          "Full Content Plan (Website+Social)",
          "3 Platforms Management",
          "20 Reels + 10 Carousels + 8 Statics",
          "SEO + Ads Management",
          "Advanced Strategy Sessions"
        ]
      },
      {
        id: "plan-shoot-starter",
        name: "Starter Shoot Bundle",
        price: "$800",
        description: "Social Media + Production Shoot",
        features: [
          "1.5 Day Production (15 Hours)",
          "12 Reels + 5 Carousels + 7 Statics",
          "Professional On-site Content",
          "Full Post-Production Editing",
          "On-brand Visual Storytelling"
        ]
      },
      {
        id: "plan-shoot-growth",
        name: "Growth Shoot Bundle",
        price: "$1500",
        description: "Social Media + Production Shoot",
        features: [
          "2 Days Production Shoot",
          "25 Reels + 8 Carousels + 10 Statics",
          "Paid Ads Management",
          "Creative Ad Strategy",
          "High-Impact Visual Content"
        ]
      },
      {
        id: "plan-elite",
        name: "Elite Strategy Bundle",
        price: "$2500",
        description: "Social Media + Shoot + PR",
        features: [
          "3-Day Production Shoot",
          "30 Reels + 2 Brand Videos",
          "15 Carousels + 15 Static Posts",
          "Paid Media Management",
          "PR & Global Strategy",
          "Full Agency Support"
        ]
      }
    ]
  }
];
