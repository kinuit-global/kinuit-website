import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function ServicesCTA() {
  return (
    <Section className="bg-k-bg border-t border-k-border py-24 text-center">
      <Container>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-k-text leading-tight">
            Not sure where to start?
          </h2>
          <p className="text-k-text-muted text-lg mb-10 leading-relaxed">
            Most of our best work started with one conversation. Tell us what you are building — we will tell you exactly how we can help.
          </p>
          <div className="flex justify-center">
            <Link href="/contact">
              <Button className="px-8 py-4 text-base">Start a Project</Button>
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
