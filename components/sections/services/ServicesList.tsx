import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import Link from "next/link";
import { createSlug } from "@/lib/service";

const servicesData = [
  {
    id: "01",
    title: "BUILD",
    heading: "We build products that work and brands that last.",
    description: "We build products that work and brands that last. From your first website to a full-scale AI product, we bring your vision to life with clean code, smart architecture, and a relentless focus on performance.",
    tags: ["Custom websites", "Mobile apps", "AI products", "Web3", "E-commerce", "ERP systems"],
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80"
  },
  {
    id: "02",
    title: "DESIGN",
    heading: "Brands that mean something before anyone reads a word.",
    description: "Brands that mean something before anyone reads a word. We design with intention. Every visual choice — from the logo to the layout — is rooted in your brand's story and built to make an impression that lasts.",
    tags: ["Brand identity", "UX / UI", "Motion graphics", "CGI", "Photography", "Social creative", "Brand operations"],
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1600&q=80"
  },
  {
    id: "03",
    title: "GROW",
    heading: "Marketing that earns attention and converts it.",
    description: "Marketing that earns attention and converts it. We build marketing systems that compound over time — organic reach, paid performance, and community, all working together toward one goal: sustainable growth.",
    tags: ["SEO", "Paid ads", "Social media", "Crypto marketing", "PR", "Email marketing", "Community management"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80"
  },
  {
    id: "04",
    title: "PLAN",
    heading: "The thinking that makes everything else work harder.",
    description: "The thinking that makes everything else work harder. Strategy is not a document. It is a decision-making framework that shapes everything your brand does. We build it with you, then help you execute it.",
    tags: ["Growth strategy", "Pitch decks", "Tokenomics", "Investor marketing", "Go-to-market strategy", "HubSpot / Salesforce", "Crisis communications"],
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80"
  }
];

export default function ServicesList() {
  return (
    <Section className="bg-k-bg border-t border-white/5 py-12 md:py-24">
      <Container>
        <div className="space-y-24 md:space-y-32">
          {servicesData.map((svc, index) => {
            const isEven = index % 2 !== 0;
            return (
              <div key={svc.id} className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center ${isEven ? 'lg:flex-row-reverse' : ''}`}>

                {/* Image Placeholder */}
                <div className={`lg:col-span-5 w-full aspect-square rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative group ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="absolute inset-0 bg-[#0059FF]/10 mix-blend-overlay z-10 group-hover:bg-transparent transition-colors duration-500" />
                  <img
                    src={svc.image}
                    alt={svc.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Text Content */}
                <div className={`lg:col-span-7 flex flex-col pt-2 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-white/40 font-mono text-xl">{svc.id}</div>
                    <div className="w-12 h-[1px] bg-white/20"></div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0059FF] uppercase tracking-wider">
                      {svc.title}
                    </h2>
                  </div>

                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight mb-6">
                    {svc.heading}
                  </h3>
                  <p className="text-white/70 text-lg leading-relaxed mb-8">
                    {svc.description}
                  </p>

                  <div className="flex flex-wrap gap-2 text-sm">
                    {svc.tags.map((tag) => (
                      <Link
                        href={`/services/${createSlug(tag)}`}
                        key={tag}
                        className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-white/80 hover:bg-[#0059FF] hover:text-white transition-all cursor-pointer"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
