"use client";

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Phone, 
  Mail,
  Building2, 
  Image as ImageIcon, 
  Upload, 
  Video, 
  Music, 
  CheckCircle2, 
  X,
  Loader2,
  Plus
} from 'lucide-react';
import { submitTestimonial } from '@/app/actions/testimonial';
import { toast } from 'react-hot-toast';

export default function TestimonialForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // File states for previews
  const [previews, setPreviews] = useState<{
    companyLogo?: string;
    profilePhoto?: string;
    video?: string;
    audio?: string;
    images: string[];
  }>({ images: [] });

  const formRef = useRef<HTMLFormElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, category: string) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (category === 'images') {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setPreviews(prev => ({ ...prev, images: [...prev.images, ...newImages] }));
    } else {
      const file = files[0];
      const url = URL.createObjectURL(file);
      setPreviews(prev => ({ ...prev, [category]: url }));
    }
  };

  const removeImage = (index: number) => {
      setPreviews(prev => {
          const newImages = [...prev.images];
          URL.revokeObjectURL(newImages[index]);
          newImages.splice(index, 1);
          return { ...prev, images: newImages };
      });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const loadingToast = toast.loading("Sending testimonial and uploading media...");

    try {
        const formData = new FormData(e.currentTarget);
        const result = (await submitTestimonial(formData)) as any;

        if (result.success) {
            const stats = result.uploadStats || {};
            const failures = Object.entries(stats)
                .filter(([_, stat]: any) => !stat.success)
                .map(([name, stat]: any) => `${name} (${stat.error || "Upload failed"})`);

            if (failures.length > 0) {
                // Partial success (Text saved, some media failed)
                toast.error(
                    `Testimonial saved, but failed to upload: ${failures.join(', ')}`, 
                    { id: loadingToast, duration: 8000 }
                );
            } else {
                // Full success
                toast.success("Testimonial submitted successfully!", { id: loadingToast });
            }
            setIsSuccess(true);
        } else {
            toast.error(result.error || "Failed to submit testimonial. Please try again.", { id: loadingToast });
            setError(result.error || "Failed to submit testimonial. Please try again.");
        }
    } catch (err) {
        toast.error("An unexpected error occurred. Please try again.", { id: loadingToast });
        console.error("Submission error:", err);
    } finally {
        setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6"
      >
        <div className="w-20 h-20 bg-k-primary/10 rounded-full flex items-center justify-center mb-6 border border-k-primary/20">
          <CheckCircle2 className="text-k-primary w-12 h-12" />
        </div>
        <h1 className="text-4xl font-black text-k-text mb-4 uppercase tracking-tight">Thank You!</h1>
        <p className="text-k-text-muted text-lg max-w-md">
          Your testimonial has been received. We appreciate you taking the time to share your experience with us.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6">
      <div className="mb-12">
        <h1 className="text-3xl md:text-5xl font-black text-k-text mb-4 uppercase tracking-tighter">
          Share your <span className="text-k-primary">experience</span>
        </h1>
        <p className="text-k-text-muted text-lg font-light max-w-2xl">
          We'd love to hear how we've helped you. Your feedback helps us improve and grow.
        </p>
      </div>

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
        {/* YOUR DETAILS */}
        <div className="bg-k-card-bg border border-k-border p-8 rounded-3xl space-y-6">
          <h2 className="text-[10px] font-black tracking-[0.2em] text-k-primary uppercase mb-4 opacity-70">Your Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-k-text/60 uppercase ml-1">Full name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-k-text/30 w-4 h-4" />
                <input 
                  required
                  name="fullName"
                  placeholder="Jane Smith"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-[#081ff0] focus:ring-1 focus:ring-[#081ff0] transition-all text-k-text placeholder-slate-400 font-semibold shadow-sm hover:border-slate-400"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-k-text/60 uppercase ml-1">Phone number</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-k-text/30 w-4 h-4" />
                <input 
                  required
                  name="phone"
                  placeholder="+1 (555) 000-0000"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-[#081ff0] focus:ring-1 focus:ring-[#081ff0] transition-all text-k-text placeholder-slate-400 font-semibold shadow-sm hover:border-slate-400"
                />
              </div>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-bold text-k-text/60 uppercase ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-k-text/30 w-4 h-4" />
                <input 
                  required
                  type="email"
                  name="email"
                  placeholder="jane@example.com"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-[#081ff0] focus:ring-1 focus:ring-[#081ff0] transition-all text-k-text placeholder-slate-400 font-semibold shadow-sm hover:border-slate-400"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-k-text/60 uppercase ml-1">Company name</label>
            <div className="relative">
              <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-k-text/30 w-4 h-4" />
              <input 
                required
                name="companyName"
                placeholder="Acme Corp"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-[#081ff0] focus:ring-1 focus:ring-[#081ff0] transition-all text-k-text placeholder-slate-400 font-semibold shadow-sm hover:border-slate-400"
              />
            </div>
          </div>
        </div>

        {/* BRANDING */}
        <div className="bg-k-card-bg border border-k-border p-8 rounded-3xl">
          <h2 className="text-[10px] font-black tracking-[0.2em] text-k-primary uppercase mb-6 opacity-70">Branding</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Company Logo */}
            <div className="space-y-4">
              <label className="text-xs font-bold text-k-text/60 uppercase ml-1">Company logo</label>
              <div 
                className="relative h-40 border-2 border-dashed border-k-border rounded-2xl flex flex-col items-center justify-center p-4 hover:border-k-primary/40 transition-colors group cursor-pointer overflow-hidden"
                onClick={() => document.getElementById('companyLogoInput')?.click()}
              >
                {previews.companyLogo ? (
                  <img src={previews.companyLogo} className="w-full h-full object-contain" alt="Logo preview" />
                ) : (
                  <>
                    <div className="w-12 h-12 bg-k-bg rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <ImageIcon className="text-k-text/30" />
                    </div>
                    <span className="text-xs text-k-text/50 font-medium">PNG, SVG, JPG</span>
                  </>
                )}
                <input 
                  id="companyLogoInput"
                  type="file" 
                  name="companyLogo" 
                  accept="image/*"
                  className="hidden" 
                  onChange={(e) => handleFileChange(e, 'companyLogo')}
                />
              </div>
            </div>

            {/* Profile Photo */}
            <div className="space-y-4">
              <label className="text-xs font-bold text-k-text/60 uppercase ml-1">Profile photo</label>
              <div 
                className="relative h-40 border-2 border-dashed border-k-border rounded-2xl flex flex-col items-center justify-center p-4 hover:border-k-primary/40 transition-colors group cursor-pointer overflow-hidden"
                onClick={() => document.getElementById('profilePhotoInput')?.click()}
              >
                {previews.profilePhoto ? (
                  <img src={previews.profilePhoto} className="w-full h-full object-cover" alt="Profile preview" />
                ) : (
                  <>
                    <div className="w-12 h-12 bg-k-bg rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <User className="text-k-text/30" />
                    </div>
                    <span className="text-xs text-k-text/50 font-medium">JPG, PNG, WEBP</span>
                  </>
                )}
                <input 
                  id="profilePhotoInput"
                  type="file" 
                  name="profilePhoto" 
                  accept="image/*"
                  className="hidden" 
                  onChange={(e) => handleFileChange(e, 'profilePhoto')}
                />
              </div>
            </div>
          </div>
        </div>

        {/* TESTIMONIAL */}
        <div className="bg-k-card-bg border border-k-border p-8 rounded-3xl space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-[10px] font-black tracking-[0.2em] text-k-primary uppercase opacity-70">Your Testimonial</h2>
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-bold text-k-text/60 uppercase ml-1">Written testimonial</label>
            <textarea 
              required
              name="testimonial"
              placeholder="Tell us about your experience working with us..."
              rows={5}
              className="w-full bg-slate-50 border border-slate-300 rounded-2xl p-4 focus:outline-none focus:border-[#081ff0] focus:ring-1 focus:ring-[#081ff0] transition-all text-k-text placeholder-slate-400 font-semibold shadow-sm hover:border-slate-400 resize-none"
            />
          </div>
        </div>

        {/* MEDIA ATTACHMENTS */}
        <div className="bg-k-card-bg border border-k-border p-8 rounded-3xl space-y-8">
          <h2 className="text-[10px] font-black tracking-[0.2em] text-k-primary uppercase opacity-70">Media Attachments</h2>
          
          {/* Video upload */}
          <div className="space-y-3">
             <label className="text-xs font-bold text-k-text/60 uppercase ml-1">Video testimonial</label>
             <div 
                className="flex items-center gap-4 p-4 border border-k-border rounded-2xl hover:bg-k-bg/30 transition-colors cursor-pointer"
                onClick={() => document.getElementById('videoInput')?.click()}
             >
                <div className="w-10 h-10 bg-k-primary/10 rounded-xl flex items-center justify-center text-k-primary">
                    <Video size={20} />
                </div>
                <div className="flex-1">
                    <p className="text-sm font-bold text-k-text">
                        {previews.video ? "Video selected" : "Click to upload video"}
                    </p>
                    <p className="text-[10px] text-k-text/40 uppercase font-black tracking-wider mt-0.5">MP4, MOV, WEBM • Up to 500MB</p>
                </div>
                {previews.video && <CheckCircle2 className="text-k-primary" size={20} />}
                <input 
                  id="videoInput"
                  type="file" 
                  name="video" 
                  accept="video/*"
                  className="hidden" 
                  onChange={(e) => handleFileChange(e, 'video')}
                />
             </div>
          </div>

          {/* Audio upload */}
          <div className="space-y-3">
             <label className="text-xs font-bold text-k-text/60 uppercase ml-1">Audio testimonial</label>
             <div 
                className="flex items-center gap-4 p-4 border border-k-border rounded-2xl hover:bg-k-bg/30 transition-colors cursor-pointer"
                onClick={() => document.getElementById('audioInput')?.click()}
             >
                <div className="w-10 h-10 bg-k-primary/10 rounded-xl flex items-center justify-center text-k-primary">
                    <Music size={20} />
                </div>
                <div className="flex-1">
                    <p className="text-sm font-bold text-k-text">
                        {previews.audio ? "Audio selected" : "Click to upload audio"}
                    </p>
                    <p className="text-[10px] text-k-text/40 uppercase font-black tracking-wider mt-0.5">MP3, WAV, M4A • Up to 100MB</p>
                </div>
                {previews.audio && <CheckCircle2 className="text-k-primary" size={20} />}
                <input 
                  id="audioInput"
                  type="file" 
                  name="audio" 
                  accept="audio/*"
                  className="hidden" 
                  onChange={(e) => handleFileChange(e, 'audio')}
                />
             </div>
          </div>

          {/* Multiple Images */}
          <div className="space-y-4">
            <label className="text-xs font-bold text-k-text/60 uppercase ml-1">Supporting images</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              <AnimatePresence>
                {previews.images.map((url, idx) => (
                  <motion.div 
                    key={url}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="relative aspect-square rounded-xl overflow-hidden border border-k-border group"
                  >
                    <img src={url} className="w-full h-full object-cover" alt={`Gallery ${idx}`} />
                    <button 
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={14} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              <button 
                type="button"
                onClick={() => document.getElementById('imagesInput')?.click()}
                className="aspect-square border-2 border-dashed border-k-border rounded-xl flex flex-col items-center justify-center text-k-text/30 hover:border-k-primary/40 hover:text-k-primary/40 transition-all group"
              >
                <Plus className="mb-2 group-hover:rotate-90 transition-transform" />
                <span className="text-[10px] font-black uppercase tracking-widest">Add Image</span>
              </button>
              <input 
                id="imagesInput"
                type="file" 
                name="images" 
                multiple
                accept="image/*"
                className="hidden" 
                onChange={(e) => handleFileChange(e, 'images')}
              />
            </div>
            <div className="flex gap-2">
                <span className="px-2 py-1 bg-k-primary/10 text-k-primary text-[10px] font-black uppercase rounded-lg">Max 10 files</span>
                <span className="px-2 py-1 bg-k-primary/10 text-k-primary text-[10px] font-black uppercase rounded-lg">10MB per image</span>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl text-sm font-medium">
            {error}
          </div>
        )}

        <button 
          disabled={isSubmitting}
          className="w-full bg-k-text text-k-bg font-black py-5 rounded-2xl uppercase tracking-widest hover:bg-k-primary hover:text-white transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group shadow-xl"
        >
          {isSubmitting ? (
            <Loader2 className="animate-spin" />
          ) : (
            <>
              Submit Testimonial
              <Upload size={18} className="group-hover:-translate-y-1 transition-transform" />
            </>
          )}
        </button>
        <p className="text-center text-k-text/40 text-xs font-medium">
            Your submission is private and will be reviewed before use.
        </p>
      </form>
    </div>
  );
}
