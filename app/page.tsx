import Hero from "@/components/sections/Hero";
import BrandStatement from "@/components/sections/BrandStatement";
import Pillars from "@/components/sections/Pillars";
import ServicesOverview from "@/components/sections/ServicesOverview";
import Stats from "@/components/sections/Stats";
import Testimonials from "@/components/sections/Testimonials";
import FeaturedWork from "@/components/sections/FeaturedWork";
import CTA from "@/components/sections/CTA";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <BrandStatement />
      <Pillars />
      <ServicesOverview />
      <Stats />
      <Testimonials />
      <FeaturedWork />
      <CTA />
    </main>
  );
}