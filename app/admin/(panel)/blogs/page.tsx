"use client";

import React, { useEffect, useState } from "react";
import { FileText, Plus, Edit, Trash2, Calendar, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { BlogPost } from "@/lib/blog";
import toast from "react-hot-toast";
import ConfirmModal from "@/components/ui/ConfirmModal";

export default function BlogsAdminPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(posts.length / itemsPerPage);
  const paginatedPosts = posts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/admin/blogs");
      if (!res.ok) throw new Error("Failed to fetch posts");
      const data = await res.json();
      setPosts(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id: string) => {
    setIsDeleting(id);
    try {
      const res = await fetch(`/api/admin/blogs?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      setPosts(posts.filter((p) => p.id !== id));
      toast.success("Blog post deleted successfully");
    } catch (err: any) {
      toast.error(err.message || "Error deleting post");
    } finally {
      setIsDeleting(null);
      setDeleteConfirmId(null);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter flex flex-wrap items-center gap-3">
            BLOG <span className="text-blue-500 italic">MANAGEMENT</span>
            <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-black tracking-widest text-blue-500 flex items-center gap-1">
              <Sparkles size={12} /> AI ENABLED
            </span>
          </h1>
          <p className="text-white/40 text-sm font-medium uppercase tracking-widest max-w-lg">
            Create, edit, and optimize your blog content with AI.
          </p>
        </div>
        
        <Link 
          href="/admin/blogs/editor/new"
          className="flex items-center justify-center w-fit gap-2 px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 transition-all text-xs font-black uppercase tracking-widest text-white mt-2"
        >
          <Plus size={18} />
          Create New Post
        </Link>
      </div>

      <div className="relative group">
        <div className="absolute -inset-1 bg-linear-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur opacity-30 transition duration-1000"></div>
        <div className="relative overflow-hidden bg-white/5 border border-white/10 rounded-3xl backdrop-blur-sm p-6 text-white min-h-[400px]">
          {loading ? (
            <div className="flex items-center justify-center h-64 text-white/40">Loading posts...</div>
          ) : error ? (
            <div className="flex items-center justify-center h-64 text-red-400">{error}</div>
          ) : posts.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center space-y-4">
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-white/20">
                <FileText size={32} />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold uppercase tracking-tight">No blog posts found</h3>
                <p className="text-white/40 text-sm max-w-xs mx-auto">You don't have any blog posts yet. Click the create button to get started.</p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Mobile Card View */}
              <div className="grid grid-cols-1 gap-4 md:hidden">
                {paginatedPosts.map((post) => (
                  <div key={post.id} className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4 hover:bg-white/[0.07] transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="relative group/img shrink-0">
                        <div className="absolute -inset-1 bg-blue-500/20 rounded-xl blur opacity-0 group-hover/img:opacity-100 transition duration-500"></div>
                        <img src={post.image} alt={post.title} className="relative w-20 h-20 rounded-xl object-cover border border-white/10" />
                      </div>
                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 bg-blue-500/10 border border-blue-500/20 rounded text-[9px] font-black uppercase text-blue-400 tracking-tighter">
                            {post.category}
                          </span>
                        </div>
                        <h3 className="font-bold text-sm leading-tight text-white line-clamp-2">{post.title}</h3>
                        <div className="flex items-center gap-2 text-[10px] text-white/40 font-medium italic">
                          <Calendar size={10} /> {post.date}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <Link 
                        href={`/admin/blogs/editor/${post.id}`}
                        className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 hover:bg-blue-500/20 text-white/60 hover:text-blue-400 transition-all text-[10px] font-black uppercase tracking-widest border border-white/5 group/btn"
                      >
                        <Edit size={14} className="group-hover/btn:scale-110 transition-transform" />
                        Edit Post
                      </Link>
                      <button 
                        onClick={() => setDeleteConfirmId(post.id)}
                        disabled={isDeleting === post.id}
                        className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 hover:bg-red-500/20 text-white/60 hover:text-red-400 transition-all text-[10px] font-black uppercase tracking-widest border border-white/5 group/btn"
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
                    <tr className="border-b border-white/10 text-xs font-black uppercase tracking-widest text-white/40">
                      <th className="p-4">Title</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Date</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedPosts.map((post) => (
                      <tr key={post.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img src={post.image} alt={post.title} className="w-12 h-12 rounded-lg object-cover border border-white/5" />
                            <div>
                              <p className="font-bold text-sm line-clamp-1">{post.title}</p>
                              <p className="text-xs text-white/40 line-clamp-1">{post.slug}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="px-2 py-1 bg-white/10 rounded text-[10px] font-black uppercase">{post.category}</span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2 text-xs text-white/60">
                            <Calendar size={14} /> {post.date}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center justify-end gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                            <Link 
                              href={`/admin/blogs/editor/${post.id}`}
                              className="p-2 rounded-xl bg-white/5 hover:bg-blue-500/20 text-white/60 hover:text-blue-400 transition-colors"
                            >
                              <Edit size={16} />
                            </Link>
                            <button 
                              onClick={() => setDeleteConfirmId(post.id)}
                              disabled={isDeleting === post.id}
                              className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-white/60 hover:text-red-400 transition-colors disabled:opacity-50"
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
          {!loading && !error && posts.length > itemsPerPage && (
            <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-6">
              <span className="text-xs text-white/40 font-bold tracking-widest uppercase">
                Showing {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, posts.length)} of {posts.length}
              </span>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors disabled:opacity-30 disabled:hover:bg-white/5 disabled:hover:text-white/60"
                >
                  <ChevronLeft size={16} />
                </button>
                <div className="flex items-center gap-1 px-2">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-6 h-6 flex items-center justify-center rounded-lg text-[10px] font-black transition-colors ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'text-white/40 hover:text-white hover:bg-white/10'}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <button 
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors disabled:opacity-30 disabled:hover:bg-white/5 disabled:hover:text-white/60"
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
        title="Delete Blog Post"
        message="Are you sure you want to delete this post? This action cannot be undone."
        confirmText={isDeleting ? "Deleting..." : "Delete"}
      />
    </div>
  );
}
