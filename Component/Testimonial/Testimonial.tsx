"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Linkedin } from "lucide-react";
import { testimonials } from "@/lib/Testimonial";

export default function Testimonials() {
  const [active, setActive] = useState<number>(1);

  return (
    <section className="relative py-16 px-4 sm:px-6 bg-[#050718] border-b border-t border-t-gray-900 border-b-gray-900">

      {/* Heading */}
      <div className="text-center mb-12 md:mb-16">
        <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold">
          Our <span className="text-blue-500">Testimonials</span>
        </h2>

        <p className="text-gray-400 max-w-xl mx-auto text-sm mt-3">
          Don't just take our word for it. Hear what our satisfied clients
          have to say about their experience with Kinuit.
        </p>
      </div>

      {/* Cards */}
      <div className="max-w-6xl mx-auto flex flex-wrap justify-center items-start gap-6 md:gap-8">

        {testimonials.map((testimonial, index) => {
          const isActive = index === active;

          return (
            <div key={testimonial.id} className="flex flex-col items-center w-full sm:w-auto">

              {/* Card */}
              <motion.div
                onClick={() => setActive(index)}
                whileHover={{ y: -6 }}
                animate={{
                  scale: isActive ? 1 : 0.9,
                  opacity: isActive ? 1 : 0.5
                }}
                transition={{ duration: 0.4 }}
                className="relative w-full sm:w-[300px] rounded-xl border border-white/10
                backdrop-blur-xl p-6 bg-white/[0.04] cursor-pointer"
              >

                {/* LinkedIn */}
                <div className="flex">
                  <div className="bg-white/10 rounded-md flex items-center justify-center p-3">
                    <Linkedin size={20} className="text-white" />
                  </div>
                </div>

                {/* Message */}
                <p className="text-white text-sm py-5">
                  {testimonial.message}
                </p>

                {/* Bubble Arrow */}
                <div className="absolute -bottom-2 left-10 w-4 h-4 bg-white/[0.04] rotate-45 border-r border-b border-white/10"></div>

              </motion.div>

              {/* User */}
              <div className="flex items-center gap-3 mt-6">

                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />

                <div>
                  <h4 className="text-white text-sm font-semibold">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-400 font-thin text-xs">
                    {testimonial.role}
                  </p>
                </div>

              </div>

            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-3 mt-10 md:mt-12">

        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`p-1 border border-white/40 
            ${active === i ? "bg-blue-500 border-blue-500" : ""}`}
          />
        ))}

      </div>

    </section>
  );
}