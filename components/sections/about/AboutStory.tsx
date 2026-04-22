"use client";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import SectionBadge from "@/components/ui/SectionBadge";
import Image from "next/image";
import { History } from "lucide-react";

export default function AboutStory() {
  return (
    <Section className="bg-k-bg border-t border-k-border">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          <div className="order-2 lg:order-1 relative w-full aspect-4/3 rounded-3xl overflow-hidden border border-k-border shadow-2xl group">
            <Image
              src="/about-us.png"
              alt="Our Story"
              fill
              className="object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
          </div>

          <div className="order-1 lg:order-2 max-w-xl">
            <SectionBadge icon={<History size={14} className="text-k-primary group-hover:scale-110 transition-transform duration-300" />} label="How We Started" />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-8 text-k-text leading-tight">
              We Saw the Gap. <br /> We Built the Solution.
            </h2>
            <div className="space-y-6 text-k-text-muted text-base md:text-lg leading-relaxed">
              <p>
                Kinuit was built on the conviction that great brands can’t be built in fragments. Not through scattered teams. Not through misaligned execution. Not through vendors working in silos.
              </p>
              <p>
                But through one unified team that takes complete ownership, from the first idea to the final execution.
              </p>
              <p>
                So that’s what we built. And that’s what defines every piece of work we deliver.
              </p>
            </div>
          </div>

        </div>
      </Container>
    </Section>
  );
}
