"use client";
import { motion } from "framer-motion";
import { ApproachSteps } from "@/lib/Approach";
import { ArrowRight, Puzzle, RefreshCw, Target } from "lucide-react";
import Image from "next/image";

export default function OurApproach() {
  return (
    <section id="approach" className="bg-k-bg py-20 md:py-20 px-6 w-full text-k-text">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center mb-16 md:mb-24">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-k-text mb-4"
        >
          THE KINUIT <span className="text-k-primary">STANDARD</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 0.6, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-k-tex text-lg md:text-xl font-medium"
        >
          Built on clarity, driven by strategy, executed for impact.
        </motion.p>
      </div>

      <div className="flex justify-center w-full flex-col">
        {/* Step Circles (Desktop only) - Commented out for Pillars layout
        <div className="hidden lg:flex items-center justify-center gap-16 mb-20 w-full max-w-5xl mx-auto">
          {ApproachSteps.map((step, index) => (
            <div key={step.id} className="flex items-center gap-4">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: step.id * 0.2 }}
                className="w-14 h-14 text-2xl rounded-full bg-[#0059FF] text-black font-extrabold flex items-center justify-center"
              >
                0{step.id}
              </motion.div>

              {index !== ApproachSteps.length - 1 && (
                <div className="flex items-center">
                  <div className="h-[1px] w-48 bg-white/20" />
                  <ArrowRight size={20} className="text-white/40 -ml-1" />
                </div>
              )}
            </div>
          ))}
        </div>
        */}

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {ApproachSteps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="p-8 md:p-10 rounded-[28px] border border-[#a5b4fc] shadow-[0_8px_30px_rgb(0,0,0,0.04)] 
              bg-k-card-bg
              hover:scale-[1.03] hover:-translate-y-1 hover:shadow-[0_16px_40px_rgb(0,0,0,0.08)] transition-all duration-300 flex flex-col items-start"
            >
              <div className="relative mb-8">
                <div className="w-[52px] h-[52px] bg-[#081ff0] flex items-center justify-center rounded-[16px] text-white shadow-md">
                  {step.title === "Strategic by Design" && <Puzzle size={24} strokeWidth={2} />}
                  {step.title === "Built for Consistency" && <RefreshCw size={24} strokeWidth={2} />}
                  {step.title === "Focused on Impact" && <Target size={24} strokeWidth={2} />}
                </div>
              </div>

              <h3 className="text-k-text text-xl md:text-[22px] font-bold mb-4 tracking-tight flex items-center gap-3">
                {step.title}
              </h3>

              {step.statement && (
                <div className="text-k-primary font-semibold text-sm tracking-widest uppercase mb-4 opacity-100">
                  {step.statement}
                </div>
              )}

              <p className="text-k-text/70 tracking-normal font-normal text-[15px] leading-[1.7]">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
