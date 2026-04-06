"use client";

import React from "react";
import { Twitter, Linkedin, Link as LinkIcon, Check } from "lucide-react";
import toast from "react-hot-toast";

interface ShareButtonsProps {
  title: string;
}

export default function ShareButtons({ title }: ShareButtonsProps) {
  const [copied, setCopied] = React.useState(false);

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast.success("Link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`,
      "_blank"
    );
  };

  const shareOnLinkedin = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      "_blank"
    );
  };

  return (
    <div className="flex flex-wrap gap-3 mt-4">
      <button
        onClick={shareOnTwitter}
        className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-xl hover:bg-blue-500/10 hover:border-blue-500/30 text-white/40 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest group"
        title="Share on X"
      >
        <Twitter size={14} className="group-hover:text-[#1DA1F2] transition-colors" />
        X / Twitter
      </button>

      <button
        onClick={shareOnLinkedin}
        className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-xl hover:bg-blue-500/10 hover:border-blue-500/30 text-white/40 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest group"
        title="Share on LinkedIn"
      >
        <Linkedin size={14} className="group-hover:text-[#0077B5] transition-colors" />
        LinkedIn
      </button>

      <button
        onClick={handleCopy}
        className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-xl hover:bg-blue-500/10 hover:border-blue-500/30 text-white/40 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest group"
        title="Copy Link"
      >
        {copied ? (
          <Check size={14} className="text-green-500" />
        ) : (
          <LinkIcon size={14} className="group-hover:text-k-primary transition-colors" />
        )}
        {copied ? "Copied!" : "Copy Link"}
      </button>
    </div>
  );
}
