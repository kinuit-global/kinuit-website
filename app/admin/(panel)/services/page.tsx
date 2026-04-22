import React from "react";
import { Briefcase, Plus } from "lucide-react";

export default function ServicesAdminPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter">
            SERVICES <span className="text-[#081ff0] italic">MANAGEMENT</span>
          </h1>
          <p className="text-slate-400 text-sm font-medium uppercase tracking-widest max-w-lg">
            Manage your service offerings, expertise, and capabilities for your clients.
          </p>
        </div>
        
        <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#081ff0] hover:bg-[#0618cc] transition-all text-xs font-black uppercase tracking-widest text-white shadow-lg shadow-[#081ff0]/20">
          <Plus size={18} />
          Add New Service
        </button>
      </div>

      <div className="relative group">
        <div className="relative overflow-hidden bg-white border border-slate-200 rounded-3xl p-12 flex flex-col items-center justify-center text-center space-y-4 shadow-sm">
          <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-200">
            <Briefcase size={32} />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold uppercase tracking-tight text-slate-900">No services found</h3>
            <p className="text-slate-400 text-sm max-w-xs mx-auto">The services management interface is being updated. You will be able to edit your service listings soon.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
