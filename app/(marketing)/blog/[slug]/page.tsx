import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, CalendarDays, Clock, HelpCircle } from "lucide-react";
import Container from "@/components/ui/Container";
import ShareButtons from "@/components/ui/ShareButtons";
import FAQAccordionList from "@/components/sections/faq/FAQAccordionList";
import ServicesCTA from "@/components/sections/services/ServicesCTA";
import { allBlogPosts } from "@/lib/blog";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return allBlogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = allBlogPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Article Not Found" };

  return {
    title: `${post.title} | Kinuit Resources`,
    description: post.excerpt,
    alternates: {
      canonical: `https://kinuit.com/blog/${slug}`,
    },
    openGraph: {
      title: `${post.title} | Kinuit Resources`,
      description: post.excerpt,
      url: `https://kinuit.com/blog/${slug}`,
      type: "article",
      images: [{ url: post.image }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Kinuit Resources`,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = allBlogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Article JSON-LD (AEO/GEO optimization)
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "image": post.image,
    "datePublished": post.date,
    "dateModified": post.date,
    "description": post.excerpt,
    "author": {
      "@type": "Organization",
      "name": "Kinuit",
      "url": "https://kinuit.com",
    },
    "publisher": {
      "@type": "Organization",
      "name": "Kinuit",
      "logo": {
        "@type": "ImageObject",
        "url": "https://kinuit.com/favicon.ico",
      },
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://kinuit.com/blog/${slug}`,
    },
  };

  // FAQPage JSON-LD (AEO/GEO optimization)
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": post.faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  return (
    <article className="min-h-screen bg-k-bg text-k-text pb-24">
      {/* Dynamic JSON-LD schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 overflow-hidden border-b border-k-border">
        <Container>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-k-primary text-[10px] font-black tracking-widest uppercase mb-12 hover:gap-3 transition-all"
          >
            <ChevronLeft size={16} /> Back to Resources
          </Link>

          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-8">
              <span className="px-3 py-1 bg-k-primary text-white text-[10px] font-black tracking-widest rounded-full uppercase">
                {post.category}
              </span>
              <div className="h-px w-8 bg-k-border" />
              <div className="flex items-center gap-4 text-k-text-muted text-[10px] font-black tracking-widest uppercase">
                <span className="flex items-center gap-1.5">
                  <CalendarDays size={14} className="text-k-primary" /> {post.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={14} className="text-k-primary" /> {post.readTime}
                </span>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-12 leading-tight tracking-tight uppercase">
              {post.title}
            </h1>
          </div>
        </Container>
      </section>

      {/* Featured Image */}
      <section className="mb-20">
        <Container>
          <div className="relative aspect-video lg:aspect-21/9 rounded-3xl overflow-hidden border border-k-border shadow-2xl dark:shadow-none">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover animate-fade-in"
              priority
            />
          </div>
        </Container>
      </section>

      {/* Content Section */}
      <section className="relative">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Sidebar */}
            <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
              <div className="p-8 rounded-3xl bg-k-card-bg border border-k-border backdrop-blur-sm shadow-sm">
                <h4 className="text-k-text font-black text-sm tracking-tight uppercase mb-2">Author</h4>
                <p className="text-k-primary text-[10px] font-black tracking-widest uppercase leading-none mb-4">
                  Kinuit Global Editorial
                </p>
                <p className="text-k-text-muted text-xs leading-relaxed font-light">
                  Strategic insights, technical breakdowns, and marketing methodologies engineered by the global team at Kinuit.
                </p>
                <div className="mt-8 pt-8 border-t border-k-border">
                  <h5 className="text-k-text-muted text-[10px] font-black tracking-widest uppercase mb-4">Share Article</h5>
                  <ShareButtons title={post.title} />
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-8">
              <div
                className="prose-content max-w-none text-k-text-muted leading-relaxed text-lg font-light space-y-6"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* FAQ Section */}
              <div className="mt-20 pt-16 border-t border-k-border">
                <div className="flex items-center gap-4 mb-8">
                  <HelpCircle className="text-k-primary" size={24} />
                  <h2 className="text-2xl md:text-3xl font-bold text-k-text uppercase tracking-tight">
                    Frequently Asked Questions
                  </h2>
                </div>
                <FAQAccordionList faqs={post.faqs} />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <ServicesCTA />
    </article>
  );
}
