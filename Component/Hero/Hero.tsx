"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { easeOut } from "framer-motion";
import HeroBackground from "@/lib/StarCanvas";
import Link from "next/link";

const STATS = [
  { value: "100+", label: "Successful Projects" },
  { value: "25+", label: "Happy Customers" },
  { value: "10+", label: "Expert Team" },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: easeOut },
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="
      relative min-h-screen
      flex flex-col justify-center
      px-4 sm:px-6
      pt-24 sm:pt-28
      bg-k-bg overflow-hidden
    "
    >
      <HeroBackground />

      {/* Hero content wrapper */}
      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
        {/* Left Column (Content) */}
        <div className="flex flex-col items-start text-left w-full">
          {/* Badge */}
          <motion.span
            {...fadeUp}
            className="
          inline-flex items-center gap-2
          px-4 py-2
          my-8 sm:my-10
          rounded-full text-xs sm:text-sm text-gray-300
          bg-white/5 border border-white/10 backdrop-blur-md
        "
          >
            <motion.div
              animate={{ y: [0, -3, 0] }} // up and down float
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="flex items-center"
            >
              <Image src="/mon.png" alt="icon" width={16} height={16} />
            </motion.div>
            Global Reach. Zero Latency
          </motion.span>

          {/* Headline */}
          <motion.h1
            {...fadeUp}
            transition={{ delay: 0.1 }}
            className="
          font-black uppercase tracking-tight
          leading-[1.1] sm:leading-[1.15] mb-5 sm:mb-6
          text-xl sm:text-3xl md:text-4xl
        "
          >
            The Team Behind Your
            <br />
            <span className="text-[#0059ff] font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
              Biggest Move.
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            {...fadeUp}
            transition={{ delay: 0.2 }}
            className="
          max-w-[540px] w-full
          text-sm sm:text-base md:text-lg
          font-thin
          tracking-normal
          text-white/90
          leading-[1.7] sm:leading-[1.8]
          mb-10 sm:mb-12
        "
          >
            In a world run by AI, the brands that win have the sharpest minds behind
            them. We are that edge — strategy, creativity, and technology, working as
            one.

          </motion.p>

          {/* Buttons */}
          <motion.div
            {...fadeUp}
            transition={{ delay: 0.3 }}
            className="
          flex flex-col sm:flex-row
          gap-3
          justify-start
          mb-8 sm:mb-10
          w-full sm:w-auto
        "
          >
            <Link
              href="/contact"
              className="
            flex items-center justify-center gap-2
            bg-blue-600 hover:bg-blue-700
            text-white text-sm font-semibold
            px-7 py-3
            rounded-full
            transition hover:-translate-y-[2px]
          "
            >
              Start a Project
              <Image
                src="/fwd.png"
                alt="arrw-img"
                width={15}
                height={10}
                className="object-contain"
              />
            </Link>

            <Link
              href="/work"
              className="
            flex items-center justify-center gap-2
            text-white text-sm font-semibold
            px-7 py-3
            rounded-full
            border border-white/10
            bg-white/5 backdrop-blur
            hover:-translate-y-[2px]
            transition
          "
            >
              Explore Our Work
              <Image
                src="/play.png"
                alt="arrw-img"
                width={15}
                height={10}
                className="object-contain"
              />
            </Link>
          </motion.div>

          {/* Trusted By / Brands */}
          <motion.div
            {...fadeUp}
            transition={{ delay: 0.35 }}
            className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-[13px] text-white/50 mb-8 sm:mb-6 w-full tracking-wide"
          >
            <span>Chosen by brands in:</span>
            <span className="text-white/80 font-medium">
              Web3 <span className="text-white/30 px-1">&middot;</span> Fintech <span className="text-white/30 px-1">&middot;</span> AI <span className="text-white/30 px-1">&middot;</span> Real Estate <span className="text-white/30 px-1">&middot;</span> Edtech
            </span>
          </motion.div>

          {/* Stats */}
          {/* <motion.div
            {...fadeUp}
            transition={{ delay: 0.4 }}
            className="w-full max-w-2xl"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 overflow-hidden pb-10 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
              {STATS.map((stat) => (
                <div key={stat.label} className="py-4 text-left sm:pl-6 sm:pr-6 first:pl-0">
                  <div className="text-2xl sm:text-3xl font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-white font-thin">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div> */}
        </div> {/* Closes Left Column */}

        {/* Right Column (Visual Container) */}
        <div className="relative w-full h-full flex items-center justify-center mt-12 md:mt-0">
          {/* Soft glow/gradient background behind visual */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#0059ff]/15 blur-[120px] rounded-full scale-100 pointer-events-none" />

          {/* Visual/Mockup Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: easeOut }}
            className="relative w-full aspect-[4/3] sm:aspect-video lg:aspect-square xl:aspect-[4/3] flex items-center justify-center z-10"
            style={{ perspective: "1200px" }}
          >
            {/* Main Mockup (Dashboard) */}
            <motion.div
              animate={{
                y: [0, -12, 0],
                rotateY: [-5, -6, -5],
                scale: [1.02, 1.03, 1.02]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-full h-full max-w-lg lg:max-w-xl relative z-10 transform-gpu"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="w-full h-full rounded-xl sm:rounded-2xl border border-white/10 bg-[#060913]/90 backdrop-blur-xl overflow-hidden flex flex-col shadow-[0_20px_50px_rgba(0,89,255,0.15)] relative">
                {/* Mockup Top Bar */}
                <div className="h-6 sm:h-8 border-b border-white/5 bg-white/[0.02] flex items-center px-3 sm:px-4 gap-1.5 sm:gap-2">
                  <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-yellow-500/80" />
                  <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-green-500/80" />
                  <div className="ml-auto flex items-center gap-2 border border-white/10 bg-white/5 rounded-full px-2 py-0.5 sm:py-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_5px_#4ade80]" />
                    <div className="h-1.5 w-6 sm:w-8 bg-white/40 rounded-full" />
                  </div>
                </div>

                {/* Mockup Content (simulated dashboard) */}
                <div className="flex-1 p-4 sm:p-6 flex flex-col gap-4 relative overflow-hidden">
                  {/* Subtle inner glow */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#0059ff]/10 blur-[80px] rounded-full" />

                  {/* Dashboard header */}
                  <div className="flex items-end justify-between z-10">
                    <div className="flex flex-col gap-1.5">
                      <div className="text-[10px] sm:text-[11px] text-white/50 uppercase tracking-widest font-medium">Total Portfolio</div>
                      <div className="flex items-center gap-3">
                        <span className="text-xl sm:text-2xl font-bold text-white tracking-tight">$2,458,210.00</span>
                        <div className="flex items-center justify-center px-1.5 py-0.5 rounded-md text-[9px] sm:text-[10px] font-bold bg-green-500/20 text-green-400">+14.2%</div>
                      </div>
                    </div>
                  </div>

                  {/* Dashboard body grid */}
                  <div className="flex-1 grid grid-cols-3 gap-3 sm:gap-4 z-10">
                    <div className="col-span-2 bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 rounded-lg p-3 sm:p-4 flex flex-col relative overflow-hidden">
                      <div className="flex justify-between items-center mb-4">
                        <div className="h-3 w-16 bg-white/20 rounded-full" />
                        <div className="flex gap-1">
                          <div className="h-1 w-3 bg-white/40 rounded-full" />
                          <div className="h-1 w-3 bg-white/10 rounded-full" />
                        </div>
                      </div>
                      <div className="flex-1 w-full relative flex items-end">
                        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 50">
                          <defs>
                            <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#0059ff" stopOpacity="0.4" />
                              <stop offset="100%" stopColor="#0059ff" stopOpacity="0.0" />
                            </linearGradient>
                          </defs>
                          <path d="M0,50 L0,35 C10,32 15,20 25,25 C35,30 40,15 50,18 C60,21 70,5 80,10 C90,15 95,5 100,0 L100,50 Z" fill="url(#chartGrad)" />
                          <path d="M0,35 C10,32 15,20 25,25 C35,30 40,15 50,18 C60,21 70,5 80,10 C90,15 95,5 100,0" fill="none" stroke="#0059ff" strokeWidth="1.5" className="drop-shadow-[0_0_8px_rgba(0,89,255,0.8)]" />
                        </svg>
                      </div>
                    </div>
                    <div className="col-span-1 flex flex-col gap-3 sm:gap-4">
                      <div className="flex-1 bg-white/[0.03] border border-white/5 rounded-lg p-3 flex flex-col justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-[#627EEA]/20 flex items-center justify-center shrink-0">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#627EEA]" />
                          </div>
                          <div className="h-2 w-8 bg-white/30 rounded-full" />
                        </div>
                        <div className="mt-auto">
                          <div className="h-4 w-12 sm:w-16 bg-white/90 rounded-md mb-1.5" />
                          <div className="h-2 w-8 sm:w-10 bg-green-400/80 rounded-full" />
                        </div>
                      </div>
                      <div className="flex-1 bg-white/[0.03] border border-white/5 rounded-lg p-3 flex flex-col justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-[#F3BA2F]/20 flex items-center justify-center shrink-0">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#F3BA2F]" />
                          </div>
                          <div className="h-2 w-8 bg-white/30 rounded-full" />
                        </div>
                        <div className="mt-auto">
                          <div className="h-4 w-10 sm:w-14 bg-white/90 rounded-md mb-1.5" />
                          <div className="h-2 w-8 sm:w-10 bg-[#0059ff]/80 rounded-full" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating Element 1 (Top Right) */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -right-2 top-4 lg:-right-8 lg:top-8 z-20 w-[140px] sm:w-[160px] hidden sm:flex flex-col gap-2 p-3 sm:p-4 rounded-xl border border-white/10 bg-[#0b0f1e]/80 backdrop-blur-md shadow-2xl transform-gpu"
              style={{ transform: "translateZ(30px)" }}
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#627EEA]/20 flex items-center justify-center shrink-0 border border-[#627EEA]/30">
                  <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-sm bg-[#627EEA] shadow-[0_0_8px_#627EEA] rotate-45" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] sm:text-[11px] text-gray-400 font-thin uppercase tracking-wider">Network</span>
                  <span className="text-xs sm:text-sm text-white font-medium leading-none mt-1">Ethereum</span>
                </div>
              </div>
            </motion.div>

            {/* Floating Element 2 (Bottom Left) */}
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -left-2 bottom-8 lg:-left-12 lg:bottom-12 z-20 w-[150px] sm:w-[180px] hidden sm:flex flex-col gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl border border-green-500/20 bg-green-500/5 backdrop-blur-md shadow-2xl transform-gpu"
              style={{ transform: "translateZ(50px)" }}
            >
              <span className="text-[10px] sm:text-[11px] text-green-200/70 font-thin uppercase tracking-wider">Value Locked</span>
              <div className="flex items-end gap-1.5 text-white mt-1">
                <span className="text-xl sm:text-3xl font-bold leading-none">$14.2</span>
                <span className="text-[10px] sm:text-xs text-green-200 mb-0.5">B</span>
              </div>
              <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mt-1 px-0">
                <div className="w-[92%] h-full bg-green-400 rounded-full shadow-[0_0_8px_#4ade80]" />
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div
        className="absolute bottom-0 inset-x-0 h-24 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, #080a18 100%)",
        }}
      />
    </section>
  );
}
