import { Metadata } from "next";
import ServicesHero from "@/components/sections/services/ServicesHero";
import ServicesList from "@/components/sections/services/ServicesList";
import ServicesCTA from "@/components/sections/services/ServicesCTA";

export const metadata: Metadata = {
  title: "Our Services | Build, Design, Grow & Plan",
  description: "Explore our core services: Build, Design, Grow, and Plan. Expert Branding, Development, and Strategy for ambitious brands.",
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-k-bg text-white">
      <ServicesHero />
      <ServicesList />
      <ServicesCTA />
    </main>
  );
}
