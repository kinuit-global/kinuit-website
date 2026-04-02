"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface SidebarFooterProps {
  isCollapsed: boolean;
}

export default function SidebarFooter({ isCollapsed }: SidebarFooterProps) {
  return (
    <div className={cn(
      "p-6 border-t border-white/5 text-center transition-all duration-300 shrink-0 overflow-hidden",
      // Strictly control footer height and visibility based on isCollapsed
      isCollapsed ? "max-h-0 py-0 opacity-0 hidden" : "max-h-20 py-6 opacity-100 block",
      // Specific handling for large desktop screens: always show if not collapsed
      !isCollapsed ? "lg:block" : "lg:hidden"
    )}>
      <p className="text-white/10 text-[8px] font-black uppercase tracking-[0.2em] whitespace-nowrap">
        v1.0.0 &copy; Kinuit Global
      </p>
    </div>
  );
}
