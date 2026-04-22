"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { easeOut } from "framer-motion";
import Link from "next/link";
import { ChevronRight, ArrowRight, Rocket, Code, Wrench, Github, Smartphone, Server, Palette, Database } from "lucide-react";

const TECHS = [
  { name: "Web3", style: "font-medium tracking-wide text-base sm:text-lg text-k-text/90" },
  { name: "Health & wellness", style: "font-medium tracking-wide text-base sm:text-lg text-k-text/90" },
  { name: "Immigration", style: "font-medium tracking-wide text-base sm:text-lg text-k-text/90" },
  { name: "Legal", style: "font-medium tracking-wide text-base sm:text-lg text-k-text/90" },
  { name: "SaaS", style: "font-medium tracking-wide text-base sm:text-lg text-k-text/90" },
  { name: "Edu Tech", style: "font-medium tracking-wide text-base sm:text-lg text-k-text/90" },
  { name: "Fin Tech", style: "font-medium tracking-wide text-base sm:text-lg text-k-text/90" },
  { name: "Real-estate", style: "font-medium tracking-wide text-base sm:text-lg text-k-text/90" },
  { name: "Insurance", style: "font-medium tracking-wide text-base sm:text-lg text-k-text/90" },
  { name: "E-Commerce/Q-Commerce", style: "font-medium tracking-wide text-base sm:text-lg text-k-text/90" },
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
      relative w-full max-w-full min-h-0 sm:min-h-screen
      flex flex-col justify-start sm:justify-center
      px-4 sm:px-6
      pt-[120px] pb-4 sm:pt-24 sm:pb-8 lg:pt-28 lg:pb-12
      bg-k-bg overflow-hidden
    "
    >
      <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden pointer-events-none bg-gradient-to-b from-[#e0e7ff]/30 to-[#F6F6F6]">
      </div>


      {/* Hero content wrapper */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-8 items-center lg:pt-8">
        {/* Split Content: Text */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left w-full order-1 mb-8 lg:mb-0">
          {/* Badge */}
          <motion.span
            {...fadeUp}
            className="
          inline-flex items-center gap-2
          px-4 sm:px-5 py-2
          mt-4 mb-4 sm:mt-6 sm:mb-6
          rounded-full text-[11px] sm:text-[13px] text-k-text font-bold
          bg-[#eff1f5] border border-[#d1d5db]
        "
          >
            <motion.div
              animate={{ y: [0, -3, 0] }} // up and down float
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="flex items-center"
            >
              <Rocket className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-k-text" />
            </motion.div>
            Global Reach. Zero Latency
          </motion.span>

          {/* Headline */}
          <motion.h1
            {...fadeUp}
            transition={{ delay: 0.1 }}
            className="
          tracking-tight sm:font-black
          leading-[1.2] sm:leading-[1.15] mb-4 sm:mb-8
          text-3xl sm:text-4xl md:text-[2.5rem] lg:text-[3.25rem] xl:text-[3.5rem] lg:leading-[1.1]
        "
          >
            <span className="block mb-1 sm:mb-0 font-bold sm:font-bold">
              Branding That <br /> Builds <span className="text-k-primary"> Authority. </span>
            </span>
            <span className="block font-bold sm:font-bold text-k-text/90 sm:text-k-text">
              Strategy That <br /> Drives <span className="text-k-primary"> Growth </span>
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            {...fadeUp}
            transition={{ delay: 0.2 }}
            className="
          max-w-[700px] w-full
          text-xs sm:text-sm md:text-base
          font-normal
          tracking-normal
          text-k-text/80
          leading-[1.6] sm:leading-[1.8]
          mb-6 sm:mb-8 mx-auto lg:mx-0
        "
          >
            From branding to development, we build content ecosystems <br className="hidden lg:block" /> designed to dominate search, elevate authority, <br className="hidden lg:block" /> and accelerate revenue.
          </motion.p>

          {/* Buttons */}
          <motion.div
            {...fadeUp}
            transition={{ delay: 0.3 }}
            className="
          flex flex-col sm:flex-row items-center
          gap-4
          justify-center lg:justify-start
          mb-4 sm:mb-12
          w-full sm:w-auto
        "
          >
            <Link
              href="/contact"
              className="
            flex items-center justify-center gap-2
            bg-k-primary hover:opacity-90
            text-white text-[13px] sm:text-sm font-semibold
            px-4 py-2.5 sm:px-7 sm:py-3
            rounded-full
            shadow-lg shadow-blue-500/20
            transition-all duration-300 hover:-translate-y-[2px]
          "
            >
              Launch Your Brand
              <ChevronRight className="w-4 h-4" />
            </Link>

            <Link
              href="/about"
              className="
            flex items-center justify-center gap-2
            text-k-text text-[13px] sm:text-sm font-semibold
            px-4 py-2.5 sm:px-7 sm:py-3
            rounded-full
            border border-k-glass-border
            bg-transparent hover:bg-k-glass-bg
            transition-all duration-300 hover:-translate-y-[2px]
          "
            >
              Get to Know More
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div> {/* Closes Left Content */}

        {/* Right Side: Floating 3D Logo */}
        <motion.div
          {...fadeUp}
          transition={{ delay: 0.4 }}
          className="flex justify-center items-center w-full order-2"
        >
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] lg:w-[480px] lg:h-[480px] drop-shadow-[0_20px_50px_rgba(8,31,240,0.15)]"
          >
            <Image src="/klogo3d.png" alt="Kinuit 3D" fill className="object-contain" priority sizes="(max-width: 768px) 100vw, 50vw" />
          </motion.div>
        </motion.div>
      </div>

      {/* Brand Tags Row */}
      <div className="w-full relative z-10 mt-2 sm:mt-8 pt-8 flex flex-col items-center overflow-hidden">
        <motion.p
          {...fadeUp}
          transition={{ delay: 0.4 }}
          className="text-[10px] sm:text-[13px] text-k-text mb-4 sm:mb-8 tracking-widest uppercase font-bold text-center px-4"
        >
          BUILT FOR BRANDS IN
        </motion.p>
        {/* Marquee Wrapper */}
        <div className="flex overflow-hidden w-full relative group">

          <motion.div
            className="flex w-max gap-4 sm:gap-8 md:gap-10 pr-4 sm:pr-8 md:pr-10"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 35,
              ease: "linear",
              repeat: Infinity,
            }}
            style={{ willChange: "transform" }}
          >
            {[...TECHS, ...TECHS].map((tech, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center min-w-[120px] sm:min-w-[160px] px-4 py-3 sm:py-4 rounded-xl border border-slate-200 bg-white transition-all duration-300 cursor-pointer hover:-translate-y-1 group shadow-sm hover:shadow-md hover:bg-slate-50"
              >
                <div className="flex items-center justify-center gap-2 font-black tracking-tight text-sm sm:text-lg text-slate-950">
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
            "linear-gradient(to bottom, transparent 0%, var(--k-hero-gradient-end) 100%)",
        }}
      />
    </section>
  );
}
