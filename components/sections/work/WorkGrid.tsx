import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/projects";

export default function WorkGrid() {
  return (
    <Section className="bg-k-bg border-t border-k-border py-20 md:py-32">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-x-16 md:gap-y-24">
          {projects.map((project, index) => {
            // Apply a staggered masonry-style offset to the right column items
            const isRightColumn = index % 2 !== 0;
            
            return (
              <Link 
                href={project.slug === "stealth-project" ? "#" : `/work/${project.slug}`}
                key={project.slug} 
                className={`flex flex-col group ${project.slug === "stealth-project" ? 'pointer-events-none' : 'cursor-pointer'} ${isRightColumn ? 'md:mt-32' : ''}`}
              >
                <div className="w-full aspect-4/3 rounded-3xl mb-8 flex items-center justify-center overflow-hidden relative shadow-2xl dark:shadow-none border border-k-border group-hover:border-k-primary/30 transition-colors duration-500">
                  <div className="absolute inset-0 bg-[#0059FF]/20 mix-blend-overlay z-10 group-hover:bg-transparent transition-colors duration-500" />
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                
                <div className="text-[#0059FF] font-semibold tracking-widest text-xs mb-3 uppercase">
                  {project.tag}
                </div>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-k-text mb-6 group-hover:text-k-primary transition-colors duration-300">
                  {project.title}
                </h3>
                
                <div className="text-k-text-muted space-y-3 mb-8 text-sm md:text-base leading-relaxed">
                  <p><strong className="text-k-text">What they needed:</strong> {project.challenge}</p>
                  <p><strong className="text-k-text">What we did:</strong> {project.solution}</p>
                  <p className="text-k-text font-medium mt-4">{project.outcome}</p>
                </div>
                
                <div className="inline-flex items-center gap-2 text-k-text font-medium group-hover:text-k-primary transition-colors mt-2 opacity-80 group-hover:opacity-100 uppercase tracking-widest text-xs">
                  {project.slug === "stealth-project" ? "STEALTH MODE" : <>View Project <ArrowUpRight size={18} className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>}
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
