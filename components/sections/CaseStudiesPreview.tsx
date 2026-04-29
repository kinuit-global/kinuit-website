"use client";

import { getCaseStudies, CaseStudy } from "@/lib/case-studies";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { ArrowRight, Calendar, Clock, BookOpen, ArrowUpRight } from "lucide-react";
import SectionBadge from "@/components/ui/SectionBadge";
import { useState, useEffect } from "react";

export default function CaseStudiesPreview() {
  const [featuredStudies, setFeaturedStudies] = useState<CaseStudy[]>([]);

  useEffect(() => {
    getCaseStudies().then((data) => setFeaturedStudies(data.slice(0, 3)));
  }, []);

  return (
    <section className="bg-k-bg py-24 md:py-24 border-t border-k-border relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-k-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl text-left">
            <SectionBadge icon={<BookOpen size={14} className="text-k-primary group-hover:scale-110 transition-transform duration-300" />} label="CASE STUDIES" />
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-k-text tracking-tight"
            >
              Latest from our <span className="text-k-primary">case studies</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-k-text-muted mt-2 text-base font-light"
            >
              Exploring content, strategy, and the thinking behind ambitious brands.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link href="/case-studies" aria-label="View all case studies">
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group flex items-center justify-center gap-3 text-k-text text-[13px] sm:text-sm font-semibold pl-6 pr-2.5 py-2 rounded-full border border-[#e2e8f0] bg-white hover:bg-slate-50 transition-all duration-300 shadow-sm"
              >
                Explore all
                <div className="w-8 h-8 rounded-full bg-[#081ff0] flex items-center justify-center shadow-sm">
                  <ArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-[1.5px] group-hover:-translate-y-[1.5px] transition-transform duration-300" strokeWidth={2.5} />
                </div>
              </motion.button>
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredStudies.length > 0 ? (
            featuredStudies.map((study, index) => (
              <motion.article
                key={study.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <Link href={`/case-studies/${study.slug}`}>
                  <div className="relative aspect-video rounded-2xl overflow-hidden mb-6 border border-k-border shadow-md dark:shadow-none">
                    <Image
                      src={study.image}
                      alt={study.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-k-primary text-white text-[10px] font-black tracking-widest rounded-full uppercase">
                        {study.category}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-4 text-k-text-muted/60 text-xs font-medium uppercase tracking-wider">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={14} /> 
                        {format(new Date(study.date), "dd-MM-yyyy hh.mm a")}
                      </span>
                      <span className="flex items-center gap-1.5"><Clock size={14} /> {study.readTime}</span>
                    </div>

                    <h3 className="text-xl font-bold text-k-text group-hover:text-k-primary transition-colors leading-tight">
                      {study.title}
                    </h3>

                    <p className="text-k-text-muted text-sm line-clamp-2 leading-relaxed">
                      {study.excerpt}
                    </p>

                    <div className="pt-2 flex items-center text-k-primary text-xs font-bold uppercase tracking-widest gap-2 opacity-0 group-hover:opacity-100 transition-all">
                      Read Story <ArrowRight size={14} />
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))
          ) : (
            <div className="col-span-full py-20 text-center border border-dashed border-k-border rounded-3xl bg-k-card-bg/50">
              <BookOpen className="mx-auto text-k-text-muted/20 mb-4" size={48} />
              <p className="text-k-text-muted text-sm font-black uppercase tracking-widest italic opacity-50">No case studies found at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
