"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WhyKinuitSlides } from "@/lib/Why";
import Image from "next/image";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

export default function WhyKinuit() {
  const [id, setId] = useState(0);
  const slide = WhyKinuitSlides[id];

  return (
    <section className="py-16 bg-k-bg text-k-text">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-10 md:mb-12">
          
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-2 text-k-text">
              Why Choose Kinuit
            </h2>

            <p className="text-xl sm:text-[1.6rem] font-extrabold text-k-text">
              Built for{" "}
              <span className="text-k-primary font-semibold">
                Performance
              </span>
            </p>
          </div>

          <button className="flex items-center gap-3 h-8 pr-4 rounded-full border border-k-border bg-k-card-bg w-fit shadow-sm">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-k-primary">
              <ArrowUpRight
                size={14}
                strokeWidth={2.5}
                className="text-black"
              />
            </span>

            <span className="text-sm text-k-text font-medium">
              How We Work
            </span>
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
            className="relative border border-k-border rounded-2xl p-6 sm:p-8 md:p-10 grid md:grid-cols-2 gap-8 md:gap-12 bg-k-card-bg shadow-xl dark:shadow-none"
          >
            {/* TOP RIGHT ICON */}
            <button className="absolute top-4 right-4 sm:top-6 sm:right-6 w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-k-border flex items-center justify-center text-k-text/50">
              ↗
            </button>

            {/* TEXT */}
            <div className="max-w-[520px]">
              <span className="text-k-text-muted text-base sm:text-lg block mb-4 sm:mb-6">
                {slide.num}
              </span>

              <h3 className="text-2xl sm:text-3xl font-extrabold mb-4 leading-snug text-k-text">
                {slide.title} <br />
                <span className="text-k-primary">{slide.em}</span>
              </h3>

              <p className="text-k-text-muted text-sm sm:text-base font-light leading-relaxed">
                {slide.body}
              </p>
            </div>

            {/* IMAGE */}
            <div className="flex justify-center md:justify-end items-center">
              <div className="relative w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] md:w-[300px] md:h-[300px] bg-k-bg rounded-xl flex items-center justify-center">
                <Image
                  src="/group1.png"
                  alt="Kinuit illustration"
                  fill
                  className="object-contain p-4 sm:p-6"
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* NAVIGATION */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={() =>
              setId(
                (id - 1 + WhyKinuitSlides.length) % WhyKinuitSlides.length
              )
            }
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-k-card-bg border border-k-border text-k-text flex items-center justify-center hover:bg-k-primary hover:text-white transition shadow-sm"
          >
            <ChevronLeft />
          </button>

          <button
            onClick={() =>
              setId((id + 1) % WhyKinuitSlides.length)
            }
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-k-card-bg border border-k-border text-k-text flex items-center justify-center hover:bg-k-primary hover:text-white transition shadow-sm"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}