"use client";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import SectionBadge from "@/components/ui/SectionBadge";
import { Anchor } from "lucide-react";

export default function AboutPrinciples() {
  return (
    <Section className="bg-k-bg border-t border-k-border py-20 pb-32">
      <Container>
        <div className="max-w-3xl mb-16 text-center mx-auto">
          <SectionBadge icon={Anchor} label="What We Stand For" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-k-text leading-tight">
            We believe in craft, commitment, and results.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-10 bg-k-card-bg border border-k-border rounded-3xl hover:bg-k-glass-bg transition-colors duration-300">
            <h3 className="text-xl font-bold text-k-text mb-4">Craft</h3>
            <p className="text-k-text-muted leading-relaxed text-sm md:text-base">
              We believe the best work comes from teams that are fully invested — not just contracted.
            </p>
          </div>
          
          <div className="p-10 bg-k-card-bg border border-k-primary/30 shadow-[0_0_30px_rgba(0,89,255,0.05)] rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-k-primary/10 blur-3xl rounded-full" />
            <h3 className="text-xl font-bold text-k-text mb-4 relative z-10">Commitment</h3>
            <p className="text-k-text-muted leading-relaxed text-sm md:text-base relative z-10">
              We believe great strategy and great design are not luxuries. They are the difference between a brand that leads and one that follows.
            </p>
          </div>
          
          <div className="p-10 bg-k-card-bg border border-k-border rounded-3xl hover:bg-k-glass-bg transition-colors duration-300">
            <h3 className="text-xl font-bold text-k-text mb-4">Results</h3>
            <p className="text-k-text-muted leading-relaxed text-sm md:text-base">
              We believe in delivering what we promise. On time. Every time.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
