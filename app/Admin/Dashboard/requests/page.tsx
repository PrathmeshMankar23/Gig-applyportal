"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
    Clock, 
    CheckCircle2, 
    XCircle, 
    Eye, 
    Search, 
    Briefcase, 
    Building2, 
    MessageSquare, 
    Upload, 
    FileText, 
    Send,
    User,
    Mail,
    Calendar,
    DollarSign,
    ChevronRight,
    ArrowLeft,
    Check,
    X,
    MoreVertical,
    ExternalLink,
    Bell
} from 'lucide-react';
import { useApplications, Application, Notification } from '@/context/ApplicationContext';
import { cn } from "@/lib/utils";

import ProjectWorkspace from '@/components/ProjectWorkspace';
import { useProjects } from '@/context/ProjectContext';

export default function AdminRequestsPage() {
    const { applications, notifications, updateApplicationStatus, addComment, uploadFile } = useApplications();
    const { assignProject } = useProjects();
    const [selectedApp, setSelectedApp] = useState<Application | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [roleFilter, setRoleFilter] = useState("All");
    const [projectFilter, setProjectFilter] = useState("All Projects");
    const [commentText, setCommentText] = useState("");
    const [isManaging, setIsManaging] = useState(false);

    const projectTitles = ["All Projects", ...new Set(applications.map(app => app.projectTitle))];

    const filteredApps = applications.filter(app => {
        const matchesSearch = app.applicantName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             app.projectTitle.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === "All" || app.status === statusFilter;
        const matchesRole = roleFilter === "All" || 
                           (roleFilter === "Freelancers" && app.applicantRole === 'freelancer') ||
                           (roleFilter === "Agencies" && app.applicantRole === 'agency');
        const matchesProject = projectFilter === "All Projects" || app.projectTitle === projectFilter;
        return matchesSearch && matchesStatus && matchesRole && matchesProject;
    });

    const handleAction = (id: number, status: Application['status']) => {
        updateApplicationStatus(id, status);
        
        // If selected, update the project context as well
        if (status === 'Selected') {
            const app = applications.find(a => a.id === id);
            if (app) {
                assignProject(app.projectId, app.applicantName);
            }
        }

        if (selectedApp && selectedApp.id === id) {
            setSelectedApp({ ...selectedApp, status });
        }
    };

    const handleAddComment = (e: React.FormEvent) => {
        e.preventDefault();
        if (!commentText.trim() || !selectedApp) return;
        addComment(selectedApp.id, "Admin", commentText);
        setCommentText("");
    };

    const handleUploadSim = () => {
        if (!selectedApp) return;
        const fileName = prompt("Enter file name (Simulation):", "Project_Brief.pdf");
        if (fileName) {
            uploadFile(selectedApp.id, fileName, "#");
        }
    };

    return (
        <div className="space-y-8 w-full max-w-full">
            {/* Header */}
            {/* Filter & Search Bar - Unified Line */}
            <div className="bg-white p-6 rounded-[40px] border border-gray-100 shadow-sm space-y-6">
                <div className="flex flex-wrap items-center gap-4">
                    {/* Search Input */}
                    <div className="relative flex-1 min-w-[250px]">
                        <Search className="w-5 h-5 absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search applicant or project..."
                            className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-[20px] outline-none focus:ring-4 focus:ring-orange-500/10 focus:bg-white font-bold text-sm transition-all"
                        />
                    </div>

                    {/* Status Dropdown */}
                    <div className="relative group">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="appearance-none bg-gray-50 px-8 py-4 pr-14 rounded-[20px] border border-gray-100 text-slate-800 font-black text-xs outline-none focus:ring-4 focus:ring-orange-500/10 transition-all cursor-pointer hover:bg-white"
                        >
                            <option value="All">All Status</option>
                            <option value="Pending">Pending</option>
                            <option value="Selected">Selected</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                        <ChevronRight className="w-4 h-4 absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 rotate-90 pointer-events-none group-hover:text-slate-900 transition-colors" />
                    </div>

                    {/* Role Dropdown */}
                    <div className="relative group">
                        <select
                            value={roleFilter}
                            onChange={(e) => setRoleFilter(e.target.value)}
                            className="appearance-none bg-gray-50 px-8 py-4 pr-14 rounded-[20px] border border-gray-100 text-slate-800 font-black text-xs outline-none focus:ring-4 focus:ring-blue-500/10 transition-all cursor-pointer hover:bg-white"
                        >
                            <option value="All">All Roles</option>
                            <option value="Freelancers">Freelancers</option>
                            <option value="Agencies">Agencies</option>
                        </select>
                        <ChevronRight className="w-4 h-4 absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 rotate-90 pointer-events-none group-hover:text-slate-900 transition-colors" />
                    </div>

                    {/* Project Dropdown */}
                    <div className="relative group">
                        <select
                            value={projectFilter}
                            onChange={(e) => setProjectFilter(e.target.value)}
                            className="appearance-none bg-gray-50 px-8 py-4 pr-14 rounded-[20px] border border-gray-100 text-slate-800 font-black text-xs outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all cursor-pointer hover:bg-white max-w-[200px] truncate"
                        >
                            {projectTitles.map(title => (
                                <option key={title} value={title}>{title}</option>
                            ))}
                        </select>
                        <ChevronRight className="w-4 h-4 absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 rotate-90 pointer-events-none group-hover:text-slate-900 transition-colors" />
                    </div>

                    {/* Clear Button */}
                    {(statusFilter !== "All" || roleFilter !== "All" || projectFilter !== "All Projects" || searchQuery !== "") && (
                        <button 
                            onClick={() => {
                                setStatusFilter("All");
                                setRoleFilter("All");
                                setProjectFilter("All Projects");
                                setSearchQuery("");
                            }}
                            className="flex items-center gap-2 px-8 py-4 bg-red-50 text-red-500 rounded-[20px] font-black text-[10px] uppercase tracking-widest hover:bg-red-100 transition-all border border-red-100"
                        >
                            <X className="w-4 h-4" />
                            Clear
                        </button>
                    )}
                </div>
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Requests List */}
                <div className={cn(
                    "xl:col-span-2 space-y-4 transition-all duration-500",
                    isManaging ? "hidden xl:block opacity-50 pointer-events-none grayscale-[0.5]" : "block"
                )}>

                    <div className="space-y-4">
                        {filteredApps.map((app) => (
                            <div 
                                key={app.id}
                                onClick={() => { setSelectedApp(app); setIsManaging(true); }}
                                className={cn(
                                    "p-6 bg-white rounded-[32px] border transition-all cursor-pointer group hover:shadow-xl hover:scale-[1.01] active:scale-[0.99]",
                                    selectedApp?.id === app.id ? "border-orange-500 ring-4 ring-orange-50" : "border-gray-100 shadow-sm"
                                )}
                            >
                                <div className="flex justify-between items-start">
                                    <div className="flex gap-5">
                                        <div className={cn(
                                            "w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black shadow-inner",
                                            app.applicantRole === 'freelancer' ? "bg-blue-50 text-blue-600" : "bg-purple-50 text-purple-600"
                                        )}>
                                            {app.applicantName.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="text-xl font-black text-gray-900">{app.applicantName}</h3>
                                                <span className={cn(
                                                    "px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest",
                                                    app.applicantRole === 'freelancer' ? "bg-blue-100 text-blue-600" : "bg-purple-100 text-purple-600"
                                                )}>
                                                    {app.applicantRole}
                                                </span>
                                            </div>
                                            <p className="text-gray-500 font-bold text-sm flex items-center gap-1.5">
                                                <Briefcase className="w-4 h-4 text-orange-500" />
                                                {app.projectTitle}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className={cn(
                                            "inline-block px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border mb-3",
                                            app.status === 'Selected' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                                            app.status === 'Rejected' ? "bg-red-50 text-red-600 border-red-100" :
                                            "bg-orange-50 text-orange-600 border-orange-100"
                                        )}>
                                            {app.status}
                                        </span>
                                        <div className="flex items-center justify-end text-gray-400 font-bold text-xs gap-1.5">
                                            <Calendar className="w-3.5 h-3.5" />
                                            {app.appliedDate}
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6 flex items-center justify-between pt-6 border-t border-gray-50">
                                    <div className="flex gap-8">
                                        <div className="flex items-center gap-2">
                                            <DollarSign className="w-4 h-4 text-gray-400" />
                                            <span className="text-sm font-black text-gray-900">${app.budget}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-4 h-4 text-gray-400" />
                                            <span className="text-sm font-bold text-gray-500">{app.duration}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center text-orange-500 font-black text-xs uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                                        Review Details <ChevronRight className="w-4 h-4 ml-1" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Management Detail Panel */}
                <div className={cn(
                    "xl:col-span-1 fixed inset-y-0 right-0 w-full xl:w-[480px] bg-white shadow-2xl z-[100] flex flex-col transition-transform duration-500 transform overflow-hidden border-l border-gray-100",
                    isManaging ? "translate-x-0" : "translate-x-full"
                )}>
                    {selectedApp ? (
                        <>
                            {/* Panel Header */}
                            <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-slate-50/30">
                                <button 
                                    onClick={() => setIsManaging(false)}
                                    className="p-3 bg-white border border-gray-100 rounded-2xl text-gray-400 hover:text-gray-900 hover:shadow-md transition-all"
                                >
                                    <ArrowLeft className="w-5 h-5" />
                                </button>
                                <div className="flex gap-2">
                                    <button 
                                        onClick={() => handleAction(selectedApp.id, 'Selected')}
                                        className={cn(
                                            "px-4 py-2 rounded-xl transition-all shadow-sm font-black text-xs uppercase tracking-widest",
                                            selectedApp.status === 'Selected' ? "bg-emerald-500 text-white shadow-emerald-200" : "bg-white text-emerald-600 border border-emerald-100 hover:bg-emerald-50"
                                        )}
                                    >
                                        Accept
                                    </button>
                                    <button 
                                        onClick={() => handleAction(selectedApp.id, 'Rejected')}
                                        className={cn(
                                            "px-4 py-2 rounded-xl transition-all shadow-sm font-black text-xs uppercase tracking-widest",
                                            selectedApp.status === 'Rejected' ? "bg-red-500 text-white shadow-red-200" : "bg-white text-red-600 border border-red-100 hover:bg-red-50"
                                        )}
                                    >
                                        Reject
                                    </button>
                                </div>
                            </div>

                            {/* Scrollable Content */}
                            <div className="flex-1 overflow-y-auto p-8 space-y-10">
                                {/* Profile Summary */}
                                <div className="text-center space-y-6">
                                    <div className={cn(
                                        "w-28 h-28 mx-auto rounded-[40px] flex items-center justify-center text-4xl font-black shadow-2xl relative group",
                                        selectedApp.applicantRole === 'freelancer' ? "bg-blue-600 text-white" : "bg-purple-600 text-white"
                                    )}>
                                        {selectedApp.applicantName.charAt(0)}
                                    </div>
                                    <div>
                                        <h2 className="text-3xl font-black text-gray-900">{selectedApp.applicantName}</h2>
                                        <p className="text-gray-500 font-bold mb-6">{selectedApp.email}</p>
                                        
                                        <Link 
                                            href={`/Admin/Dashboard/portfolio?id=${selectedApp.profileId}&from=requests`}
                                            className="inline-flex items-center gap-2 px-8 py-3.5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-slate-200 group"
                                        >
                                            <Eye className="w-4 h-4" /> 
                                            View Portfolio
                                            <ExternalLink className="w-3 h-3 ml-1 text-gray-400 group-hover:text-white transition-colors" />
                                        </Link>
                                    </div>
                                </div>

                                {/* Application Details */}
                                <div className="space-y-6">
                                    <div className="bg-slate-50 p-8 rounded-[40px] space-y-5 border border-gray-100">
                                        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Application Summary</h4>
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="space-y-1">
                                                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Budget</p>
                                                <p className="text-lg font-black text-gray-900">${selectedApp.budget}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Timeline</p>
                                                <p className="text-lg font-black text-gray-900">{selectedApp.duration}</p>
                                            </div>
                                        </div>
                                        <div className="pt-4 border-t border-gray-200/50">
                                            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Project</p>
                                            <p className="text-sm font-bold text-gray-900">{selectedApp.projectTitle}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Cover Letter</h4>
                                        <div className="relative">
                                            <div className="absolute -left-2 -top-2 text-4xl text-orange-500/20 font-serif">&quot;</div>
                                            <p className="text-sm text-gray-600 leading-relaxed font-medium bg-white border border-gray-100 p-8 rounded-[32px] relative z-10 shadow-sm">
                                                {selectedApp.coverLetter}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Shared Assets Section (Only if selected) */}
                                {selectedApp.status === 'Selected' && (
                                    <div className="pt-8 border-t border-gray-100">
                                        <ProjectWorkspace 
                                            application={selectedApp} 
                                            currentUserRole="Admin" 
                                            currentUserName="Admin" 
                                        />
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-center p-12 space-y-6">
                            <div className="w-24 h-24 bg-slate-50 rounded-[40px] flex items-center justify-center border border-gray-100 shadow-inner">
                                <MessageSquare className="w-10 h-10 text-gray-300" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-black text-gray-900">Select a Request</h3>
                                <p className="text-gray-400 font-bold mt-2 max-w-xs mx-auto">Choose an application from the list to review their portfolio and manage the project.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Empty State */}
            {filteredApps.length === 0 && (
                <div className="py-40 text-center bg-white rounded-[48px] border border-gray-100 shadow-sm">
                    <div className="w-24 h-24 bg-orange-50 rounded-[40px] flex items-center justify-center mx-auto mb-8 border border-orange-100 shadow-inner">
                        <Clock className="w-12 h-12 text-orange-500" />
                    </div>
                    <h3 className="text-3xl font-black text-gray-900">No matching requests</h3>
                    <p className="text-gray-400 font-bold mt-3 text-lg">Try adjusting your filters or search terms</p>
                </div>
            )}
        </div>
    );
}
