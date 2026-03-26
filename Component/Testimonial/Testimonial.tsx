"use client";

import { testimonials } from "@/lib/Testimonial";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function TestimonialSection() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    const timer = setInterval(next, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-k-bg py-24 md:py-20 overflow-hidden border-y border-k-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="p-3 bg-k-primary/10 rounded-2xl border border-k-primary/20 text-k-primary mb-6"
          >
            <Quote size={32} />
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-black text-k-text tracking-tight mb-4 uppercase">
            Built on <span className="text-k-primary">Trust</span>
          </h2>
          <p className="text-k-text-muted text-lg max-w-2xl font-light">
            We measure our success by the momentum of our partners.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="flex flex-col items-center text-center"
            >
              <p className="text-xl md:text-2xl lg:text-3xl text-k-text font-medium italic leading-relaxed mb-12">
                "{testimonials[index].message}"
              </p>

              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-k-primary/30">
                  <Image
                    src={testimonials[index].image}
                    alt={testimonials[index].name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-left">
                  <h4 className="text-k-text font-bold text-lg">{testimonials[index].name}</h4>
                  <p className="text-k-primary text-sm font-semibold tracking-wide uppercase">
                    {testimonials[index].role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex justify-center gap-4 mt-12 lg:mt-0 lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:w-full lg:justify-between lg:-mx-12">
            <button
              onClick={prev}
              className="p-3 rounded-full bg-k-card-bg border border-k-border text-k-text hover:bg-k-primary hover:border-k-primary hover:text-white transition-all shadow-sm"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={next}
              className="p-3 rounded-full bg-k-card-bg border border-k-border text-k-text hover:bg-k-primary hover:border-k-primary hover:text-white transition-all shadow-sm"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-1.5 transition-all duration-300 rounded-full ${i === index ? "w-8 bg-k-primary" : "w-2 bg-k-text/20"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}