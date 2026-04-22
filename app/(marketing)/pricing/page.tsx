import { Metadata } from "next";
import PricingHero from "@/Component/Pricing/PricingHero";
import PricingSection from "@/Component/Pricing/PricingSection";
import AboutCTA from "@/components/sections/about/AboutCTA";

export const metadata: Metadata = {
  title: "Pricing | Kinuit Global",
  description: "Transparent pricing for all our services — Design, Build, Grow, and Plan. Invest in momentum with Kinuit.",
};

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-k-bg text-k-text">
      <PricingHero />
      <PricingSection />
      <AboutCTA />
    </main>
  );
}
