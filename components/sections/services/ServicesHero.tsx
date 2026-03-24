"use client";
import Container from "@/components/ui/Container";
import Link from "next/link";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { motion } from "framer-motion";
import SectionBadge from "@/components/ui/SectionBadge";
import { Zap } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

export default function ServicesHero() {
  return (
    <section className="bg-linear-to-b from-[#050D1A] to-k-bg pt-40 pb-20 md:pt-48 md:pb-32 border-b border-white/5">
      <Container>
        <div className="max-w-4xl flex flex-col items-start text-left">
          <motion.div {...fadeUp} transition={{ delay: 0.1 }}>
            <Breadcrumb paths={[{ name: "Services" }]} />
          </motion.div>

          <SectionBadge icon={Zap} label="What We Offer" />
          
          <motion.h1 {...fadeUp} transition={{ delay: 0.3 }} className="text-4xl md:text-5xl lg:text-7xl font-bold mb-8 text-white leading-tight tracking-tight">
            Everything your brand needs.<br/>
            <span className="text-blue-500">All in one place.</span>
          </motion.h1>
          <motion.p {...fadeUp} transition={{ delay: 0.4 }} className="text-white/60 text-lg md:text-xl font-light leading-relaxed max-w-3xl mb-16">
            Five disciplines. One team. One brief. When strategy, design, technology, and marketing share the same table, your brand moves faster and further.
          </motion.p>

          <motion.div {...fadeUp} transition={{ delay: 0.5, duration: 0.8 }} className="w-full max-w-5xl aspect-video md:aspect-21/9 rounded-3xl overflow-hidden shadow-2xl border border-white/10 relative">
             <div className="absolute inset-0 bg-[#0059FF]/10 mix-blend-overlay z-10" />
             <img 
               src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1600&q=80" 
               alt="Services Overview" 
               className="w-full h-full object-cover"
             />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
