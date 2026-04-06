"use client";

import React, { useState, useEffect, useRef, use } from "react";
import { ChevronLeft, Save, Sparkles, Wand2, ArrowRightLeft, AlignLeft, Search, FileText, Image as ImageIcon, Eye, PencilLine, UploadCloud, CheckCircle2, XCircle, History } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BlogPost } from "@/lib/blog";
import toast from "react-hot-toast";

export default function BlogEditorPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const isNew = resolvedParams.id === "new";
  
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [aiLoading, setAiLoading] = useState<string | null>(null);
  const [mode, setMode] = useState<"write" | "preview">("write");
  const [uploadingImage, setUploadingImage] = useState<"cover" | "content" | null>(null);
  const [pendingAIContent, setPendingAIContent] = useState<string | null>(null);
  const [showAIReview, setShowAIReview] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [blogData, setBlogData] = useState<Partial<BlogPost>>({
    title: "", slug: "", excerpt: "", category: "BUILD", 
    date: new Date().toLocaleDateString("en-US", { month: "long", day: "2-digit", year: "numeric" }),
    readTime: "5 min read", image: "", content: "",
    author: { name: "Marcus Thorne", role: "CTO, Kinuit", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&h=100&fit=crop" },
    metaTitle: "", metaDescription: "", keywords: ""
  });

  useEffect(() => {
    if (!isNew) {
      fetch("/api/admin/blogs")
        .then(res => res.json())
        .then(data => {
          const post = data.find((p: any) => p.id === resolvedParams.id);
          if (post) setBlogData(post);
          setLoading(false);
        });
    }
  }, [isNew, resolvedParams.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name.startsWith("author.")) {
      const authorField = name.split(".")[1];
      setBlogData((prev: any) => ({ ...prev, author: { ...prev.author!, [authorField]: value } }));
    } else {
      setBlogData((prev: any) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const url = "/api/admin/blogs";
      const method = isNew ? "POST" : "PUT";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blogData)
      });
      if (res.ok) {
        toast.success(isNew ? "Post created successfully" : "Post updated successfully");
        router.push("/admin/blogs");
      } else {
        toast.error("Failed to save blog post");
      }
    } catch (error) {
      toast.error("An error occurred while saving");
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  // Image Upload logic
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !uploadingImage) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      
      if (data.success) {
        if (uploadingImage === "cover") {
          setBlogData((prev: any) => ({ ...prev, image: data.url }));
        } else if (uploadingImage === "content") {
          const imgTag = `<img src="${data.url}" alt="Blog Image" class="w-full rounded-2xl my-6 shadow-xl border border-white/10" />\n`;
          setBlogData((prev: any) => ({ ...prev, content: (prev.content || "") + imgTag }));
          toast.success("Image uploaded and inserted");
        }
      } else {
        toast.error("Upload failed: " + data.error);
      }
    } catch (err) {
      toast.error("Error uploading file");
    } finally {
      setUploadingImage(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const triggerUpload = (target: "cover" | "content") => {
    setUploadingImage(target);
    fileInputRef.current?.click();
  };

  // AI Functions
  const runAI = async (intent: string, targetText: string = "") => {
    try {
      setAiLoading(intent);
      const res = await fetch("/api/admin/blogs/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetText, intent, fullContent: blogData.content })
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      return data;
    } catch (e: any) {
      toast.error("AI Error: " + e.message);
      return null;
    } finally {
      setAiLoading(null);
    }
  };

  const handleRewriteContent = async () => {
    if (!blogData.content) return;
    const res = await runAI("rewrite", blogData.content);
    if (res && res.result) {
      setPendingAIContent(res.result);
      setShowAIReview(true);
    }
  };

  const handleCorrectGrammar = async () => {
    if (!blogData.content) return;
    const res = await runAI("correct", blogData.content);
    if (res && res.result) {
      setPendingAIContent(res.result);
      setShowAIReview(true);
    }
  };

  const handleAcceptAI = () => {
    if (pendingAIContent) {
      setBlogData((prev: any) => ({ ...prev, content: pendingAIContent }));
      setPendingAIContent(null);
      setShowAIReview(false);
      toast.success("AI draft accepted!");
    }
  };

  const handleDiscardAI = () => {
    setPendingAIContent(null);
    setShowAIReview(false);
    toast.success("AI draft discarded.");
  };

  const handleGenerateSEO = async () => {
    if (!blogData.content) return toast.error("Write some content first!");
    const res = await runAI("seo");
    if (res && res.seo) {
      setBlogData((prev: any) => ({ 
        ...prev, 
        metaTitle: res.seo.metaTitle, 
        metaDescription: res.seo.metaDescription, 
        keywords: res.seo.keywords 
      }));
    }
  };

  if (loading) return <div className="text-white p-12">Loading editor...</div>;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-24 text-white">
      <input 
        type="file" 
        accept="image/*" 
        className="hidden" 
        ref={fileInputRef} 
        onChange={handleFileUpload} 
      />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div className="flex items-center gap-4">
          <Link href="/admin/blogs" className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-colors">
            <ChevronLeft size={20} />
          </Link>
          <h1 className="text-3xl font-black uppercase tracking-tighter">
            {isNew ? "CREATE" : "EDIT"} <span className="text-blue-500 italic">POST</span>
          </h1>
        </div>
        
        <button 
          onClick={handleSave}
          disabled={saving || !!uploadingImage}
          className="flex items-center justify-center w-full md:w-auto gap-2 px-8 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 transition-all font-black uppercase tracking-widest text-xs shadow-lg shadow-blue-600/20 disabled:opacity-50"
        >
          <Save size={16} /> {saving ? "SAVING..." : "SAVE POST"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Editor */}
        <div className="lg:col-span-2 space-y-8">
          {/* Basic Info */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6 isolate">
            <h2 className="text-xl font-bold uppercase tracking-widest text-white/40 mb-6 flex items-center gap-2">
              <AlignLeft size={18} className="text-blue-500" /> Core Meta
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 md:col-span-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/50">Title</label>
                <input name="title" value={blogData.title} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-all text-sm font-bold" placeholder="High-Impact Title" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/50">Slug</label>
                <input name="slug" value={blogData.slug} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-all text-sm" placeholder="url-friendly-slug" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/50">Category</label>
                <select name="category" value={blogData.category} onChange={handleChange as any} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-all text-sm appearance-none">
                  <option value="BUILD" className="bg-black text-white">BUILD</option>
                  <option value="DESIGN" className="bg-black text-white">DESIGN</option>
                  <option value="GROW" className="bg-black text-white">GROW</option>
                  <option value="PLAN" className="bg-black text-white">PLAN</option>
                </select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/50">Excerpt</label>
                <textarea name="excerpt" value={blogData.excerpt} onChange={handleChange} className="w-full h-20 bg-black/20 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-all text-sm resize-none" placeholder="Short description..." />
              </div>
            </div>
          </div>

          {/* Content Editor */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6 relative overflow-hidden flex flex-col h-[700px]">
             
            <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
              <h2 className="text-xl font-bold uppercase tracking-widest text-white/40 flex items-center gap-2">
                <FileText size={18} className="text-purple-500" /> Story Content
              </h2>
              
              <div className="flex bg-black/20 p-1 rounded-xl border border-white/5">
                <button 
                  onClick={() => setMode("write")} 
                  className={`px-4 py-2 rounded-lg text-[10px] font-black tracking-widest uppercase transition-all flex items-center gap-2 ${mode === "write" ? "bg-white/10 text-white" : "text-white/40 hover:text-white"}`}
                >
                  <PencilLine size={14} /> Write
                </button>
                <button 
                  onClick={() => setMode("preview")} 
                  className={`px-4 py-2 rounded-lg text-[10px] font-black tracking-widest uppercase transition-all flex items-center gap-2 ${mode === "preview" ? "bg-white/10 text-white" : "text-white/40 hover:text-white"}`}
                >
                  <Eye size={14} /> Preview
                </button>
              </div>
            </div>

            {mode === "write" ? (
              <>
                <div className="flex flex-wrap gap-2 mb-2">
                   {/* Editor Tollbar */}
                  <button 
                    onClick={() => triggerUpload("content")} 
                    disabled={!!uploadingImage}
                    className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-lg text-[10px] font-black tracking-widest flex items-center gap-2 transition-all disabled:opacity-50"
                  >
                    <ImageIcon size={12} /> {uploadingImage === "content" ? "UPLOADING..." : "INSERT IMAGE"}
                  </button>
                   
                  <button onClick={handleCorrectGrammar} disabled={!!aiLoading} className="px-3 py-1.5 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded-lg text-[10px] font-black tracking-widest flex items-center gap-2 transition-all disabled:opacity-50 md:ml-auto">
                     <Wand2 size={12} /> {aiLoading === "correct" ? "WORKING..." : "FIX GRAMMAR"}
                  </button>
                  <button onClick={handleRewriteContent} disabled={!!aiLoading} className="px-3 py-1.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-lg text-[10px] font-black tracking-widest flex items-center gap-2 transition-all disabled:opacity-50">
                     <ArrowRightLeft size={12} /> {aiLoading === "rewrite" ? "WORKING..." : "PRO REWRITE"}
                  </button>
                </div>
                
                <textarea 
                  name="content" 
                  value={blogData.content} 
                  onChange={handleChange} 
                  className="w-full flex-1 bg-black/20 border border-white/10 rounded-xl px-6 py-5 outline-none focus:border-purple-500 transition-all text-sm font-mono leading-relaxed resize-none shadow-inner" 
                  placeholder="<p>Write your amazing story here...</p>" 
                />
              </>
            ) : (
              <div className="flex-1 bg-black/40 border border-white/5 rounded-xl p-8 overflow-y-auto w-full prose-content">
                {blogData.content ? (
                  <div dangerouslySetInnerHTML={{ __html: blogData.content }} />
                ) : (
                  <p className="text-white/20 italic">No content to preview.</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: SEO & Settings */}
        <div className="space-y-8">
          {/* SEO Block */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold uppercase tracking-widest text-white/40 flex items-center gap-2">
                <Search size={18} className="text-green-500" /> Search Engine
              </h2>
              <button onClick={handleGenerateSEO} disabled={!!aiLoading} className="w-8 h-8 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center hover:bg-green-500/40 transition-colors disabled:opacity-50" title="Generate SEO from Content">
                <Sparkles size={14} className={aiLoading === 'seo' ? 'animate-spin' : ''} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/50">Meta Title</label>
                <input name="metaTitle" value={blogData.metaTitle} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-green-500 transition-all text-sm" placeholder="SEO optimized title" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/50">Meta Description</label>
                <textarea name="metaDescription" value={blogData.metaDescription} onChange={handleChange} className="w-full h-24 bg-black/20 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-green-500 transition-all text-sm resize-none" placeholder="Compelling meta description" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/50">Keywords</label>
                <input name="keywords" value={blogData.keywords} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-green-500 transition-all text-sm" placeholder="comma, separated, tags" />
              </div>
            </div>
          </div>

          {/* Media & Meta */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6">
             <h2 className="text-xl font-bold uppercase tracking-widest text-white/40 mb-6 flex items-center gap-2">
              <ImageIcon size={18} className="text-yellow-500" /> Media & Meta
            </h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/50">Cover Image URL</label>
                  <button 
                    onClick={() => triggerUpload("cover")}
                    disabled={!!uploadingImage}
                    className="text-[10px] font-black uppercase tracking-widest text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
                  >
                    <UploadCloud size={12} /> {uploadingImage === "cover" ? "UP..." : "UPLOAD"}
                  </button>
                </div>
                <input name="image" value={blogData.image} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-yellow-500 transition-all text-sm" placeholder="https://" />
              </div>
              {blogData.image && (
                <div className="w-full aspect-video rounded-xl overflow-hidden border border-white/10">
                  <img src={blogData.image} alt="Cover Preview" className="w-full h-full object-cover" />
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/50">Date</label>
                  <input name="date" value={blogData.date} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-yellow-500 transition-all text-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/50">Read Time</label>
                  <input name="readTime" value={blogData.readTime} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-yellow-500 transition-all text-sm" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Author */}
           <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6">
             <h2 className="text-xl font-bold uppercase tracking-widest text-white/40 mb-6 flex items-center gap-2">
              <FileText size={18} className="text-indigo-500" /> Author Details
            </h2>
            <div className="space-y-4">
               <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/50">Name</label>
                <input name="author.name" value={blogData.author?.name} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 transition-all text-sm" />
              </div>
               <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/50">Role</label>
                <input name="author.role" value={blogData.author?.role} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 transition-all text-sm" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Review Modal */}
      <AnimatePresence>
        {showAIReview && pendingAIContent && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleDiscardAI}
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-5xl bg-zinc-950 border border-white/10 rounded-[2.5rem] overflow-hidden flex flex-col max-h-[90vh] shadow-2xl shadow-blue-500/10"
            >
              <div className="p-8 border-b border-white/10 flex items-center justify-between shrink-0 bg-white/[0.02]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center">
                    <Sparkles className="text-blue-500" size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl font-black uppercase tracking-tighter">Review AI <span className="text-blue-500 italic">Gen</span></h2>
                    <p className="text-white/40 text-[10px] font-black uppercase tracking-widest leading-none">Side-by-side comparison</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <button onClick={handleDiscardAI} className="px-6 py-3 rounded-2xl border border-white/10 hover:bg-white/5 transition-colors text-[10px] font-black uppercase tracking-widest text-white/50">
                    Discard
                  </button>
                  <button onClick={handleAcceptAI} className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 transition-all font-black uppercase tracking-widest text-[10px] shadow-lg shadow-blue-600/20">
                    Accept Changes
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-2">
                <div className="border-r border-white/10 flex flex-col min-h-0 bg-black/40">
                  <div className="p-6 border-b border-white/5 flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/30 flex items-center gap-2">
                      <History size={12} /> Original Content
                    </span>
                  </div>
                  <div className="p-8 overflow-y-auto w-full text-sm font-mono text-white/40 leading-relaxed opacity-50 select-none pointer-events-none">
                    {blogData.content}
                  </div>
                </div>

                <div className="flex flex-col min-h-0 bg-blue-500/[0.02]">
                  <div className="p-6 border-b border-white/5 flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-500/80 flex items-center gap-2">
                      <CheckCircle2 size={12} /> Revised Version
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-400 bg-blue-500/10 px-2 py-1 rounded-lg">AI Optimized</span>
                  </div>
                  <div className="p-8 overflow-y-auto w-full text-sm font-mono text-white leading-relaxed">
                    {pendingAIContent}
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-white/10 bg-black/60 flex items-center justify-center gap-8 shrink-0">
                 <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/20">
                    <CheckCircle2 size={12} className="text-green-500/50" /> High Ticket Style
                 </div>
                 <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/20">
                    <CheckCircle2 size={12} className="text-green-500/50" /> SEO Optimized
                 </div>
                 <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/20">
                    <XCircle size={12} className="text-red-500/50" /> Grammar Error Free
                 </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
