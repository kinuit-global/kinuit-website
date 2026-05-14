"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  User, 
  Phone, 
  Mail, 
  Building2, 
  MessageSquareQuote,
  Save,
  Loader2,
  AlertCircle,
  Globe,
  Image as ImageIcon,
  Video,
  Mic,
  Plus
} from "lucide-react";
import { editTestimonial } from "@/app/actions/testimonial";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";

const testimonialSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  phone: z.string().min(5, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email address").optional().or(z.literal("")),
  companyName: z.string().min(2, "Company name is required"),
  testimonial: z.string().min(10, "Testimonial must be at least 10 characters"),
  showOnWebsite: z.boolean().optional(),
});

type TestimonialValues = z.infer<typeof testimonialSchema>;

type TestimonialData = {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  companyName: string;
  testimonial: string;
  showOnWebsite?: boolean;
  attachments?: {
    logo?: string | null;
    profile?: string | null;
    video?: string | null;
    audio?: string | null;
    images?: string[];
  };
};

interface EditTestimonialFormProps {
  testimonial: TestimonialData;
}

export default function EditTestimonialForm({ testimonial }: EditTestimonialFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TestimonialValues>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      fullName: testimonial.fullName,
      phone: testimonial.phone,
      email: testimonial.email || "",
      companyName: testimonial.companyName,
      testimonial: testimonial.testimonial,
      showOnWebsite: !!testimonial.showOnWebsite,
    },
  });

  const onSubmit: SubmitHandler<TestimonialValues> = async (data, e) => {
    if (!e) return;
    setIsSubmitting(true);
    const loadingToast = toast.loading("Updating testimonial...");

    try {
      const formData = new FormData(e.target as HTMLFormElement);
      // Ensure showOnWebsite is boolean string for the server action
      formData.set("showOnWebsite", data.showOnWebsite ? "true" : "false");
      
      const result = await editTestimonial(testimonial.id, formData);

      if (result.success) {
        toast.success("Testimonial updated successfully!", { id: loadingToast });
        router.refresh();
      } else {
        toast.error(result.error || "Failed to update testimonial.", { id: loadingToast });
      }
    } catch (err) {
      toast.error("An unexpected error occurred.", { id: loadingToast });
      console.error("Update error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderCurrentMedia = (url: string | null | undefined, label: string) => {
    if (!url) return null;
    return (
      <div className="mt-2 p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-3">
        <div className="w-10 h-10 relative rounded-lg overflow-hidden border border-slate-200 bg-white shrink-0">
          {url.match(/\.(jpg|jpeg|png|gif|webp)/i) ? (
            <Image src={url} alt={label} fill className="object-cover" />
          ) : (
             <div className="w-full h-full flex items-center justify-center text-slate-400">
               <ImageIcon size={20} />
             </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Current {label}</p>
          <p className="text-[11px] font-bold text-[#081ff0] truncate uppercase tracking-tight">{url.split('/').pop()}</p>
        </div>
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-4xl mx-auto">
      {/* Header Info */}
      <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
        <h2 className="text-[10px] font-black tracking-[0.2em] text-[#081ff0] uppercase mb-6 opacity-70">Visibility & Status</h2>
        <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-2xl">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${testimonial.showOnWebsite ? 'bg-[#081ff0]/10 text-[#081ff0]' : 'bg-slate-200 text-slate-400'}`}>
              <Globe size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 uppercase tracking-tight">Show on Website</p>
              <p className="text-[10px] font-medium text-slate-500 uppercase tracking-widest">Toggle visibility on homepage</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              {...register("showOnWebsite")}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#081ff0]"></div>
          </label>
        </div>
      </div>

      {/* Main Details */}
      <div className="bg-white border border-slate-200 rounded-3xl p-8 space-y-6 shadow-sm">
        <h2 className="text-[10px] font-black tracking-[0.2em] text-[#081ff0] uppercase mb-4 opacity-70">Client Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-600 uppercase ml-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 w-4 h-4" />
              <input 
                {...register("fullName")}
                className={`w-full bg-slate-50 border ${errors.fullName ? 'border-red-500' : 'border-slate-200'} rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-[#081ff0] focus:ring-1 focus:ring-[#081ff0] transition-all text-slate-900 font-semibold`}
              />
            </div>
            {errors.fullName && <p className="text-[10px] text-red-500 font-bold uppercase mt-1 ml-1">{errors.fullName.message}</p>}
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-600 uppercase ml-1">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 w-4 h-4" />
              <input 
                {...register("phone")}
                className={`w-full bg-slate-50 border ${errors.phone ? 'border-red-500' : 'border-slate-200'} rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-[#081ff0] focus:ring-1 focus:ring-[#081ff0] transition-all text-slate-900 font-semibold`}
              />
            </div>
            {errors.phone && <p className="text-[10px] text-red-500 font-bold uppercase mt-1 ml-1">{errors.phone.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-600 uppercase ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 w-4 h-4" />
              <input 
                {...register("email")}
                className={`w-full bg-slate-50 border ${errors.email ? 'border-red-500' : 'border-slate-200'} rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-[#081ff0] focus:ring-1 focus:ring-[#081ff0] transition-all text-slate-900 font-semibold`}
              />
            </div>
            {errors.email && <p className="text-[10px] text-red-500 font-bold uppercase mt-1 ml-1">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-600 uppercase ml-1">Company Name</label>
            <div className="relative">
              <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 w-4 h-4" />
              <input 
                {...register("companyName")}
                className={`w-full bg-slate-50 border ${errors.companyName ? 'border-red-500' : 'border-slate-200'} rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-[#081ff0] focus:ring-1 focus:ring-[#081ff0] transition-all text-slate-900 font-semibold`}
              />
            </div>
            {errors.companyName && <p className="text-[10px] text-red-500 font-bold uppercase mt-1 ml-1">{errors.companyName.message}</p>}
          </div>
        </div>
      </div>

      {/* Media Attachments */}
      <div className="bg-white border border-slate-200 rounded-3xl p-8 space-y-6 shadow-sm">
        <h2 className="text-[10px] font-black tracking-[0.2em] text-[#081ff0] uppercase mb-4 opacity-70">Media Attachments (Optional)</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Company Logo */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-600 uppercase ml-1 flex items-center gap-2">
              <Building2 size={14} className="text-[#081ff0]" />
              Company Logo
            </label>
            <div className="relative group">
              <input type="file" name="companyLogo" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer z-10" />
              <div className="w-full h-32 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center transition-all group-hover:border-[#081ff0] group-hover:bg-[#081ff0]/5">
                <Plus size={24} className="text-slate-300 group-hover:text-[#081ff0] mb-2" />
                <p className="text-[10px] font-black text-slate-400 group-hover:text-[#081ff0] uppercase tracking-widest">Update Logo</p>
              </div>
            </div>
            {renderCurrentMedia(testimonial.attachments?.logo, "Logo")}
          </div>

          {/* Profile Photo */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-600 uppercase ml-1 flex items-center gap-2">
              <User size={14} className="text-[#081ff0]" />
              Profile Photo
            </label>
            <div className="relative group">
              <input type="file" name="profilePhoto" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer z-10" />
              <div className="w-full h-32 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center transition-all group-hover:border-[#081ff0] group-hover:bg-[#081ff0]/5">
                <Plus size={24} className="text-slate-300 group-hover:text-[#081ff0] mb-2" />
                <p className="text-[10px] font-black text-slate-400 group-hover:text-[#081ff0] uppercase tracking-widest">Update Photo</p>
              </div>
            </div>
            {renderCurrentMedia(testimonial.attachments?.profile, "Photo")}
          </div>

          {/* Video Testimonial */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-600 uppercase ml-1 flex items-center gap-2">
              <Video size={14} className="text-[#081ff0]" />
              Video Testimonial
            </label>
            <div className="relative group">
              <input type="file" name="video" accept="video/*" className="absolute inset-0 opacity-0 cursor-pointer z-10" />
              <div className="w-full h-32 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center transition-all group-hover:border-[#081ff0] group-hover:bg-[#081ff0]/5">
                <Plus size={24} className="text-slate-300 group-hover:text-[#081ff0] mb-2" />
                <p className="text-[10px] font-black text-slate-400 group-hover:text-[#081ff0] uppercase tracking-widest">Update Video</p>
              </div>
            </div>
            {renderCurrentMedia(testimonial.attachments?.video, "Video")}
          </div>

          {/* Audio Testimonial */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-600 uppercase ml-1 flex items-center gap-2">
              <Mic size={14} className="text-[#081ff0]" />
              Audio Testimonial
            </label>
            <div className="relative group">
              <input type="file" name="audio" accept="audio/*" className="absolute inset-0 opacity-0 cursor-pointer z-10" />
              <div className="w-full h-32 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center transition-all group-hover:border-[#081ff0] group-hover:bg-[#081ff0]/5">
                <Plus size={24} className="text-slate-300 group-hover:text-[#081ff0] mb-2" />
                <p className="text-[10px] font-black text-slate-400 group-hover:text-[#081ff0] uppercase tracking-widest">Update Audio</p>
              </div>
            </div>
            {renderCurrentMedia(testimonial.attachments?.audio, "Audio")}
          </div>

          {/* Gallery Images */}
          <div className="md:col-span-2 space-y-3">
            <label className="text-xs font-bold text-slate-600 uppercase ml-1 flex items-center gap-2">
              <ImageIcon size={14} className="text-[#081ff0]" />
              Supporting Images (Gallery)
            </label>
            <div className="relative group">
              <input type="file" name="images" accept="image/*" multiple className="absolute inset-0 opacity-0 cursor-pointer z-10" />
              <div className="w-full h-32 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center transition-all group-hover:border-[#081ff0] group-hover:bg-[#081ff0]/5">
                <Plus size={24} className="text-slate-300 group-hover:text-[#081ff0] mb-2" />
                <p className="text-[10px] font-black text-slate-400 group-hover:text-[#081ff0] uppercase tracking-widest">Add Images to Gallery</p>
              </div>
            </div>
            {testimonial.attachments?.images && testimonial.attachments.images.length > 0 && (
              <div className="mt-4 grid grid-cols-4 sm:grid-cols-6 gap-3">
                {testimonial.attachments.images.map((img, i) => (
                  <div key={i} className="aspect-square relative rounded-xl overflow-hidden border border-slate-200">
                    <Image src={img} alt={`Gallery ${i}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Testimonial Content */}
      <div className="bg-white border border-slate-200 rounded-3xl p-8 space-y-6 shadow-sm">
        <h2 className="text-[10px] font-black tracking-[0.2em] text-[#081ff0] uppercase mb-4 opacity-70">Testimonial Content</h2>
        
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-600 uppercase ml-1">Written Testimonial</label>
          <div className="relative">
            <MessageSquareQuote className="absolute left-4 top-4 text-slate-300 w-4 h-4" />
            <textarea 
              {...register("testimonial")}
              rows={6}
              className={`w-full bg-slate-50 border ${errors.testimonial ? 'border-red-500' : 'border-slate-200'} rounded-2xl p-4 pl-12 focus:outline-none focus:border-[#081ff0] focus:ring-1 focus:ring-[#081ff0] transition-all text-slate-900 font-semibold resize-none`}
            />
          </div>
          {errors.testimonial && <p className="text-[10px] text-red-500 font-bold uppercase mt-1 ml-1">{errors.testimonial.message}</p>}
        </div>
      </div>

      <button 
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#081ff0] text-white font-black py-5 rounded-2xl uppercase tracking-widest hover:bg-[#0618cc] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group shadow-xl"
      >
        {isSubmitting ? (
          <Loader2 className="animate-spin" />
        ) : (
          <>
            Save Changes
            <Save size={18} className="group-hover:scale-110 transition-transform" />
          </>
        )}
      </button>
    </form>
  );
}

