"use client";

import React, { useState, useEffect } from "react";
import { 
  Trash2, 
  User as UserIcon, 
  ShieldCheck, 
  ShieldAlert,
  Calendar,
  Mail,
  Loader2,
  Pencil,
  X,
  Save,
  Lock,
  Eye,
  EyeOff
} from "lucide-react";
import { format } from "date-fns";
import DataTable, { Column } from "./DataTable";
import ConfirmModal from "@/components/ui/ConfirmModal";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

interface UserProfile {
  id: string;
  email: string;
  role: 'admin' | 'user';
  created_at: string;
}

export default function UsersTable({ users: initialUsers }: { users: UserProfile[] }) {
  const [users, setUsers] = useState<UserProfile[]>(initialUsers);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  
  const [editingUser, setEditingUser] = useState<UserProfile | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [newRole, setNewRole] = useState<'admin' | 'user'>('user');
  const [showPassword, setShowPassword] = useState(false);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/users?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error("Failed to delete user");
      setUsers(prev => prev.filter(u => u.id !== id));
      toast.success("User removed successfully");
    } catch (error) {
      toast.error("Failed to remove user");
    } finally {
      setDeletingId(null);
      setConfirmId(null);
    }
  };

  const handleUpdate = async () => {
    if (!editingUser) return;
    setUpdatingId(editingUser.id);
    try {
      const res = await fetch('/api/admin/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          id: editingUser.id, 
          role: newRole,
          password: newPassword || undefined 
        })
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Update failed");
      }
      
      setUsers(prev => prev.map(u => u.id === editingUser.id ? { ...u, role: newRole } : u));
      toast.success("User updated successfully");
      setEditingUser(null);
      setNewPassword("");
    } catch (error: any) {
      toast.error(error.message || "Failed to update user");
    } finally {
      setUpdatingId(null);
    }
  };

  const openEdit = (user: UserProfile) => {
    setEditingUser(user);
    setNewRole(user.role);
    setNewPassword("");
  };

  const columns: Column<UserProfile>[] = [
    {
      header: "User",
      accessor: (u) => (
        <div className="flex items-center gap-4">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${u.role === 'admin' ? 'bg-[#081ff0]/10 text-[#081ff0]' : 'bg-slate-100 text-slate-400'}`}>
            {u.role === 'admin' ? <ShieldCheck size={20} /> : <UserIcon size={20} />}
          </div>
          <div className="space-y-0.5">
            <p className="font-black text-slate-900 uppercase tracking-tighter text-sm">{u.email.split('@')[0]}</p>
            <div className="flex items-center gap-2 text-slate-400 font-medium text-xs">
              <Mail size={12} className="opacity-50" />
              {u.email}
            </div>
          </div>
        </div>
      ),
      className: "min-w-[280px]",
    },
    {
      header: "Role",
      accessor: (u) => (
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${
          u.role === 'admin' 
            ? "bg-[#081ff0]/5 border-[#081ff0]/20 text-[#081ff0]" 
            : "bg-slate-50 border-slate-200 text-slate-400"
        }`}>
          {u.role === 'admin' ? <ShieldCheck size={12} /> : <UserIcon size={12} />}
          {u.role}
        </div>
      ),
    },
    {
      header: "Joined On",
      accessor: (u) => (
        <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-widest">
          <Calendar size={14} className="text-slate-300" />
          {format(new Date(u.created_at), "MMM dd, yyyy")}
        </div>
      ),
    },
    {
      header: "Actions",
      accessor: (u) => (
        <div className="flex items-center md:justify-end gap-2">
          <button
            onClick={() => openEdit(u)}
            className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-400 hover:bg-[#081ff0]/10 hover:border-[#081ff0]/30 hover:text-[#081ff0] transition-all group/btn shadow-sm"
            title="Edit User"
          >
            <Pencil size={18} className="group-hover/btn:scale-110 transition-transform" />
          </button>
          
          <button 
            disabled={deletingId === u.id}
            onClick={() => setConfirmId(u.id)}
            className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-400 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all disabled:opacity-30 disabled:cursor-not-allowed group/btn shadow-sm"
            title="Delete User"
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
        data={users} 
        searchPlaceholder="Search by email..."
        filterFn={(u, term) => u.email.toLowerCase().includes(term.toLowerCase())}
        emptyMessage="No users found"
      />

      <ConfirmModal 
        isOpen={!!confirmId}
        onClose={() => setConfirmId(null)}
        onConfirm={() => confirmId && handleDelete(confirmId)}
        title="Delete User"
        message="Are you sure you want to delete this user? This action will remove their access to the admin panel."
        confirmText={deletingId ? "Deleting..." : "Delete"}
      />

      {/* Edit Modal */}
      <AnimatePresence>
        {editingUser && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEditingUser(null)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-2xl"
            >
              <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#081ff0]/10 flex items-center justify-center text-[#081ff0]">
                    <Pencil size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl font-black uppercase tracking-tighter text-slate-900">EDIT <span className="text-[#081ff0] italic">USER</span></h2>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest leading-none">Modify credentials & access</p>
                  </div>
                </div>
                <button onClick={() => setEditingUser(null)} className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="p-8 space-y-6">
                {/* Email (Read-only) */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Email Address</label>
                  <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm font-bold text-slate-400 flex items-center gap-3">
                    <Mail size={16} /> {editingUser.email}
                  </div>
                </div>

                {/* Role Toggle */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">System Role</label>
                  <div className="flex bg-slate-50 p-1 rounded-2xl border border-slate-200">
                    <button 
                      onClick={() => setNewRole('user')}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all ${newRole === 'user' ? 'bg-white text-slate-900 shadow-sm border border-slate-100' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                      <UserIcon size={14} /> User
                    </button>
                    <button 
                      onClick={() => setNewRole('admin')}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all ${newRole === 'admin' ? 'bg-white text-[#081ff0] shadow-sm border border-[#081ff0]/10' : 'text-slate-400 hover:text-[#081ff0]'}`}
                    >
                      <ShieldCheck size={14} /> Admin
                    </button>
                  </div>
                </div>

                {/* Password Reset */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Reset Password (Optional)</label>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#081ff0] transition-colors">
                      <Lock size={16} />
                    </div>
                    <input 
                      type={showPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Leave blank to keep current"
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 pl-12 pr-12 focus:outline-none focus:border-[#081ff0] transition-all text-sm font-bold placeholder:font-medium placeholder:text-slate-300"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-slate-50/50 border-t border-slate-100">
                <button 
                  onClick={handleUpdate}
                  disabled={updatingId === editingUser.id}
                  className="w-full bg-[#081ff0] text-white font-black py-4 rounded-2xl uppercase tracking-[0.2em] text-xs hover:bg-[#0618cc] shadow-lg shadow-[#081ff0]/20 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {updatingId === editingUser.id ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <>
                      <Save size={18} /> Update User
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
