"use client";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import { submitContactForm } from "@/app/actions/contact";
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button 
      type="submit" 
      disabled={pending}
      className={`w-full py-5 mt-2 bg-[#081FF0] text-white font-bold rounded-xl hover:shadow-[0_0_20px_rgba(91,196,224,0.3)] transition-all tracking-widest uppercase flex items-center justify-center gap-3 ${pending ? "opacity-70 cursor-not-allowed" : "hover:scale-[1.01] active:scale-[0.99]"}`}
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
  return (
    <Section className="bg-k-bg border-t border-white/5 py-20 relative overflow-hidden" id="contact-form">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#0059ff]/10 blur-[120px] rounded-full pointer-events-none" />
      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="text-white/50 text-xs font-bold tracking-widest uppercase mb-2">CONTACT FORM:</div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 text-white">TELL US ABOUT YOUR PROJECT</h2>
            <p className="text-white/70 text-lg">We will get back to you within 24 hours.</p>
          </div>

          <form action={submitContactForm} className="flex flex-col gap-6 backdrop-blur-xl bg-[#050D1A]/80 p-6 sm:p-10 rounded-2xl border border-white/10 shadow-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <input name="name" type="text" required placeholder="NAME" className="w-full p-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-[#0059FF] transition-colors text-white placeholder-white/40 tracking-wide text-sm" />
              <input name="email" type="email" required placeholder="EMAIL" className="w-full p-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-[#0059FF] transition-colors text-white placeholder-white/40 tracking-wide text-sm" />
            </div>
            <input name="company" type="text" required placeholder="COMPANY OR PROJECT NAME" className="w-full p-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-[#0059FF] transition-colors text-white placeholder-white/40 tracking-wide text-sm" />
            <textarea name="message" required placeholder="WHAT ARE YOU BUILDING?" rows={4} className="w-full p-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-[#0059FF] transition-colors text-white placeholder-white/40 resize-none tracking-wide text-sm"></textarea>
            <input name="services" type="text" placeholder="SERVICES NEEDED" className="w-full p-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-[#0059FF] transition-colors text-white placeholder-white/40 tracking-wide text-sm" />
            <SubmitButton />
          </form>

          <div className="mt-12 text-center">
            <p className="text-white/60">
              Prefer email? <a href="mailto:kinuitoffl@gmail.com" className="text-[#0059FF] hover:underline font-medium">kinuitoffl@gmail.com</a>
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
