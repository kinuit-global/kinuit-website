"use client";
import { motion } from "framer-motion";
import { STATS } from "@/lib/stats";
import Globe from "@/components/ui/Globe";
import Container from "@/components/ui/Container";
import { useState, useEffect } from "react";
import { Globe as GlobeIcon } from "lucide-react";
import SectionBadge from "@/components/ui/SectionBadge";

const fadeUp: any = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

export default function StatsGlobe() {
  const [globeSize, setGlobeSize] = useState(900);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setGlobeSize(520);
      else if (window.innerWidth < 1024) setGlobeSize(750);
      else setGlobeSize(900);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="bg-[#050D1A] py-10 md:py-20 overflow-hidden relative z-10">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#0059ff]/5 blur-[120px] rounded-full pointer-events-none" />

      <Container className="relative z-10">
        <div className="flex justify-center">
          <SectionBadge icon={GlobeIcon} label="Our Global Impact" />
        </div>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl lg:text-5xl text-center font-extrabold text-white mb-8"
        >
          OUR GLOBAL <span className="text-[#0059FF] ml-4">IMPACT</span>
        </motion.h2>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">

          {/* Left: Stats Section (4 columns) */}
          <div className="lg:col-span-4 flex flex-col gap-6 h-full py-2 min-h-[400px] lg:min-h-[500px]">
            <div className="flex flex-col gap-10 w-full h-full justify-center">
              {STATS.map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  {...fadeUp}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ x: 8, backgroundColor: "rgba(255,255,255,0.03)" }}
                  className="bg-white/2 border border-white/5 rounded-[28px] p-6 md:p-8 backdrop-blur-sm transition-all duration-300 flex flex-col justify-center min-h-[130px] md:min-h-[140px]"
                >
                  <div className="text-3xl md:text-3xl font-extrabold text-white mb-1.5">{stat.value}</div>
                  <div className="text-[13px] text-white/50 font-medium tracking-wide leading-snug">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Globe Section (8 columns) */}
          <div className="lg:col-span-8 relative w-full h-[350px] sm:h-[450px] lg:h-full min-h-[350px] lg:min-h-[500px] rounded-[48px] bg-white/1 border border-white/5 overflow-hidden flex flex-col items-center pt-10 sm:pt-16">
            {/* Text Overlay */}
            <motion.div
              {...fadeUp}
              transition={{ delay: 0.3 }}
              className="relative z-30 flex flex-col items-center mb-8 text-center px-6"
            >
              <h3 className="text-white text-lg md:text-xl font-bold tracking-tight mb-2.5">Based in Tamilnadu, India</h3>
              <div className="flex items-center gap-2 px-3.5 py-1.5 bg-white/5 rounded-full border border-white/10 backdrop-blur-md">
                <div className="w-1.5 h-1.5 rounded-full bg-[#1DE038] animate-pulse shadow-[0_0_8px_#1DE038]"></div>
                <span className="text-white/70 text-[10px] font-bold tracking-[0.2em] uppercase">Available Worldwide</span>
              </div>
            </motion.div>

            {/* Massive Globe Positioned carefully */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[-10%] pointer-events-none opacity-80 z-10 w-full h-full flex items-center justify-center">
              <Globe size={globeSize * 1.2} />
            </div>

            {/* Bottom Inner Edge Fader */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-linear-to-t from-[#050D1A] to-transparent z-20 pointer-events-none" />
          </div>

        </div>
      </Container>
    </section>
  );
}
