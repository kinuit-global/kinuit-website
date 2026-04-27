import { getServiceDetailBySlug, allServiceDetails } from "@/lib/service";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import ServiceDetailView from "@/components/sections/services/ServiceDetailView";
import ServicesCTA from "@/components/sections/services/ServicesCTA";

export function generateStaticParams() {
  return allServiceDetails.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceDetailBySlug(slug);

  return {
    title: `${service.title} Services`,
    description: service.description,
    openGraph: {
      title: `${service.title} Services | Kinuit`,
      description: service.description,
      url: `https://www.kinuit.com/services/${slug}`,
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const service = getServiceDetailBySlug(resolvedParams.slug);

  if (!service) {
    notFound();
  }

  // Service JSON-LD — tells AI engines exactly what this page offers
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `https://www.kinuit.com/services/${service.slug}#service`,
    "name": service.title,
    "description": service.description,
    "url": `https://www.kinuit.com/services/${service.slug}`,
    "provider": {
      "@type": "Organization",
      "@id": "https://www.kinuit.com/#organization",
      "name": "Kinuit",
    },
    "serviceType": service.category,
    "areaServed": "Worldwide",
    "hasOfferCatalog": service.expertise
      ? {
          "@type": "OfferCatalog",
          "name": `${service.title} Specialisations`,
          "itemListElement": service.expertise.map((exp) => ({
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": exp,
            },
          })),
        }
      : undefined,
  };

  // BreadcrumbList JSON-LD — helps AI engines understand page hierarchy
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.kinuit.com",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Services",
        "item": "https://www.kinuit.com/services",
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": service.title,
        "item": `https://www.kinuit.com/services/${service.slug}`,
      },
    ],
  };

  return (
    <main className="min-h-screen bg-k-bg text-k-text">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ServiceDetailView service={service} />
      <ServicesCTA />
    </main>
  );
}
