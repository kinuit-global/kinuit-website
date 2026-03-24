import { Metadata } from "next";
import AboutHero from "@/components/sections/about/AboutHero";
import AboutStory from "@/components/sections/about/AboutStory";
import AboutExpertise from "@/components/sections/about/AboutExpertise";
import AboutPrinciples from "@/components/sections/about/AboutPrinciples";
import AboutCTA from "@/components/sections/about/AboutCTA";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn more about Kinuit, a globally distributed partner for Branding, Development, and Strategy.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-k-bg text-white">
      <AboutHero />
      <AboutStory />
      <AboutExpertise />
      <AboutPrinciples />
      <AboutCTA />
    </main>
  );
}
