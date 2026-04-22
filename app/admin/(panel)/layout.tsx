"use client";

import React, { useState } from "react";
import { Inter, Outfit } from "next/font/google";
import { LogOut, Menu, ShieldCheck } from "lucide-react";
import { logout } from "@/app/actions/auth";
import AdminSidebar from "./components/AdminSidebar";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Toaster } from "react-hot-toast";

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
    <div className={`${inter.variable} ${outfit.variable} font-sans min-h-screen bg-slate-50 text-slate-900 selection:bg-[#081ff0] selection:text-white flex`}>
      {/* Decorative background gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#081ff0]/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#081ff0]/5 blur-[120px] rounded-full" />
      </div>

      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#fff",
            color: "#0f172a",
            border: "1px solid #e2e8f0",
            borderRadius: "16px",
            fontSize: "13px",
            fontWeight: "bold",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
          },
          success: {
            iconTheme: {
              primary: "#081ff0",
              secondary: "#fff",
            },
          },
        }}
      />

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
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md px-4 sm:px-6 py-4 flex items-center justify-between lg:justify-end">
          {/* Mobile Menu Button and Logo */}
          <div className="flex items-center gap-4 lg:hidden">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="p-3 text-slate-600 hover:text-[#081ff0] bg-slate-100 hover:bg-slate-200 rounded-xl border border-slate-200 transition-all flex items-center justify-center shadow-sm"
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
            <div className="flex items-center gap-2 pr-4 border-r border-slate-200">
                <div className="w-8 h-8 rounded-lg bg-[#081ff0]/10 flex items-center justify-center border border-[#081ff0]/20">
                    <ShieldCheck size={18} className="text-[#081ff0]" />
                </div>
                <span className="font-black uppercase tracking-tighter text-sm sm:text-base text-slate-900">
                    KINUIT <span className="text-[#081ff0] italic">ADMIN</span>
                </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <form action={logout}>
              <button 
                type="submit"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 border border-slate-200 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all text-xs font-bold uppercase tracking-wider text-slate-600"
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
        <footer className="relative z-10 py-8 px-6 md:px-12 border-t border-slate-200 text-center lg:text-left">
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
            &copy; {new Date().getFullYear()} Kinuit Global. All Rights Reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}
