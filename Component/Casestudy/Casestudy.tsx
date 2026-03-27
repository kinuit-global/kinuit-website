"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/projects";
import { ArrowLeft, ArrowRight, Briefcase } from "lucide-react";
import SectionBadge from "@/components/ui/SectionBadge";

export default function CaseStudies() {
  const [active, setActive] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [itemsPerSlide, setItemsPerSlide] = useState(1);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Determine items per slide based on screen width
  useEffect(() => {
    const handleResize = () => {
      setItemsPerSlide(window.innerWidth < 1024 ? 1 : 2);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Group projects into chunks based on current itemsPerSlide
  const projectChunks = useMemo(() => {
    const chunks = [];
    for (let i = 0; i < projects.length; i += itemsPerSlide) {
      chunks.push(projects.slice(i, i + itemsPerSlide));
    }
    return chunks;
  }, [itemsPerSlide]);

  const nextSlide = useCallback(() => {
    setActive((prev) => (prev + 1) % projectChunks.length);
  }, [projectChunks.length]);

  const prevSlide = useCallback(() => {
    setActive((prev) => (prev - 1 + projectChunks.length) % projectChunks.length);
  }, [projectChunks.length]);

  // Adjust active index when itemsPerSlide changes to avoid index out of bounds
  useEffect(() => {
    setActive((prev) => Math.min(prev, projectChunks.length - 1));
    if (active < 0) setActive(0);
  }, [itemsPerSlide, projectChunks.length, active]);

  // Auto-play logic
  useEffect(() => {
    if (isAutoPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(nextSlide, 5000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isAutoPlaying, nextSlide]);

  const handleInteraction = () => {
    setIsAutoPlaying(false);
  };

  const handleDragEnd = (_: any, info: any) => {
    if (info.offset.x > 50) {
      prevSlide();
      handleInteraction();
    } else if (info.offset.x < -50) {
      nextSlide();
      handleInteraction();
    }
  };

  if (!projectChunks.length) return null;

  return (
    <section className="bg-k-bg py-16 px-4 sm:px-6 border-t border-k-border border-b overflow-hidden">
      {/* Title Section */}
      <div className="text-center mb-12 md:mb-14">
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-k-text text-2xl mb-4 sm:text-3xl md:text-4xl font-bold tracking-tight"
        >
          Work that moves the needle.
        </motion.h2>

        <SectionBadge icon={<Briefcase size={14} className="text-k-primary group-hover:scale-110 transition-transform duration-300" />} label="Selected Work" />
      </div>

      {/* Carousel Section */}
      <div className="relative max-w-7xl mx-auto">
        <div className="relative h-[380px] sm:h-[480px] md:h-[550px] flex items-center justify-center">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={`${itemsPerSlide}-${active}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
              className="absolute w-full flex gap-4 md:gap-10 justify-center cursor-grab active:cursor-grabbing px-2"
            >
              {[...projects, { slug: "coming-soon", tag: "FUTURE", title: "More coming soon", challenge: "", solution: "", outcome: "", image: "/coming-soon.jpg", imageAlt: "More coming soon", client: "", year: "", services: [] }].slice(active * itemsPerSlide, (active + 1) * itemsPerSlide).map((project) => (
                project.slug === "coming-soon" ? (
                  <div
                    key="coming-soon"
                    className={`group relative rounded-2xl overflow-hidden shadow-xl dark:shadow-none border border-k-border shrink-0 transition-all duration-500 bg-k-card-bg flex flex-col items-center justify-center p-10 text-center
                      ${itemsPerSlide === 1 ? 'w-[85%] sm:w-[70%] max-w-[400px] aspect-4/5' : 'w-[38%] md:w-[40%] max-w-[420px] aspect-16/20'}
                    `}
                  >
                    <div className="absolute inset-0 bg-linear-to-b from-transparent to-k-primary/10" />
                    <div className="relative z-10">
                      <div className="w-16 h-16 rounded-full bg-k-primary/20 flex items-center justify-center mx-auto mb-6">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        >
                          <Briefcase className="text-k-primary" size={32} />
                        </motion.div>
                      </div>
                      <span className="text-k-primary text-[10px] md:text-xs font-black tracking-widest uppercase mb-2 block">
                        NEXT CHAPTER
                      </span>
                      <h3 className="text-k-text text-xl md:text-3xl font-bold mb-4 leading-tight">
                        More Coming <span className="text-blue-500">Soon.</span>
                      </h3>
                      <p className="text-k-text-muted text-[10px] md:text-sm max-w-[200px] mx-auto leading-relaxed">
                        We are currently wrapping up several high-impact projects. Stay tuned.
                      </p>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={project.slug}
                    href={project.slug === "stealth-project" ? "#" : `/work/${project.slug}`}
                    className={`group relative rounded-2xl overflow-hidden shadow-xl dark:shadow-none border border-k-border shrink-0 transition-all duration-500
                      ${project.slug === "stealth-project" ? "pointer-events-none" : "cursor-pointer"}
                      ${itemsPerSlide === 1 ? 'w-[85%] sm:w-[70%] max-w-[400px] aspect-4/5' : 'w-[38%] md:w-[40%] max-w-[420px] aspect-16/20'}
                    `}
                  >
                    <Image
                      src={project.image}
                      alt={project.imageAlt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      priority
                    />

                    {/* Overlay Meta Info */}
                    <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-6 md:p-10">
                      <span className="text-k-primary text-[10px] md:text-xs font-black tracking-widest uppercase mb-1 md:mb-3">
                        {project.tag}
                      </span>
                      <h3 className="text-white text-lg md:text-2xl font-bold mb-2 md:mb-4 line-clamp-2 leading-tight">
                        {project.title}
                      </h3>
                      <p className="text-white/80 text-[10px] md:text-sm max-w-2xl line-clamp-3 hidden sm:block leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        {project.challenge}
                      </p>
                      <div className="mt-4 flex items-center gap-2 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                        <span className="text-k-primary text-[10px] md:text-xs font-black tracking-widest uppercase">
                          {project.slug === "stealth-project" ? "STEALTH MODE" : "VIEW PROJECT"}
                        </span>
                        {project.slug !== "stealth-project" && <ArrowRight size={14} className="text-k-primary" />}
                      </div>
                    </div>
                  </Link>
                )
              ))}
            </motion.div>

          </AnimatePresence>

          {/* Desktop Navigation */}
          <button
            onClick={() => { prevSlide(); handleInteraction(); }}
            className="absolute -left-2 md:-left-8 z-30 p-4 rounded-full bg-k-glass-bg border border-k-glass-border text-k-text hover:bg-k-glass-bg transition backdrop-blur-md hidden lg:block"
          >
            <ArrowLeft size={28} />
          </button>
          <button
            onClick={() => { nextSlide(); handleInteraction(); }}
            className="absolute -right-2 md:-right-8 z-30 p-4 rounded-full bg-k-glass-bg border border-k-glass-border text-k-text hover:bg-k-glass-bg transition backdrop-blur-md hidden lg:block"
          >
            <ArrowRight size={28} />
          </button>
        </div>

        {/* Indicators */}
        <div className="flex justify-center items-center gap-2 mt-12 md:mt-16">
          {projectChunks.map((_, i) => (
            <button
              key={i}
              onClick={() => { setActive(i); handleInteraction(); }}
              className={`h-1.5 transition-all duration-500 rounded-full ${active === i ? "w-10 bg-k-primary shadow-[0_0_15px_rgba(30,80,255,0.4)]" : "w-2.5 bg-k-border hover:bg-k-text/20"
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}


