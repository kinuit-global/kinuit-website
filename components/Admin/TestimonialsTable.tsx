"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Trash2, 
  Building2, 
  Mail, 
  Phone, 
  Image as ImageIcon,
  Video,
  Music,
  User,
  CheckCircle2,
  FileDown,
  Eye
} from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import { removeTestimonial } from "@/app/actions/testimonial";
import DataTable, { Column } from "./DataTable";
import ConfirmModal from "@/components/ui/ConfirmModal";
import toast from "react-hot-toast";

interface Testimonial {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  companyName: string;
  testimonial: string;
  submittedAt: string;
  attachments?: {
    logo?: string | null;
    profile?: string | null;
    video?: string | null;
    audio?: string | null;
    images?: string[];
  };
}

export default function TestimonialsTable({ testimonials }: { testimonials: Testimonial[] }) {
  const [localTestimonials, setLocalTestimonials] = useState<Testimonial[]>(testimonials);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const router = useRouter();

  // Sync with props if they change
  useEffect(() => {
    setLocalTestimonials(testimonials);
  }, [testimonials]);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await removeTestimonial(id);
      setLocalTestimonials(prev => prev.filter(t => t.id !== id));
      router.refresh();
      toast.success("Testimonial removed successfully");
    } catch (error) {
      toast.error("Failed to remove testimonial");
    } finally {
      setDeletingId(null);
      setConfirmId(null);
    }
  };

  const AttachmentIcon = ({ type, url, count }: { type: string, url?: string | null, count?: number }) => {
    if (!url && !count) return null;
    
    const iconMap: Record<string, any> = {
        logo: <Building2 size={14} />,
        profile: <User size={14} />,
        video: <Video size={14} />,
        audio: <Music size={14} />,
        images: <ImageIcon size={14} />
    };

    return (
        <a 
            href={url || "#"} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-1.5 px-2 py-1 bg-white/5 border border-white/10 rounded-lg hover:bg-blue-500/10 hover:border-blue-500/20 transition-all text-[10px] font-black uppercase tracking-wider text-white/60 hover:text-blue-500 group"
        >
            {iconMap[type]}
            {type} {count ? `(${count})` : ""}
            <FileDown size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
        </a>
    );
  };

  const columns: Column<Testimonial>[] = [
    {
      header: "Sender",
      accessor: (t) => (
        <div className="space-y-1.5 text-sm">
          <p className="font-black text-white uppercase tracking-tighter text-base">{t.fullName}</p>
          <div className="flex items-center gap-2 text-white/40 font-bold uppercase text-[10px] tracking-widest">
             <Building2 size={12} className="text-blue-500/50" />
             {t.companyName}
          </div>
          {t.email && (
            <div className="flex items-center gap-2 text-white/40 font-medium text-xs lowercase">
              <Mail size={12} className="text-blue-500/30" />
              {t.email}
            </div>
          )}
          <div className="flex items-center gap-2 text-white/40 font-medium text-xs">
             <Phone size={12} className="text-blue-500/30" />
             {t.phone}
          </div>
        </div>
      ),
      className: "min-w-[240px]",
    },
    {
      header: "Testimonial",
      accessor: (t) => (
        <p className="text-white/60 text-sm font-medium leading-relaxed italic max-w-md">
          "{t.testimonial}"
        </p>
      ),
      className: "min-w-[300px]",
    },
    {
      header: "Attachments",
      accessor: (t) => (
        <div className="flex flex-wrap gap-2">
          <AttachmentIcon type="logo" url={t.attachments?.logo} />
          <AttachmentIcon type="profile" url={t.attachments?.profile} />
          <AttachmentIcon type="video" url={t.attachments?.video} />
          <AttachmentIcon type="audio" url={t.attachments?.audio} />
          {t.attachments?.images && t.attachments.images.length > 0 && (
              <AttachmentIcon type="images" count={t.attachments.images.length} url={t.attachments.images[0]} />
          )}
          {!t.attachments?.logo && !t.attachments?.profile && !t.attachments?.video && !t.attachments?.audio && (!t.attachments?.images || t.attachments.images.length === 0) && (
              <span className="text-[10px] font-black uppercase tracking-widest text-white/20">No Attachments</span>
          )}
        </div>
      ),
    },
    {
      header: "Date",
      accessor: (t) => (
        <div className="flex flex-col gap-1">
          <p className="text-xs font-black text-white uppercase tracking-tighter">
              {format(new Date(t.submittedAt), "MMM dd, yyyy")}
          </p>
          <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">
              {format(new Date(t.submittedAt), "hh:mm aa")}
          </p>
        </div>
      ),
    },
    {
      header: "Actions",
      accessor: (t) => (
        <div className="flex items-center md:justify-end gap-2">
          <Link
            href={`/admin/testimonials/${t.id}`}
            className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-white/40 hover:bg-blue-500/10 hover:border-blue-500/30 hover:text-blue-500 transition-all group/btn"
            title="View Details"
          >
            <Eye size={18} className="group-hover/btn:scale-110 transition-transform" />
          </Link>
          <button 
            disabled={deletingId === t.id}
            onClick={() => setConfirmId(t.id)}
            className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-white/40 hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-500 transition-all disabled:opacity-30 disabled:cursor-not-allowed group/btn"
            title="Delete"
          >
            <Trash2 size={18} className="group-hover/btn:scale-110 transition-transform" />
          </button>
        </div>
      ),
      className: "text-right",
    }
  ];

  return (
    <>
    <DataTable 
      columns={columns} 
      data={localTestimonials} 
      searchPlaceholder="Search name, company, message..."
      filterFn={(t, term) => 
        t.fullName.toLowerCase().includes(term.toLowerCase()) ||
        t.companyName.toLowerCase().includes(term.toLowerCase()) ||
        t.testimonial.toLowerCase().includes(term.toLowerCase()) ||
        !!(t.email && t.email.toLowerCase().includes(term.toLowerCase()))
      }
      emptyMessage="No testimonials found"
    />

    <ConfirmModal 
      isOpen={!!confirmId}
      onClose={() => setConfirmId(null)}
      onConfirm={() => confirmId && handleDelete(confirmId)}
      title="Delete Testimonial"
      message="Are you sure you want to delete this testimonial? All associated files will be permanently removed."
      confirmText={deletingId ? "Deleting..." : "Delete"}
    />
    </>
  );
}
