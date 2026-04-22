"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, Zap, Star } from "lucide-react";
import Link from "next/link";
import { PRICING_DATA, PricingPackage } from "@/lib/pricing";
import Container from "@/components/ui/Container";

export default function PricingSection() {
  const [activeTab, setActiveTab] = useState(PRICING_DATA[0].id);

  const activeCategory = PRICING_DATA.find((cat) => cat.id === activeTab);

  return (
    <section className="pt-10 pb-24 bg-k-bg overflow-hidden">
      <Container>
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#081ff0]/5 border border-[#081ff0]/10 text-[#081ff0] text-[10px] font-black uppercase tracking-widest mb-6"
          >
            <Zap size={14} /> Transparent Pricing
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-slate-950 mb-6 tracking-tight"
          >
            Elite Services. <span className="text-[#081ff0]">Clear Value.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-lg md:text-xl font-medium"
          >
            Individual costing for all services, organized to help you scale efficiently.
          </motion.p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-16 p-1.5 bg-slate-50 border border-slate-200 rounded-2xl w-fit mx-auto">
          {PRICING_DATA.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`relative px-8 py-3 rounded-xl text-[13px] font-black uppercase tracking-widest transition-all duration-300 ${
                activeTab === category.id
                  ? "text-white"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              {activeTab === category.id && (
                <motion.div
                  layoutId="active-pricing-tab"
                  className="absolute inset-0 bg-[#081ff0] rounded-xl shadow-lg shadow-[#081ff0]/20"
                  transition={{ type: "spring", duration: 0.6, bounce: 0.2 }}
                />
              )}
              <span className="relative z-10">{category.label}</span>
            </button>
          ))}
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          <AnimatePresence mode="wait">
            {activeCategory?.packages.map((pkg, idx) => (
              <PricingCard key={pkg.id} pkg={pkg} index={idx} />
            ))}
          </AnimatePresence>
        </div>

        {/* Custom Inquiry Footer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 p-10 rounded-[2rem] bg-slate-50 border border-slate-200 text-center max-w-4xl mx-auto"
        >
          <h3 className="text-2xl font-black text-slate-950 mb-4 uppercase">Need a custom enterprise solution?</h3>
          <p className="text-slate-500 mb-8 max-w-2xl mx-auto">
            Our Elite packages are fully customizable to meet global scaling requirements. Let's architect a bespoke strategy for your brand.
          </p>
          <Link href="/contact">
            <button className="px-10 py-4 bg-slate-950 text-white rounded-full font-black uppercase tracking-widest hover:bg-[#081ff0] transition-colors duration-300 shadow-xl">
              Get Custom Quote
            </button>
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}

function PricingCard({ pkg, index }: { pkg: PricingPackage; index: number }) {
  return (
    <motion.div
      key={pkg.id}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className={`relative flex flex-col p-8 rounded-[2rem] bg-white border transition-all duration-500 group ${
        pkg.popular 
          ? "border-[#081ff0] shadow-2xl shadow-[#081ff0]/10 scale-[1.02] z-10" 
          : "border-slate-200 hover:border-[#081ff0]/30 hover:shadow-xl"
      }`}
    >
      {pkg.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-[#081ff0] text-white text-[10px] font-black uppercase tracking-widest rounded-full flex items-center gap-1.5 shadow-lg">
          <Star size={12} fill="currentColor" /> Most Popular
        </div>
      )}

      <div className="mb-8">
        <h3 className="text-2xl font-black text-slate-950 uppercase tracking-tighter mb-2 group-hover:text-[#081ff0] transition-colors">
          {pkg.name}
        </h3>
        {pkg.description && (
          <p className="text-slate-500 text-[13px] font-medium leading-relaxed">
            {pkg.description}
          </p>
        )}
      </div>

      <div className="mb-8">
        <div className="flex items-baseline gap-1">
          <span className="text-5xl font-black text-slate-950 tracking-tighter">{pkg.price}</span>
        </div>
      </div>

      <div className="flex-grow space-y-4 mb-10">
        {pkg.features.map((feature, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="mt-1 flex-shrink-0 w-4 h-4 rounded-full bg-[#081ff0]/10 flex items-center justify-center">
              <Check size={10} className="text-[#081ff0]" strokeWidth={3} />
            </div>
            <span className="text-slate-700 text-sm font-medium leading-tight">
              {feature}
            </span>
          </div>
        ))}
      </div>

      <Link href="/contact" className="mt-auto">
        <button 
          className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all duration-300 ${
            pkg.popular
              ? "bg-[#081ff0] text-white shadow-lg shadow-[#081ff0]/20 hover:scale-[0.98]"
              : "bg-slate-50 text-slate-950 hover:bg-slate-950 hover:text-white"
          }`}
        >
          Select Package <ArrowRight size={14} />
        </button>
      </Link>
    </motion.div>
  );
}
