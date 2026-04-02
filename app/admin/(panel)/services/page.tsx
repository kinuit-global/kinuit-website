import React from "react";
import { Briefcase, Plus } from "lucide-react";

export default function ServicesAdminPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-white uppercase tracking-tighter">
            SERVICES <span className="text-blue-500 italic">MANAGEMENT</span>
          </h1>
          <p className="text-white/40 text-sm font-medium uppercase tracking-widest max-w-lg">
            Manage your service offerings, expertise, and capabilities for your clients.
          </p>
        </div>
        
        <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 transition-all text-xs font-black uppercase tracking-widest">
          <Plus size={18} />
          Add New Service
        </button>
      </div>

      <div className="relative group">
        <div className="absolute -inset-1 bg-linear-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
        <div className="relative overflow-hidden bg-white/2 border border-white/10 rounded-3xl backdrop-blur-sm p-12 flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-white/20">
            <Briefcase size={32} />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold uppercase tracking-tight">No services found</h3>
            <p className="text-white/40 text-sm max-w-xs mx-auto">The services management interface is being updated. You will be able to edit your service listings soon.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
