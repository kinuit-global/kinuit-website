"use client";

import Image from "next/image";
import { Handshake } from "lucide-react";
import SectionBadge from "@/components/ui/SectionBadge";
import { motion } from "framer-motion";

const baseClients = [
  { name: "Bigfoot", logo: "/clients/bigfoot.png" },
  { name: "Deforce", logo: "/clients/deforce.png" },
  { name: "DTE", logo: "/clients/dte.png" },
  { name: "Orbit M31", logo: "/clients/orbit-m31.png" },
];

// Repeat 3 times to ensure the set is wider than the screen, then duplicate once for a seamless loop
const singleSet = [...baseClients, ...baseClients, ...baseClients];
const allClients = [...singleSet, ...singleSet];

export default function Clients() {
  return (
    <section className="relative py-20 bg-white overflow-hidden border-y border-slate-100">
      {/* Background soft glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-k-primary/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 mb-12 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <SectionBadge 
            icon={<Handshake size={14} className="text-k-primary" />} 
            label="Our Happy Clients" 
          />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mt-3">
            TRUSTED BY <span className="text-k-primary">LEADING BRANDS</span>
          </h2>
          <p className="text-slate-500 mt-4 text-base md:text-lg max-w-2xl font-light leading-relaxed">
            We partner with ambitious startups and established enterprises to design, build, and scale digital products that define industries.
          </p>
        </motion.div>
      </div>

      {/* Slider Container */}
      <div className="relative w-full overflow-hidden py-4">
        {/* Left/Right fading gradients */}
        <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

        <div className="flex overflow-hidden">
          <div className="flex gap-16 md:gap-24 whitespace-nowrap animate-client-marquee hover:[animation-play-state:paused] py-2">
            {allClients.map((client, index) => (
              <div
                key={index}
                className="flex items-center justify-center w-36 h-12 md:w-44 md:h-16 shrink-0 opacity-50 hover:opacity-100 transition-all duration-300 hover:scale-105 filter grayscale hover:grayscale-0"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={client.logo}
                    alt={`${client.name} logo`}
                    fill
                    className="object-contain"
                    sizes="(max-w-768px) 144px, 176px"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Self-contained CSS for seamless marquee scrolling */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes clientMarquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-client-marquee {
          animation: clientMarquee 30s linear infinite;
        }
      `}} />
    </section>
  );
}