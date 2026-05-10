"use client";

import React, { useState } from 'react';
import Link from 'next/link';
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
    Search,
    FolderOpen,
    ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useProjects } from "@/context/ProjectContext";
import { useApplications, Application } from "@/context/ApplicationContext";
import { useRegistration } from "@/context/RegistrationContext";

export default function AdminDashboard() {
    const { projects, assignProject } = useProjects();
    const { applications, updateApplicationStatus } = useApplications();
    const { registrations } = useRegistration();

    // State for filtering
    const [statusFilter, setStatusFilter] = useState('All');
    const [typeFilter, setTypeFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState("");

    // Notification State
    const [notification, setNotification] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

    // Handlers
    const handleAction = (id: number, newStatus: Application['status']) => {
        updateApplicationStatus(id, newStatus);

        // If selected, update the project context as well
        if (newStatus === 'Selected') {
            const app = applications.find(a => a.id === id);
            if (app) {
                assignProject(app.projectId, app.applicantName);
            }
        }

        const reqName = applications.find(r => r.id === id)?.applicantName;
        showNotification(`${reqName} has been ${newStatus.toLowerCase()} successfully!`);
    };

    const showNotification = (message: string) => {
        setNotification({ message, type: 'success' });
        setTimeout(() => setNotification(null), 3000);
    };

    // Stats Logic
    const approvedFreelancers = registrations.filter(r => r.type === 'freelancer' && r.status === 'Approved').length;
    const approvedAgencies = registrations.filter(r => r.type === 'agency' && r.status === 'Approved').length;
    const pendingRegistrations = registrations.filter(r => r.status === 'Pending').length;

    const stats = [
        { label: "Total Projects", value: projects.length, icon: FolderOpen, color: "text-blue-600", bgColor: "bg-blue-300", borderColor: "border-blue-400", href: "/Admin/projects" },
        { label: "Total Freelancers", value: approvedFreelancers, icon: Users, color: "text-emerald-600", bgColor: "bg-emerald-300", borderColor: "border-emerald-400", href: "/Admin/freelancers" },
        { label: "Total Agency", value: approvedAgencies, icon: Building2, color: "text-purple-600", bgColor: "bg-purple-300", borderColor: "border-purple-400", href: "/Admin/agencies" },
        { label: "New Requests", value: pendingRegistrations, icon: Clock, color: "text-orange-500", bgColor: "bg-orange-300", borderColor: "border-orange-400", href: "/Admin/requests" },
    ];

    // Filtering Logic
    const filteredRequests = applications.filter(req => {
        const matchesStatus = statusFilter === 'All' || req.status === statusFilter;
        const matchesType = typeFilter === 'All' || req.applicantRole.toLowerCase() === typeFilter.toLowerCase();
        const matchesSearch = req.applicantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            req.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            req.projectTitle.toLowerCase().includes(searchQuery.toLowerCase());
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
                <p className="text-gray-500 mt-1 font-medium text-sm">Manage project applications and platform activity</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <Link
                        key={i}
                        href={stat.href}
                        className={`p-6 rounded-[32px] border ${stat.bgColor} ${stat.borderColor} shadow-sm transition-all hover:shadow-md hover:scale-[1.02] active:scale-[0.98] group`}
                    >
                        <div className="flex justify-between items-start">
                            <div className="space-y-1">
                                <p className="text-gray-900 text-[10px] font-black uppercase tracking-widest group-hover:text-black transition-colors">{stat.label}</p>
                                <p className="text-4xl font-black text-gray-900">
                                    {stat.value}
                                </p>
                            </div>
                            <div className={`p-3 rounded-2xl bg-white ${stat.color} shadow-sm group-hover:shadow-md transition-all`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Project Requests Section */}
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-black text-gray-900 tracking-tight">Project Applications</h2>
                        <p className="text-gray-500 font-medium text-xs mt-1">Review and manage incoming applications for projects</p>
                    </div>
                </div>

                {/* Filter & Search Bar - Unified Line */}
                <div className="flex flex-wrap items-center gap-4 bg-white p-4 rounded-[32px] border border-gray-100 shadow-sm">
                    {/* Status Dropdown */}
                    <div className="relative group">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="appearance-none bg-gray-50 px-8 py-3.5 pr-14 rounded-2xl border border-gray-100 text-slate-800 font-black text-xs outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all cursor-pointer hover:bg-white"
                        >
                            <option value="All">All Status</option>
                            <option value="Pending">Pending</option>
                            <option value="Selected">Selected</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                        <ChevronRight className="w-4 h-4 absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 rotate-90 pointer-events-none group-hover:text-slate-900 transition-colors" />
                    </div>

                    {/* Type Dropdown */}
                    <div className="relative group">
                        <select
                            value={typeFilter === 'All' ? 'All' : typeFilter === 'freelancer' ? 'Freelancers' : 'Agencies'}
                            onChange={(e) => setTypeFilter(e.target.value === 'Freelancers' ? 'freelancer' : e.target.value === 'Agencies' ? 'agency' : 'All')}
                            className="appearance-none bg-gray-50 px-8 py-3.5 pr-14 rounded-2xl border border-gray-100 text-slate-800 font-black text-xs outline-none focus:ring-4 focus:ring-blue-500/10 transition-all cursor-pointer hover:bg-white"
                        >
                            <option value="All">All Categories</option>
                            <option value="Freelancers">Freelancers</option>
                            <option value="Agencies">Agencies</option>
                        </select>
                        <ChevronRight className="w-4 h-4 absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 rotate-90 pointer-events-none group-hover:text-slate-900 transition-colors" />
                    </div>

                    {/* Search Input */}
                    <div className="relative flex-1 min-w-[200px]">
                        <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by name, email or project..."
                            className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:bg-white outline-none transition-all text-xs font-bold"
                        />
                    </div>

                    {/* Clear Button */}
                    {(statusFilter !== 'All' || typeFilter !== 'All' || searchQuery !== "") && (
                        <button
                            onClick={() => {
                                setStatusFilter('All');
                                setTypeFilter('All');
                                setSearchQuery("");
                            }}
                            className="flex items-center gap-2 px-6 py-3.5 bg-red-50 text-red-500 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-red-100 transition-all border border-red-100 shadow-sm"
                        >
                            <X className="w-4 h-4" />
                            Clear
                        </button>
                    )}
                </div>
            </div>

            {/* Table Container - Fixed Width Logic */}
            <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse table-fixed">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Type</th>
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Name</th>
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest hidden lg:table-cell">Email</th>
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Status</th>
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Portfolio</th>
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredRequests.map((req) => (
                                <tr key={req.id} className="hover:bg-gray-50/30 transition-colors group">
                                    <td className="px-6 py-4 text-center">
                                        <span className={`inline-flex items-center justify-center min-w-[90px] gap-1.5 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-tighter ${req.applicantRole === 'freelancer' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'}`}>
                                            {req.applicantRole === 'freelancer' ? <Briefcase className="w-3 h-3" /> : <Building2 className="w-3 h-3" />}
                                            {req.applicantRole}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="max-w-full">
                                            <p className="font-extrabold text-gray-900 text-sm truncate">{req.applicantName}</p>
                                            <p className="text-[10px] text-gray-400 font-bold lg:hidden mt-0.5 truncate">{req.email}</p>
                                            <p className="text-[10px] text-gray-400 font-bold mt-0.5 truncate">For: {req.projectTitle}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 hidden lg:table-cell">
                                        <p className="text-gray-500 font-medium text-sm truncate">{req.email}</p>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`inline-block min-w-[70px] text-center px-2.5 py-1 rounded-lg text-[9px] font-black uppercase border ${req.status === 'Selected' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                            req.status === 'Rejected' ? 'bg-red-50 text-red-600 border-red-100' :
                                                'bg-orange-50 text-orange-600 border-orange-100'
                                            }`}>
                                            {req.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <Link
                                            href={`/Admin/portfolio?id=${req.profileId}&appId=${req.id}`}
                                            className="inline-flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-sm"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            {req.status === 'Pending' ? (
                                                <>
                                                    <button
                                                        onClick={() => handleAction(req.id, 'Selected')}
                                                        className="px-3 py-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all font-black text-[10px] uppercase tracking-widest border border-emerald-100 shadow-sm shadow-emerald-50"
                                                    >
                                                        Accept
                                                    </button>
                                                    <button
                                                        onClick={() => handleAction(req.id, 'Rejected')}
                                                        className="px-3 py-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-all font-black text-[10px] uppercase tracking-widest border border-red-100 shadow-sm shadow-red-50"
                                                    >
                                                        Reject
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