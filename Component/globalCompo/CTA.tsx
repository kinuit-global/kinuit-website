"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useActionState, useEffect, useRef } from "react";
import { subscribeToNewsletter } from "@/app/actions/newsletter";
import toast from "react-hot-toast";
import { CheckCircle2, Loader2, Send } from "lucide-react";

export default function CTASection() {
  const [state, formAction, isPending] = useActionState(subscribeToNewsletter, { success: false });
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      toast.success("Welcome to the community!");
      formRef.current?.reset();
    } else if (state.error) {
      toast.error(state.error);
    }
  }, [state]);

  return (
    <section className="relative py-16 px-6 lg:px-8 bg-k-bg flex justify-center">

      {/* Glow background */}
      <div className="absolute inset-0 flex justify-center pointer-events-none">
        <div className="w-[500px] sm:w-[700px] md:w-[900px] h-[180px] sm:h-[200px] bg-k-primary/20 blur-[120px]" />
      </div>

      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative max-w-7xl w-full rounded-2xl
        bg-k-primary p-6 sm:p-8 md:p-10
        flex flex-col md:flex-row
        items-start md:items-center justify-between gap-8 shadow-2xl dark:shadow-none"
      >

        {/* LEFT SIDE */}
        <div className="text-left md:text-left flex-1">

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight text-white max-w-[500px]">
            Turn Content Into Your Strongest Growth Channel
          </h2>

          <p className="mt-4 text-white/80 text-base max-w-[450px]">
            Partner with Kinuit to create strategy-led content built for visibility, trust, and conversions.
          </p>

          <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 px-6 py-3 rounded-full
              bg-white/10 border border-white/20
              text-sm flex items-center gap-2
              hover:bg-white/20 transition
              md:mx-0 text-white"
            >
              Work With Us
              <Image
                src="/fwd.png"
                alt="arrw-img"
                width={15}
                height={10}
                className="object-contain brightness-0 invert"
              />
            </motion.button>
          </Link>

        </div>

        {/* RIGHT SIDE */}
        <motion.div
          whileHover={{ y: -4 }}
          className="bg-k-bg rounded-xl p-6 md:p-8 w-full max-w-md text-k-text border border-k-border shadow-lg"
        >

          {/* Badge */}
          <div className="inline-block px-4 py-1 mb-4 rounded-full text-xs bg-k-primary/10 text-k-primary border border-k-primary/20">
            News Letter
          </div>

          <h3 className="text-xl sm:text-2xl font-semibold mb-3 text-k-text">
            Stay Updated
          </h3>

          <p className="text-k-text-muted text-sm mb-6">
            Get digital strategy insights, case studies, and tips
            delivered to your inbox monthly
          </p>

          {/* Input */}
          {state.success ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 items-center gap-3"
            >
              <CheckCircle2 className="text-blue-500 shrink-0" size={20} />
              <p className="text-xs font-bold uppercase tracking-widest text-blue-500">You're subscribed!</p>
            </motion.div>
          ) : (
            <form 
              ref={formRef}
              action={formAction}
              className="flex flex-col sm:flex-row gap-3"
            >
              <div className="flex items-center gap-2 bg-k-card-bg px-4 py-3 rounded-lg flex-1 border border-k-border group focus-within:border-blue-500/50 transition-all">
                <Mail size={16} className="text-k-text-muted/40 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Your Email Address"
                  className="bg-transparent outline-none text-sm flex-1 text-k-text placeholder:text-k-text-muted/40 font-medium"
                />
              </div>

              <button 
                type="submit"
                disabled={isPending}
                className="bg-k-primary px-6 py-3 rounded-lg text-xs font-black uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition text-white whitespace-nowrap disabled:opacity-50 flex items-center justify-center gap-2 min-w-[100px]"
              >
                {isPending ? <Loader2 className="animate-spin" size={16} /> : "Submit"}
              </button>
            </form>
          )}

        </motion.div>

      </motion.div>

    </section>
  );
}