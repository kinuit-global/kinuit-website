import { getServiceDetailBySlug, allServiceDetails } from "@/lib/service";
import { notFound } from "next/navigation";
import ServiceDetailView from "@/components/sections/services/ServiceDetailView";
import ServicesCTA from "@/components/sections/services/ServicesCTA";

export function generateStaticParams() {
  return allServiceDetails.map((service) => ({
    slug: service.slug,
  }));
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const service = getServiceDetailBySlug(resolvedParams.slug);

  if (!service) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-k-bg text-k-text">
      <ServiceDetailView service={service} />
      <ServicesCTA />
    </main>
  );
}
