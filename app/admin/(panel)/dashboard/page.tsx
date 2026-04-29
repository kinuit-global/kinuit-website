import React from "react";
export const dynamic = "force-dynamic";
import { getTestimonials } from "@/app/actions/testimonial";
import { 
  MessageSquareQuote, 
  Users, 
  FileText, 
  Calendar,
  Briefcase,
  ArrowRight,
  TrendingUp,
  Clock
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { getCaseStudies } from "@/lib/case-studies";
import { servicesItem } from "@/lib/service";

export default async function DashboardPage() {
  const testimonials = await getTestimonials();

  // Stats
  const totalSubmissions = testimonials.length;
  const recentSubmissions = testimonials.filter(s => {
    const date = new Date(s.submittedAt);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    return diff < 7 * 24 * 60 * 60 * 1000;
  }).length;

  const latestSubmissions = [...testimonials]
    .sort((a,b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
    .slice(0, 3);

  const caseStudies = await getCaseStudies();
  // Count all sub-services (tags) for a more accurate "Active Services" count
  const totalSubServices = servicesItem.reduce((acc, service) => acc + service.tags.length, 0);

  const stats = [
    { title: "Total Testimonials", value: totalSubmissions, icon: MessageSquareQuote, color: "text-blue-500", bg: "bg-blue-500/10" },
    { title: "Recent (7d)", value: recentSubmissions, icon: TrendingUp, color: "text-green-500", bg: "bg-green-500/10" },
    { title: "Active Services", value: totalSubServices, icon: Briefcase, color: "text-purple-500", bg: "bg-purple-500/10" },
    { title: "Case Studies", value: caseStudies.length, icon: FileText, color: "text-orange-500", bg: "bg-orange-500/10" },
  ];


  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Welcome Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-black text-slate-950 uppercase tracking-tighter">
          HELL0 <span className="text-[#081ff0] italic">ADMIN</span>
        </h1>
        <p className="text-slate-600 text-sm font-medium uppercase tracking-widest max-w-lg">
          Welcome back to the Kinuit Global control panel. Here's an overview of your agency's performance.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-3xl p-6 hover:shadow-md transition-all group">
            <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
              <stat.icon size={24} />
            </div>
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1">{stat.title}</p>
            <p className="text-3xl font-black text-slate-950">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black uppercase tracking-tighter text-slate-950">Recent Testimonials</h3>
            <Link href="/admin/testimonials" className="text-[#081ff0] hover:text-[#0618cc] text-xs font-black uppercase tracking-widest flex items-center gap-1 group">
              View All <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="space-y-4">
            {latestSubmissions.length > 0 ? latestSubmissions.map((t) => (
              <div key={t.id} className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center justify-between group hover:bg-slate-50 transition-colors shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-[#081ff0] transition-colors">
                    <Users size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-tight text-slate-950">{t.fullName}</h4>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.companyName}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                    <Clock size={10} />
                    {format(new Date(t.submittedAt), "MMM dd")}
                  </p>
                </div>
              </div>
            )) : (
              <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center shadow-sm">
                <p className="text-slate-400 text-xs font-black uppercase tracking-widest">No recent submissions</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <h3 className="text-lg font-black uppercase tracking-tighter text-slate-950">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             {[
               { title: "Create Case Study", icon: FileText, href: "/admin/case-studies" },
               { title: "Review Services", icon: Briefcase, href: "/admin/services" },
               { title: "Export Data", icon: ArrowRight, href: "#" },
               { title: "System Settings", icon: ArrowRight, href: "#" },
             ].map((action, i) => (
               <Link key={i} href={action.href} className="bg-white border border-slate-200 p-5 rounded-2xl flex flex-col gap-4 hover:border-[#081ff0]/30 hover:bg-slate-50 transition-all group shadow-sm">
                  <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-[#081ff0] transition-colors">
                    <action.icon size={20} />
                  </div>
                  <span className="text-xs font-black uppercase tracking-widest text-slate-950">{action.title}</span>
               </Link>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
}
