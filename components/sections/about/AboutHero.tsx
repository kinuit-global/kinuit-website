"use client";
import Container from "@/components/ui/Container";
import Link from "next/link";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { motion } from "framer-motion";
import Globe from "@/components/ui/Globe";
import { STATS } from "@/lib/stats";

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

          <motion.div {...fadeUp} transition={{ delay: 0.2 }} className="text-[#0059FF] font-black tracking-widest text-sm mb-6 uppercase">WHO WE ARE</motion.div>

          <motion.h1 {...fadeUp} transition={{ delay: 0.3 }} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-8 text-white leading-tight tracking-tight">
            We are not just another agency.
          </motion.h1>

          <motion.p {...fadeUp} transition={{ delay: 0.4 }} className="text-white/90 text-sm sm:text-base md:text-lg font-thin leading-[1.8] max-w-2xl">
            We are a Synergy Collective — a dedicated team of specialists across strategy, design, technology, and marketing, built to work as one.
          </motion.p>
        </div>

        {/* 3-COLUMN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_1fr] gap-12 lg:gap-16 items-center">

          {/* 2. LEFT: STATS */}
          <div className="flex flex-col gap-6 w-full lg:w-[280px]">
            {STATS.map(stat => (
              <motion.div
                key={stat.label}
                whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(0,89,255,0.15)" }}
                className="bg-[#0b1226] border border-white/5 rounded-2xl p-6 sm:p-8 shadow-xl transition-all duration-300"
              >
                <div className="text-3xl md:text-4xl font-extrabold text-white mb-2">{stat.value}</div>
                <div className="text-sm text-white/60 font-medium tracking-wide">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* 3. CENTER: VISUAL */}
          <div className="flex items-center justify-center relative w-full h-[300px] lg:h-[500px]">
            <motion.div
              animate={{ y: [-12, 12, -12] }}
              transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
              className="relative w-full aspect-[4/3] lg:aspect-square max-w-[400px] overflow-hidden rounded-[2rem] shadow-[0_0_60px_rgba(0,89,255,0.15)] border border-white/10"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0059FF]/20 to-transparent mix-blend-overlay z-10" />
              <img
                src="/about_crypto.png"
                alt="3D Crypto Blockchain Illustration"
                className="w-full h-full object-cover scale-105"
              />
            </motion.div>
          </div>

          {/* 4. RIGHT: GLOBE TEXT CONTAINER */}
          <div className="relative w-full h-[400px] lg:h-[500px] rounded-[2rem] overflow-hidden flex flex-col items-center pt-12">
            {/* Text Overlay */}
            <div className="relative z-20 flex flex-col items-center mb-10">
              <h3 className="text-white text-[1.1rem] md:text-xl font-medium tracking-wide mb-2.5">Based in Tamilnadu, India</h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#1DE038] animate-pulse shadow-[0_0_8px_#1DE038]"></div>
                <span className="text-white/40 text-[10px] md:text-[11px] font-bold tracking-[0.2em] uppercase">Available Worldwide</span>
              </div>
            </div>

            {/* Massive Globe Positioned to Overflow Bottom */}
            <div className="absolute top-[60px] lg:top-[100px] left-1/2 -translate-x-1/2 w-[1200px] h-[1200px] pointer-events-none">
              <Globe />
            </div>

            {/* Bottom Inner Edge Fader */}
            <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#050D1A] to-transparent z-20 pointer-events-none" />
          </div>

        </div>
      </Container>
    </section>
  );
}
