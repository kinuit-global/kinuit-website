import React from "react";
import { getTestimonials } from "@/app/actions/testimonial";
import TestimonialsTable from "@/components/Admin/TestimonialsTable";
import { MessageSquareQuote, Users, Calendar } from "lucide-react";

export default async function TestimonialsAdminPage() {
  const testimonials = await getTestimonials();

  // Stats
  const totalSubmissions = testimonials.length;
  const recentSubmissions = testimonials.filter(s => {
    const date = new Date(s.submittedAt);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    return diff < 7 * 24 * 60 * 60 * 1000;
  }).length;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-slate-950 uppercase tracking-tighter">
            TESTIMONIALS <span className="text-[#081ff0] italic">MANAGEMENT</span>
          </h1>
          <p className="text-slate-600 text-sm font-medium uppercase tracking-widest max-w-lg">
            Review, download attachments, and manage all client testimonials from a single interface.
          </p>
        </div>
        
        <div className="flex gap-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-4 shadow-sm">
            <div className="w-10 h-10 bg-[#081ff0]/10 rounded-xl flex items-center justify-center text-[#081ff0]">
              <Users size={20} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Total Submissions</p>
              <p className="text-xl font-black text-slate-950">{totalSubmissions}</p>
            </div>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-4 shadow-sm">
            <div className="w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center text-green-600">
              <Calendar size={20} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Recent (7d)</p>
              <p className="text-xl font-black text-slate-950">{recentSubmissions}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative group">
        <div className="relative overflow-hidden bg-white border border-slate-200 rounded-3xl shadow-sm">
          <TestimonialsTable testimonials={testimonials} />
        </div>
      </div>
    </div>
  );
}
