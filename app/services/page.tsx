import ServicesHero from "@/components/sections/services/ServicesHero";
import ServicesList from "@/components/sections/services/ServicesList";
import ServicesCTA from "@/components/sections/services/ServicesCTA";

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-k-bg text-white">
      <ServicesHero />
      <ServicesList />
      <ServicesCTA />
    </main>
  );
}
