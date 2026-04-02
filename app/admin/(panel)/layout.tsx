"use client";

import React, { useState } from "react";
import { Inter, Outfit } from "next/font/google";
import { LogOut, Menu, ShieldCheck } from "lucide-react";
import { logout } from "@/app/actions/auth";
import AdminSidebar from "./components/AdminSidebar";
import Link from "next/link";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`${inter.variable} ${outfit.variable} font-sans min-h-screen bg-[#070707] text-white selection:bg-blue-500 selection:text-white flex`}>
      {/* Decorative background gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 blur-[120px] rounded-full" />
      </div>

      {/* Sidebar */}
      <AdminSidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        isCollapsed={isCollapsed} 
        setIsCollapsed={setIsCollapsed} 
      />

      {/* Main Content Area */}
      <div className={cn(
        "flex-1 flex flex-col min-h-screen transition-all duration-300",
        "ml-0 lg:ml-16", // Base margin
        !isCollapsed && "xl:ml-64", // Expanded desktop margin
      )}>
        {/* Top Header */}
        <header className="sticky top-0 z-50 border-b border-white/5 bg-black/60 backdrop-blur-md px-4 sm:px-6 py-4 flex items-center justify-between lg:justify-end">
          {/* Mobile Menu Button and Logo */}
          <div className="flex items-center gap-4 lg:hidden">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="p-3 text-white/80 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-all flex items-center justify-center shadow-lg"
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
            <div className="flex items-center gap-2 pr-4 border-r border-white/5">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                    <ShieldCheck size={18} className="text-blue-500" />
                </div>
                <span className="font-black uppercase tracking-tighter text-sm sm:text-base">
                    KINUIT <span className="text-blue-500 italic">ADMIN</span>
                </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <form action={logout}>
              <button 
                type="submit"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-red-500/10 hover:border-red-500/20 hover:text-red-500 transition-all text-xs font-bold uppercase tracking-wider"
              >
                <LogOut size={16} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </form>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="relative z-10 flex-1 p-4 md:p-8 lg:p-12 overflow-x-hidden">
          {children}
        </main>

        {/* Footer */}
        <footer className="relative z-10 py-8 px-6 md:px-12 border-t border-white/5 text-center lg:text-left">
          <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.2em]">
            &copy; {new Date().getFullYear()} Kinuit Global. All Rights Reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}
