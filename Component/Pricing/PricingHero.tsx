"use client";

import React from "react";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionBadge from "@/components/ui/SectionBadge";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { Zap } from "lucide-react";

export default function PricingHero() {
  const fadeUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  };

  return (
    <section className="bg-k-bg pt-40 pb-10 md:pt-48 md:pb-6 border-b border-k-border overflow-hidden relative">
      {/* Background Soft Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#081ff0]/10 blur-[150px] rounded-full pointer-events-none" />

      <Container className="relative z-10">
        <div className="max-w-4xl flex flex-col items-start text-left mb-16 lg:mb-24">
          <motion.div {...fadeUp} transition={{ delay: 0.1 }}>
            <Breadcrumb paths={[{ name: "Pricing" }]} />
          </motion.div>

          <motion.div {...fadeUp} transition={{ delay: 0.2 }}>
            <SectionBadge icon={<Zap size={14} className="text-k-primary group-hover:scale-110 transition-transform duration-300" />} label="Pricing & Packages" />
          </motion.div>

          <motion.h1 {...fadeUp} transition={{ delay: 0.3 }} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-8 text-k-text leading-tight tracking-tight">
            Invest in <br className="hidden md:block" />
            <span className="text-[#081ff0]">Momentum.</span>
          </motion.h1>

          <motion.p {...fadeUp} transition={{ delay: 0.4 }} className="text-k-text-muted text-sm sm:text-base md:text-lg font-light leading-[1.8] max-w-2xl">
            Expertly architected solutions with transparent, value-driven pricing.
            From startups to global enterprises, we have a plan built for your growth.
          </motion.p>
        </div>
      </Container>
    </section>
  );
}
