"use client";

import React, { useState, useEffect, useRef } from "react";
import { User, Lock, ShieldCheck, Mail, Loader2, Save, Eye, EyeOff, AlertCircle, Camera, UploadCloud } from "lucide-react";
import { updatePassword } from "@/app/actions/auth";
import { createClient } from "@/lib/supabase/client";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const [user, setUser] = useState<{ id: string; email: string; role: string; avatar_url: string | null } | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);
  const [pendingAvatarFile, setPendingAvatarFile] = useState<File | null>(null);
  const [showPasswords, setShowPasswords] = useState({ old: false, new: false, confirm: false });
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (authUser) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role, avatar_url')
          .eq('id', authUser.id)
          .single();
        setUser({ 
          id: authUser.id,
          email: authUser.email!, 
          role: profile?.role || 'user',
          avatar_url: profile?.avatar_url || null
        });
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  const handleAvatarSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPendingAvatarFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewAvatar(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveChanges = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUpdating(true);
    
    const formData = new FormData(e.currentTarget);
    const oldPassword = formData.get("oldPassword") as string;
    const newPassword = formData.get("newPassword") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    try {
      // 1. Handle Avatar Upload if pending
      let finalAvatarUrl = user?.avatar_url;
      if (pendingAvatarFile) {
        const uploadData = new FormData();
        uploadData.append("file", pendingAvatarFile);
        
        const res = await fetch("/api/admin/upload", {
          method: "POST",
          body: uploadData,
        });
        const data = await res.json();
        if (!data.success) throw new Error(data.error || "Avatar upload failed");
        
        finalAvatarUrl = data.url;
        
        // Update database with new avatar URL
        const supabase = createClient();
        const { error: avatarError } = await supabase
          .from('profiles')
          .update({ avatar_url: finalAvatarUrl })
          .eq('id', user?.id);
        
        if (avatarError) throw avatarError;
      }

      // 2. Handle Password Change if fields are filled
      if (oldPassword || newPassword || confirmPassword) {
        const result = await updatePassword(formData);
        if (!result.success) throw new Error(result.error || "Password update failed");
        toast.success("Password updated!");
      }

      // Final Success
      if (pendingAvatarFile) toast.success("Profile picture updated!");
      if (!oldPassword && !newPassword && pendingAvatarFile) {
        // Only avatar changed
      } else if (!pendingAvatarFile && !oldPassword && !newPassword) {
         toast.error("No changes detected");
         setUpdating(false);
         return;
      }

      setUser(prev => prev ? { ...prev, avatar_url: finalAvatarUrl || prev.avatar_url } : null);
      setPendingAvatarFile(null);
      setPreviewAvatar(null);
      (e.target as HTMLFormElement).reset();
      
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div className="p-12 text-slate-400 font-black uppercase tracking-widest text-xs animate-pulse">Loading profile...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-24">
      <input 
        type="file" 
        accept="image/*" 
        className="hidden" 
        ref={fileInputRef} 
        onChange={handleAvatarSelect} 
      />

      <div>
        <h1 className="text-4xl font-black uppercase tracking-tighter text-slate-900">
          MY <span className="text-[#081ff0] italic">PROFILE</span>
        </h1>
        <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mt-1">
          Manage your account settings and security
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Account Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm text-center space-y-6 relative overflow-hidden group">
            {/* Background Accent */}
            <div className="absolute top-0 left-0 w-full h-24 bg-slate-50 border-b border-slate-100 z-0" />
            
            <div className="relative z-10">
              <div className="relative w-32 h-32 mx-auto mb-6">
                <div className="w-full h-full bg-white rounded-full p-1.5 shadow-xl border border-slate-100 overflow-hidden">
                  {(previewAvatar || user?.avatar_url) ? (
                    <img src={previewAvatar || user?.avatar_url || ""} alt="Profile" className="w-full h-full object-cover rounded-full" />
                  ) : (
                    <div className="w-full h-full bg-[#081ff0]/5 rounded-full flex items-center justify-center text-[#081ff0] font-black text-3xl">
                      {user?.email.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-1 right-1 w-10 h-10 bg-[#081ff0] hover:bg-[#0618cc] text-white rounded-full flex items-center justify-center shadow-lg border-4 border-white transition-all transform hover:scale-110"
                  title="Change Picture"
                >
                  <Camera size={16} />
                </button>
              </div>

              <div>
                <p className="text-xl font-black text-slate-900 uppercase tracking-tighter truncate">{user?.email.split('@')[0]}</p>
                <div className={`inline-flex items-center gap-2 px-3 py-1 mt-2 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                  user?.role === 'admin' ? "bg-[#081ff0]/5 border-[#081ff0]/20 text-[#081ff0]" : "bg-slate-50 border-slate-200 text-slate-400"
                }`}>
                  {user?.role === 'admin' ? <ShieldCheck size={12} /> : null}
                  {user?.role}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex items-center gap-3 text-slate-500 relative z-10">
              <Mail size={16} className="text-slate-300" />
              <span className="text-xs font-bold truncate">{user?.email}</span>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-3xl p-6 space-y-3">
             <div className="flex items-center gap-2 text-amber-700 font-black uppercase tracking-widest text-[10px]">
                <AlertCircle size={14} /> Security Note
             </div>
             <p className="text-[11px] text-amber-600/80 font-medium leading-relaxed">
                Regularly updating your password helps keep your administrative account secure. Use a mix of letters, numbers, and symbols.
             </p>
          </div>
        </div>

        {/* Save Changes Form */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-12 shadow-sm space-y-8">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400">
                  <Lock size={24} />
               </div>
               <div>
                  <h2 className="text-xl font-black uppercase tracking-tighter text-slate-900">ACCOUNT <span className="text-[#081ff0] italic">SECURITY</span></h2>
                  <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Update your credentials and profile</p>
               </div>
            </div>

            <form onSubmit={handleSaveChanges} className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Current Password</label>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#081ff0] transition-colors">
                      <Lock size={18} />
                    </div>
                    <input 
                      type={showPasswords.old ? "text" : "password"}
                      name="oldPassword"
                      placeholder="Enter current password to verify changes"
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-12 focus:outline-none focus:border-[#081ff0] transition-all text-sm font-bold text-slate-900 placeholder:font-medium placeholder:text-slate-300 shadow-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords(p => ({ ...p, old: !p.old }))}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showPasswords.old ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">New Password</label>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#081ff0] transition-colors">
                        <Lock size={18} />
                      </div>
                      <input 
                        type={showPasswords.new ? "text" : "password"}
                        name="newPassword"
                        placeholder="Min. 6 characters"
                        minLength={6}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-12 focus:outline-none focus:border-[#081ff0] transition-all text-sm font-bold text-slate-900 placeholder:font-medium placeholder:text-slate-300 shadow-sm"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPasswords(p => ({ ...p, new: !p.new }))}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                      >
                        {showPasswords.new ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Confirm New Password</label>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#081ff0] transition-colors">
                        <Lock size={18} />
                      </div>
                      <input 
                        type={showPasswords.confirm ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="Re-type new password"
                        minLength={6}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-12 focus:outline-none focus:border-[#081ff0] transition-all text-sm font-bold text-slate-900 placeholder:font-medium placeholder:text-slate-300 shadow-sm"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPasswords(p => ({ ...p, confirm: !p.confirm }))}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                      >
                        {showPasswords.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button 
                  disabled={updating}
                  className="w-full bg-[#081ff0] text-white font-black py-4 rounded-2xl uppercase tracking-[0.2em] text-xs hover:bg-[#0618cc] shadow-lg shadow-[#081ff0]/20 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {updating ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <>
                      <Save size={18} /> Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
