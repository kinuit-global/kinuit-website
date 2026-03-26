"use client";
import { motion } from "framer-motion";
import { STATS } from "@/lib/stats";


export default function Stats() {
  return (
    <section className="py-12 bg-k-bg text-k-text border-y border-k-border relative z-10">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-3 overflow-hidden divide-y sm:divide-y-0 sm:divide-x divide-k-border"
        >
          {STATS.map((stat) => (
            <div key={stat.label} className="py-6 text-center">
              <div className="text-3xl sm:text-4xl font-bold text-k-text mb-2">
                {stat.value}
              </div>
              <div className="text-xs text-k-text-muted font-medium uppercase tracking-widest">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
