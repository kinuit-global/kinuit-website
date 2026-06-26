import { Metadata } from "next";
import AboutHero from "@/components/sections/about/AboutHero";
import AboutStory from "@/components/sections/about/AboutStory";
import AboutHowItWorks from "@/components/sections/about/AboutHowItWorks";
import AboutExpertise from "@/components/sections/about/AboutExpertise";
import OurTeam from "@/components/sections/about/OurTeam";
import AboutPrinciples from "@/components/sections/about/AboutPrinciples";
import AboutCTA from "@/components/sections/about/AboutCTA";

export const metadata: Metadata = {
  title: "About Us | Kinuit",
  description: "Meet the team behind Kinuit — specialists in strategy, design, technology, and marketing working as one connected system.",
  alternates: {
    canonical: "https://kinuit.com/about",
  },
  openGraph: {
    title: "About Us | Kinuit",
    description: "Meet the team behind Kinuit — specialists in strategy, design, technology, and marketing working as one connected system.",
    url: "https://kinuit.com/about",
    type: "website",
    siteName: "Kinuit",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Kinuit",
    description: "Meet the team behind Kinuit — specialists in strategy, design, technology, and marketing working as one connected system.",
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-k-bg text-k-text">
      <AboutHero />
      <AboutStory />
      <AboutHowItWorks />
      <AboutExpertise />
      <OurTeam />
      <AboutPrinciples />
      <AboutCTA />
    </main>
  );
}

