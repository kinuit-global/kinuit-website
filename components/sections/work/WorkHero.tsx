"use client";
import Container from "@/components/ui/Container";
import Link from "next/link";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { motion } from "framer-motion";
import SectionBadge from "@/components/ui/SectionBadge";
import { Briefcase } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

export default function WorkHero() {
  return (
    <section className="bg-linear-to-b from-[#050D1A] to-k-bg pt-40 pb-20 md:pt-48 md:pb-28 border-b border-white/5">
      <Container>
        <div className="max-w-4xl flex flex-col items-start text-left">
          <motion.div {...fadeUp} transition={{ delay: 0.1 }}>
            <Breadcrumb paths={[{ name: "Our Work" }]} />
          </motion.div>

            <SectionBadge icon={Briefcase} label="Selected Work" />
          <motion.h1 {...fadeUp} transition={{ delay: 0.3 }} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-8 text-white leading-tight tracking-tight">
            Work that moves the needle.
          </motion.h1>
          <motion.p {...fadeUp} transition={{ delay: 0.4 }} className="text-white/90 text-sm sm:text-base md:text-lg font-thin leading-[1.8] max-w-2xl">
            Every project here started with a real brief and a brand with something to prove. Here is what happened next.
          </motion.p>
        </div>
      </Container>
    </section>
  );
}
