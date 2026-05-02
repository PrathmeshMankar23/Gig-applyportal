"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  FileText,
  Search,
  Clock,
  CheckCircle2,
  XCircle,
  ChevronRight,
  PlusCircle
} from 'lucide-react';

// Set this to 'agency' or 'freelancer' to toggle themes
type PortalType = 'agency' | 'freelancer';

export default function MyApplicationsPage() {
  const router = useRouter();
  const [portalType] = useState<PortalType>('agency');
  const isAgency = portalType === 'agency';

  // Theme configuration based on your screenshots
  const theme = {
    primary: isAgency ? 'bg-purple-600' : 'bg-blue-600',
    hover: isAgency ? 'hover:bg-purple-700' : 'hover:bg-blue-700',
    text: isAgency ? 'text-purple-600' : 'text-blue-600',
    ring: isAgency ? 'focus:ring-purple-50' : 'focus:ring-blue-50',
    border: isAgency ? 'focus:border-purple-200' : 'focus:border-blue-200',
    shadow: isAgency ? 'shadow-purple-100' : 'shadow-blue-100',
  };

  const stats = [
    { label: "Total Applications", value: "0", color: "text-gray-900" },
    { label: "Pending", value: "0", color: "text-amber-500" },
    { label: "Approved", value: "0", color: "text-emerald-500" },
    { label: "Rejected", value: "0", color: "text-red-500" },
  ];

  return (
    <div className="p-8 bg-slate-50 min-h-screen font-sans">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Applications</h1>
        <p className="text-gray-500 font-medium">Track and manage all your project applications in one place</p>
      </div>

      {/* Stats Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-[24px] border border-gray-100 shadow-sm transition-transform hover:scale-[1.02]">
            <p className="text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider">{stat.label}</p>
            <p className={`text-4xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Empty State View */}
      <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-20 flex flex-col items-center text-center">
        <div className={`w-20 h-20 ${isAgency ? 'bg-purple-50 text-purple-600' : 'bg-blue-50 text-blue-600'} rounded-full flex items-center justify-center mb-6`}>
          <FileText className="w-10 h-10" />
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-3">No applications yet</h2>
        <p className="text-gray-500 font-medium mb-8 max-w-sm">
          You haven't applied to any projects yet. Start browsing available opportunities to grow your portfolio.
        </p>

        <button 
          onClick={() => router.push('/Agency/projects')}
          className={`${theme.primary} ${theme.hover} text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-lg ${theme.shadow} flex items-center gap-2 group`}
        >
          {isAgency ? <PlusCircle className="w-5 h-5" /> : <Search className="w-5 h-5" />}
          Browse Projects
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Footer Info (Optional) */}
      <div className="mt-8 flex items-center justify-center gap-6 text-gray-400">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
          <Clock className="w-4 h-4" /> 24h Avg. Response
        </div>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
          <CheckCircle2 className="w-4 h-4" /> Verified Clients
        </div>
      </div>
    </div>
  );
}