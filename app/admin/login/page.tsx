"use client";

import React, { useState } from "react";
import { ShieldCheck, User, Lock, Loader2, ArrowRight } from "lucide-react";
import { login } from "@/app/actions/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const result = await login(formData);

    if (result.success) {
      router.push("/admin/dashboard");
    } else {
      setError(result.error || "Invalid credentials");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 bg-transparent">
      <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-20 h-20 bg-blue-500/10 rounded-2xl flex items-center justify-center border border-blue-500/20 shadow-2xl relative group">
            <ShieldCheck size={40} className="text-blue-500 group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </div>
          <h1 className="text-4xl font-black text-white uppercase tracking-tighter">
            ADMIN <span className="text-blue-500 italic">LOGIN</span>
          </h1>
          <p className="text-white/40 text-sm font-medium max-w-xs uppercase tracking-widest">
            Enter your credentials to access the Kinuit agency management dashboard.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white/3 border border-white/10 rounded-3xl p-8 shadow-2xl backdrop-blur-sm space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 ml-1">Username</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-blue-500 transition-colors">
                  <User size={18} />
                </div>
                <input 
                  required
                  name="username"
                  placeholder="kinuit_admin"
                  className="w-full bg-black/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-blue-500/50 transition-all text-white font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 ml-1">Password</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-blue-500 transition-colors">
                  <Lock size={18} />
                </div>
                <input 
                  required
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  className="w-full bg-black/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-blue-500/50 transition-all text-white font-medium"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl text-xs font-bold uppercase tracking-wider text-center animate-in zoom-in-95 duration-200">
                {error}
              </div>
            )}

            <button 
              disabled={isSubmitting}
              className="w-full bg-white text-[#070707] font-black py-4 rounded-2xl uppercase tracking-[0.2em] text-sm hover:bg-blue-500 hover:text-white transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <>
                  Enter Dashboard
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        </form>

        <p className="text-center text-white/20 text-[10px] font-black uppercase tracking-[0.3em]">
          Secure Access System v1.0
        </p>
      </div>
    </div>
  );
}
