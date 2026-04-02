import React from "react";
import { getTestimonials } from "@/app/actions/testimonial";
import { 
  ArrowLeft, 
  User, 
  Building2, 
  Mail, 
  Phone, 
  Calendar,
  MessageSquareQuote,
  FileDown,
  Video,
  Music,
  Image as ImageIcon,
  CheckCircle2,
  ExternalLink,
  Trash2
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function TestimonialDetailPage({ params }: PageProps) {
  const { id } = await params;
  const testimonials = await getTestimonials();
  const testimonial = testimonials.find(t => t.id === id);

  if (!testimonial) {
    notFound();
  }

  const AttachmentCard = ({ title, url, icon: Icon, type }: { title: string, url?: string | null, icon: any, type: string }) => {
    if (!url) return null;
    
    return (
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 group hover:bg-white/10 transition-all">
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500">
            <Icon size={20} />
          </div>
          <span className="text-[10px] font-black uppercase text-white/20 tracking-widest">{type}</span>
        </div>
        <h4 className="text-sm font-bold uppercase tracking-tight mb-4">{title}</h4>
        <div className="flex gap-2">
            <a 
              href={url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
            >
                <ExternalLink size={14} />
                View File
            </a>
            <a 
              href={`/api/admin/download?url=${encodeURIComponent(url)}&filename=${encodeURIComponent(testimonial.fullName + '_' + title)}`}
              className="flex items-center justify-center px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
              download
            >
                <FileDown size={14} />
            </a>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto">
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Link 
          href="/admin/testimonials" 
          className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-xs font-black uppercase tracking-widest group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Testimonials
        </Link>
        <button className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl hover:bg-red-500/20 transition-all">
          <Trash2 size={18} />
        </button>
      </div>

      {/* Profile Header */}
      <div className="bg-white/2 border border-white/10 rounded-3xl p-10 flex flex-col md:flex-row gap-10">
        <div className="w-32 h-32 shrink-0 bg-white/5 rounded-3xl border border-white/10 overflow-hidden flex items-center justify-center">
            {testimonial.attachments?.profile ? (
                <img src={testimonial.attachments.profile} className="w-full h-full object-cover" alt={testimonial.fullName} />
            ) : (
                <User size={48} className="text-white/10" />
            )}
        </div>
        <div className="flex-1 space-y-6">
            <div className="space-y-2">
                <div className="flex items-center gap-3">
                    <h1 className="text-5xl font-black text-white uppercase tracking-tighter">{testimonial.fullName}</h1>
                    <CheckCircle2 className="text-blue-500" size={24} />
                </div>
                <div className="flex flex-wrap items-center gap-6 text-white/40">
                    <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider">
                        <Building2 size={16} className="text-blue-500/50" />
                        {testimonial.companyName}
                    </div>
                    <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider">
                        <Calendar size={16} className="text-blue-500/50" />
                        {format(new Date(testimonial.submittedAt), "MMMM dd, yyyy")}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-4">
                    <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-white/20">
                        <Mail size={18} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase text-white/20 tracking-widest mb-0.5">Email ADDRESS</p>
                        <p className="text-sm font-medium">{testimonial.email || "No email provided"}</p>
                    </div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-4">
                    <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-white/20">
                        <Phone size={18} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase text-white/20 tracking-widest mb-0.5">Phone NUMBER</p>
                        <p className="text-sm font-medium">{testimonial.phone}</p>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* Content and Media */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
            {/* Written Testimonial */}
            <div className="space-y-6">
                <h3 className="text-xl font-black uppercase tracking-tighter flex items-center gap-3">
                    <MessageSquareQuote className="text-blue-500" size={24} />
                    Written Testimonial
                </h3>
                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 relative overflow-hidden">
                    <div className="relative z-10">
                        <p className="text-xl text-white/80 font-medium leading-relaxed italic">
                            "{testimonial.testimonial}"
                        </p>
                    </div>
                    <MessageSquareQuote size={120} className="absolute -bottom-10 -right-10 text-white/2 pointer-events-none" />
                </div>
            </div>

            {/* Gallery images if any */}
            {testimonial.attachments?.images && testimonial.attachments.images.length > 0 && (
                <div className="space-y-6">
                    <h3 className="text-xl font-black uppercase tracking-tighter flex items-center gap-3">
                        <ImageIcon className="text-blue-500" size={24} />
                        Supporting Images
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {testimonial.attachments.images.map((img, i) => (
                            <div key={i} className="aspect-square rounded-2xl overflow-hidden border border-white/10 group relative">
                                <img src={img} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={`Supporting ${i}`} />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                     <a href={img} target="_blank" rel="noopener noreferrer" className="p-3 bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors">
                                        <ExternalLink size={18} />
                                     </a>
                                     <a href={`/api/admin/download?url=${encodeURIComponent(img)}&filename=${encodeURIComponent('gallery_' + i + '.jpg')}`} className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors">
                                        <FileDown size={18} />
                                     </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>

        {/* Media Sidebar */}
        <div className="space-y-10">
            <div className="space-y-6">
                <h3 className="text-xl font-black uppercase tracking-tighter">Media Files</h3>
                <div className="space-y-4">
                    <AttachmentCard title="Company Logo" url={testimonial.attachments?.logo} icon={Building2} type="IMAGE" />
                    <AttachmentCard title="Video Testimonial" url={testimonial.attachments?.video} icon={Video} type="VIDEO" />
                    <AttachmentCard title="Audio Testimonial" url={testimonial.attachments?.audio} icon={Music} type="AUDIO" />

                    {!testimonial.attachments?.logo && !testimonial.attachments?.video && !testimonial.attachments?.audio && (
                        <div className="p-10 border border-white/5 border-dashed rounded-3xl text-center opacity-20">
                            <p className="text-[10px] font-black uppercase tracking-widest text-white">No media files provided</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
