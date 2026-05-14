"use client";

import { Testimonial } from "@/types/Testimonial";
import { motion } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";

export default function TestimonialSection({ testimonials }: { testimonials: Testimonial[] }) {
  const [active, setActive] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(1);

  // Determine items per slide based on screen width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerSlide(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerSlide(2);
      } else {
        setItemsPerSlide(3);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalItems = testimonials.length;
  const maxIndex = Math.max(0, totalItems - itemsPerSlide);

  const nextSlide = useCallback(() => {
    setActive((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setActive((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Adjust active index when itemsPerSlide changes
  useEffect(() => {
    setActive((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  if (testimonials.length === 0) {
    return (
      <section className="bg-k-bg py-24 md:py-20 border-y border-k-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <Quote className="mx-auto text-k-text-muted/20 mb-4" size={48} />
            <p className="text-k-text-muted text-sm font-black uppercase tracking-widest italic opacity-50">No testimonials shared yet.</p>
        </div>
      </section>
    );
  }

  // Handle centering for fewer items than the viewport can hold
  const isCentered = totalItems <= itemsPerSlide;

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

        <div className="relative">
          {/* Carousel Viewport */}
          <div className={`overflow-hidden ${isCentered ? 'flex justify-center' : ''}`}>
            <motion.div
              animate={{ 
                x: isCentered ? 0 : `-${active * (100 / itemsPerSlide)}%` 
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={`flex gap-8 ${isCentered ? 'justify-center w-full' : ''}`}
              style={{ 
                width: isCentered ? 'auto' : `${(totalItems / itemsPerSlide) * 100}%` 
              }}
            >
              {testimonials.map((testimonial, idx) => (
                <div 
                  key={testimonial.id} 
                  className="px-1"
                  style={{ 
                    width: isCentered ? '100%' : `${100 / totalItems}%`,
                    maxWidth: itemsPerSlide === 1 ? '100%' : itemsPerSlide === 2 ? '480px' : '400px'
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    viewport={{ once: true }}
                    className="flex flex-col bg-k-card-bg border border-k-border p-8 rounded-3xl relative hover:border-k-primary/30 transition-all duration-500 h-full"
                    itemScope
                    itemType="https://schema.org/Review"
                  >
                    <div className="text-k-primary/20 absolute top-6 right-8">
                      <Quote size={40} />
                    </div>

                    <div className="mb-8" itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
                      <meta itemProp="ratingValue" content="5" />
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-k-primary text-xs">★</span>
                        ))}
                      </div>
                    </div>

                    <p className="text-k-text font-medium italic leading-relaxed mb-8 relative z-10 text-sm md:text-base" itemProp="reviewBody">
                      "{testimonial.message}"
                    </p>

                    <div className="mt-auto flex items-center gap-4" itemProp="author" itemScope itemType="https://schema.org/Person">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-k-primary/30 shrink-0">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                          itemProp="image"
                        />
                      </div>
                      <div>
                        <h3 className="text-k-text font-bold text-base" itemProp="name">{testimonial.name}</h3>
                        <cite className="text-k-primary text-[10px] font-black tracking-widest uppercase not-italic">
                          {testimonial.role}
                        </cite>
                        <meta itemProp="publisher" content="Kinuit" />
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Controls */}
          {!isCentered && (
            <>
              <button
                onClick={prevSlide}
                className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 p-4 rounded-full bg-k-card-bg border border-k-border text-k-text hover:bg-k-primary hover:text-white transition-all shadow-lg z-10 hidden md:block"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextSlide}
                className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 p-4 rounded-full bg-k-card-bg border border-k-border text-k-text hover:bg-k-primary hover:text-white transition-all shadow-lg z-10 hidden md:block"
              >
                <ChevronRight size={24} />
              </button>

              {/* Indicators */}
              <div className="flex justify-center items-center gap-2 mt-12">
                {[...Array(maxIndex + 1)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`h-1.5 transition-all duration-500 rounded-full ${
                      active === i ? "w-10 bg-k-primary" : "w-2.5 bg-k-border"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}