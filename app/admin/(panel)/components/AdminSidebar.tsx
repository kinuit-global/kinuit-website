"use client";

import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  FileText, 
  MessageSquareQuote, 
  Briefcase,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Sub-components
import SidebarBranding from "./Sidebar/SidebarBranding";
import SidebarItem from "./Sidebar/SidebarItem";
import SidebarToggle from "./Sidebar/SidebarToggle";
import SidebarFooter from "./Sidebar/SidebarFooter";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin/dashboard",
  },
  {
    title: "Case Studies",
    icon: FileText,
    href: "/admin/case-studies",
  },
  {
    title: "Services",
    icon: Briefcase,
    href: "/admin/services",
  },
  {
    title: "Testimonials",
    icon: MessageSquareQuote,
    href: "/admin/testimonials",
  },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isCollapsed: boolean;
  setIsCollapsed: Dispatch<SetStateAction<boolean>>;
}

export default function AdminSidebar({ 
  isOpen, 
  onClose, 
  isCollapsed, 
  setIsCollapsed 
}: SidebarProps) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Safe window width check for tooltips and auto-close
  const isMobileView = mounted ? window.innerWidth < 1024 : false;
  const isTabletView = mounted ? window.innerWidth < 1280 : false;

  return (
    <>
      {/* Mobile Backdrop */}
      <div 
        className={cn(
          "fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] lg:hidden transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      <aside 
        className={cn(
          "fixed left-0 top-0 h-screen bg-white border-r border-slate-200 flex flex-col transition-all duration-300 z-[110] overflow-hidden shadow-xl lg:shadow-none",
          // Width logic
          isOpen ? "w-64" : "w-0 lg:w-16", 
          !isCollapsed && "xl:w-64", 
          // Visibility and translation
          isOpen ? "translate-x-0 flex" : "-translate-x-full lg:translate-x-0 hidden lg:flex"
        )}
      >
        <SidebarBranding isCollapsed={isCollapsed} onClose={onClose} />

        {/* Navigation */}
        <nav className={cn(
          "flex-1 px-3 space-y-2 overflow-y-auto overflow-x-hidden transition-all duration-300",
          isCollapsed ? "py-2" : "py-6"
        )}>
          {menuItems.map((item) => (
            <SidebarItem
              key={item.href}
              {...item}
              isActive={pathname === item.href || (item.href !== "/admin/dashboard" && pathname.startsWith(item.href))}
              isCollapsed={isCollapsed}
              isTabletView={isTabletView}
              isMobileView={isMobileView}
              onClose={onClose}
            />
          ))}
        </nav>

        <SidebarToggle isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        <SidebarFooter isCollapsed={isCollapsed} />
      </aside>
    </>
  );
}
