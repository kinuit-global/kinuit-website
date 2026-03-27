import { FAQItems } from "@/lib/FAQ";
import { HelpCircle } from "lucide-react";
import SectionBadge from "@/components/ui/SectionBadge";

export default function FAQ() {
  return (
    <section className="py-24 bg-k-bg text-k-text border-y border-k-border" id="faq">
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": FAQItems.map((item) => ({
              "@type": "Question",
              "name": item.qsn,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answ
              }
            }))
          })
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-center">
          <SectionBadge icon={<HelpCircle size={14} className="text-k-primary group-hover:scale-110 transition-transform duration-300" />} label="Common Questions" />
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-center mb-16 text-k-text uppercase tracking-tight">
          Frequently <span className="text-k-primary">Asked Questions</span>
        </h2>

        <div className="max-w-3xl mx-auto flex flex-col gap-4">
          {FAQItems.map((faq, index: number) => (
            <details
              key={index}
              className="group rounded-2xl border border-k-border bg-k-card-bg/30 backdrop-blur-md overflow-hidden transition-all duration-300 hover:border-k-primary/30"
            >
              <summary className="flex items-center justify-between w-full px-6 py-5 text-left cursor-pointer list-none outline-none focus:bg-k-primary/5">
                <span className="text-base md:text-lg font-bold text-k-text pr-6 tracking-tight">
                  {faq.qsn}
                </span>
                <span className="flex items-center justify-center w-8 h-8 rounded-full border border-k-border text-k-text group-open:rotate-45 transition-transform duration-300">
                  <span className="text-lg font-light">+</span>
                </span>
              </summary>
              <div className="px-6 pb-6 pt-2">
                <p className="text-sm md:text-base text-k-text-muted leading-relaxed font-light">
                  {faq.answ}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>

    </section>
  );
}
