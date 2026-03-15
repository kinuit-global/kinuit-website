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
      flex flex-col items-center justify-center
      text-center
      px-4 sm:px-6
      pt-24 sm:pt-28
      bg-k-bg overflow-hidden
    "
    >
      <HeroBackground />

      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-5xl">
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
          font-black uppercase leading-tight mb-6
          text-2xl font-bold sm:text-4xl md:text-5xl lg:text-6xl
        "
        >
          WORK THAT MOVES
          <br />
          <span className="text-[#0059ff] font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
            WHILE YOU REST.
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          {...fadeUp}
          transition={{ delay: 0.2 }}
          className="
          max-w-xl
          text-sm sm:text-base
          font-thin
          tracking-normal
          text-white
          leading-relaxed
          mb-10 sm:mb-12
        "
        >
          A globally distributed partner for Branding, Development, and
          Strategy. We work while you don't. No delays, no downtime, just pure
          Management of your digital success.
        </motion.p>

        {/* Buttons */}
        <motion.div
          {...fadeUp}
          transition={{ delay: 0.3 }}
          className="
          flex flex-col sm:flex-row
          gap-3
          justify-center
          mb-16 sm:mb-20
          w-full sm:w-auto
        "
        >
          <Link
            href="#cta"
            className="
            flex items-center justify-center gap-2
            bg-blue-600 hover:bg-blue-700
            text-white text-sm font-semibold
            px-7 py-3
            rounded-full
            transition hover:-translate-y-[2px]
          "
          >
            Book a Free Call
            <Image
              src="/fwd.png"
              alt="arrw-img"
              width={15}
              height={10}
              className="object-contain"
            />
          </Link>

          <Link
            href="#cases"
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
            View Our Works
            <Image
              src="/play.png"
              alt="arrw-img"
              width={15}
              height={10}
              className="object-contain"
            />
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          {...fadeUp}
          transition={{ delay: 0.4 }}
          className="w-full max-w-2xl"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 overflow-hidden pb-10 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
            {STATS.map((stat) => (
              <div key={stat.label} className="py-4 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-white font-thin">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
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
