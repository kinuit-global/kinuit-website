"use client";
import { useRef } from "react";
import { motion } from "framer-motion";
import { servicesItem } from "@/lib/service";
import Link from "next/link";
import { createSlug } from "@/lib/service";
import Image from "next/image";
import { ArrowUpRight, Zap } from "lucide-react";
import SectionBadge from "@/components/ui/SectionBadge";

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <motion.section
      id="services"
      ref={sectionRef}
      className="relative py-20 lg:py-24 overflow-hidden bg-[#f1f5f9]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={sectionVariants}
    >
      {/* Top blue glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#081ff0]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-6 mb-12">


          <div>
            {/* Top Label Badge */}
            <SectionBadge icon={<Zap size={14} className="text-k-primary group-hover:scale-110 transition-transform duration-300" />} label="What We Do" />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-k-text">
              Four disciplines. <span className="text-k-primary">One Powerful Team</span>
            </h2>

            <p className="text-k-text-muted mt-2 text-base">
              From brand identity to full-scale campaigns, everything your brand needs to
              grow, built and delivered by one expert team.
            </p>
          </div>

          <Link href="/services" aria-label="View all our services">
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

        </div>

        {/* Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={sectionVariants}
        >
          {servicesItem.length > 0 ? (
            servicesItem.map((service) => (
              <motion.div
                key={service.num}
                whileHover={{ y: -6, scale: 1.02 }}
                className="relative rounded-[24px] group h-full flex flex-col"
              >
                {/* Highlight Glow Effect */}
                <div className="absolute -inset-[3px] bg-gradient-to-r from-[#081ff0] via-blue-400 to-[#081ff0] rounded-[26px] opacity-0 blur-md group-hover:opacity-30 transition-opacity duration-500" />
                <div className="absolute -inset-[1px] bg-gradient-to-r from-[#081ff0] via-blue-500 to-[#081ff0] rounded-[25px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Card Inner Background */}
                <div className="relative h-full w-full bg-white border border-[#e2e8f0] group-hover:border-transparent rounded-[24px] p-8 flex flex-col transition-colors duration-500 z-10">
                <div className="flex items-start justify-between mb-6">
                  <h3 className="text-[22px] md:text-[24px] font-bold text-k-text tracking-tight pr-4 pt-1">
                    {service.title}
                  </h3>
                  <Link href={`/services/${createSlug(service.title)}`} aria-label={`Learn more about ${service.title}`}>
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-[#081ff0] group-hover:text-white text-slate-400 transition-colors duration-300 shrink-0">
                      <ArrowUpRight size={20} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                    </div>
                  </Link>
                </div>

                <div className="flex flex-wrap content-start gap-2 mt-8">
                  {service.tags.map((tag: string) => (
                    <Link
                      href={`/services/${createSlug(tag)}`}
                      key={tag}
                      className="text-[13px] font-medium px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-100 text-slate-600 hover:bg-[#081ff0] hover:border-[#081ff0] hover:text-white transition-all duration-300"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-16 text-center border border-dashed border-k-border rounded-2xl bg-k-card-bg/50">
              <Zap className="mx-auto text-k-text-muted/20 mb-4" size={48} />
              <p className="text-k-text-muted text-sm font-black uppercase tracking-widest italic opacity-50">No services explored yet.</p>
            </div>
          )}
        </motion.div>

      </div>
    </motion.section>
  );
}