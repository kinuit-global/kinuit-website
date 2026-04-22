"use client";

import React from "react";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarToggleProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}

export default function SidebarToggle({
  isCollapsed,
  setIsCollapsed,
}: SidebarToggleProps) {
  return (
    <div className="p-3 border-t border-slate-100 hidden lg:block shrink-0">
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={cn(
          "w-full flex items-center transition-all group py-3 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-50",
          // Conditional centering and padding based on isCollapsed
          isCollapsed ? "justify-center px-0 gap-0" : "justify-start px-3 gap-4"
        )}
        title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
      >
        <div className="shrink-0 flex items-center justify-center">
          {isCollapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
        </div>
        
        {/* Toggle label container: strictly tied to isCollapsed */}
        <div className={cn(
          "transition-all duration-300 overflow-hidden whitespace-nowrap",
          isCollapsed ? "w-0 opacity-0 hidden" : "w-40 opacity-100 block"
        )}>
          <span className="font-bold uppercase tracking-wider text-[10px]">
            Collapse
          </span>
        </div>
      </button>
    </div>
  );
}
