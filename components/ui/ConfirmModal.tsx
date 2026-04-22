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

  const typeStyles = {
    danger: {
      icon: "text-red-600",
      iconBg: "bg-red-50 border-red-100",
      button: "bg-red-600 hover:bg-red-700 shadow-red-600/20",
    },
    warning: {
      icon: "text-amber-600",
      iconBg: "bg-amber-50 border-amber-100",
      button: "bg-amber-600 hover:bg-amber-700 shadow-amber-600/20",
    },
    info: {
      icon: "text-[#081ff0]",
      iconBg: "bg-blue-50 border-blue-100",
      button: "bg-[#081ff0] hover:bg-[#0618cc] shadow-[#081ff0]/20",
    },
  };

  const styles = typeStyles[type];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-2xl overflow-hidden"
          >
            <div className="relative z-10 space-y-6">
              <div className="flex items-center justify-between">
                <div className={`p-4 rounded-2xl ${styles.iconBg} border flex items-center justify-center`}>
                  <AlertCircle size={28} className={styles.icon} />
                </div>
                <button
                  onClick={onClose}
                  className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-900 transition-colors border border-slate-100"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-3">
                <h3 className="text-3xl font-black text-slate-950 uppercase tracking-tighter leading-none">
                  {title}
                </h3>
                <p className="text-slate-600 text-sm font-medium leading-relaxed">
                  {message}
                </p>
              </div>

              <div className="flex gap-4 pt-2">
                <button
                  onClick={onClose}
                  className="flex-1 px-6 py-4 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-900 text-xs font-black uppercase tracking-widest transition-all"
                >
                  {cancelText}
                </button>
                <button
                  onClick={() => {
                    onConfirm();
                    onClose();
                  }}
                  className={`flex-1 px-6 py-4 rounded-2xl text-white text-xs font-black uppercase tracking-widest transition-all shadow-lg ${styles.button}`}
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
