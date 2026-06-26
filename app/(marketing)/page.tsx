import { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import BrandStatement from "@/components/sections/BrandStatement";
import Pillars from "@/components/sections/Pillars";
import ServicesOverview from "@/components/sections/ServicesOverview";
import StatsGlobe from "@/components/sections/StatsGlobe";
import Testimonials from "@/components/sections/Testimonials";
import CTA from "@/components/sections/CTA";
import Reveal from "@/components/ui/Reveal";
import CaseStudiesPreview from "@/components/sections/CaseStudiesPreview";
import AboutStory from "@/components/sections/about/AboutStory";
import FAQ from "@/components/sections/FAQ";
import Clients from "@/components/sections/Clients";

export const metadata: Metadata = {
  title: "Kinuit | Build, Design, Grow & Plan for Ambitious Brands",
  description: "Kinuit is a full-service agency for ambitious brands — strategy, branding, custom development, and growth, engineered for the new era.",
  alternates: {
    canonical: "https://kinuit.com",
  },
  openGraph: {
    title: "Kinuit | Build, Design, Grow & Plan for Ambitious Brands",
    description: "Kinuit is a full-service agency for ambitious brands — strategy, branding, custom development, and growth, engineered for the new era.",
    url: "https://kinuit.com",
    type: "website",
    siteName: "Kinuit",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kinuit | Build, Design, Grow & Plan for Ambitious Brands",
    description: "Kinuit is a full-service agency for ambitious brands — strategy, branding, custom development, and growth, engineered for the new era.",
  },
};

export default function HomePage() {
  const speakableSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://kinuit.com/#webpage",
    "url": "https://kinuit.com",
    "name": "Kinuit | Build, Design, Grow & Plan for Ambitious Brands",
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": [
        "#speakable-headline",
        "#speakable-description"
      ]
    }
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }}
      />
      <Hero />
      <Reveal><StatsGlobe /></Reveal>
      <Reveal><Pillars /></Reveal>
      <Reveal><ServicesOverview /></Reveal>
      <Reveal><Clients /></Reveal>
      <Reveal><Testimonials /></Reveal>
      <Reveal><CaseStudiesPreview /></Reveal>
      <Reveal><AboutStory /></Reveal>
      <Reveal><FAQ /></Reveal>
      <Reveal><CTA /></Reveal>
    </main>
  );
}