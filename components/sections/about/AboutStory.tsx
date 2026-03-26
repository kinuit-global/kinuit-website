"use client";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import SectionBadge from "@/components/ui/SectionBadge";
import { History } from "lucide-react";

export default function AboutStory() {
  return (
    <Section className="bg-k-bg border-t border-k-border">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          <div className="order-2 lg:order-1 relative w-full aspect-4/3 rounded-3xl overflow-hidden border border-k-border shadow-2xl group">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" 
              alt="Our Story" 
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
          </div>

          <div className="order-1 lg:order-2 max-w-xl">
            <SectionBadge icon={History} label="How We Started" />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-8 text-k-text leading-tight">
              Built with one purpose. To make your brand extraordinary.
            </h2>
            <div className="space-y-6 text-k-text-muted text-base md:text-lg leading-relaxed">
              <p>
                Kinuit was built on a simple belief — that great brands deserve great teams. Not a rotating cast of generalists. Not five separate vendors who have never spoken to each other.
              </p>
              <p>
                A single, unified team that lives and breathes your brand from the first brief to the final delivery.
              </p>
              <p>
                That is what we built. And it shows in the work.
              </p>
            </div>
          </div>

        </div>
      </Container>
    </Section>
  );
}
