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
      className="relative py-14 sm:py-15 lg:py-15 overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={sectionVariants}
    >
      {/* Top blue glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[120px] pointer-events-none" />

      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
          radial-gradient(ellipse 90% 80% at 50% 70%, rgba(37,99,235,0.35) 0%, rgba(10,20,45,0.7) 45%, rgba(4,7,18,0.95) 85%)
        `,
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          opacity: 0.95,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-6 mb-12">


          <div>
            {/* Top Label Badge */}
            <SectionBadge icon={Zap} label="What We Do" />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Four disciplines. <span className="text-blue-500">One powerful team</span>
            </h2>

            <p className="text-gray-400 mt-2 text-base">
              From brand identity to full-scale campaigns — everything your brand needs to
              grow, built and delivered by one expert team.
            </p>
          </div>

          <Link href="/services">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 h-8 pr-4 rounded-full border border-[#2A2F45] bg-[#060A23] w-fit"
            >
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#0059FF]">
                <ArrowUpRight
                  size={14}
                  strokeWidth={2.5}
                  className="text-black"
                />
              </span>

              <span className="text-sm text-white font-medium">
                View All
              </span>
            </motion.button>
          </Link>

        </div>

        {/* Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-6"
          variants={sectionVariants}
        >
          {servicesItem.map((service) => (
            <motion.div
              key={service.num}
              whileHover={{ y: -6 }}
              className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col hover:border-blue-500/40 transition"
            >
              <span className="text-xs text-gray-500 mb-4">
                {service.num}
              </span>

              <h3 className="text-2xl font-semibold text-white mb-6 md:w-[50%] w-full">
                {service.title}
              </h3>

              <div className="flex flex-wrap gap-2 mb-6">
                {service.tags.map((tag: string) => (
                  <Link
                    href={`/services/${createSlug(tag)}`}
                    key={tag}
                    className="text-xs px-3 py-2 rounded-full bg-white/5 border border-white/10 text-white/80 hover:bg-[#0059ff] hover:text-white transition-all cursor-pointer"
                  >
                    {tag}
                  </Link>
                ))}
              </div>

              <div className="flex justify-end mt-auto">
                <Link href={`/services/${createSlug(service.title)}`}>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: -45 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 hover:bg-blue-500 hover:text-white transition-all"
                  >
                    <ArrowUpRight size={18} />
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </motion.section>
  );
}