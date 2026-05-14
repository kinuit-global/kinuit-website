"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What services does Kinuit offer?",
    answer: "Kinuit is a full-service agency providing comprehensive digital solutions across four core pillars: Plan (Strategy & Research), Design (Branding & UX/UI), Build (Web & Mobile Development), and Grow (Marketing & Analytics). We handle everything from initial concept to market expansion."
  },
  {
    question: "How does the 'Plan, Design, Build, Grow' process work?",
    answer: "Our end-to-end framework ensures consistency and quality. We start by Planning your strategy, then Designing a premium brand and user experience. Next, we Build high-performance products using modern tech stacks, and finally, we help you Grow through data-driven marketing and continuous optimization."
  },
  {
    question: "What makes Kinuit different from other digital agencies?",
    answer: "We combine the agility of a startup with the strategic depth of a global consultancy. Our focus is on 'Ambitious Brands'—we don't just build websites; we engineer digital ecosystems that drive real business outcomes through a blend of premium aesthetics and deep technical expertise."
  },
  {
    question: "How long does a typical project take?",
    answer: "Project timelines vary depending on complexity. A comprehensive branding and website project typically takes 8-12 weeks, while more complex custom product builds (MVP development) can range from 3 to 6 months. We prioritize speed-to-market without compromising on elite quality."
  },
  {
    question: "Do you work with startups or established enterprises?",
    answer: "Both. We help startups find their voice and build their first products, and we help established enterprises modernize their legacy systems and re-engage their audience with fresh, high-end digital experiences."
  },
  {
    question: "How do I get started with Kinuit?",
    answer: "The best way to start is by booking a strategy call. We'll discuss your goals, current challenges, and how our expertise can help you scale. Simply click the 'Get Started' button at the bottom of the page or in the navigation menu."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // Schema.org FAQPage data for AEO/GEO optimization
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section className="py-24 px-6 bg-slate-50/50" id="faq">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <div className="w-8 h-8 rounded-full bg-[#081ff0]/10 flex items-center justify-center text-[#081ff0]">
              <HelpCircle size={18} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#081ff0]">Common Queries</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-slate-900 mb-4"
          >
            Everything you <span className="text-[#081ff0]">need to know</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-slate-500 font-medium max-w-xl mx-auto uppercase tracking-wide text-xs"
          >
            Clear answers for ambitious brands looking to build the future of digital.
          </motion.p>
        </div>

        <div className="space-y-4">
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
                <div className={`mt-1 shrink-0 transition-colors duration-300 ${openIndex === index ? 'text-[#081ff0]' : 'text-slate-300'}`}>
                  {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                </div>
                <div className="flex-1">
                  <h3 className={`text-base md:text-lg font-bold uppercase tracking-tight transition-colors duration-300 ${openIndex === index ? 'text-[#081ff0]' : 'text-slate-900'}`}>
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
      </div>
    </section>
  );
}
