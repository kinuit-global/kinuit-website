"use client";

import React, { useState } from "react";
import { Search, Inbox } from "lucide-react";
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
}

export default function DataTable<T extends { id: string | number }>({
  columns,
  data,
  searchPlaceholder = "Search...",
  searchKey,
  filterFn,
  emptyMessage = "No results found"
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = data.filter((item) => {
    if (!searchTerm) return true;
    if (filterFn) return filterFn(item, searchTerm);
    if (!searchKey) return true;
    const value = item[searchKey];
    return String(value).toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="flex flex-col w-full h-full">
      {/* Header with Search */}
      <div className="p-6 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-xl font-black text-white uppercase tracking-tighter">
            ALL <span className="text-blue-200">SUBMISSIONS</span>
        </h2>
        
        <div className="relative group w-full md:w-80">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-blue-500 transition-colors">
                <Search size={16} />
            </div>
            <input 
                type="text" 
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:border-blue-500/50 transition-all text-sm font-medium text-white placeholder:text-white/20"
            />
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/3 text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
              {columns.map((column, i) => (
                <th key={i} className={cn("px-6 py-4", column.className)}>
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            <AnimatePresence mode="popLayout">
              {filteredData.map((item, idx) => (
                <motion.tr 
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group hover:bg-white/2 transition-colors"
                >
                  {columns.map((column, i) => (
                    <td key={i} className={cn("px-6 py-6", column.className)}>
                      {typeof column.accessor === "function" 
                        ? column.accessor(item) 
                        : (item[column.accessor] as React.ReactNode)}
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
          {filteredData.map((item, idx) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-6"
            >
              {columns.map((column, i) => (
                <div key={i} className={cn("space-y-2", column.className)}>
                  {column.header !== "Actions" && (
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/20">
                      {column.header}
                    </p>
                  )}
                  <div className="text-white">
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
            <div className="flex flex-col items-center justify-center space-y-4 opacity-20">
                <Inbox size={48} />
                <p className="text-sm font-black uppercase tracking-[0.3em]">{emptyMessage}</p>
            </div>
        </div>
      )}
    </div>
  );
}
