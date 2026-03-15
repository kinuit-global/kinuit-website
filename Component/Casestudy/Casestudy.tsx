"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { caseStudiesData } from "@/lib/Casestudy";

export default function CaseStudies() {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-[#0f0f21] py-16 px-4 sm:px-6 border-t border-t-[#1B1B1B66] border-b border-b-[#1B1B1B66]">

      {/* Title */}
      <div className="text-center mb-12 md:mb-14">
        <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold">
          Case Studies
        </h2>

        <div className="flex items-center justify-center gap-4 mt-3">
          <div className="h-[1px] w-12 sm:w-16 md:w-24 bg-gray-600"></div>

          <p className="text-blue-400 text-xs sm:text-sm tracking-widest whitespace-nowrap">
            main case studies
          </p>

          <div className="h-[1px] w-12 sm:w-16 md:w-24 bg-gray-600"></div>
        </div>
      </div>

      {/* Carousel */}
      <div className="relative max-w-6xl mx-auto flex items-center justify-center gap-6 overflow-hidden">
        {caseStudiesData.map((study, index) => {
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
              className={`
                cursor-pointer
                ${index !== active ? "hidden sm:block" : "block"}
              `}
            >
              <Image
                src={study.image}
                alt="case study"
                width={320}
                height={400}
                className="rounded-lg object-cover w-[260px] sm:w-[280px] md:w-[320px]"
              />
            </motion.div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-3 mt-8 sm:mt-10">
        {caseStudiesData.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 border border-blue-400 
            ${active === i ? "bg-blue-500" : "bg-transparent"}`}
          />
        ))}
      </div>

    </section>
  );
}