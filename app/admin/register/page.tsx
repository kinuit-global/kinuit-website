"use client";

import { signup } from "@/app/actions/auth";
import { ArrowRight, Eye, EyeOff, Loader2, Lock, ShieldCheck, User } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

export default function RegisterPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isRegistered, setIsRegistered] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const result = await signup(formData);

    if (result.success) {
      setIsRegistered(true);
      toast.success(result.message || "Account created! Please verify your email.");
    } else {
      toast.error(result.error || "Registration failed");
      setError(result.error || "Registration failed");
    }
    setIsSubmitting(false);
  };

  if (isRegistered) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 bg-slate-50 text-slate-900">
        <div className="w-full max-w-md bg-white border border-slate-200 rounded-[2.5rem] p-12 shadow-2xl text-center space-y-8 animate-in zoom-in-95 duration-500">
          <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto border border-green-500/20 shadow-inner">
            <ShieldCheck size={48} className="text-green-500" />
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-black uppercase tracking-tighter">CHECK YOUR <span className="text-green-500 italic">EMAIL</span></h2>
            <p className="text-slate-500 text-sm font-medium leading-relaxed">
              We've sent a verification link to your inbox. Please click the link to activate your account before logging in.
            </p>
          </div>
          <Link
            href="/admin/login"
            className="block w-full bg-[#081ff0] text-white font-black py-4 rounded-2xl uppercase tracking-[0.2em] text-xs hover:bg-[#0618cc] transition-all shadow-lg shadow-[#081ff0]/20"
          >
            Back to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 bg-slate-50 text-slate-900">
      <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-20 h-20 bg-[#081ff0]/10 rounded-2xl flex items-center justify-center border border-[#081ff0]/20 shadow-xl relative group">
            <ShieldCheck size={40} className="text-[#081ff0] group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-0 bg-[#081ff0]/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </div>
          <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter">
            ADMIN <span className="text-[#081ff0] italic">REGISTER</span>
          </h1>
          <p className="text-slate-500 text-sm font-medium max-w-xs uppercase tracking-widest">
            Create an account to access the Kinuit agency management dashboard.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-xl space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Email</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#081ff0] transition-colors">
                  <User size={18} />
                </div>
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="admin@kinuit.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-[#081ff0] focus:ring-1 focus:ring-[#081ff0] transition-all text-slate-900 font-semibold placeholder:text-slate-300 shadow-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Password</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#081ff0] transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  minLength={6}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-12 focus:outline-none focus:border-[#081ff0] focus:ring-1 focus:ring-[#081ff0] transition-all text-slate-900 font-semibold placeholder:text-slate-300 shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Confirm Password</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#081ff0] transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="••••••••"
                  minLength={6}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-12 focus:outline-none focus:border-[#081ff0] focus:ring-1 focus:ring-[#081ff0] transition-all text-slate-900 font-semibold placeholder:text-slate-300 shadow-sm"
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
              className="w-full bg-[#081ff0] text-white font-black py-4 rounded-2xl uppercase tracking-[0.2em] text-sm hover:bg-[#0618cc] shadow-lg shadow-[#081ff0]/20 transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <>
                  Create Account
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            <div className="text-center pt-4">
              <Link href="/admin/login" className="text-xs text-slate-500 hover:text-[#081ff0] font-bold">Already have an account? Login</Link>
            </div>
          </div>
        </form>

        <p className="text-center text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">
          Secure Access System v1.0
        </p>
      </div>
    </div>
  );
}
