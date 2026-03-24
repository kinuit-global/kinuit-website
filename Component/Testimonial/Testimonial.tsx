"use client";

import { MessageSquare } from "lucide-react";
import SectionBadge from "@/components/ui/SectionBadge";

export default function Testimonials() {
  return (
    <section className="relative py-24 px-4 sm:px-6 bg-[#050718] border-b border-t border-t-gray-900 border-b-gray-900 overflow-hidden flex flex-col items-center justify-center min-h-[400px]">
      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <div className="flex justify-center mb-8">
          <SectionBadge icon={MessageSquare} label="Client Roster" />
        </div>
        
        <h2 className="text-white text-3xl md:text-5xl font-bold mb-8 tracking-tight">
          We're currently <span className="text-blue-500">building our client roster.</span>
        </h2>
        
        <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-4">
          Kinuit is selective about the projects we take on. We prioritize deep strategic partnerships over volume.
        </p>
        
        <p className="text-blue-500/80 font-medium tracking-widest uppercase text-xs md:text-sm mt-8">
          Verified case studies coming soon
        </p>
      </div>

      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
}