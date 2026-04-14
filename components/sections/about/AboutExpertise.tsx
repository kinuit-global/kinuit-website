"use client";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import SectionBadge from "@/components/ui/SectionBadge";
import { ShieldCheck, CheckCircle2 } from "lucide-react";

const EXPERTISE_PILLARS = [
  {
    title: "Brand Strategy & Positioning",
    description: "Build a strong foundation with clear messaging and market differentiation."
  },
  {
    title: "Website Design & Development",
    description: "Create SEO-optimized, high-converting websites that drive user action."
  },
  {
    title: "Content Marketing & Thought Leadership",
    description: "Establish authority through high-value, search-driven content."
  },
  {
    title: "Social Media Management",
    description: "Turn platforms into consistent growth and engagement channels."
  },
  {
    title: "Growth Marketing & Performance Strategy",
    description: "Scale with data-backed campaigns and conversion-focused execution."
  }
];

export default function AboutExpertise() {
  return (
    <Section className="bg-k-bg border-t border-k-border">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          <div className="max-w-xl">
            <SectionBadge icon={<ShieldCheck size={14} className="text-k-primary group-hover:scale-110 transition-transform duration-300" />} label="Our Expertise" />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-8 text-k-text leading-tight">
              Every Discipline Your Brand Needs. Under One Roof.
            </h2>
            <p className="text-k-text-muted text-lg mb-12">
              Kinuit brings together the core pillars of modern marketing:
            </p>

            <div className="space-y-6">
              {EXPERTISE_PILLARS.map((pillar, idx) => (
                <div key={idx} className="flex gap-4 group">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle2 size={20} className="text-k-primary opacity-60 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div>
                    <h3 className="text-k-text font-bold text-lg mb-1">{pillar.title}</h3>
                    <p className="text-k-text-muted text-sm leading-relaxed">{pillar.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-12 text-k-text font-medium border-l-2 border-k-primary pl-6 italic">
              Not isolated services. <br/> But a connected system built for growth.
            </p>
          </div>

          <div className="relative w-full aspect-[4/5] lg:aspect-[3/4] rounded-3xl overflow-hidden border border-k-border shadow-2xl group lg:sticky lg:top-32">
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80" 
              alt="Our Expertise" 
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-k-bg/80 via-transparent to-transparent opacity-60" />
          </div>

        </div>
      </Container>
    </Section>
  );
}
