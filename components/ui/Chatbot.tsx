"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Send, X, AlertCircle, Loader2, Sparkles, Calendar } from "lucide-react";
import Link from "next/link";

interface Message {
  role: "user" | "model";
  content: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [mounted, setMounted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sync state with localStorage on mount
  useEffect(() => {
    setMounted(true);
    const savedCount = localStorage.getItem("kinuit_chat_count");
    if (savedCount) {
      setCount(parseInt(savedCount, 10));
    }
    const savedHistory = localStorage.getItem("kinuit_chat_history");
    if (savedHistory) {
      try {
        setMessages(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Failed to parse saved chat history", e);
      }
    }
  }, []);

  // Scroll to bottom when messages or isOpen changes
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [messages, isOpen]);

  if (!mounted) return null;

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading || count >= 3) return;

    const userMessage = input.trim();
    setInput("");
    setLoading(true);

    const newCount = count + 1;
    setCount(newCount);
    localStorage.setItem("kinuit_chat_count", newCount.toString());

    const updatedMessages = [...messages, { role: "user" as const, content: userMessage }];
    setMessages(updatedMessages);
    localStorage.setItem("kinuit_chat_history", JSON.stringify(updatedMessages));

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: messages, // Send history (excluding current user prompt)
          prompt: userMessage, // Current prompt
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        const finalMessages = [...updatedMessages, { role: "model" as const, content: data.result }];
        setMessages(finalMessages);
        localStorage.setItem("kinuit_chat_history", JSON.stringify(finalMessages));
      } else {
        const errorMessage = data.result || data.error || "Something went wrong. Please try again.";
        const finalMessages = [...updatedMessages, { role: "model" as const, content: errorMessage }];
        setMessages(finalMessages);
        localStorage.setItem("kinuit_chat_history", JSON.stringify(finalMessages));
      }
    } catch (error) {
      console.error("Chat API error:", error);
      const errorMsg = "Failed to connect to the assistant. Please check your connection and try again.";
      const finalMessages = [...updatedMessages, { role: "model" as const, content: errorMsg }];
      setMessages(finalMessages);
      localStorage.setItem("kinuit_chat_history", JSON.stringify(finalMessages));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end">
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0, x: 20 }}
              animate={{ scale: 1, opacity: 1, x: 0 }}
              exit={{ scale: 0.8, opacity: 0, x: 20 }}
              className="absolute right-16 top-[13px] bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-lg pointer-events-none text-xs font-semibold text-slate-800 whitespace-nowrap flex items-center gap-1.5"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Ask Kinuit AI
              {count > 0 && <span className="text-[#081ff0]">({count}/3)</span>}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 bg-[#081ff0] hover:bg-[#081ff0]/90 text-white rounded-full flex items-center justify-center shadow-xl shadow-blue-500/20 focus:outline-none z-10"
          aria-label="Toggle chat assistant"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={24} />
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative"
              >
                <MessageSquare size={24} />
                {count > 0 && (
                  <span className="absolute -top-2.5 -right-2.5 bg-rose-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#081ff0] font-black">
                    {3 - count > 0 ? 3 - count : 0}
                  </span>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className="fixed bottom-24 right-6 w-[360px] sm:w-[400px] h-[550px] max-h-[calc(100vh-120px)] bg-white border border-slate-200 rounded-[28px] shadow-2xl flex flex-col z-[9998] overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#050D1A] text-white p-5 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#081ff0]/10 flex items-center justify-center border border-[#081ff0]/20 text-[#081ff0]">
                  <Sparkles size={20} className="animate-pulse" />
                </div>
                <div>
                  <h3 className="font-bold text-sm tracking-wide uppercase">Kinuit Assistant</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] text-slate-400 font-medium">Ready to support</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white transition-colors p-1"
                aria-label="Close assistant"
              >
                <X size={20} />
              </button>
            </div>

            {/* Message Area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50">
              {/* Static Welcome Message */}
              <div className="flex items-start gap-2.5 mr-auto max-w-[85%]">
                <div className="w-8 h-8 shrink-0 rounded-xl bg-slate-200 flex items-center justify-center text-slate-700 font-bold text-xs uppercase">
                  KI
                </div>
                <div className="bg-white border border-slate-100 text-slate-800 rounded-[20px] rounded-tl-none p-3.5 text-sm shadow-sm leading-relaxed">
                  Hi! I'm the Kinuit AI assistant. You can ask me up to 3 questions about our custom development, design, SEO, and growth solutions. How can I help you today?
                </div>
              </div>

              {/* Message List */}
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex items-start gap-2.5 max-w-[85%] ${m.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                    }`}
                >
                  <div
                    className={`w-8 h-8 shrink-0 rounded-xl flex items-center justify-center font-bold text-xs uppercase ${m.role === "user"
                      ? "bg-[#081ff0]/10 text-[#081ff0]"
                      : "bg-slate-200 text-slate-700"
                      }`}
                  >
                    {m.role === "user" ? "ME" : "KI"}
                  </div>
                  <div
                    className={`p-3.5 text-sm leading-relaxed rounded-[20px] shadow-sm whitespace-pre-line ${m.role === "user"
                      ? "bg-[#081ff0] text-white rounded-tr-none"
                      : "bg-white border border-slate-100 text-slate-800 rounded-tl-none"
                      }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {loading && (
                <div className="flex items-start gap-2.5 mr-auto max-w-[85%] animate-pulse">
                  <div className="w-8 h-8 shrink-0 rounded-xl bg-slate-200 flex items-center justify-center text-slate-700 font-bold text-xs">
                    KI
                  </div>
                  <div className="bg-white border border-slate-100 text-slate-500 rounded-[20px] rounded-tl-none px-4 py-3.5 text-sm shadow-sm flex items-center gap-1.5">
                    <Loader2 size={14} className="animate-spin text-slate-400" />
                    <span>Analyzing site details...</span>
                  </div>
                </div>
              )}

              {/* Enforced limit card */}
              {count >= 3 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-blue-50 border border-blue-100 rounded-2xl p-4 mt-6 text-center shadow-sm"
                >
                  <AlertCircle className="mx-auto text-[#081ff0] mb-2" size={24} />
                  <h4 className="font-bold text-sm text-slate-900 mb-1">
                    Question Limit Reached
                  </h4>
                  <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                    You have asked your 3 questions. Let's start a direct conversation or schedule a quick discovery call to discuss your project!
                  </p>
                  <div className="flex flex-col gap-2">
                    <Link
                      href="/contact"
                      onClick={() => setIsOpen(false)}
                      className="w-full py-2.5 bg-[#081ff0] hover:bg-[#081ff0]/90 text-white text-xs font-bold rounded-xl shadow-sm transition-colors block text-center"
                    >
                      Go to Contact Page
                    </Link>
                    <a
                      href="https://calendly.com/kinuitoffl/kinuit-discovery-call"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Calendar size={14} />
                      Book a Strategy Call
                    </a>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="p-4 border-t border-slate-100 bg-white flex flex-col gap-2">
              <form onSubmit={handleSend} className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={
                    count >= 3
                      ? "Limit reached"
                      : `Type your question (${count}/3)...`
                  }
                  disabled={loading || count >= 3}
                  className="flex-1 h-11 px-4 text-sm bg-slate-50 border border-slate-200 rounded-full focus:outline-none focus:border-[#081ff0] focus:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading || count >= 3}
                  className="w-11 h-11 shrink-0 bg-[#081ff0] text-white rounded-full flex items-center justify-center hover:bg-[#081ff0]/90 disabled:bg-slate-100 disabled:text-slate-300 transition-colors"
                  aria-label="Send query"
                >
                  <Send size={16} />
                </button>
              </form>

              {/* Status Badge */}
              <div className="flex items-center justify-between px-1 mt-0.5">
                <span className="text-[10px] text-slate-400 font-medium">
                  {count >= 3 ? (
                    <span className="text-amber-600 font-semibold flex items-center gap-1">
                      <AlertCircle size={10} /> Limit reached
                    </span>
                  ) : (
                    <span>Powered by Gemini AI</span>
                  )}
                </span>
                <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                  Questions: {count}/3
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
