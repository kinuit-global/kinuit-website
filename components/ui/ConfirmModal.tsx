"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, X } from "lucide-react";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: "danger" | "warning" | "info";
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Delete",
  cancelText = "Cancel",
  type = "danger",
}: ConfirmModalProps) {
  if (!isOpen) return null;

  const colorMap = {
    danger: "text-red-500 bg-red-500/10 border-red-500/20 hover:bg-red-600 shadow-red-600/20",
    warning: "text-yellow-500 bg-yellow-500/10 border-yellow-500/20 hover:bg-yellow-600 shadow-yellow-600/20",
    info: "text-blue-500 bg-blue-500/10 border-blue-500/20 hover:bg-blue-600 shadow-blue-600/20",
  };

  const btnColor = colorMap[type].split(" ")[3];
  const shadowColor = colorMap[type].split(" ")[4];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl p-8 shadow-2xl overflow-hidden"
          >
            {/* Background Glow */}
            <div className={`absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[80px] opacity-20 ${type === 'danger' ? 'bg-red-500' : 'bg-blue-500'}`} />

            <div className="relative z-10 space-y-6">
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-2xl ${colorMap[type].split(" ").slice(1, 3).join(" ")} text-white`}>
                  <AlertCircle size={24} className={colorMap[type].split(" ")[0]} />
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-black text-white uppercase tracking-tight">
                  {title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {message}
                </p>
              </div>

              <div className="flex gap-4 pt-2">
                <button
                  onClick={onClose}
                  className="flex-1 px-6 py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-black uppercase tracking-widest transition-all"
                >
                  {cancelText}
                </button>
                <button
                  onClick={() => {
                    onConfirm();
                    onClose();
                  }}
                  className={`flex-1 px-6 py-3 rounded-2xl text-white text-xs font-black uppercase tracking-widest transition-all shadow-lg ${btnColor} ${shadowColor}`}
                >
                  {confirmText}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
