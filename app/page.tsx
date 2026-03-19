import Hero from "@/components/sections/Hero";
import BrandStatement from "@/components/sections/BrandStatement";
import Pillars from "@/components/sections/Pillars";
import ServicesOverview from "@/components/sections/ServicesOverview";
import StatsGlobe from "@/components/sections/StatsGlobe";
import Testimonials from "@/components/sections/Testimonials";
import FeaturedWork from "@/components/sections/FeaturedWork";
import CTA from "@/components/sections/CTA";
import FAQ from "@/Component/FAQ/FAQ";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <StatsGlobe />
      {/* <BrandStatement /> */}
      <Pillars />
      <ServicesOverview />
      <Testimonials />
      <FeaturedWork />
      <CTA />
      <FAQ />
    </main>
  );
}