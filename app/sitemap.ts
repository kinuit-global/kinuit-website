import { MetadataRoute } from 'next';
import { getCaseStudies } from '@/lib/case-studies';
import { allServiceDetails, createSlug } from '@/lib/service';
import { projects } from '@/lib/projects';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.kinuit.com';

  // Static routes
  const staticRoutes = [
    '',
    '/about',
    '/services',
    '/work',
    '/contact',
    '/pricing',
    '/case-studies',
    '/privacy',
    '/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Dynamic case study routes
  const fetchedCaseStudies = await getCaseStudies();
  const caseStudyRoutes = fetchedCaseStudies.map((study) => ({
    url: `${baseUrl}/case-studies/${study.slug}`,
    lastModified: new Date(study.date),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Dynamic service routes (Categories + Specialized sub-services)
  const serviceSlugs = new Set<string>();
  allServiceDetails.forEach(service => {
    serviceSlugs.add(service.slug);
    service.expertise?.forEach(exp => {
      serviceSlugs.add(createSlug(exp));
    });
  });

  const serviceRoutes = Array.from(serviceSlugs).map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Dynamic project routes
  const projectRoutes = projects.map((project) => ({
    url: `${baseUrl}/work/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...caseStudyRoutes, ...serviceRoutes, ...projectRoutes];
}
