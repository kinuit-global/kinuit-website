import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function WorkCTA() {
  return (
    <Section className="bg-k-bg border-t border-k-border py-24 text-center">
      <Container>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-k-text leading-tight">
            Want results like these?
          </h2>
          <p className="text-k-text-muted text-lg mb-10 leading-relaxed">
            One conversation. No pressure. Just an honest look at what is possible for your brand.
          </p>
          <div className="flex justify-center">
            <Link href="/contact">
              <Button variant="primary" className="px-10 py-4 text-base">Start a Project</Button>
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
