"use client";

import React from "react";
import { motion } from "framer-motion";
import { Workflow, PenTool, Blocks, Rocket, ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionBadge from "@/components/ui/SectionBadge";

interface Step {
  id: string;
  number: string;
  name: string;
  tagline: string;
  description: string;
  icon: React.ComponentType<any>;
  details: string[];
}

const steps: Step[] = [
  {
    id: "step-plan",
    number: "01",
    name: "Plan",
    tagline: "Strategic Alignment & GTM",
    description: "Before a single pixel is drawn or a line of code is written, we align your brand objectives with structured market intelligence.",
    icon: Workflow,
    details: ["Growth Strategy & Audits", "Go-To-Market Mapping", "Tokenomics & GTM Design", "HubSpot & Salesforce Setup"]
  },
  {
    id: "step-design",
    number: "02",
    name: "Design",
    tagline: "Premium Visual Ecosystems",
    description: "We craft uncompromised brand identities and custom user experiences that command authority and capture visual share of voice.",
    icon: PenTool,
    details: ["Brand Systems & Logos", "Elite UX/UI Interfaces", "Custom CGI & Motion Assets", "Design Operations Scaling"]
  },
  {
    id: "step-build",
    number: "03",
    name: "Build",
    tagline: "High-Performance Engineering",
    description: "We turn designs into blazing fast digital products using clean architectures, optimized codebases, and modern technology stacks.",
    icon: Blocks,
    details: ["Custom Websites & Web Apps", "Performance Optimization", "AI Product Integration", "Secure Web3 Frameworks"]
  },
  {
    id: "step-grow",
    number: "04",
    name: "Grow",
    tagline: "Data-Driven Acceleration",
    description: "We scale your brand's footprint through highly targeted organic search optimization, paid campaigns, and performance tracking.",
    icon: Rocket,
    details: ["SEO Content Engine", "High-Converting Paid Ads", "Crypto & Web3 Growth", "Transparent KPI Dashboard"]
  }
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: [0.215, 0.61, 0.355, 1] as const
    }
  })
};

export default function AboutHowItWorks() {
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How Kinuit Works",
    "description": "Our complete four-step digital lifecycle designed to plan, design, build, and grow ambitious global brands.",
    "step": steps.map((step, idx) => ({
      "@type": "HowToStep",
      "position": idx + 1,
      "name": step.name,
      "text": `${step.tagline}: ${step.description}`,
      "url": `https://kinuit.com/about/#${step.id}`
    }))
  };

  return (
    <section className="py-24 bg-[#eff1f5] border-t border-b border-k-border relative overflow-hidden" id="how-it-works">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      
      {/* Decorative Blur */}
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[300px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      <Container>
        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <SectionBadge icon={<Workflow size={14} className="text-k-primary" />} label="Our Framework" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-k-text tracking-tight uppercase">
            How we <span className="text-k-primary">make it happen</span>
          </h2>
          <p className="text-k-text-muted mt-4 text-sm sm:text-base md:text-lg font-light leading-relaxed">
            Our step-by-step methodology ensures flawless execution from initial strategic planning to scaling conversions globally.
          </p>
        </div>

        {/* Process Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.id}
                id={step.id}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={cardVariants}
                className="bg-white rounded-[32px] p-8 border border-slate-200 shadow-sm flex flex-col justify-between group hover:shadow-lg hover:border-k-primary/20 transition-all duration-300 relative overflow-hidden"
              >
                {/* Step Number Badge */}
                <div className="absolute top-6 right-8 text-6xl font-black text-slate-100 group-hover:text-blue-50/70 transition-colors duration-300 select-none z-0">
                  {step.number}
                </div>

                <div className="relative z-10">
                  {/* Icon Circle */}
                  <div className="w-12 h-12 rounded-2xl bg-k-primary/5 border border-k-primary/10 flex items-center justify-center text-k-primary mb-8 group-hover:scale-105 transition-transform duration-300">
                    <Icon size={22} strokeWidth={2} />
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-2xl font-extrabold text-slate-900 mb-1">{step.name}</h3>
                  <div className="text-k-primary font-bold text-[11px] tracking-wider uppercase mb-4">{step.tagline}</div>
                  
                  {/* Description */}
                  <p className="text-slate-500 text-xs md:text-sm font-medium leading-relaxed mb-6">
                    {step.description}
                  </p>
                </div>

                {/* Sub-expertise List */}
                <div className="border-t border-slate-100 pt-6 mt-auto relative z-10">
                  <ul className="space-y-2">
                    {step.details.map((detail, index) => (
                      <li key={index} className="flex items-center gap-2 text-slate-600 text-xs font-semibold">
                        <ArrowRight size={10} className="text-k-primary shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
