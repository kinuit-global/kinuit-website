"use client";

import React, { useState, useEffect } from "react";
import { Users, ShieldCheck, UserPlus } from "lucide-react";
import UsersTable from "@/components/Admin/UsersTable";

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/admin/users");
        if (res.status === 403) {
           setIsAdmin(false);
           setLoading(false);
           return;
        }
        const data = await res.json();
        setUsers(data);
        setIsAdmin(true);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="p-12 text-slate-400 font-black uppercase tracking-widest text-xs animate-pulse">Loading system users...</div>;

  if (!isAdmin) {
    return (
      <div className="p-12 text-center space-y-4">
        <div className="w-20 h-20 bg-red-50 rounded-3xl flex items-center justify-center mx-auto border border-red-100 text-red-500">
          <ShieldCheck size={40} />
        </div>
        <h1 className="text-2xl font-black uppercase tracking-tighter text-slate-900">Access Restricted</h1>
        <p className="text-slate-500 text-sm max-w-xs mx-auto font-medium">Only administrators can access the user management system.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter text-slate-900">
            SYSTEM <span className="text-[#081ff0] italic">USERS</span>
          </h1>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mt-1">
            Manage administrative roles and access control
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-[#081ff0]/10 rounded-2xl flex items-center justify-center text-[#081ff0]">
            <Users size={24} />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 leading-none mb-1">Total Accounts</p>
            <p className="text-2xl font-black text-slate-900 leading-none">{users.length}</p>
          </div>
        </div>
        
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-500">
            <ShieldCheck size={24} />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 leading-none mb-1">Administrators</p>
            <p className="text-2xl font-black text-slate-900 leading-none">{users.filter(u => u.role === 'admin').length}</p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-[2.5rem] p-4 md:p-8 shadow-sm overflow-hidden">
        <UsersTable users={users} />
      </div>
    </div>
  );
}
