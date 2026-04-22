"use client";

import React, { useState, useEffect } from "react";
import { Search, Inbox, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  className?: string;
  hideOnMobile?: boolean;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  searchPlaceholder?: string;
  searchKey?: keyof T;
  filterFn?: (item: T, searchTerm: string) => boolean;
  emptyMessage?: string;
  pageSize?: number;
}

export default function DataTable<T extends { id: string | number }>({
  columns,
  data,
  searchPlaceholder = "Search...",
  searchKey,
  filterFn,
  emptyMessage = "No results found",
  pageSize = 8
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to first page when searching
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const filteredData = data.filter((item) => {
    if (!searchTerm) return true;
    if (filterFn) return filterFn(item, searchTerm);
    if (!searchKey) return true;
    const value = item[searchKey];
    return String(value).toLowerCase().includes(searchTerm.toLowerCase());
  });

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="flex flex-col w-full h-full">
      {/* Header with Search */}
      <div className="p-6 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-xl font-black text-slate-950 uppercase tracking-tighter">
            ALL <span className="text-[#081ff0]">SUBMISSIONS</span>
        </h2>
        
        <div className="relative group w-full md:w-80">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#081ff0] transition-colors">
                <Search size={16} />
            </div>
            <input 
                type="text" 
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:border-[#081ff0] focus:ring-1 focus:ring-[#081ff0] transition-all text-sm font-semibold text-slate-900 placeholder:text-slate-300 shadow-sm"
            />
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
              {columns.map((column, i) => (
                <th key={i} className={cn("px-6 py-4", column.className)}>
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <AnimatePresence mode="popLayout">
              {paginatedData.map((item, idx) => (
                <motion.tr 
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group hover:bg-slate-50/50 transition-colors bg-white"
                >
                  {columns.map((column, i) => (
                    <td key={i} className={cn("px-6 py-6", column.className)}>
                      <div className="text-slate-900">
                        {typeof column.accessor === "function" 
                          ? column.accessor(item) 
                          : (item[column.accessor] as React.ReactNode)}
                      </div>
                    </td>
                  ))}
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden p-4 space-y-4">
        <AnimatePresence mode="popLayout">
          {paginatedData.map((item, idx) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white border border-slate-200 rounded-3xl p-6 space-y-6 shadow-sm"
            >
              {columns.map((column, i) => (
                <div key={i} className={cn("space-y-2", column.className)}>
                  {column.header !== "Actions" && (
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      {column.header}
                    </p>
                  )}
                  <div className="text-slate-900">
                    {typeof column.accessor === "function" 
                      ? column.accessor(item) 
                      : (item[column.accessor] as React.ReactNode)}
                  </div>
                </div>
              ))}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredData.length === 0 && (
        <div className="py-20 text-center">
            <div className="flex flex-col items-center justify-center space-y-4 opacity-10">
                <Inbox size={48} className="text-slate-900" />
                <p className="text-sm font-black uppercase tracking-[0.3em] text-slate-900">{emptyMessage}</p>
            </div>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="p-6 border-t border-slate-200 flex items-center justify-between">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            Showing <span className="text-slate-900">{(currentPage - 1) * pageSize + 1}</span>-
            <span className="text-slate-900">{Math.min(currentPage * pageSize, filteredData.length)}</span> of 
            <span className="text-slate-900"> {filteredData.length}</span> results
          </p>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-[#081ff0] hover:bg-slate-50 disabled:opacity-20 transition-all shadow-sm"
            >
              <ChevronLeft size={18} />
            </button>
            
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={cn(
                    "w-8 h-8 rounded-lg text-[10px] font-black transition-all",
                    currentPage === i + 1 
                      ? "bg-[#081ff0] text-white shadow-lg shadow-[#081ff0]/20" 
                      : "text-slate-400 hover:bg-slate-50 hover:text-slate-900"
                  )}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button 
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-[#081ff0] hover:bg-slate-50 disabled:opacity-20 transition-all shadow-sm"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
