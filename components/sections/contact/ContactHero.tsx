"use client";
import Container from "@/components/ui/Container";
import Link from "next/link";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { motion } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

export default function ContactHero() {
  return (
    <section className="bg-k-bg pt-40 pb-16 md:pt-48 md:pb-24 border-b border-k-border relative overflow-hidden">
      
      {/* Decorative Image Backdrop */}
      <div className="absolute top-0 right-0 w-full md:w-1/2 h-full opacity-10 md:opacity-20 pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80" 
          alt="Abstract Communication" 
          className="w-full h-full object-cover mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-linear-to-r from-k-bg via-k-bg/80 to-transparent" />
      </div>

      <Container className="relative z-10">
        <div className="max-w-3xl flex flex-col items-start text-left">
          <motion.div {...fadeUp} transition={{ delay: 0.1 }}>
            <Breadcrumb paths={[{ name: "Contact Us" }]} />
          </motion.div>

          <motion.div {...fadeUp} transition={{ delay: 0.2 }} className="text-k-primary font-black tracking-widest text-sm mb-6 uppercase">GET IN TOUCH</motion.div>
          <motion.h1 {...fadeUp} transition={{ delay: 0.3 }} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-8 text-k-text leading-tight tracking-tight">
            Your biggest move starts here.
          </motion.h1>
          <motion.p {...fadeUp} transition={{ delay: 0.4 }} className="text-k-text-muted text-sm sm:text-base md:text-lg font-light leading-[1.8] max-w-2xl">
            No long forms. No sales pitch. Just a straightforward conversation about what you are building and how we can help.
          </motion.p>
        </div>
      </Container>
    </section>
  );
}
