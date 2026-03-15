"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FAQItem } from "@/types/FAQ";

export default function FAQ() {

  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-15 bg-[#020617] text-white">

      <div className="max-w-3xl mx-auto px-4">

        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Frequently <span className="text-[#0059FF]">Asked Questions</span>
        </h2>

        <div className="flex flex-col gap-3 bg-[#121423] rounded-2xl p-10">

          {FAQItem.map((faq: FAQItem, index: number) => (

            <div
              key={index}
              className="rounded-xl border border-white/10 
              bg-[#121423] from-[#0b1220] to-[#020617]
              backdrop-blur-md overflow-hidden"
            >

              {/* QUESTION */}
              <button
                onClick={() => setOpen(open === index ? null : index)}
                className="flex items-center justify-between w-full px-5 py-4 text-left"
              >

                <span className="text-[13px] md:text-sm font-semibold text-white">
                  {faq.qsn}
                </span>

                <span className="flex items-center justify-center w-6 h-6 
                 text-white text-sm font-bold">
                  {open === index ? "−" : "+"}
                </span>

              </button>

              {/* ANSWER */}
              <AnimatePresence>

                {open === index && (

                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >

                    <p className="px-5 pb-4 text-[13px] text-gray-400 leading-relaxed">
                      {faq.answ}
                    </p>

                  </motion.div>

                )}

              </AnimatePresence>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}