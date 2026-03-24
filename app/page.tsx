import { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import BrandStatement from "@/components/sections/BrandStatement";
import Pillars from "@/components/sections/Pillars";
import ServicesOverview from "@/components/sections/ServicesOverview";
import StatsGlobe from "@/components/sections/StatsGlobe";
import Testimonials from "@/components/sections/Testimonials";
import FeaturedWork from "@/components/sections/FeaturedWork";
import CTA from "@/components/sections/CTA";
import FAQ from "@/Component/FAQ/FAQ";
import Reveal from "@/components/ui/Reveal";
import BlogPreview from "@/components/sections/BlogPreview";

export const metadata: Metadata = {
  title: "Kinuit | Build, Design, Grow & Plan for Ambitious Brands",
  description: "A globally distributed partner for Branding, Development, and Strategy. We build products that work and brands that last.",
};

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Reveal><StatsGlobe /></Reveal>
      <Reveal><Pillars /></Reveal>
      <Reveal><ServicesOverview /></Reveal>
      <Reveal><Testimonials /></Reveal>
      <Reveal><FeaturedWork /></Reveal>
      <Reveal><BlogPreview /></Reveal>
      <Reveal><CTA /></Reveal>
      <Reveal><FAQ /></Reveal>
    </main>
  );
}