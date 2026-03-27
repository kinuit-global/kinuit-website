"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FAQItems } from "@/lib/FAQ";
import { HelpCircle } from "lucide-react";
import SectionBadge from "@/components/ui/SectionBadge";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-16 bg-k-bg text-k-text">

      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <div className="flex justify-center">
          <SectionBadge icon={HelpCircle} label="Common Questions" />
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10 md:mb-12 text-k-text">
          Frequently <span className="text-k-primary">Asked Questions</span>
        </h2>

        {/* FAQ Container */}
        <div className="flex flex-col gap-3 bg-k-card-bg rounded-2xl p-6 sm:p-8 md:p-10 border border-k-border shadow-sm">

          {FAQItems.map((faq, index: number) => (
            <div
              key={index}
              className="rounded-xl border border-k-border 
              bg-k-bg/50 backdrop-blur-md overflow-hidden"
            >

              {/* Question */}
              <button
                onClick={() => setOpen(open === index ? null : index)}
                className="flex items-center justify-between w-full px-4 sm:px-5 py-4 text-left"
              >

                <span className="text-[13px] sm:text-sm md:text-base font-semibold text-k-text pr-3">
                  {faq.qsn}
                </span>

                <span
                  className="flex items-center justify-center 
                  w-6 h-6 text-k-text text-sm font-bold shrink-0"
                >
                  {open === index ? "−" : "+"}
                </span>

              </button>

              {/* Answer */}
              <motion.div
                initial={false}
                animate={{ 
                  height: open === index ? "auto" : 0,
                  opacity: open === index ? 1 : 0
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <p className="px-4 sm:px-5 pb-4 text-[13px] sm:text-sm text-k-text-muted leading-relaxed">
                  {faq.answ}
                </p>
              </motion.div>


            </div>
          ))}

        </div>

      </div>

    </section>
  );
}