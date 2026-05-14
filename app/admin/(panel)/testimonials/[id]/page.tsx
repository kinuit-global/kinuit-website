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
import EditTestimonialForm from "@/components/Admin/EditTestimonialForm";

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
      <div className="bg-white border border-slate-200 rounded-2xl p-6 group hover:shadow-md transition-all">
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 bg-[#081ff0]/10 rounded-xl flex items-center justify-center text-[#081ff0]">
            <Icon size={20} />
          </div>
          <span className="text-[10px] font-black uppercase text-slate-300 tracking-widest">{type}</span>
        </div>
        <h4 className="text-sm font-bold uppercase tracking-tight mb-4 text-slate-900">{title}</h4>
        <div className="flex gap-2">
            <a 
              href={url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#081ff0] hover:bg-[#0618cc] rounded-xl text-[10px] font-black uppercase tracking-widest text-white transition-all shadow-sm"
            >
                <ExternalLink size={14} />
                View File
            </a>
            <a 
              href={`/api/admin/download?url=${encodeURIComponent(url)}&filename=${encodeURIComponent(testimonial.fullName + '_' + title)}`}
              className="flex items-center justify-center px-4 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600 transition-all"
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
          className="flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors text-xs font-black uppercase tracking-widest group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Testimonials
        </Link>
        <button className="p-3 bg-red-50 border border-red-100 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm">
          <Trash2 size={18} />
        </button>
      </div>

      {/* Edit Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        <div className="lg:col-span-2">
            <EditTestimonialForm testimonial={testimonial} />
        </div>

        {/* Media Sidebar */}
        <div className="space-y-10">
            <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
                <h3 className="text-xl font-black uppercase tracking-tighter text-slate-900 mb-6">Media Files</h3>
                <div className="space-y-4">
                    <AttachmentCard title="Company Logo" url={testimonial.attachments?.logo} icon={Building2} type="IMAGE" />
                    <AttachmentCard title="Video Testimonial" url={testimonial.attachments?.video} icon={Video} type="VIDEO" />
                    <AttachmentCard title="Audio Testimonial" url={testimonial.attachments?.audio} icon={Music} type="AUDIO" />

                    {!testimonial.attachments?.logo && !testimonial.attachments?.video && !testimonial.attachments?.audio && (
                        <div className="p-10 border border-slate-200 border-dashed rounded-2xl text-center">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">No media files</p>
                        </div>
                    )}
                </div>
            </div>

            {testimonial.attachments?.images && testimonial.attachments.images.length > 0 && (
                <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
                    <h3 className="text-xl font-black uppercase tracking-tighter text-slate-900 mb-6">Gallery</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {testimonial.attachments.images.map((img, i) => (
                            <div key={i} className="aspect-square rounded-xl overflow-hidden border border-slate-200 group relative">
                                <img src={img} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={`Supporting ${i}`} />
                                <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5">
                                     <a href={img} target="_blank" rel="noopener noreferrer" className="p-2 bg-[#081ff0] text-white rounded-lg hover:bg-[#0618cc] transition-colors">
                                        <ExternalLink size={14} />
                                     </a>
                                     <a href={`/api/admin/download?url=${encodeURIComponent(img)}&filename=${encodeURIComponent('gallery_' + i + '.jpg')}`} className="p-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors">
                                        <FileDown size={14} />
                                     </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}
