"use client";

import React, { useEffect, useState } from "react";
import { FileText, Plus, Edit, Trash2, Calendar, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CaseStudy } from "@/lib/case-studies";
import toast from "react-hot-toast";
import ConfirmModal from "@/components/ui/ConfirmModal";

export default function CaseStudiesAdminPage() {
  const [studies, setStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(studies.length / itemsPerPage);
  const paginatedStudies = studies.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const fetchStudies = async () => {
    try {
      const res = await fetch("/api/admin/case-studies");
      if (!res.ok) throw new Error("Failed to fetch case studies");
      const data = await res.json();
      setStudies(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudies();
  }, []);

  const handleDelete = async (id: string) => {
    setIsDeleting(id);
    try {
      const res = await fetch(`/api/admin/case-studies?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      
      const newStudies = studies.filter((p) => p.id !== id);
      setStudies(newStudies);
      
      // Safeguard pagination: if current page is now empty, go back
      const newTotalPages = Math.ceil(newStudies.length / itemsPerPage);
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages);
      }
      
      router.refresh();
      toast.success("Case study deleted successfully");
    } catch (err: any) {
      toast.error(err.message || "Error deleting case study");
    } finally {
      setIsDeleting(null);
      setDeleteConfirmId(null);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-black text-slate-950 uppercase tracking-tighter flex flex-wrap items-center gap-3">
            CASE STUDY <span className="text-[#081ff0] italic">MANAGEMENT</span>
            <span className="px-3 py-1 rounded-full bg-[#081ff0]/10 border border-[#081ff0]/20 text-[10px] font-black tracking-widest text-[#081ff0] flex items-center gap-1">
              <Sparkles size={12} /> AI ENABLED
            </span>
          </h1>
          <p className="text-slate-600 text-sm font-medium uppercase tracking-widest max-w-lg">
            Create, edit, and optimize your case study content with AI.
          </p>
        </div>
        
        <Link 
          href="/admin/case-studies/editor/new"
          className="flex items-center justify-center w-fit gap-2 px-6 py-3 rounded-2xl bg-[#081ff0] hover:bg-[#0618cc] transition-all text-xs font-black uppercase tracking-widest text-white mt-2 shadow-lg shadow-[#081ff0]/20"
        >
          <Plus size={18} />
          Create New Study
        </Link>
      </div>

      <div className="relative group">
        <div className="relative overflow-hidden bg-white border border-slate-200 rounded-3xl p-6 text-slate-900 min-h-[400px] shadow-sm">
          {loading ? (
            <div className="flex items-center justify-center h-64 text-slate-400">Loading case studies...</div>
          ) : error ? (
            <div className="flex items-center justify-center h-64 text-red-500">{error}</div>
          ) : studies.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center space-y-4">
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300">
                <FileText size={32} />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold uppercase tracking-tight text-slate-950">No case studies found</h3>
                <p className="text-slate-600 text-sm max-w-xs mx-auto">You don't have any case studies yet. Click the create button to get started.</p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Mobile Card View */}
              <div className="grid grid-cols-1 gap-4 md:hidden">
                {paginatedStudies.map((study) => (
                  <div key={study.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 hover:shadow-md transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="relative group/img shrink-0">
                        <img src={study.image} alt={study.title} className="relative w-20 h-20 rounded-xl object-cover border border-slate-200" />
                      </div>
                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 bg-[#081ff0]/10 border border-[#081ff0]/20 rounded text-[9px] font-black uppercase text-[#081ff0] tracking-tighter">
                            {study.category}
                          </span>
                        </div>
                        <h3 className="font-bold text-sm leading-tight text-slate-900 line-clamp-2">{study.title}</h3>
                        <div className="flex items-center gap-2 text-[10px] text-slate-400 font-medium italic">
                          <Calendar size={10} /> {study.date}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <Link 
                        href={`/admin/case-studies/editor/${study.id}`}
                        className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-all text-[10px] font-black uppercase tracking-widest border border-slate-200 group/btn"
                      >
                        <Edit size={14} className="group-hover/btn:scale-110 transition-transform" />
                        Edit Study
                      </Link>
                      <button 
                        onClick={() => setDeleteConfirmId(study.id)}
                        disabled={isDeleting === study.id}
                        className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white hover:bg-red-50 text-slate-600 hover:text-red-600 transition-all text-[10px] font-black uppercase tracking-widest border border-slate-200 group/btn"
                      >
                        <Trash2 size={14} className="group-hover/btn:scale-110 transition-transform" />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full min-w-[800px] text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-xs font-black uppercase tracking-widest text-slate-400">
                      <th className="p-4">Title</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Date</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedStudies.map((study) => (
                      <tr key={study.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img src={study.image} alt={study.title} className="w-12 h-12 rounded-lg object-cover border border-slate-100" />
                            <div>
                              <p className="font-bold text-sm text-slate-900 line-clamp-1">{study.title}</p>
                              <p className="text-xs text-slate-400 line-clamp-1">{study.slug}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="px-2 py-1 bg-slate-100 rounded text-[10px] font-black uppercase text-slate-600">{study.category}</span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2 text-xs text-slate-500">
                            <Calendar size={14} /> {study.date}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center justify-end gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                            <Link 
                              href={`/admin/case-studies/editor/${study.id}`}
                              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors"
                            >
                              <Edit size={16} />
                            </Link>
                            <button 
                              onClick={() => setDeleteConfirmId(study.id)}
                              disabled={isDeleting === study.id}
                              className="p-2 rounded-xl bg-slate-100 hover:bg-red-50 text-slate-500 hover:text-red-600 transition-colors disabled:opacity-50"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Pagination Controls */}
          {!loading && !error && studies.length > itemsPerPage && (
            <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-6">
              <span className="text-xs text-slate-400 font-bold tracking-widest uppercase">
                Showing {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, studies.length)} of {studies.length}
              </span>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors disabled:opacity-30"
                >
                  <ChevronLeft size={16} />
                </button>
                <div className="flex items-center gap-1 px-2">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-6 h-6 flex items-center justify-center rounded-lg text-[10px] font-black transition-colors ${currentPage === i + 1 ? 'bg-[#081ff0] text-white shadow-lg shadow-[#081ff0]/20' : 'text-slate-400 hover:text-slate-900 hover:bg-slate-100'}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <button 
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors disabled:opacity-30"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <ConfirmModal
        isOpen={!!deleteConfirmId}
        onClose={() => setDeleteConfirmId(null)}
        onConfirm={() => deleteConfirmId && handleDelete(deleteConfirmId)}
        title="Delete Case Study"
        message="Are you sure you want to delete this case study? This action cannot be undone."
        confirmText={isDeleting ? "Deleting..." : "Delete"}
      />
    </div>
  );
}
