import { getCaseStudies } from "@/lib/case-studies";
import * as motion from "framer-motion/client";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import Container from "@/components/ui/Container";
import Breadcrumb from "@/components/ui/Breadcrumb";
import CaseStudyFilters from "./components/CaseStudyFilters";

export default async function CaseStudiesListingPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const resolvedParams = await searchParams;
  const category = resolvedParams.category || "ALL";
  const query = resolvedParams.q || "";

  const caseStudies = await getCaseStudies({ category, query });

  return (
    <main className="min-h-screen bg-k-bg text-k-text pb-24">
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 overflow-hidden border-b border-k-border">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#081ff0]/5 blur-[120px] rounded-full pointer-events-none" />
        <Container>
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Breadcrumb paths={[{ name: "Case Studies" }]} />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight tracking-tight"
            >
              Our <span className="text-[#081ff0]">Case Studies</span>.
            </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-k-text-muted text-lg md:text-xl font-light max-w-2xl leading-relaxed"
              >
              Perspectives on building, designing, and growing ambitious brands in the digital age.
            </motion.p>
          </div>
        </Container>
      </section>

      {/* Filters & Search (Client Side Controls) */}
      <CaseStudyFilters />

      {/* Case Study Grid (Server Side Content) */}
      <section className="py-20">
        <Container>
          {caseStudies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {caseStudies.map((study, index) => (
                <motion.article
                  key={study.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: (index % 3) * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <Link href={`/case-studies/${study.slug}`} className="block">
                    <div className="relative aspect-video rounded-2xl overflow-hidden mb-6 border border-k-border shadow-2xl dark:shadow-none">
                      <Image
                        src={study.image}
                        alt={study.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-k-primary text-white text-[10px] font-black tracking-widest rounded-full uppercase shadow-lg">
                          {study.category}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-4 text-k-text-muted text-[10px] font-black tracking-widest uppercase">
                        <span className="flex items-center gap-1.5">
                          <Calendar size={14} className="text-k-primary" /> 
                          {format(new Date(study.date), "dd-MM-yyyy hh.mm a")}
                        </span>
                        <span className="flex items-center gap-1.5"><Clock size={14} className="text-k-primary" /> {study.readTime}</span>
                      </div>
                      
                      <h2 className="text-2xl font-black text-k-text group-hover:text-k-primary transition-colors leading-tight tracking-tight">
                        {study.title}
                      </h2>
                      
                      <p className="text-k-text-muted text-sm line-clamp-3 leading-relaxed font-light">
                        {study.excerpt}
                      </p>
                      
                      <div className="pt-2 flex items-center text-k-primary text-[10px] font-black uppercase tracking-widest gap-2 group-hover:gap-3 transition-all">
                        READ FULL STORY <ArrowRight size={14} />
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="text-center py-40 border border-k-border rounded-3xl bg-k-card-bg">
              <h3 className="text-2xl font-black text-k-text-muted/20 uppercase tracking-widest italic">No case studies found matching your criteria.</h3>
            </div>
          )}
        </Container>
      </section>
    </main>
  );
}
