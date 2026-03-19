"use client";
import Container from "@/components/ui/Container";
import Link from "next/link";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { motion } from "framer-motion";
import Globe from "@/components/ui/Globe";
import { STATS } from "@/lib/stats";
import SectionBadge from "@/components/ui/SectionBadge";
import { User } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

export default function AboutHero() {
  return (
    <section className="bg-[#050D1A] pt-40 pb-20 md:pt-48 md:pb-32 border-b border-white/5 overflow-hidden relative">
      {/* Background Soft Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#0059ff]/10 blur-[150px] rounded-full pointer-events-none" />

      <Container className="relative z-10">

        {/* 1. TEXT SECTION (Spans full width top) */}
        <div className="max-w-4xl flex flex-col items-start text-left mb-16 lg:mb-24">
          <motion.div {...fadeUp} transition={{ delay: 0.1 }}>
            <Breadcrumb paths={[{ name: "About" }]} />
          </motion.div>

            <SectionBadge icon={User} label="Who We Are" />

          <motion.h1 {...fadeUp} transition={{ delay: 0.3 }} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-8 text-white leading-tight tracking-tight">
            We are not just another agency.
          </motion.h1>

          <motion.p {...fadeUp} transition={{ delay: 0.4 }} className="text-white/90 text-sm sm:text-base md:text-lg font-thin leading-[1.8] max-w-2xl">
            We are a Synergy Collective — a dedicated team of specialists across strategy, design, technology, and marketing, built to work as one.
          </motion.p>
        </div>


      </Container>
    </section>
  );
}
