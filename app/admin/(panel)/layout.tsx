"use client";

import React, { useState, useEffect, useRef } from "react";
import { Inter, Outfit } from "next/font/google";
import { LogOut, Menu, ShieldCheck, User as UserIcon, ChevronDown } from "lucide-react";
import { logout } from "@/app/actions/auth";
import AdminSidebar from "./components/AdminSidebar";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Handle click outside to close dropdown
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserEmail(user.email ?? null);
        const { data: profile } = await supabase
          .from('profiles')
          .select('avatar_url')
          .eq('id', user.id)
          .single();
        if (profile?.avatar_url) {
          setAvatarUrl(profile.avatar_url);
        }
      }
    };
    fetchUser();
  }, []);

  return (
    <div className={`${inter.variable} ${outfit.variable} font-sans min-h-screen bg-slate-50 text-slate-900 selection:bg-[#081ff0] selection:text-white flex`}>
      {/* Decorative background gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#081ff0]/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#081ff0]/5 blur-[120px] rounded-full" />
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

          <div className="flex items-center gap-4 relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-3 p-1.5 pr-4 rounded-full bg-slate-100 border border-slate-200 hover:bg-slate-200 transition-all"
            >
              <div className="w-8 h-8 rounded-full bg-[#081ff0] flex items-center justify-center text-white font-bold text-xs overflow-hidden">
                {avatarUrl ? (
                  <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                ) : userEmail ? (
                  userEmail.charAt(0).toUpperCase()
                ) : (
                  <UserIcon size={14} />
                )}
              </div>
              <div className="hidden sm:flex flex-col items-start">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 leading-none">Admin</span>
                <span className="text-xs font-bold text-slate-700 truncate max-w-[120px]">{userEmail || "Loading..."}</span>
              </div>
              <ChevronDown size={14} className={`text-slate-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {dropdownOpen && (
              <div className="absolute top-full mt-2 right-0 w-64 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-4 py-3 border-b border-slate-100 bg-slate-50">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">Signed in as</p>
                  <p className="text-sm font-bold text-slate-800 truncate">{userEmail}</p>
                </div>
                <div className="p-2">
                  <Link 
                    href="/admin/profile" 
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 hover:text-[#081ff0] transition-colors"
                  >
                    <UserIcon size={16} /> My Profile
                  </Link>
                  <Link 
                    href="/admin/dashboard" 
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 hover:text-[#081ff0] transition-colors"
                  >
                    <ShieldCheck size={16} /> Dashboard
                  </Link>
                  <form action={logout} className="mt-1 border-t border-slate-100 pt-1">
                    <button 
                      type="submit"
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-bold text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </form>
                </div>
              </div>
            )}
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
