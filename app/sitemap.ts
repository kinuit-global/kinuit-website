import { MetadataRoute } from "next";
import { allServiceDetails } from "@/lib/service";
import { allBlogPosts } from "@/lib/blog";
import { getCaseStudies, CaseStudy } from "@/lib/case-studies";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://kinuit.com";

  // 1. Static Pages
  const staticPaths = ["", "/about", "/services", "/case-studies", "/faq", "/contact", "/privacy", "/terms"];
  const staticRoutes = staticPaths.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // 2. Service Pages (including the 8 new SEO landing pages)
  const serviceRoutes = allServiceDetails.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // 3. Blog Pages (AEO Q&A pages)
  const blogRoutes = allBlogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // 4. Case Studies Pages (dynamically loaded from Supabase database)
  let caseStudies: CaseStudy[] = [];
  try {
    caseStudies = await getCaseStudies();
  } catch (error) {
    console.error("Error fetching case studies for sitemap:", error);
  }

  const caseStudyRoutes = caseStudies.map((study) => ({
    url: `${baseUrl}/case-studies/${study.slug}`,
    lastModified: new Date(study.date).toISOString().split("T")[0],
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes, ...caseStudyRoutes];
}
