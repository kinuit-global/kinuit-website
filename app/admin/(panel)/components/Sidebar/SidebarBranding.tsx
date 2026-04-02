"use client";

import React from "react";
import { ShieldCheck, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarBrandingProps {
  isCollapsed: boolean;
  onClose: () => void;
}

export default function SidebarBranding({
  isCollapsed,
  onClose,
}: SidebarBrandingProps) {
  return (
    <div className={cn(
      "px-3 border-b border-white/5 flex items-center justify-between overflow-hidden shrink-0 transition-all duration-300",
      isCollapsed ? "py-4" : "py-8"
    )}>
      <div className={cn(
        "flex items-center transition-all duration-300",
        isCollapsed ? "w-full justify-center gap-0" : "justify-start gap-3",
        // Enforce mini logic for branding text across all desktop sizes
        !isCollapsed && "xl:justify-start xl:gap-3"
      )}>
        <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20 shrink-0">
          <ShieldCheck size={18} className="text-blue-500" />
        </div>
        
        {/* Branding text container: strictly tied to isCollapsed */}
        <div className={cn(
          "transition-all duration-300 overflow-hidden whitespace-nowrap",
          isCollapsed ? "w-0 opacity-0 hidden" : "w-40 opacity-100 block",
          // Desktop handling: show branding text only if not collapsed
          !isCollapsed ? "lg:block" : "lg:hidden"
        )}>
          <span className="font-black uppercase tracking-tighter text-xl">
            KINUIT <span className="text-blue-500 italic">ADMIN</span>
          </span>
        </div>
      </div>
      
      <button 
        onClick={onClose}
        className="lg:hidden p-2 text-white/40 hover:text-white transition-colors"
      >
        <X size={20} />
      </button>
    </div>
  );
}
