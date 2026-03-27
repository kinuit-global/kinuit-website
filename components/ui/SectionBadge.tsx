"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionBadgeProps {
  icon?: ReactNode;
  label: string;
}

export default function SectionBadge({ icon, label }: SectionBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="inline-flex items-center gap-2.5 px-4 py-2 bg-k-card-bg rounded-full border border-k-border backdrop-blur-md mb-8 group hover:bg-k-primary/5 transition-colors duration-300 shadow-sm"
    >
      {icon}
      <span className="text-k-text-muted text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase">
        {label}
      </span>
    </motion.div>
  );
}

