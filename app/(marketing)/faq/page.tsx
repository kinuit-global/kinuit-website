import React from "react";
import { Metadata } from "next";
import { HelpCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Breadcrumb from "@/components/ui/Breadcrumb";
import SectionBadge from "@/components/ui/SectionBadge";
import FAQAccordionList from "@/components/sections/faq/FAQAccordionList";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Kinuit",
  description: "Have questions about Kinuit's full-service branding, development, SEO, GTM strategy, or pricing models? Find clear answers here.",
  alternates: {
    canonical: "https://kinuit.com/faq",
  },
  openGraph: {
    title: "Frequently Asked Questions | Kinuit",
    description: "Have questions about Kinuit's full-service branding, development, SEO, GTM strategy, or pricing models? Find clear answers here.",
    url: "https://kinuit.com/faq",
    type: "website",
    siteName: "Kinuit",
  },
  twitter: {
    card: "summary_large_image",
    title: "Frequently Asked Questions | Kinuit",
    description: "Have questions about Kinuit's full-service branding, development, SEO, GTM strategy, or pricing models? Find clear answers here.",
  },
};

const faqs = [
  {
    question: "What does Kinuit do?",
    answer: "Kinuit is a full-service brand and growth agency that provides end-to-end digital solutions across four core pillars: Build (custom websites, mobile apps, Web3, AI products), Design (brand identity, UX/UI, motion graphics, CGI), Grow (SEO, paid ads, social media, crypto marketing, PR), and Plan (growth strategy, tokenomics, investor pitch decks, GTM strategy)."
  },
  {
    question: "How long does a brand identity take?",
    answer: "A comprehensive brand identity project typically takes 1 to 2 weeks. For custom website design and development launches, it generally takes 3 to 6 weeks, depending on complexity. We focus on outcome-driven delivery without compromising quality."
  },
  {
    question: "What industries do you serve?",
    answer: "We serve ambitious brands across a wide range of industries including Web3, SaaS, FinTech, EduTech, Health & Wellness, Immigration, Legal, Real Estate, Insurance, and E-Commerce / Q-Commerce."
  },
  {
    question: "How is Kinuit different from other agencies?",
    answer: "Unlike traditional agencies, we operate as one unified team with complete ownership from first idea to final execution, eliminating communication silos. Additionally, we price our partnerships on outcome-based KPIs and deliverables rather than charging hourly."
  },
  {
    question: "How do I get started?",
    answer: "You can get started by booking a strategy call via our Discovery Call link (calendly.com/kinuitoffl/kinuit-discovery-call) or by reaching out directly to our team via email at hello@kinuit.com."
  },
  {
    question: "Do you offer ongoing support?",
    answer: "Yes, we offer full ongoing support, website maintenance, design operations, and growth marketing post-launch to ensure your digital ecosystem scales continuously and runs with zero latency."
  }
];

export default function FAQPage() {
  // Schema.org FAQPage data for AEO/GEO optimization
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://kinuit.com/faq/#faqpage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <main className="min-h-screen bg-k-bg text-k-text pb-24">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="relative pt-40 pb-16 md:pt-48 md:pb-24 border-b border-k-border overflow-hidden">
        {/* Background Soft Glows */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#081ff0]/5 blur-[120px] rounded-full pointer-events-none" />

        <Container className="relative z-10">
          <div className="max-w-3xl flex flex-col items-start text-left">
            <div>
              <Breadcrumb paths={[{ name: "FAQ" }]} />
            </div>

            <SectionBadge icon={<HelpCircle size={14} className="text-k-primary" />} label="Frequently Asked Questions" />
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-8 text-k-text leading-tight tracking-tight uppercase">
              Clear answers for <br/> <span className="text-k-primary">ambitious brands</span>
            </h1>
            
            <p className="text-k-text-muted text-sm sm:text-base md:text-lg font-light leading-[1.8] max-w-2xl">
              Have questions about our process, timelines, pricing models, or capabilities? Find all your answers here.
            </p>
          </div>
        </Container>
      </section>

      {/* FAQs Section */}
      <section className="py-20">
        <Container>
          <FAQAccordionList faqs={faqs} />

          {/* Call to Action Back Link */}
          <div className="flex justify-center mt-16">
            <Link 
              href="/"
              className="flex items-center gap-2 text-k-text-muted hover:text-k-primary font-bold text-xs uppercase tracking-widest transition-colors duration-300"
            >
              <ArrowLeft size={16} /> Back to Home
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
