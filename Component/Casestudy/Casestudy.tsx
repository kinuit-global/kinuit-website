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
    <section className="bg-[#0f0f21] py-16 px-4 sm:px-6 border-t border-t-[#1B1B1B66] border-b border-b-[#1B1B1B66] overflow-hidden">
      {/* Title Section */}
      <div className="text-center mb-12 md:mb-14">
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-white text-2xl mb-4 sm:text-3xl md:text-4xl font-bold tracking-tight"
        >
          Work that moves the needle.
        </motion.h2>

        <SectionBadge icon={Briefcase} label="Selected Work" />
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
              {projectChunks[active]?.map((project) => (
                <Link
                  key={project.slug}
                  href={project.slug === "stealth-project" ? "#" : `/work/${project.slug}`}
                  className={`group relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 shrink-0 transition-all duration-500
                    ${project.slug === "stealth-project" ? "pointer-events-none" : "cursor-pointer"}
                    ${itemsPerSlide === 1 ? 'w-[85%] sm:w-[70%] max-w-[400px] aspect-4/5' : 'w-[38%] md:w-[40%] max-w-[420px] aspect-16/20'}
                  `}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    priority
                  />

                  {/* Overlay Meta Info */}
                  <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-6 md:p-10">
                    <span className="text-blue-500 text-[10px] md:text-xs font-black tracking-widest uppercase mb-1 md:mb-3">
                      {project.tag}
                    </span>
                    <h3 className="text-white text-lg md:text-2xl font-bold mb-2 md:mb-4 line-clamp-2 leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 text-[10px] md:text-sm max-w-2xl line-clamp-3 hidden sm:block leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {project.challenge}
                    </p>
                    <div className="mt-4 flex items-center gap-2 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <span className="text-blue-500 text-[10px] md:text-xs font-black tracking-widest uppercase">
                        {project.slug === "stealth-project" ? "STEALTH MODE" : "VIEW PROJECT"}
                      </span>
                      {project.slug !== "stealth-project" && <ArrowRight size={14} className="text-blue-500" />}
                    </div>
                  </div>
                </Link>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Desktop Navigation */}
          <button
            onClick={() => { prevSlide(); handleInteraction(); }}
            className="absolute -left-2 md:-left-8 z-30 p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition backdrop-blur-md hidden lg:block"
          >
            <ArrowLeft size={28} />
          </button>
          <button
            onClick={() => { nextSlide(); handleInteraction(); }}
            className="absolute -right-2 md:-right-8 z-30 p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition backdrop-blur-md hidden lg:block"
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
              className={`h-1.5 transition-all duration-500 rounded-full ${active === i ? "w-10 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.4)]" : "w-2.5 bg-gray-700 hover:bg-gray-600"
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}


