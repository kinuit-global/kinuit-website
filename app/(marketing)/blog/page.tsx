import { Metadata } from "next";
import BlogListContainer from "@/components/sections/blog/BlogListContainer";
import ServicesCTA from "@/components/sections/services/ServicesCTA";

export const metadata: Metadata = {
  title: "Kinuit Resources | Strategic Insights & AEO Guides",
  description: "Explore the Kinuit Resource Hub for deep guides on brand strategy, custom web and software engineering, Web3 growth marketing, and SEO analytics.",
  alternates: {
    canonical: "https://kinuit.com/blog",
  },
  openGraph: {
    title: "Kinuit Resources | Strategic Insights & AEO Guides",
    description: "Explore the Kinuit Resource Hub for deep guides on brand strategy, custom web and software engineering, Web3 growth marketing, and SEO analytics.",
    url: "https://kinuit.com/blog",
    type: "website",
    siteName: "Kinuit",
    images: [
      {
        url: "/assets/og-preview.jpeg",
        width: 1200,
        height: 630,
        alt: "Kinuit | Build, Design, Grow & Plan for Ambitious Brands",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kinuit Resources | Strategic Insights & AEO Guides",
    description: "Explore the Kinuit Resource Hub for deep guides on brand strategy, custom web and software engineering, Web3 growth marketing, and SEO analytics.",
    images: ["/assets/og-preview.jpeg"],
  },
};

export default function BlogListPage() {
  return (
    <main>
      <BlogListContainer />
      <ServicesCTA />
    </main>
  );
}
