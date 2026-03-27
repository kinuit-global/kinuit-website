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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.slice(0, 3).map((testimonial, idx) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col bg-k-card-bg border border-k-border p-8 rounded-3xl relative hover:border-k-primary/30 transition-all duration-500 shadow-xl dark:shadow-none"
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
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-k-primary/30">
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
          ))}
        </div>

      </div>
    </section>
  );
}