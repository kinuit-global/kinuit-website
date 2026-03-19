"use client";
import { ButtonHTMLAttributes } from "react";
import { motion } from "framer-motion";

export default function Button({ children, className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <motion.button
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      className={`px-5 py-2.5 bg-[#081FF0] text-white text-sm font-semibold rounded-xl shadow-lg shadow-[#5BC4E0]/20 hover:shadow-[#5BC4E0]/40 transition-all duration-300 ${className}`}
      {...props as any}
    >
      {children}
    </motion.button>
  );
}
