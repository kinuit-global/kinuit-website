"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { caseStudies } from "@/types/Casestudy";

export default function CaseStudies() {
  const [active, setActive] = useState(0);
  return (
    <section className="bg-[#0f0f21] py-15 px-6 border-t border-t-[#1B1B1B66] border-b border-b-[#1B1B1B66]">
      {/* Title */}
      <div className="text-center mb-14">
        <h2 className="text-white text-3xl md:text-4xl font-bold">
          Case Studies
        </h2>

        <div className="flex items-center justify-center gap-4 mt-3">
          {/* Left Line */}
          <div className="h-[1px] w-16 md:w-24 bg-gray-600"></div>
          {/* Text */}
          <p className="text-blue-400 text-sm tracking-widest whitespace-nowrap">
            main case studies
          </p>
          {/* Right Line */}
          <div className="h-[1px] w-16 md:w-24 bg-gray-600"></div>
        </div>
      </div>

      {/* Carousel */}
      <div className="relative max-w-6xl mx-auto flex items-center justify-center gap-6 overflow-hidden">
        {caseStudies.map((study, index) => {
          const isActive = index === active;

          return (
            <motion.div
              key={study.id}
              onClick={() => setActive(index)}
              animate={{
                scale: isActive ? 1 : 0.9,
                opacity: isActive ? 1 : 0.5,
              }}
              transition={{ duration: 0.4 }}
              className="cursor-pointer"
            >
              <Image
                src={study.image}
                alt="case study"
                width={320}
                height={400}
                className="rounded-lg object-cover"
              />
            </motion.div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-3 mt-10">
        {caseStudies.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`w-3 h-3 border border-blue-400 
            ${active === i ? "bg-blue-500" : "bg-transparent"}`}
          />
        ))}
      </div>
    </section>
  );
}
