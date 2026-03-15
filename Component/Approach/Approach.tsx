"use client";

import { motion } from "framer-motion";
import { ApproachStep } from "@/types/Approach";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function OurApproach() {
  return (
    <section className="bg-[#050d39] py-15 px-6 w-full">
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-10"
      >
        Our <span className="text-blue-500">Approach</span>
      </motion.h2>

      <div className=" flex justify-center  w-full flex-col">
   
        <div className="hidden lg:flex items-center justify-center gap-16 mb-12 w-full max-w-5xl mx-auto">
          {ApproachStep.map((step, index) => (
            <div key={step.id} className="flex items-center gap-4">
              {/* Step Circle */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: step.id * 0.2 }}
                className="w-14 h-14 text-3xl rounded-full bg-blue-500 text-black font-extrabold flex items-center justify-center"
              >
                0{step.id}
              </motion.div>

              {/* Arrow */}
              {index !== ApproachStep.length - 1 && (
                <div className="flex items-center">
                  <div className="h-[2px] w-48 bg-white" />

                  <ArrowRight size={20} className="text-white -ml-1" />
                </div>
              )}
            </div>
          ))}
        </div>
        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {ApproachStep.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="p-6 rounded-xl border border-white/10 
              backdrop-blur-xl bg-white/5
              hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex">
                <div className="p-2 bg-[#2c2c2c] flex rounded-xl">
                  <Image
                    src={step.image}
                    alt="approach img"
                    width={20}
                    height={20}
                  />
                </div>
              </div>

              <h3 className="text-white text-xl font-semibold my-2">{step.title}</h3>

              <p className="text-white tracking-wide font-light text-sm leading-5">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
