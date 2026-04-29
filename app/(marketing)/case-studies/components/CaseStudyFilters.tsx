"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import Container from "@/components/ui/Container";

const categories = ["ALL", "BUILD", "DESIGN", "GROW", "PLAN"];

export default function CaseStudyFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const currentCategory = searchParams.get("category") || "ALL";
  const currentQuery = searchParams.get("q") || "";
  
  const [searchQuery, setSearchQuery] = useState(currentQuery);

  // Update URL when filters change
  const updateFilters = (category: string, query: string) => {
    const params = new URLSearchParams();
    if (category !== "ALL") params.set("category", category);
    if (query) params.set("q", query);
    
    router.push(`/case-studies?${params.toString()}`, { scroll: false });
  };

  // Debounced search update
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery !== currentQuery) {
        updateFilters(currentCategory, searchQuery);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  return (
    <section className="sticky top-20 z-40 bg-k-bg/80 backdrop-blur-md border-b border-k-border py-4">
      <Container>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => updateFilters(cat, searchQuery)}
                className={`px-5 py-2 rounded-full text-[10px] font-black tracking-widest uppercase transition-all whitespace-nowrap border ${
                  currentCategory === cat 
                    ? "bg-k-primary border-k-primary text-white shadow-[0_0_20px_rgba(30,80,255,0.3)]" 
                    : "bg-k-card-bg border-k-border text-k-text-muted hover:text-k-text hover:border-k-text/20"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative group max-w-md w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#081ff0] transition-colors" size={18} />
            <input
              type="text"
              placeholder="SEARCH CASE STUDIES..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 hover:border-slate-400 rounded-full py-3 pl-12 pr-6 outline-none focus:border-[#081ff0] focus:ring-1 focus:ring-[#081ff0] transition-all text-sm font-semibold tracking-wider placeholder:text-slate-400 uppercase text-k-text shadow-sm"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
