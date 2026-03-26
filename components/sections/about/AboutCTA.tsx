import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function AboutCTA() {
  return (
    <Section className="bg-k-bg border-t border-k-border py-24 text-center">
      <Container>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-10 text-k-text">
            Ready to work with a team that is built differently?
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/contact">
              <Button className="px-8 py-4 text-base">Start a Project</Button>
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
