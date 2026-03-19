"use client";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import SectionBadge from "@/components/ui/SectionBadge";
import { ShieldCheck } from "lucide-react";

export default function AboutExpertise() {
  return (
    <Section className="bg-[#050D1A] border-t border-white/5">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          <div className="max-w-xl">
            <SectionBadge icon={ShieldCheck} label="Our Expertise" />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-8 text-white leading-tight">
              Every discipline your brand needs.
            </h2>
            <div className="space-y-6 text-white/70 text-base md:text-lg leading-relaxed">
              <p>
                Strategy that sets the direction. Design that commands attention. Technology that brings it to life. Marketing that drives real growth. Management that keeps it all running.
              </p>
              <p>
                Not handed off between teams. Not lost in translation. Done together, by one team, for one brand — yours.
              </p>
            </div>
          </div>

          <div className="relative w-full aspect-4/3 rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80" 
              alt="Our Expertise" 
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
          </div>

        </div>
      </Container>
    </Section>
  );
}
