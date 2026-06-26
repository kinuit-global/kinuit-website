"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { BookOpen, Search, Calendar, Clock, ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionBadge from "@/components/ui/SectionBadge";
import { allBlogPosts } from "@/lib/blog";

const CATEGORIES = ["ALL", "BRANDING", "STRATEGY", "MARKETING", "DEVELOPMENT", "WEB3"];

export default function BlogListContainer() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const filteredPosts = allBlogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "ALL" ||
      post.category.toUpperCase() === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-k-bg text-k-text">
      {/* Hero Section */}
      <section className="relative pt-40 pb-16 md:pt-48 md:pb-24 border-b border-k-border overflow-hidden">
        {/* Soft Background Neon Glow */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#081ff0]/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-[#081ff0]/3 blur-[100px] rounded-full pointer-events-none" />

        <Container className="relative z-10">
          <div className="max-w-4xl flex flex-col items-start text-left">
            <SectionBadge icon={<BookOpen size={14} className="text-k-primary" />} label="Insights & Knowledge" />
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-8 text-k-text leading-tight tracking-tight uppercase">
              The Kinuit <br /> <span className="text-k-primary">Resource Hub</span>
            </h1>
            
            <p className="text-k-text-muted text-lg font-light leading-[1.8] max-w-2xl">
              Deep dives, comparisons, and actionable insights on branding, custom engineering, and growth metrics for ambitious brands.
            </p>
          </div>
        </Container>
      </section>

      {/* Filter and Search Section */}
      <section className="py-12 border-b border-k-border bg-k-bg/50 backdrop-blur-md sticky top-[72px] z-20">
        <Container>
          <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2 justify-center md:justify-start w-full md:w-auto">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 border ${
                    selectedCategory === cat
                      ? "bg-k-primary border-k-primary text-white shadow-lg shadow-k-primary/20"
                      : "bg-k-card-bg border-k-border text-k-text-muted hover:border-k-primary/40 hover:text-k-text"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <span className="absolute inset-y-0 left-4 flex items-center text-k-text-muted pointer-events-none">
                <Search size={16} />
              </span>
              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-k-card-bg border border-k-border rounded-full text-sm text-k-text placeholder-k-text-muted/60 outline-none focus:border-k-primary/60 focus:ring-1 focus:ring-k-primary/40 transition-all shadow-sm"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Blog Cards Grid */}
      <section className="py-20 bg-k-bg">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post, idx) => (
                  <motion.div
                    key={post.slug}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, delay: idx * 0.05 }}
                    layout
                    className="flex flex-col h-full bg-k-card-bg border border-k-border rounded-3xl overflow-hidden group hover:border-[#081ff0]/30 transition-all duration-300 shadow-sm"
                  >
                    {/* Thumbnail Image */}
                    <div className="relative aspect-video overflow-hidden border-b border-k-border bg-slate-900">
                      <div className="absolute inset-0 bg-[#0059FF]/5 mix-blend-overlay z-10 group-hover:bg-transparent transition-colors duration-500" />
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                      {/* Floating Category Badge */}
                      <span className="absolute top-4 left-4 z-20 px-3 py-1 bg-k-bg/85 backdrop-blur-md border border-k-border text-[9px] font-black tracking-widest rounded-full uppercase text-k-primary">
                        {post.category}
                      </span>
                    </div>

                    {/* Card Body */}
                    <div className="p-6 sm:p-8 flex flex-col flex-1">
                      {/* Meta Info */}
                      <div className="flex items-center gap-4 text-[10px] font-black tracking-widest text-k-text-muted uppercase mb-4">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} className="text-k-primary" /> {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} className="text-k-primary" /> {post.readTime}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold mb-4 line-clamp-2 text-k-text group-hover:text-k-primary transition-colors duration-300">
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-k-text-muted text-sm leading-relaxed mb-6 font-light line-clamp-3">
                        {post.excerpt}
                      </p>

                      {/* Read More Link */}
                      <div className="mt-auto pt-4 border-t border-k-border">
                        <Link
                          href={`/blog/${post.slug}`}
                          className="inline-flex items-center gap-2 text-k-primary text-xs font-black tracking-wider uppercase hover:gap-3 transition-all"
                        >
                          Read Article <ArrowRight size={14} />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full py-20 text-center">
                  <h3 className="text-xl font-bold text-k-text mb-2">No articles found</h3>
                  <p className="text-k-text-muted">Try adjusting your search filters or browse categories.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </Container>
      </section>
    </div>
  );
}
