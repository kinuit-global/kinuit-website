import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Link from "next/link";

import { ArrowRight } from "lucide-react";

export default function AboutCTA() {
  return (
    <Section className="bg-k-bg border-t border-k-border py-24 text-center">
      <Container>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-k-text">
            Make Your Brand Impossible to Ignore
          </h2>
          <p className="text-k-text-muted text-lg mb-10 max-w-2xl mx-auto">
            We bring together strategy, design, and growth to turn your brand into a competitive advantage.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/contact">
              <Button className="px-8 py-4 text-base group whitespace-nowrap">
                Start Building Your Competitive Edge
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <span className="text-k-text-muted text-sm">
              Or send a brief — <a href="mailto:hello@kinuit.com" className="text-k-primary hover:underline">hello@kinuit.com</a>
            </span>
          </div>
        </div>
      </Container>
    </Section>
  );
}
