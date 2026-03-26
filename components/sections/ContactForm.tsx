"use client";

export default function ContactForm() {
  return (
    <section className="py-20 bg-k-bg text-k-text overflow-hidden relative" id="contact">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-k-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-k-text">Let's Get <span className="text-k-primary">Started</span></h2>
          <p className="text-k-text-muted">Fill out the form below and we'll get back to you within 24 hours.</p>
        </div>
        <form className="flex flex-col gap-6 backdrop-blur-xl bg-k-card-bg p-8 rounded-2xl border border-k-border shadow-2xl dark:shadow-none" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <input type="text" placeholder="First Name" className="w-full p-4 bg-k-bg border border-k-border rounded-xl outline-none focus:border-k-primary transition-colors text-k-text placeholder-k-text-muted/40 shadow-inner" />
            <input type="text" placeholder="Last Name" className="w-full p-4 bg-k-bg border border-k-border rounded-xl outline-none focus:border-k-primary transition-colors text-k-text placeholder-k-text-muted/40 shadow-inner" />
          </div>
          <input type="email" placeholder="Email Address" className="w-full p-4 bg-k-bg border border-k-border rounded-xl outline-none focus:border-k-primary transition-colors text-k-text placeholder-k-text-muted/40 shadow-inner" />
          <textarea placeholder="Tell us about your project..." rows={5} className="w-full p-4 bg-k-bg border border-k-border rounded-xl outline-none focus:border-k-primary transition-colors text-k-text placeholder-k-text-muted/40 resize-none shadow-inner"></textarea>
          <button type="submit" className="w-full py-4 bg-k-primary text-white font-bold rounded-xl hover:shadow-[0_0_20px_rgba(30,80,255,0.3)] transition-all active:scale-[0.98]">Send Message</button>
        </form>
      </div>
    </section>
  );
}
