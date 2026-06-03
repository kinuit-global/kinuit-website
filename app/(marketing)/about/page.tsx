import { Metadata } from "next";
import AboutHero from "@/components/sections/about/AboutHero";
import AboutStory from "@/components/sections/about/AboutStory";
import AboutExpertise from "@/components/sections/about/AboutExpertise";
import OurTeam from "@/components/sections/about/OurTeam";
import AboutPrinciples from "@/components/sections/about/AboutPrinciples";
import AboutCTA from "@/components/sections/about/AboutCTA";

export const metadata: Metadata = {
  title: "About Us",
  description: "Meet the team behind Kinuit — specialists in strategy, design, technology, and marketing working as one.",
};


export default function AboutPage() {
  return (
    <main className="min-h-screen bg-k-bg text-k-text">
      <AboutHero />
      <AboutStory />
      <AboutExpertise />
      <OurTeam />
      <AboutPrinciples />
      <AboutCTA />
    </main>
  );
}

