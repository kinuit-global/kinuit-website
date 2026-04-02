"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarItemProps {
  title: string;
  href: string;
  icon: LucideIcon;
  isActive: boolean;
  isCollapsed: boolean;
  isTabletView: boolean;
  isMobileView: boolean;
  onClose: () => void;
}

export default function SidebarItem({
  title,
  href,
  icon: Icon,
  isActive,
  isCollapsed,
  isTabletView,
  isMobileView,
  onClose,
}: SidebarItemProps) {
  return (
    <Link
      href={href}
      onClick={() => {
        if (isMobileView) onClose();
      }}
      className={cn(
        "w-full flex items-center py-3 rounded-xl transition-all group relative",
        // Horizontal centering on any desktop size when collapsed
        isCollapsed ? "justify-center px-0 gap-0" : "justify-start px-3 gap-4",
        // XL refinement: Force justify-start and gap ONLY when not collapsed
        !isCollapsed && "xl:justify-start xl:px-3 xl:gap-4",
        isActive 
          ? "bg-blue-500/10 text-blue-500 border border-blue-500/20" 
          : "text-white/40 hover:text-white hover:bg-white/5 border border-transparent"
      )}
    >
      <Icon size={20} className={cn("shrink-0 transition-transform", isActive ? "scale-110" : "group-hover:scale-110")} />
      
      {/* Label container: strictly hidden if collapsed regardless of viewport */}
      <div className={cn(
        "transition-all duration-300 overflow-hidden whitespace-nowrap",
        isCollapsed ? "w-0 opacity-0 hidden" : "w-40 opacity-100 block",
        // Desktop handling: show labels on xl ONLY if not collapsed
        !isCollapsed ? "lg:block" : "lg:hidden"
      )}>
        <span className="font-bold uppercase tracking-wider text-xs">
          {title}
        </span>
      </div>
      
      {/* Tooltip for collapsed state (only shows if NOT mobile and IS collapsed) */}
      <div className={cn(
         "absolute left-full ml-4 px-3 py-2 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-lg opacity-0 pointer-events-none lg:group-hover:opacity-100 transition-opacity z-[120] whitespace-nowrap",
         isCollapsed ? "block" : "hidden"
      )}>
        {title}
      </div>

      {isActive && !isCollapsed && (
        <div className="absolute right-3 lg:block hidden">
          <ChevronRight size={14} className="opacity-50" />
        </div>
      )}
    </Link>
  );
}
