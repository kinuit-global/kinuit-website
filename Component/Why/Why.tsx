"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WhyKinuitSlide } from "@/types/Why";
import Image from "next/image";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

export default function WhyKinuit() {
  const [id, setId] = useState(0);
  const slide = WhyKinuitSlide[id];

  return (
    <section className="py-15 bg-[#050816] text-white">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* HEADER */}
        <div className="flex items-start justify-between mb-12">
          <div>
            <h2 className="text-4xl font-extrabold mb-2">Why Choose Kinuit</h2>
            <p className="text-[1.6rem] font-extrabold text-white">
              Built for{" "}
              <span className="text-[#0059FF] font-semibold">Performance</span>
            </p>
          </div>

          <button className="flex items-center gap-3 h-8 pr-4 rounded-full border border-[#2A2F45] bg-[#060A23]">
            {/* ICON CIRCLE */}
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#0059FF]">
              <ArrowUpRight
                size={14}
                strokeWidth={2.5}
                className=" text-black"
              />
            </span>

            {/* TEXT */}
            <span className="text-sm text-white font-medium">How We Work</span>
          </button>
        </div>

        {/* CARD */}
        <AnimatePresence mode="wait">
          <motion.div
            key={id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className="relative border border-[#616161CC] rounded-2xl p-10 grid md:grid-cols-2 gap-12 bg-gradient-to-br from-[#070b24] to-[#050816]"
          >
            {/* TOP RIGHT ICON */}
            <button className="absolute top-6 right-6 w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center">
              ↗
            </button>

            {/* TEXT */}
            <div className="max-w-[520px]">
              <span className="text-gray-400 text-lg block mb-6">
                {slide.num}
              </span>

              <h3 className="text-3xl font-extrabold mb-4 leading-snug">
                {slide.title} <br />
                <span className="text-white">{slide.em}</span>
              </h3>

              <p className="text-white/80 text-base font-light leading-relaxed">
                {slide.body}
              </p>
            </div>

            {/* IMAGE */}
            <div className="flex justify-center md:justify-end items-center">
              <div className="relative w-[300px] h-[300px] bg-[#e5e5e5] rounded-xl flex items-center justify-center">
                <Image
                  src="/group1.png"
                  alt="Kinuit illustration"
                  fill
                  className="object-contain p-6"
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* NAVIGATION */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={() =>
              setId((id - 1 + WhyKinuitSlide.length) % WhyKinuitSlide.length)
            }
            className="w-10 h-10 rounded-full bg-[#1a1f3a] flex items-center justify-center hover:bg-blue-500 transition"
          >
            <ChevronLeft/>
          </button>

          <button
            onClick={() => setId((id + 1) % WhyKinuitSlide.length)}
            className="w-10 h-10 rounded-full bg-[#222222] flex items-center justify-center hover:bg-blue-500 transition"
          >
            
            <ChevronRight/>
          </button>
        </div>
      </div>
    </section>
  );
}
