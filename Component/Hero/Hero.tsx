"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { easeOut } from "framer-motion";
import HeroBackground from "@/lib/StarCanvas";
import Link from "next/link";
import { ChevronRight, ArrowRight } from "lucide-react";

const TECHS = [
  { name: "Web3", style: "font-medium tracking-wide text-base sm:text-lg text-white/90" },
  { name: "Fintech", style: "font-medium tracking-wide text-base sm:text-lg text-white/90" },
  { name: "AI", style: "font-bold tracking-widest text-lg sm:text-xl text-white", icon: "✦" },
  { name: "Real Estate", style: "font-medium tracking-wide text-base sm:text-lg text-white/90" },
  { name: "Edtech", style: "font-medium tracking-wide text-base sm:text-lg text-white/90" },
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
      pt-24 sm:pt-32 lg:pt-24
      bg-k-bg overflow-hidden
    "
    >
      <HeroBackground />

      {/* Hero content wrapper */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Centered Content */}
        <div className="flex flex-col items-center text-center w-full">
          {/* Badge */}
          <motion.span
            {...fadeUp}
            className="
          inline-flex items-center gap-2
          px-4 py-2
          mt-4 mb-4 sm:mt-6 sm:mb-6
          rounded-full text-[10px] sm:text-xs text-gray-300
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
          leading-[1.1] sm:leading-[1.15] mb-4 sm:mb-6
          text-3xl sm:text-4xl md:text-[2.5rem] lg:text-[4rem] lg:leading-[1.05]
        "
          >
            The Team Behind <br /> Your <span className="bg-linear-to-r from-[#00D1FF] to-[#00FFF0] bg-clip-text text-transparent"> Biggest Move. </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            {...fadeUp}
            transition={{ delay: 0.2 }}
            className="
          max-w-[700px] w-full
          text-xs sm:text-sm md:text-base
          font-thin
          tracking-normal
          text-white/90
          leading-[1.7] sm:leading-[1.8]
          mb-6 sm:mb-8
        "
          >
            In a world run by AI, the brands that win have the sharpest minds behind
            them. We are that <b>edge strategy, creativity, and technology,</b> working as
            one.

          </motion.p>

          {/* Buttons */}
          <motion.div
            {...fadeUp}
            transition={{ delay: 0.3 }}
            className="
          flex flex-col sm:flex-row items-center
          gap-4
          justify-center
          mb-8 sm:mb-12
          w-full sm:w-auto
        "
          >
            <Link
              href="/contact"
              className="
            flex items-center justify-center gap-2
            bg-[#1E50FF] hover:bg-blue-600
            text-white text-[13px] sm:text-sm font-semibold
            px-4 py-2.5 sm:px-7 sm:py-3
            rounded-full
            shadow-lg shadow-blue-500/20
            transition-all duration-300 hover:-translate-y-[2px]
          "
            >
              Start a Project
              <ChevronRight className="w-4 h-4" />
            </Link>

            <Link
              href="/work"
              className="
            flex items-center justify-center gap-2
            text-white text-[13px] sm:text-sm font-semibold
            px-4 py-2.5 sm:px-7 sm:py-3
            rounded-full
            border border-white/10
            bg-transparent hover:bg-white/5
            transition-all duration-300 hover:-translate-y-[2px]
          "
            >
              View Case Studies
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div> {/* Closes Centered Content */}
      </div>

      {/* Brand Tags Row */}
      {/* Brand Tags Marquee */}
      <div className="w-full relative z-10 mt-8 sm:mt-12 mb-8 sm:mb-16 flex flex-col items-center overflow-hidden">
        <motion.p
          {...fadeUp}
          transition={{ delay: 0.4 }}
          className="text-xs sm:text-[13px] text-white/50 mb-6 sm:mb-8 tracking-widest uppercase font-medium text-center px-4"
        >
          Chosen by brands in
        </motion.p>

        {/* Marquee Wrapper */}
        <div className="flex overflow-hidden w-full relative group">
          {/* Gradient Masks */}
          <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-linear-to-r from-k-bg to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-linear-to-l from-k-bg to-transparent z-10 pointer-events-none" />

          <motion.div
            className="flex w-max gap-6 sm:gap-8 md:gap-10 pr-6 sm:pr-8 md:pr-10"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 50,
              ease: "linear",
              repeat: Infinity,
            }}
            style={{ willChange: "transform" }}
          >
            {[...TECHS, ...TECHS, ...TECHS].map((tech, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center min-w-[140px] sm:min-w-[160px] px-6 py-3 sm:py-4 rounded-xl border border-white/8 bg-white/2 backdrop-blur-md hover:bg-white/5 transition-all duration-300 cursor-pointer hover:-translate-y-1 group"
              >
                <div className={`flex items-center justify-center gap-2 ${tech.style} group-hover:text-white`}>
                  {tech.icon && <span className="opacity-80 text-sm">{tech.icon}</span>}
                  <span className="whitespace-nowrap">{tech.name}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div
        className="absolute bottom-0 inset-x-0 h-24 pointer-events-none z-20"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, #080a18 100%)",
        }}
      />
    </section>
  );
}
