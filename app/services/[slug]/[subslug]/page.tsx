import { getServiceDetailBySlug, servicesItem, createSlug } from "@/lib/service";
import { notFound } from "next/navigation";
import ServiceDetailView from "@/components/sections/services/ServiceDetailView";
import ServicesCTA from "@/components/sections/services/ServicesCTA";

export async function generateStaticParams() {
  const params: { slug: string; subslug: string }[] = [];
  
  servicesItem.forEach((category) => {
    category.tags.forEach((tag) => {
      params.push({
        slug: createSlug(category.title),
        subslug: createSlug(tag),
      });
    });
  });
  
  return params;
}

export default async function SubServicePage({ 
  params 
}: { 
  params: Promise<{ slug: string; subslug: string }> 
}) {
  const resolvedParams = await params;
  const { slug, subslug } = resolvedParams;
  
  // Find the category to verify it exists
  const category = servicesItem.find(c => createSlug(c.title) === slug);
  if (!category) notFound();
  
  // Get details for the specific sub-service
  const service = getServiceDetailBySlug(subslug);
  
  // If the generic generator returned "Specialized Service", we can refine its category
  if (service.category === "Specialized Service") {
    service.category = category.title;
  }

  return (
    <main className="min-h-screen bg-k-bg text-white">
      <ServiceDetailView 
        service={service} 
        parentCategory={{ name: category.title, href: `/services/${slug}` }} 
        relatedServices={category.tags}
      />
      <ServicesCTA />
    </main>
  );
}
