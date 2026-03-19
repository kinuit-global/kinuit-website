"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Linkedin } from "lucide-react";
import { testimonials } from "@/lib/Testimonial";

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prevSlide = useCallback(() => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  // Auto-play logic
  useEffect(() => {
    if (isAutoPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(nextSlide, 5000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isAutoPlaying, nextSlide]);

  const handleInteraction = () => {
    setIsAutoPlaying(false);
  };

  const handleDragEnd = (_: any, info: any) => {
    if (info.offset.x > 50) {
      prevSlide();
      handleInteraction();
    } else if (info.offset.x < -50) {
      nextSlide();
      handleInteraction();
    }
  };

  return (
    <section className="relative py-20 px-4 sm:px-6 bg-[#050718] border-b border-t border-t-gray-900 border-b-gray-900 overflow-hidden">
      {/* Heading */}
      <div className="text-center mb-16 md:mb-20">
        <motion.h4
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 0.75, y: 0 }}
          viewport={{ once: true }}
          className="uppercase text-xs md:text-sm font-black tracking-[0.2em] mb-8 text-blue-500"
        >
          CLIENT VOICE
        </motion.h4>
        <h2 className="text-white text-3xl md:text-5xl font-bold mb-6">
          Trusted by founders <span className="text-blue-500">who demand the best</span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-lg">
          Don't just take our word for it. Hear what our satisfied clients
          have to say about their experience with Kinuit.
        </p>
      </div>

      {/* Carousel Container */}
      <div className="relative max-w-7xl mx-auto h-[380px] md:h-[480px] flex items-center justify-center">
        <div className="flex items-center justify-center w-full relative h-full">
          <AnimatePresence initial={false}>
            {testimonials.map((testimonial, index) => {
              const isCenter = index === active;
              const position = index - active;
              
              // Handle wrap-around
              let displayPosition = position;
              if (position < -1) displayPosition = testimonials.length + position;
              if (position > 1) displayPosition = position - testimonials.length;

              const isVisible = Math.abs(displayPosition) <= 1;

              if (!isVisible) return null;

              return (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, scale: 0.8, x: displayPosition * 300 }}
                  animate={{ 
                    opacity: isCenter ? 1 : 0.3, 
                    scale: isCenter ? 1.05 : 0.85, 
                    x: displayPosition * (typeof window !== 'undefined' && window.innerWidth < 768 ? 0 : 400),
                    zIndex: isCenter ? 20 : 10,
                  }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={handleDragEnd}
                  className={`absolute w-full max-w-[310px] md:max-w-[390px] cursor-grab active:cursor-grabbing ${!isCenter ? 'hidden md:block' : 'block'}`}
                >
                  <div className={`p-8 md:p-12 rounded-3xl border-2 transition-all duration-500 flex flex-col h-full ${
                    isCenter ? 'border-blue-500/50 bg-blue-500/10 shadow-[0_0_50px_-12px_rgba(59,130,246,0.3)]' : 'border-white/5 bg-white/[0.02]'
                  } backdrop-blur-xl`}>
                    
                    <div className="flex justify-between items-start mb-8">
                      <div className="bg-blue-500/20 p-3 rounded-xl border border-blue-500/30">
                        <Linkedin size={24} className="text-blue-500" />
                      </div>
                      <div className="text-gray-600 text-6xl font-serif">"</div>
                    </div>

                    <p className="text-white text-base md:text-xl leading-relaxed mb-10 flex-grow italic">
                      {testimonial.message}
                    </p>
                    
                    <div className="flex items-center gap-4 border-t border-white/10 pt-8 mt-auto">
                      <div className="relative w-12 h-12 md:w-14 md:h-14">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          fill
                          className="rounded-full object-cover border-2 border-blue-500/50"
                        />
                      </div>
                      <div>
                        <h4 className="text-white text-base md:text-lg font-bold">{testimonial.name}</h4>
                        <p className="text-blue-400 text-xs md:text-sm font-medium">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-12">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => { setActive(i); handleInteraction(); }}
            className={`h-1.5 transition-all duration-500 rounded-full ${
              active === i ? "w-10 bg-blue-500" : "w-2.5 bg-gray-700 hover:bg-gray-600"
            }`}
          />
        ))}
      </div>
    </section>
  );
}