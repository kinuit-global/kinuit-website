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
};

export default function HomePage() {
  return (
    <main>
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