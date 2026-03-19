"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FAQItems } from "@/lib/FAQ";
import { HelpCircle } from "lucide-react";
import SectionBadge from "@/components/ui/SectionBadge";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-16 bg-[#020617] text-white">

      <div className="max-w-4xl mx-auto px-4 sm:px-6">

        <div className="flex justify-center">
          <SectionBadge icon={HelpCircle} label="Common Questions" />
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10 md:mb-12">
          Frequently <span className="text-[#0059FF]">Asked Questions</span>
        </h2>

        {/* FAQ Container */}
        <div className="flex flex-col gap-3 bg-[#121423] rounded-2xl p-6 sm:p-8 md:p-10">

          {FAQItems.map((faq, index: number) => (
            <div
              key={index}
              className="rounded-xl border border-white/10 
              bg-[#121423] backdrop-blur-md overflow-hidden"
            >

              {/* Question */}
              <button
                onClick={() => setOpen(open === index ? null : index)}
                className="flex items-center justify-between w-full px-4 sm:px-5 py-4 text-left"
              >

                <span className="text-[13px] sm:text-sm md:text-base font-semibold text-white pr-3">
                  {faq.qsn}
                </span>

                <span
                  className="flex items-center justify-center 
                  w-6 h-6 text-white text-sm font-bold shrink-0"
                >
                  {open === index ? "−" : "+"}
                </span>

              </button>

              {/* Answer */}
              <AnimatePresence>

                {open === index && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >

                    <p className="px-4 sm:px-5 pb-4 text-[13px] sm:text-sm text-gray-400 leading-relaxed">
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