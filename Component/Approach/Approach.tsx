"use client";
import { motion } from "framer-motion";
import { ApproachSteps } from "@/lib/Approach";
import { ArrowRight, ShieldCheck, Combine, Zap } from "lucide-react";
import Image from "next/image";

export default function OurApproach() {
  return (
    <section id="approach" className="bg-[#050816] py-20 md:py-32 px-6 w-full text-white">
      <div className="max-w-4xl mx-auto text-center mb-16 md:mb-24">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4"
        >
          THE KINUIT <span className="text-[#0059FF]">STANDARD</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 0.6, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-white/60 text-lg md:text-xl font-medium"
        >
          We hold ourselves to a different standard.
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {ApproachSteps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="p-8 rounded-2xl border border-white/5 
              backdrop-blur-xl bg-white/2
              hover:bg-white/4 hover:border-white/10 transition-all duration-300 flex flex-col items-start"
            >
              <div className="relative mb-6">
                <span className="text-5xl md:text-6xl font-black text-[#0059FF] opacity-20 absolute -top-8 -left-2 select-none">0{step.id}</span>
                <div className="p-3 bg-white/5 flex rounded-xl border border-white/10 text-[#0059FF] relative z-10">
                  {step.title === "EXPERTISE" && <ShieldCheck size={24} />}
                  {step.title === "INTEGRATION" && <Combine size={24} />}
                  {step.title === "MOMENTUM" && <Zap size={24} />}
                </div>
              </div>

              <h3 className="text-white text-2xl font-extrabold mb-3 tracking-tight flex items-center gap-3">
                <span className="text-[#0059FF]">0{step.id} —</span> 
                {step.title}
              </h3>

              {step.statement && (
                <div className="text-[#0059FF] font-semibold text-sm tracking-widest uppercase mb-4 opacity-100">
                  {step.statement}
                </div>
              )}

              <p className="text-white/60 tracking-normal font-light text-base md:text-lg leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
