import { Metadata } from "next";
import ServicesHero from "@/components/sections/services/ServicesHero";
import ServicesList from "@/components/sections/services/ServicesList";
import ServicesCTA from "@/components/sections/services/ServicesCTA";

export const metadata: Metadata = {
  title: "Our Services | Build, Design, Grow & Plan",
  description: "Explore Kinuit's four service pillars: Build, Design, Grow, and Plan — everything your brand needs to win.",
};


export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-k-bg text-k-text">
      <ServicesHero />
      <ServicesList />
      <ServicesCTA />
    </main>
  );
}
