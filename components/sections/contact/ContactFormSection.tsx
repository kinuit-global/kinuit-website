"use client";
import { useActionState, useState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import { submitContactForm } from "@/app/actions/contact";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { InlineWidget } from "react-calendly";

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
  const [activeTab, setActiveTab] = useState<"message" | "schedule">("message");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      if (searchParams.get("tab") === "schedule" || window.location.hash === "#schedule") {
        setActiveTab("schedule");
        setTimeout(() => {
          const element = document.getElementById("contact-form");
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      }
    }
  }, []);

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

          {/* Premium Segmented Controls / Tabs */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex p-1 bg-k-card-bg/60 backdrop-blur-md border border-k-border rounded-2xl shadow-xs relative">
              <button
                type="button"
                onClick={() => setActiveTab("message")}
                className={`relative px-6 py-3 text-xs md:text-sm font-bold tracking-wider uppercase rounded-xl transition-all duration-300 cursor-pointer ${
                  activeTab === "message"
                    ? "bg-[#081FF0] text-white shadow-md shadow-[#081ff0]/20 scale-[1.02]"
                    : "text-k-text-muted hover:text-k-text"
                }`}
              >
                Send a Message
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("schedule")}
                className={`relative px-6 py-3 text-xs md:text-sm font-bold tracking-wider uppercase rounded-xl transition-all duration-300 cursor-pointer ${
                  activeTab === "schedule"
                    ? "bg-[#081FF0] text-white shadow-md shadow-[#081ff0]/20 scale-[1.02]"
                    : "text-k-text-muted hover:text-k-text"
                }`}
              >
                Book a Strategy Call
              </button>
            </div>
          </div>

          <div className="relative min-h-[650px]">
            {activeTab === "message" ? (
              <motion.div
                key="message-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
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
              </motion.div>
            ) : (
              <motion.div
                key="schedule-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="backdrop-blur-xl bg-k-card-bg/80 p-2 sm:p-4 rounded-2xl border border-k-border shadow-2xl dark:shadow-none min-h-[650px] flex flex-col justify-center overflow-hidden"
              >
                {mounted ? (
                  <InlineWidget
                    url={process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/acme-corp"}
                    styles={{
                      height: '650px',
                      width: '100%',
                    }}
                    pageSettings={{
                      backgroundColor: 'ffffff',
                      hideEventTypeDetails: false,
                      hideLandingPageDetails: false,
                      primaryColor: '081ff0',
                      textColor: '0e1114',
                    }}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center gap-4 py-32">
                    <div className="w-10 h-10 border-4 border-k-primary/30 border-t-k-primary rounded-full animate-spin" />
                    <p className="text-k-text-muted text-sm font-medium tracking-wide">Loading scheduler...</p>
                  </div>
                )}
              </motion.div>
            )}
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

