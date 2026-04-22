"use client";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import { submitContactForm } from "@/app/actions/contact";
import { CheckCircle2, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button 
      type="submit" 
      disabled={pending}
      className={`w-full py-5 mt-2 bg-[#081FF0] text-white font-bold rounded-xl hover:shadow-[0_0_20px_rgba(8,31,240,0.3)] transition-all tracking-widest uppercase flex items-center justify-center gap-3 ${pending ? "opacity-70 cursor-not-allowed" : "hover:scale-[1.01] active:scale-[0.99]"}`}
    >
      {pending ? (
        <>
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          SENDING...
        </>
      ) : (
        "Send Message"
      )}
    </button>
  );
}

export default function ContactFormSection() {
  const [state, formAction] = useActionState(submitContactForm, { success: false });

  return (
    <Section className="bg-k-bg border-t border-k-border py-20 relative overflow-hidden" id="contact-form">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-k-primary/10 blur-[120px] rounded-full pointer-events-none" />
      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="text-k-text-muted/50 text-xs font-bold tracking-widest uppercase mb-2">CONTACT FORM:</div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 text-k-text">TELL US ABOUT YOUR PROJECT</h2>
            <p className="text-k-text-muted text-lg">We will get back to you within 24 hours.</p>
          </div>

          <div className="relative">
            {/* Success Message - Hidden by default */}
            <div className={`${state?.success ? "block" : "hidden"}`}>
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={state?.success ? { opacity: 1, scale: 1 } : {}}
                className="backdrop-blur-xl bg-k-card-bg/80 p-10 sm:p-16 rounded-2xl border border-k-primary/30 shadow-2xl text-center"
              >
                <div className="w-20 h-20 bg-k-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
                  <CheckCircle2 className="text-k-primary" size={48} />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-k-text mb-4" style={{ fontFamily: "var(--font-lato)" }}>Message Received!</h3>
                <p className="text-k-text-muted mb-8 text-lg" style={{ fontFamily: "var(--font-lato)" }}>
                  Thank you for reaching out. A strategist from our team will review your brief and contact you shortly.
                </p>
                <button 
                  onClick={() => window.location.reload()}
                  className="text-k-primary font-bold tracking-widest uppercase text-sm hover:underline"
                >
                  Send another message
                </button>
              </motion.div>
            </div>

            {/* Contact Form - Always in HTML, Hidden on Success */}
            <form 
              action={formAction}
              className={`flex flex-col gap-6 backdrop-blur-xl bg-k-card-bg/80 p-6 sm:p-10 rounded-2xl border border-k-border shadow-2xl dark:shadow-none ${state?.success ? "hidden" : "flex"}`}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <input name="name" type="text" required placeholder="NAME" className="w-full p-4 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:border-[#081ff0] focus:ring-1 focus:ring-[#081ff0] transition-all text-k-text placeholder-slate-400 tracking-wide text-sm font-semibold shadow-sm hover:border-slate-400" />
                <input name="email" type="email" required placeholder="EMAIL" className="w-full p-4 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:border-[#081ff0] focus:ring-1 focus:ring-[#081ff0] transition-all text-k-text placeholder-slate-400 tracking-wide text-sm font-semibold shadow-sm hover:border-slate-400" />
              </div>
              <input name="company" type="text" required placeholder="COMPANY OR PROJECT NAME" className="w-full p-4 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:border-[#081ff0] focus:ring-1 focus:ring-[#081ff0] transition-all text-k-text placeholder-slate-400 tracking-wide text-sm font-semibold shadow-sm hover:border-slate-400" />
              <textarea name="message" required placeholder="WHAT ARE YOU BUILDING?" rows={4} className="w-full p-4 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:border-[#081ff0] focus:ring-1 focus:ring-[#081ff0] transition-all text-k-text placeholder-slate-400 resize-none tracking-wide text-sm font-semibold shadow-sm hover:border-slate-400"></textarea>
              <input name="services" type="text" placeholder="SERVICES NEEDED" className="w-full p-4 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:border-[#081ff0] focus:ring-1 focus:ring-[#081ff0] transition-all text-k-text placeholder-slate-400 tracking-wide text-sm font-semibold shadow-sm hover:border-slate-400" />
              
              <SubmitButton />
            </form>
          </div>


          <div className="mt-12 text-center">
            <p className="text-k-text-muted">
              Prefer email? <a href="mailto:hello@kinuit.com" className="text-k-primary hover:underline font-medium">hello@kinuit.com</a>
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}

