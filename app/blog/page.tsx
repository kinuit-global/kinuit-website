"use client";

import { blogPosts } from "@/lib/blog";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowRight, Search } from "lucide-react";
import { useState } from "react";
import Container from "@/components/ui/Container";
import Breadcrumb from "@/components/ui/Breadcrumb";

export default function BlogListingPage() {
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["ALL", "BUILD", "DESIGN", "GROW", "PLAN"];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = activeCategory === "ALL" || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-k-bg text-white pb-24">
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 overflow-hidden border-b border-white/5">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
        <Container>
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Breadcrumb paths={[{ name: "Blog" }]} />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight tracking-tight"
            >
              The <span className="text-blue-500">Standard</span> Insights.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-white/60 text-lg md:text-xl font-light max-w-2xl leading-relaxed"
            >
              Perspectives on building, designing, and growing ambitious brands in the digital age.
            </motion.p>
          </div>
        </Container>
      </section>

      {/* Filters & Search */}
      <section className="sticky top-20 z-40 bg-k-bg/80 backdrop-blur-md border-b border-white/5 py-4">
        <Container>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-full text-[10px] font-black tracking-widest uppercase transition-all whitespace-nowrap border ${
                    activeCategory === cat 
                      ? "bg-blue-600 border-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)]" 
                      : "bg-white/5 border-white/10 text-white/40 hover:text-white hover:border-white/20"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative group max-w-md w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-blue-500 transition-colors" size={18} />
              <input
                type="text"
                placeholder="SEARCH ARTICLES..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-12 pr-6 outline-none focus:border-blue-500 transition-all text-sm tracking-wider placeholder:text-white/20 uppercase"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Blog Grid */}
      <section className="py-20">
        <Container>
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: (index % 3) * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <Link href={`/blog/${post.slug}`} className="block">
                    <div className="relative aspect-video rounded-2xl overflow-hidden mb-6 border border-white/10 shadow-2xl">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-blue-600 text-white text-[10px] font-black tracking-widest rounded-full uppercase shadow-lg">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-4 text-white/40 text-[10px] font-black tracking-widest uppercase">
                        <span className="flex items-center gap-1.5"><Calendar size={14} className="text-blue-500" /> {post.date}</span>
                        <span className="flex items-center gap-1.5"><Clock size={14} className="text-blue-500" /> {post.readTime}</span>
                      </div>
                      
                      <h2 className="text-2xl font-black text-white group-hover:text-blue-500 transition-colors leading-tight tracking-tight">
                        {post.title}
                      </h2>
                      
                      <p className="text-white/60 text-sm line-clamp-3 leading-relaxed font-light">
                        {post.excerpt}
                      </p>
                      
                      <div className="pt-2 flex items-center text-blue-500 text-[10px] font-black uppercase tracking-widest gap-2 group-hover:gap-3 transition-all">
                        READ FULL STORY <ArrowRight size={14} />
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="text-center py-40 border border-white/5 rounded-3xl bg-white/2">
              <h3 className="text-2xl font-black text-white/20 uppercase tracking-widest italic">No articles found matching your criteria.</h3>
            </div>
          )}
        </Container>
      </section>
    </main>
  );
}
