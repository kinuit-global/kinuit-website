"use client";
import { ButtonHTMLAttributes } from "react";
import { motion } from "framer-motion";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export default function Button({ children, className = "", variant = "primary", ...props }: ButtonProps) {
  const variantStyles = {
    primary: "bg-k-primary text-white border-transparent shadow-lg shadow-k-primary/20 hover:bg-blue-600",
    secondary: "bg-transparent text-k-text border-k-border hover:border-k-primary/20 hover:bg-k-primary/5 border backdrop-blur-sm shadow-none",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`inline-flex items-center justify-center px-6 py-3 text-sm font-semibold rounded-full transition-all duration-300 ${variantStyles[variant]} ${className}`}
      {...props as any}
    >
      {children}
    </motion.button>
  );
}
