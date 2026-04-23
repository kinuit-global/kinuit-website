"use client";

import { getCaseStudies } from "@/lib/case-studies";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowRight, Search } from "lucide-react";
import { useState } from "react";
import Container from "@/components/ui/Container";
import Breadcrumb from "@/components/ui/Breadcrumb";

export default function CaseStudiesListingPage() {
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["ALL", "BUILD", "DESIGN", "GROW", "PLAN"];

  const caseStudies = getCaseStudies();
  const filteredStudies = caseStudies.filter((study) => {
    const matchesCategory = activeCategory === "ALL" || study.category === activeCategory;
    const matchesSearch = study.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         study.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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

      {/* Filters & Search */}
      <section className="sticky top-20 z-40 bg-k-bg/80 backdrop-blur-md border-b border-k-border py-4">
        <Container>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-full text-[10px] font-black tracking-widest uppercase transition-all whitespace-nowrap border ${
                    activeCategory === cat 
                      ? "bg-k-primary border-k-primary text-white shadow-[0_0_20px_rgba(30,80,255,0.3)]" 
                      : "bg-k-card-bg border-k-border text-k-text-muted hover:text-k-text hover:border-k-text/20"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative group max-w-md w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#081ff0] transition-colors" size={18} />
              <input
                type="text"
                placeholder="SEARCH CASE STUDIES..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 hover:border-slate-400 rounded-full py-3 pl-12 pr-6 outline-none focus:border-[#081ff0] focus:ring-1 focus:ring-[#081ff0] transition-all text-sm font-semibold tracking-wider placeholder:text-slate-400 uppercase text-k-text shadow-sm"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Case Study Grid */}
      <section className="py-20">
        <Container>
          {filteredStudies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {filteredStudies.map((study, index) => (
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
                        <span className="flex items-center gap-1.5"><Calendar size={14} className="text-k-primary" /> {study.date}</span>
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
