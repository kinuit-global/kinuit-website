"use client";

export default function ContactForm() {
  return (
    <section className="py-20 bg-[#050D1A] text-white overflow-hidden relative" id="contact">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#0059ff]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">Let's Get <span className="text-[#0059FF]">Started</span></h2>
          <p className="text-white/60">Fill out the form below and we'll get back to you within 24 hours.</p>
        </div>
        <form className="flex flex-col gap-6 backdrop-blur-xl bg-white/5 p-8 rounded-2xl border border-white/10 shadow-2xl" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <input type="text" placeholder="First Name" className="w-full p-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-[#0059FF] transition-colors text-white placeholder-white/40 shadow-inner" />
            <input type="text" placeholder="Last Name" className="w-full p-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-[#0059FF] transition-colors text-white placeholder-white/40 shadow-inner" />
          </div>
          <input type="email" placeholder="Email Address" className="w-full p-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-[#0059FF] transition-colors text-white placeholder-white/40 shadow-inner" />
          <textarea placeholder="Tell us about your project..." rows={5} className="w-full p-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-[#0059FF] transition-colors text-white placeholder-white/40 resize-none shadow-inner"></textarea>
          <button type="submit" className="w-full py-4 bg-gradient-to-r from-[#5BC4E0] to-[#2A7FA8] text-white font-bold rounded-xl hover:shadow-[0_0_20px_rgba(91,196,224,0.3)] transition-shadow">Send Message</button>
        </form>
      </div>
    </section>
  );
}
