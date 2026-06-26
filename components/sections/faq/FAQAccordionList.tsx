"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionListProps {
  faqs: FAQItem[];
}

export default function FAQAccordionList({ faqs }: FAQAccordionListProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {faqs.map((faq, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          viewport={{ once: true }}
          className="group"
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className={`w-full text-left p-6 md:p-8 rounded-3xl transition-all duration-300 border flex items-start gap-4 ${
              openIndex === index 
                ? 'bg-white border-[#081ff0]/20 shadow-xl shadow-[#081ff0]/5' 
                : 'bg-white/50 border-slate-200 hover:border-[#081ff0]/20'
            }`}
          >
            <div className={`mt-1 shrink-0 transition-colors duration-300 ${openIndex === index ? 'text-k-primary' : 'text-slate-300'}`}>
              {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
            </div>
            <div className="flex-1">
              <h3 className={`text-base md:text-lg font-bold uppercase tracking-tight transition-colors duration-300 ${openIndex === index ? 'text-k-primary' : 'text-slate-900'}`}>
                {faq.question}
              </h3>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0, marginTop: 0 }}
                    animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
                    exit={{ height: 0, opacity: 0, marginTop: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="text-slate-600 text-sm font-medium leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </button>
        </motion.div>
      ))}
    </div>
  );
}
