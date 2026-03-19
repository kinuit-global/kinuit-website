"use client";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { ServiceDetail, createSlug } from "@/lib/service";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

export default function ServiceDetailView({ 
  service,
  parentCategory,
  relatedServices
}: { 
  service: ServiceDetail,
  parentCategory?: { name: string, href: string }
  relatedServices?: string[]
}) {
  return (
    <>
      <section className="bg-gradient-to-b from-[#050D1A] to-k-bg pt-40 pb-20 md:pt-48 md:pb-28 border-b border-white/5">
        <Container>
          <div className="max-w-4xl flex flex-col items-start text-left">
            <motion.div {...fadeUp} transition={{ delay: 0.1 }}>
              <Breadcrumb paths={[
                { name: "Services", href: "/services" }, 
                ...(parentCategory ? [parentCategory] : []),
                { name: service.title }
              ]} />
            </motion.div>

            <motion.div {...fadeUp} transition={{ delay: 0.2 }} className="text-[#0059FF] font-black tracking-widest text-sm mb-6 uppercase">
              {service.category}
            </motion.div>
            
            <motion.h1 {...fadeUp} transition={{ delay: 0.3 }} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-8 text-white leading-tight tracking-tight">
              {service.title}
            </motion.h1>
          </div>
        </Container>
      </section>

      <Section className="bg-k-bg py-20 md:py-32">
        <Container>
           <motion.div 
             initial={{ opacity: 0, y: 40 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.4 }}
             className="w-full aspect-video md:aspect-[21/9] rounded-[2rem] overflow-hidden mb-20 shadow-2xl border border-white/10"
           >
             <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
           </motion.div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="space-y-8"
              >
                 <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">Overview</h2>
                 <p className="text-white/70 text-lg leading-relaxed">{service.description}</p>
                 
                 <h3 className="text-xl font-bold text-white mt-12 mb-6 tracking-wide underline underline-offset-8 decoration-[#0059FF]/30">Key Benefits</h3>
                 <div className="grid grid-cols-1 gap-4 mb-12">
                   {service.benefits.map((benefit, i) => (
                     <div
                       key={i}
                       className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5"
                     >
                       <div className="w-2 h-2 rounded-full bg-[#0059FF]/50" />
                       <span className="text-white/60 text-lg font-medium">{benefit}</span>
                     </div>
                   ))}
                 </div>

                 {relatedServices && relatedServices.length > 0 && (
                   <>
                     <h3 className="text-xl font-bold text-white mt-12 mb-6 tracking-wide underline underline-offset-8 decoration-[#0059FF]/30">
                       Other {service.category} Services
                     </h3>
                     <div className="grid grid-cols-1 gap-4">
                       {relatedServices.map((related, i) => (
                         <Link
                           key={i}
                           href={`${parentCategory?.href}/${createSlug(related)}`}
                           className={`group flex items-center justify-between p-4 rounded-xl border transition-all duration-300 ${
                             createSlug(related) === service.slug
                               ? "bg-[#0059FF]/20 border-[#0059FF]/50 pointer-events-none"
                               : "bg-white/[0.03] border-white/10 hover:border-[#0059FF]/50 hover:bg-[#0059FF]/10"
                           }`}
                         >
                           <div className="flex items-center gap-4">
                             <div className={`w-2 h-2 rounded-full ${createSlug(related) === service.slug ? "bg-[#0059FF]" : "bg-white/20"} group-hover:scale-125 transition-transform`} />
                             <span className={`text-lg transition-colors font-medium ${createSlug(related) === service.slug ? "text-white" : "text-white/80 group-hover:text-white"}`}>
                               {related}
                             </span>
                           </div>
                           {createSlug(related) !== service.slug && (
                             <ArrowUpRight size={18} className="text-[#0059FF] opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                           )}
                         </Link>
                       ))}
                     </div>
                   </>
                 )}

                 {!parentCategory && (
                    <>
                      <h3 className="text-xl font-bold text-white mt-12 mb-6 tracking-wide underline underline-offset-8 decoration-[#0059FF]/30">Expertise In</h3>
                      <div className="grid grid-cols-1 gap-4">
                        {service.benefits.map((benefit, i) => (
                          <Link
                            key={i}
                            href={`/services/${service.slug}/${createSlug(benefit)}`}
                            className="group flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#0059FF]/50 hover:bg-[#0059FF]/10 transition-all duration-300"
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-2 h-2 rounded-full bg-[#0059FF] group-hover:scale-125 transition-transform" />
                              <span className="text-white/80 group-hover:text-white text-lg transition-colors font-medium">{benefit}</span>
                            </div>
                            <ArrowUpRight size={18} className="text-[#0059FF] opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                          </Link>
                        ))}
                      </div>
                    </>
                 )}
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
                className="p-8 md:p-12 rounded-[2rem] bg-white/[0.02] border border-white/10"
              >
                 <h2 className="text-2xl font-bold tracking-tight text-white mb-10">Our Implementation Process</h2>
                 <div className="space-y-8">
                   {service.process.map((step, i) => (
                     <div key={i} className="flex flex-row gap-6 items-start">
                       <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 bg-white/5 text-[#0059FF] font-bold text-sm shrink-0">
                         {i + 1}
                       </div>
                       <div className="pt-2 text-white font-medium text-lg w-full pb-8 border-b border-white/5 last:border-0 last:pb-0">
                         {step}
                       </div>
                     </div>
                   ))}
                 </div>
              </motion.div>
           </div>
        </Container>
      </Section>
    </>
  );
}
