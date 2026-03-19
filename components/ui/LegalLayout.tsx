import Container from "./Container";
import Section from "./Section";
import Breadcrumb from "./Breadcrumb";
import { motion } from "framer-motion";

interface LegalLayoutProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export default function LegalLayout({ title, lastUpdated, children }: LegalLayoutProps) {
  return (
    <main className="min-h-screen bg-k-bg text-white pt-32 pb-20">
      <Section>
        <Container>
          <div className="max-w-4xl mx-auto">
            <Breadcrumb paths={[{ name: title }]} />
            
            <div className="mb-16">
              <h1 className="text-4xl md:text-5xl lg:text-3xl font-bold mb-4 text-white uppercase tracking-tight">
                {title}
              </h1>
              <p className="text-white/40 text-sm font-medium tracking-widest uppercase">
                Last Updated: {lastUpdated}
              </p>
            </div>

            <div className="space-y-12">
              {children}
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
