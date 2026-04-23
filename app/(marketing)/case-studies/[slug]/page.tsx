import { getCaseStudies, CaseStudy } from "@/lib/case-studies";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Clock, ChevronLeft, CalendarDays, User } from "lucide-react";
import Container from "@/components/ui/Container";
import ShareButtons from "@/components/ui/ShareButtons";

interface CaseStudyPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const caseStudies = getCaseStudies();
  return caseStudies.map((study) => ({
    slug: study.slug,
  }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudies = getCaseStudies();
  const study = caseStudies.find((p) => p.slug === slug);
  if (!study) return { title: "Case Study Not Found" };

  return {
    title: study.metaTitle || study.title,
    description: study.metaDescription || study.excerpt,
    keywords: study.keywords ? study.keywords.split(',').map(k => k.trim()) : undefined,
    openGraph: {
      title: study.metaTitle || study.title,
      description: study.metaDescription || study.excerpt,
      images: [study.image],
      type: "article",
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const caseStudies = getCaseStudies();
  const study = caseStudies.find((p) => p.slug === slug);

  if (!study) {
    notFound();
  }

  const relatedStudies = caseStudies
    .filter((p) => p.category === study.category && p.slug !== study.slug)
    .slice(0, 3);

  return (
    <article className="min-h-screen bg-k-bg text-k-text pb-24">
      {/* Article Hero */}
      <section className="relative pt-40 pb-20 overflow-hidden border-b border-k-border">
        <Container>
          <Link 
            href="/case-studies" 
            className="inline-flex items-center gap-2 text-k-primary text-[10px] font-black tracking-widest uppercase mb-12 hover:gap-3 transition-all"
          >
            <ChevronLeft size={16} /> Back to Case Studies
          </Link>
          
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-8">
              <span className="px-3 py-1 bg-k-primary text-white text-[10px] font-black tracking-widest rounded-full uppercase">
                {study.category}
              </span>
              <div className="h-px w-8 bg-k-border" />
              <div className="flex items-center gap-4 text-k-text-muted text-[10px] font-black tracking-widest uppercase">
                <span className="flex items-center gap-1.5"><CalendarDays size={14} className="text-k-primary" /> {study.date}</span>
                <span className="flex items-center gap-1.5"><Clock size={14} className="text-k-primary" /> {study.readTime}</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black mb-12 leading-tight tracking-tight">
              {study.title}
            </h1>
          </div>
        </Container>
      </section>

      {/* Hero Image */}
      <section className="mb-20">
        <Container>
          <div className="relative aspect-video lg:aspect-21/9 rounded-3xl overflow-hidden border border-k-border shadow-2xl dark:shadow-none">
            <Image
              src={study.image}
              alt={study.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </Container>
      </section>

      {/* Content Section */}
      <section className="relative">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Sidebar / Author */}
            <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
              <div className="p-8 rounded-3xl bg-k-card-bg border border-k-border backdrop-blur-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-k-primary/30">
                    <Image
                      src={study.author.avatar}
                      alt={study.author.name}
                      fill
                    />
                  </div>
                  <div>
                    <h4 className="text-k-text font-black text-sm tracking-tight uppercase">{study.author.name}</h4>
                    <p className="text-k-primary text-[10px] font-black tracking-widest uppercase leading-none">{study.author.role}</p>
                  </div>
                </div>
                <p className="text-k-text-muted text-xs leading-relaxed font-light mt-4">
                  Expert perspectives from the frontlines of digital innovation at Kinuit Global.
                </p>
                <div className="mt-8 pt-8 border-t border-k-border">
                  <h5 className="text-slate-400 text-[10px] font-black tracking-widest uppercase mb-4">Share Article</h5>
                  <ShareButtons title={study.title} />
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-8">
              <div 
                className="prose-content max-w-none"
                dangerouslySetInnerHTML={{ __html: study.content }}
              />

              {/* Tags/Categories bottom */}
              <div className="mt-20 pt-10 border-t border-k-border flex flex-wrap gap-3">
                <span className="text-k-text-muted/40 text-[10px] font-black tracking-widest uppercase self-center mr-4">Topic:</span>
                <span className="px-5 py-2 bg-k-card-bg border border-k-border text-k-text-muted text-[10px] font-black tracking-widest rounded-full uppercase">
                  {study.category}
                </span>
                <span className="px-5 py-2 bg-k-card-bg border border-k-border text-k-text-muted text-[10px] font-black tracking-widest rounded-full uppercase">
                  STRATEGY
                </span>
                <span className="px-5 py-2 bg-k-card-bg border border-k-border text-k-text-muted text-[10px] font-black tracking-widest rounded-full uppercase">
                  INNOVATION
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Related Studies */}
      {relatedStudies.length > 0 && (
        <section className="mt-32 pt-32 border-t border-k-border">
          <Container>
            <h3 className="text-2xl md:text-4xl font-black text-k-text mb-12 uppercase tracking-tight">Keep <span className="text-k-primary">Reading.</span></h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedStudies.map((p) => (
                <Link key={p.id} href={`/case-studies/${p.slug}`} className="group">
                  <div className="relative aspect-video rounded-2xl overflow-hidden mb-4 border border-k-border shadow-md dark:shadow-none">
                    <Image src={p.image} alt={p.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <h4 className="text-k-text font-bold group-hover:text-k-primary transition-colors line-clamp-2">{p.title}</h4>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}
    </article>
  );
}
