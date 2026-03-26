"use client";

import { motion } from "framer-motion";

export default function Story() {
  return (
    <section
      id="about"
      className="relative w-full py-24 md:py-44 bg-k-bg text-k-text overflow-hidden flex items-center justify-center"
    >
      {/* Subtle Radial Glow in Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-k-primary opacity-[0.05] blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 flex flex-col items-center text-center">

        {/* Top Label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-12"
        >
          <div className="h-px w-8 bg-k-border"></div>
          <h4 className="uppercase text-[10px] md:text-xs font-black tracking-[0.3em] text-k-text-muted">
            WHAT WE BELIEVE
          </h4>
          <div className="h-px w-8 bg-k-border"></div>
        </motion.div>

        {/* Quote Container */}
        <div className="relative mb-12 px-4 md:px-0">
          {/* Decorative Quote Mark */}
          <span className="absolute -top-12 -left-2 md:-left-16 text-[100px] md:text-[180px] text-k-text/10 font-serif leading-none pointer-events-none select-none drop-shadow-sm dark:drop-shadow-2xl">“</span>

          <motion.h2
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-medium italic leading-[1.1] md:leading-[1.1] tracking-tight text-k-text mb-2"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            The brands that move the world are not built by committees. They are built by the right people, fully aligned on one vision — and relentless about making it real.
          </motion.h2>

          {/* Decorative Quote Mark */}
          <span className="absolute -bottom-24 -right-2 md:-right-16 text-[100px] md:text-[180px] text-k-text/10 font-serif leading-none pointer-events-none select-none drop-shadow-sm dark:drop-shadow-2xl">”</span>
        </div>

        {/* Supporting Paragraph */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-base sm:text-lg md:text-xl font-medium max-w-[700px] leading-relaxed md:leading-loose tracking-wide pt-4 text-k-text-muted"
          style={{ fontFamily: "var(--font-lato)" }}
        >
          That is how Kinuit works. A dedicated team across strategy, design, technology, and marketing — fully aligned on your brand, your goals, and your growth.
        </motion.p>

      </div>
    </section>
  );
}
