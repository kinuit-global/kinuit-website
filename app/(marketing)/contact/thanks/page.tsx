"use client";

import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-[#050D1A] text-white flex items-center justify-center pt-20 pb-20">
      <Section className="w-full">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-[#081FF0]/20 border border-[#081FF0]/40 mb-10"
            >
              <CheckCircle2 size={48} className="text-[#5BC4E0]" />
            </motion.div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6"
            >
              THANK YOU FOR <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5BC4E0] to-[#081FF0]">REACHING OUT</span>
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-white/60 text-xl leading-relaxed mb-12"
            >
              We've received your project details and our team will get back to you within 24 hours. Let's build something incredible together.
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <Link href="/">
                <button className="px-8 py-4 bg-white text-[#050D1A] font-bold rounded-xl hover:bg-white/90 transition-all flex items-center gap-2 group tracking-widest uppercase">
                  Return Home
                </button>
              </Link>
              <Link href="/work">
                <button className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-all flex items-center gap-2 group tracking-widest uppercase">
                  Explore Our Work
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </motion.div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
