"use client";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { Project } from "@/lib/projects";
import { motion } from "framer-motion";
import SectionBadge from "@/components/ui/SectionBadge";
import { Star } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

export default function ProjectDetail({ project }: { project: Project }) {
  return (
    <>
      <section className="bg-linear-to-b from-[#050D1A] to-k-bg pt-40 pb-20 md:pt-48 md:pb-28 border-b border-white/5">
        <Container>
          <div className="max-w-4xl flex flex-col items-start text-left">
            <motion.div {...fadeUp} transition={{ delay: 0.1 }}>
              <Breadcrumb paths={[{ name: "Our Work", href: "/work" }, { name: project.title }]} />
            </motion.div>

            <SectionBadge icon={Star} label={project.tag} />
            
            <motion.h1 {...fadeUp} transition={{ delay: 0.3 }} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-8 text-white leading-tight tracking-tight">
              {project.title}
            </motion.h1>
          </div>
        </Container>
      </section>

      <Section className="bg-k-bg py-20 md:py-32">
        <Container>
           <motion.div 
             initial={{ opacity: 0, y: 40 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.5 }}
             className="w-full aspect-video rounded-4xl overflow-hidden mb-20 shadow-2xl border border-white/10"
           >
             <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
           </motion.div>

           <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-24">
              <div className="flex flex-col gap-10">
                 <div>
                   <h3 className="text-white/50 text-xs font-bold tracking-widest uppercase mb-3">Client</h3>
                   <span className="text-white text-xl font-medium">{project.client}</span>
                 </div>
                 <div>
                   <h3 className="text-white/50 text-xs font-bold tracking-widest uppercase mb-3">Year</h3>
                   <span className="text-white text-xl font-medium">{project.year}</span>
                 </div>
                 <div>
                   <h3 className="text-white/50 text-xs font-bold tracking-widest uppercase mb-3">Services Delivered</h3>
                   <div className="flex flex-wrap gap-2 mt-4">
                     {project.services.map(s => (
                       <span key={s} className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-white/80 text-sm tracking-wide">
                         {s}
                       </span>
                     ))}
                   </div>
                 </div>
              </div>

              <div className="lg:col-span-2 space-y-16">
                 <div>
                   <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-6">The Challenge</h3>
                   <p className="text-white/70 text-lg leading-relaxed">{project.challenge}</p>
                 </div>
                 <div>
                   <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-6">Our Solution</h3>
                   <p className="text-white/70 text-lg leading-relaxed">{project.solution}</p>
                 </div>
                 <div>
                   <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-6">The Outcome</h3>
                   <div className="p-8 md:p-10 rounded-2xl bg-[#0059FF]/10 border border-[#0059FF]/20 shadow-[0_0_30px_rgba(0,89,255,0.1)] relative overflow-hidden">
                     <div className="absolute top-0 right-0 w-64 h-64 bg-[#0059FF]/20 blur-[100px] rounded-full pointer-events-none" />
                     <p className="text-white text-xl md:text-2xl font-medium leading-snug relative z-10">{project.outcome}</p>
                   </div>
                 </div>
              </div>
           </div>
        </Container>
      </Section>
    </>
  );
}
