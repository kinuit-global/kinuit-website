"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { easeOut } from "framer-motion";
import StarCanvas from "@/lib/StarCanvas";
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
     text-center px-5 pt-28
     bg-k-bg overflow-hidden
   "
    >
      <HeroBackground />

      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center w-full">
        {/* Small badge */}
        <motion.span
          {...fadeUp}
          className="
        inline-flex items-center gap-2
        px-4 py-2 my-10
        rounded-full text-sm text-gray-300
        bg-white/5 border border-white/10 backdrop-blur-md
      "
        >
          <Image src="/mon.png" alt="icon" width={16} height={16} />
          Global Reach. Zero Latency
        </motion.span>

        {/* Headline */}
        <motion.h1
          {...fadeUp}
          transition={{ delay: 0.1 }}
          className="font-black text-5xl uppercase leading-tight mb-6"
        >
          WORK THAT MOVES
          <br />
          <span className="text-[#0059ff] text-7xl font-bold">
            WHILE YOU REST.
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          {...fadeUp}
          transition={{ delay: 0.2 }}
          className="max-w-xl text-base font-thin tracking-normal text-white leading-relaxed mb-12"
        >
          A globally distributed partner for Branding, Development, and Strategy. We work while you don't. No delays, no downtime, just pure Management of your digital success.
        </motion.p>

        {/* Buttons */}
        <motion.div
          {...fadeUp}
          transition={{ delay: 0.3 }}
          className="flex gap-3 justify-center mb-20"
        >
          <Link
            href="#cta"
            className="flex gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-7 py-3 rounded-full transition hover:-translate-y-[2px]
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
            className="flex gap-2 text-white text-sm font-semibold px-7 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur  hover:-translate-y-[2px] transition
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
          <div className="grid grid-cols-3 overflow-hidden pb-10">
            {STATS.map((stat, index) => (
              <div
                key={stat.label}
                className={`py-2 text-center ${
                  index < 2 ? "border-r border-r-white/10" : ""
                }`}
              >
                <div className="text-3xl font-bold text-white">
                  {stat.value}
                </div>
                <div className="text-sm text-white font-thin">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

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
