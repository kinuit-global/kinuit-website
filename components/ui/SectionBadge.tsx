"use client";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface SectionBadgeProps {
  icon?: LucideIcon;
  label: string;
}

export default function SectionBadge({ icon: Icon, label }: SectionBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="inline-flex items-center gap-2.5 px-4 py-2 bg-white/5 rounded-full border border-white/10 backdrop-blur-md mb-8 group hover:bg-white/10 transition-colors duration-300"
    >
      {Icon && <Icon size={14} className="text-[#0059FF] group-hover:scale-110 transition-transform duration-300" />}
      <span className="text-white/70 text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase">
        {label}
      </span>
    </motion.div>
  );
}
