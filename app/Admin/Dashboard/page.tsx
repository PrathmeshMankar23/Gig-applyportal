"use client";

import React, { useState } from 'react';
import {
    Users,
    Clock,
    CheckCircle2,
    XCircle,
    Eye,
    Check,
    X,
    Briefcase,
    Building2,
    Search
} from "lucide-react";
import Link from 'next/link';

export default function AdminDashboard() {
    // State for filtering
    const [statusFilter, setStatusFilter] = useState('All');
    const [typeFilter, setTypeFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState("");

    // Notification State
    const [notification, setNotification] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

    // State for Requests
    const [requests, setRequests] = useState([
        { id: 1, type: "freelancer", name: "Sarah Johnson", email: "sarah.j@email.com", date: "2026-04-24", status: "Pending" },
        { id: 2, type: "agency", name: "Creative Studios Inc.", email: "contact@creativestudios.com", date: "2026-04-23", status: "Pending" },
        { id: 3, type: "freelancer", name: "Michael Chen", email: "m.chen@tech.com", date: "2026-04-22", status: "Approved" },
        { id: 4, type: "agency", name: "Digital Solutions", email: "info@digitalsol.com", date: "2026-04-21", status: "Rejected" }
    ]);

    // Handlers
    const handleAction = (id: number, newStatus: string) => {
        setRequests(prev => prev.map(req =>
            req.id === id ? { ...req, status: newStatus } : req
        ));

        const reqName = requests.find(r => r.id === id)?.name;
        showNotification(`${reqName} has been ${newStatus.toLowerCase()} successfully!`);
    };

    const showNotification = (message: string) => {
        setNotification({ message, type: 'success' });
        setTimeout(() => setNotification(null), 3000);
    };

    // Stats Logic
    const stats = [
        { label: "Total Requests", value: requests.length, icon: Users, color: "text-gray-400" },
        { label: "Pending", value: requests.filter(r => r.status === 'Pending').length, icon: Clock, color: "text-orange-500" },
        { label: "Approved", value: requests.filter(r => r.status === 'Approved').length, icon: CheckCircle2, color: "text-emerald-500" },
        { label: "Rejected", value: requests.filter(r => r.status === 'Rejected').length, icon: XCircle, color: "text-red-500" },
    ];

    // Filtering Logic
    const filteredRequests = requests.filter(req => {
        const matchesStatus = statusFilter === 'All' || req.status === statusFilter;
        const matchesType = typeFilter === 'All' || req.type.toLowerCase() === typeFilter.toLowerCase();
        const matchesSearch = req.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            req.email.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesType && matchesSearch;
    });

    return (
        <div className="space-y-8 w-full max-w-full">
            {/* Success Toast */}
            {notification && (
                <div className="fixed top-8 right-8 z-[100] animate-in slide-in-from-right-10 fade-in duration-300">
                    <div className="bg-slate-900 text-white px-6 py-4 rounded-[20px] shadow-2xl flex items-center gap-3 border border-slate-800">
                        <div className="bg-emerald-500 p-1 rounded-full">
                            <Check className="w-4 h-4 text-white" strokeWidth={4} />
                        </div>
                        <p className="font-bold text-sm">{notification.message}</p>
                    </div>
                </div>
            )}

            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Admin Dashboard</h1>
                <p className="text-gray-500 mt-1 font-medium text-sm">Manage registration requests and platform activity</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-[28px] border border-gray-100 shadow-sm transition-all hover:shadow-md">
                        <div className="flex justify-between items-start">
                            <div className="space-y-1">
                                <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">{stat.label}</p>
                                <p className={`text-3xl font-black ${stat.color.includes('gray') ? 'text-gray-900' : stat.color}`}>
                                    {stat.value}
                                </p>
                            </div>
                            <div className={`p-3 rounded-2xl bg-gray-50 ${stat.color}`}>
                                <stat.icon className="w-5 h-5" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Filter & Search Bar */}
            <div className="flex flex-col xl:flex-row gap-4 items-start xl:items-center justify-between">
                <div className="flex flex-wrap items-center gap-3">
                    <div className="bg-white p-1.5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-1">
                        {['All', 'Pending', 'Approved'].map((status) => (
                            <button
                                key={status}
                                onClick={() => setStatusFilter(status)}
                                className={`px-4 py-2 rounded-xl font-bold text-xs transition-all ${statusFilter === status
                                    ? 'bg-emerald-600 text-white'
                                    : 'text-gray-500 hover:bg-gray-50'}`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>

                    <div className="bg-white p-1.5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-1">
                        {['All', 'Freelancers', 'Agencies'].map((type) => (
                            <button
                                key={type}
                                onClick={() => setTypeFilter(type === 'Freelancers' ? 'freelancer' : type === 'Agencies' ? 'agency' : 'All')}
                                className={`px-4 py-2 rounded-xl font-bold text-xs transition-all ${(typeFilter === 'freelancer' && type === 'Freelancers') ||
                                    (typeFilter === 'agency' && type === 'Agencies') ||
                                    (typeFilter === 'All' && type === 'All')
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-500 hover:bg-gray-50'}`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="relative w-full xl:max-w-xs">
                    <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search users..."
                        className="w-full pl-11 pr-4 py-3 bg-white border border-gray-100 rounded-2xl focus:ring-2 focus:ring-emerald-500/10 outline-none transition-all text-sm font-medium"
                    />
                </div>
            </div>

            {/* Table Container - Fixed Width Logic */}
            <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse table-auto">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Type</th>
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Name</th>
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest hidden lg:table-cell">Email</th>
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Portfolio</th>
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredRequests.map((req) => (
                                <tr key={req.id} className="hover:bg-gray-50/30 transition-colors group">
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-tighter ${req.type === 'freelancer' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'
                                            }`}>
                                            {req.type === 'freelancer' ? <Briefcase className="w-3 h-3" /> : <Building2 className="w-3 h-3" />}
                                            {req.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="max-w-[140px]">
                                            <p className="font-extrabold text-gray-900 text-sm truncate">{req.name}</p>
                                            <p className="text-[10px] text-gray-400 font-bold lg:hidden truncate">{req.email}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 hidden lg:table-cell">
                                        <p className="text-gray-500 font-medium text-sm truncate max-w-[180px]">{req.email}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase border ${req.status === 'Approved' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                                req.status === 'Rejected' ? 'bg-red-50 text-red-600 border-red-100' :
                                                    'bg-orange-50 text-orange-600 border-orange-100'
                                            }`}>
                                            {req.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <Link
                                            href={`/portfolio?id=${req.id}`}
                                            className="inline-flex items-center justify-center w-8 h-8 bg-slate-900 text-white rounded-lg hover:bg-black transition-all shadow-sm"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            {req.status === 'Pending' ? (
                                                <>
                                                    <button
                                                        onClick={() => handleAction(req.id, 'Approved')}
                                                        className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                                                        title="Approve"
                                                    >
                                                        <Check className="w-5 h-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleAction(req.id, 'Rejected')}
                                                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                                        title="Reject"
                                                    >
                                                        <X className="w-5 h-5" />
                                                    </button>
                                                </>
                                            ) : (
                                                <button
                                                    onClick={() => handleAction(req.id, 'Pending')}
                                                    className="text-[9px] font-black text-gray-400 hover:text-emerald-600 uppercase tracking-widest px-2 py-1"
                                                >
                                                    Reset
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filteredRequests.length === 0 && (
                    <div className="py-20 text-center">
                        <p className="text-gray-400 font-bold text-sm">No matching results found.</p>
                    </div>
                )}
            </div>
        </div>
    );
}