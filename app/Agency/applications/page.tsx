"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import {
  FileText,
  Clock,
  CheckCircle2,
  XCircle,
  ChevronRight,
  PlusCircle
} from 'lucide-react';
import { useApplications, Application } from "@/context/ApplicationContext";
import { cn } from "@/lib/utils";

export default function MyApplicationsPage() {
  const router = useRouter();
  const { applications } = useApplications();
  
  // Filter for current user (Creative Studios Inc. as mock)
  const myApplications = applications.filter(app => app.applicantName === "Creative Studios Inc.");

  const theme = {
    primary: 'bg-purple-600',
    hover: 'hover:bg-purple-700',
    text: 'text-purple-600',
    ring: 'focus:ring-purple-50',
    border: 'focus:border-purple-200',
    shadow: 'shadow-purple-100',
  };

  const stats = [
    { label: "Total Applications", value: myApplications.length, color: "text-gray-900", icon: FileText },
    { label: "Pending", value: myApplications.filter(a => a.status === 'Pending').length, color: "text-amber-500", icon: Clock },
    { label: "Approved", value: myApplications.filter(a => a.status === 'Selected').length, color: "text-emerald-500", icon: CheckCircle2 },
    { label: "Rejected", value: myApplications.filter(a => a.status === 'Rejected').length, color: "text-red-500", icon: XCircle },
  ];

  return (
    <div className="p-8 bg-slate-50 min-h-screen font-sans">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Applications</h1>
        <p className="text-gray-500 font-medium">Track and manage all your agency&apos;s project proposals</p>
      </div>

      {/* Stats Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm flex justify-between items-start">
            <div>
              <p className="text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">{stat.label}</p>
              <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
            <div className={cn("p-2 rounded-lg bg-gray-50", stat.color)}>
              <stat.icon className="w-5 h-5" />
            </div>
          </div>
        ))}
      </div>

      {/* Applications List */}
      {myApplications.length > 0 ? (
        <div className="space-y-4">
          {myApplications.map((app) => (
            <div 
              key={app.id}
              className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-purple-100/30 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-slate-50 rounded-[24px] flex items-center justify-center font-black text-slate-300 border border-gray-100 group-hover:bg-purple-50 group-hover:text-purple-600 transition-colors">
                  {app.projectTitle[0]}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg group-hover:text-purple-600 transition-colors">{app.projectTitle}</h3>
                  <div className="flex items-center gap-4 mt-1">
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Budget: ${app.budget}</p>
                    <span className="text-gray-200">•</span>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Applied: {app.appliedDate}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-8">
                <span className={cn(
                  "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border",
                  app.status === 'Selected' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                  app.status === 'Rejected' ? "bg-red-50 text-red-600 border-red-100" :
                  "bg-orange-50 text-orange-600 border-orange-100"
                )}>
                  {app.status}
                </span>
                <button 
                  onClick={() => router.push(`/Agency/Dashboard?appId=${app.id}`)}
                  className="p-3 bg-gray-50 text-gray-400 rounded-2xl hover:bg-purple-50 hover:text-purple-600 transition-all"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-20 flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-purple-50 text-purple-600 rounded-3xl flex items-center justify-center mb-6">
            <FileText className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No applications yet</h2>
          <p className="text-gray-500 font-medium mb-8 max-w-sm">
            Your agency hasn&apos;t applied to any projects yet. Start browsing available opportunities to grow your portfolio.
          </p>
          <button 
            onClick={() => router.push('/Agency/projects')}
            className={`${theme.primary} ${theme.hover} text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-lg ${theme.shadow} flex items-center gap-2 group`}
          >
            <PlusCircle className="w-5 h-5" />
            Browse Projects
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      )}
    </div>
  );
}