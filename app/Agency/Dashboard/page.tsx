"use client";

import React from 'react';
import {
    Users,
    Briefcase,
    TrendingUp,
    Clock,
    CheckCircle2,
    MessageSquare,
    Plus,
    BarChart3
} from "lucide-react";

import { useApplications, Application } from "@/context/ApplicationContext";
import ProjectWorkspace from "@/components/ProjectWorkspace";
import { cn } from "@/lib/utils";
import { ChevronRight } from 'lucide-react';

export default function AgencyDashboardPage() {
    const { applications } = useApplications();
    const [selectedApp, setSelectedApp] = React.useState<Application | null>(null);
    const [isWorkspaceOpen, setIsWorkspaceOpen] = React.useState(false);

    // Filter applications for Creative Studios (Mocking current user)
    const myApplications = applications.filter(app => app.applicantName === "Creative Studios Inc.");

    const stats = [
        { label: "Active Projects", value: myApplications.filter(a => a.status === 'Selected').length.toString(), icon: Briefcase, color: "text-blue-600", bg: "bg-blue-50" },
        { label: "Pending Requests", value: myApplications.filter(a => a.status === 'Pending').length.toString(), icon: Users, color: "text-purple-600", bg: "bg-purple-50" },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500 relative overflow-hidden">
            {/* Workspace Side Panel */}
            <div className={cn(
                "fixed inset-y-0 right-0 w-full lg:w-[500px] bg-white shadow-2xl z-[100] transform transition-transform duration-500 ease-in-out border-l border-gray-100 flex flex-col",
                isWorkspaceOpen ? "translate-x-0" : "translate-x-full"
            )}>
                {selectedApp && (
                    <>
                        <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-slate-50/30">
                            <div>
                                <h2 className="text-xl font-black text-gray-900">{selectedApp.projectTitle}</h2>
                                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Project Workspace</p>
                            </div>
                            <button
                                onClick={() => setIsWorkspaceOpen(false)}
                                className="p-3 bg-white border border-gray-100 rounded-2xl text-gray-400 hover:text-gray-900 hover:shadow-md transition-all"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                            <ProjectWorkspace
                                application={selectedApp}
                                currentUserRole="Agency"
                                currentUserName="Creative Studios Inc."
                            />
                        </div>
                    </>
                )}
            </div>

            {/* Header */}
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Agency Dashboard</h1>
                    <p className="text-gray-500 mt-1 font-medium">Overview of your agency's performance and projects</p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-[28px] border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                        <div className="flex justify-between items-start">
                            <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">+12%</span>
                        </div>
                        <div className="mt-4">
                            <p className="text-gray-500 text-sm font-bold uppercase tracking-wider">{stat.label}</p>
                            <h3 className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Projects Section */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm">
                        <div className="flex justify-between items-center mb-10">
                            <h3 className="text-2xl font-black text-gray-900">Your Active Proposals</h3>
                        </div>
                        <div className="space-y-4">
                            {myApplications.map((app) => (
                                <div
                                    key={app.id}
                                    onClick={() => {
                                        setSelectedApp(app);
                                        setIsWorkspaceOpen(true);
                                    }}
                                    className="flex items-center justify-between p-6 bg-white border border-gray-100 rounded-[32px] hover:border-purple-200 hover:shadow-xl hover:shadow-purple-500/5 transition-all cursor-pointer group"
                                >
                                    <div className="flex items-center gap-6">
                                        <div className={cn(
                                            "w-16 h-16 rounded-[20px] flex items-center justify-center font-black transition-colors border",
                                            app.status === 'Selected'
                                                ? "bg-purple-50 text-purple-600 border-purple-100 shadow-lg shadow-purple-500/10"
                                                : "bg-slate-50 text-slate-300 border-gray-100 group-hover:bg-purple-50 group-hover:text-purple-500"
                                        )}>
                                            {app.projectTitle[0]}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h4 className="font-black text-gray-900 text-lg group-hover:text-purple-600 transition-colors">{app.projectTitle}</h4>
                                                {app.status === 'Selected' && (
                                                    <span className="text-[8px] font-black bg-purple-600 text-white px-2 py-0.5 rounded-md uppercase tracking-widest animate-pulse">Selected</span>
                                                )}
                                            </div>
                                            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-0.5">Admin Review</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-8">
                                        <div className="text-right">
                                            <span className={cn(
                                                "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border",
                                                app.status === 'Selected' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                                                    app.status === 'Rejected' ? "bg-red-50 text-red-600 border-red-100" :
                                                        "bg-orange-50 text-orange-600 border-orange-100"
                                            )}>
                                                {app.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Activity / Team */}
                <div className="space-y-8">
                    <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h3>
                        <div className="space-y-6">
                            {[
                                { user: "Alex Chen", action: "uploaded a new design", time: "2h ago" },
                                { user: "Sarah Miller", action: "completed Task #42", time: "4h ago" },
                                { user: "Admin", action: "approved project budget", time: "1d ago" },
                            ].map((activity, i) => (
                                <div key={i} className="flex gap-3">
                                    <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 shrink-0" />
                                    <div>
                                        <p className="text-sm text-gray-900 leading-snug">
                                            <span className="font-bold">{activity.user}</span> {activity.action}
                                        </p>
                                        <p className="text-xs text-gray-400 font-medium mt-1">{activity.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-600 to-indigo-700 p-8 rounded-[32px] text-white shadow-xl shadow-purple-100">
                        <div className="flex items-center gap-3 mb-4">
                            <TrendingUp className="w-6 h-6" />
                            <h3 className="text-lg font-bold">Growth Insight</h3>
                        </div>
                        <p className="text-purple-50 text-sm leading-relaxed opacity-90">
                            Your agency's efficiency has increased by 14% compared to last month. Keep up the great work!
                        </p>
                        <button className="mt-6 w-full py-3 bg-white/20 hover:bg-white/30 rounded-xl text-sm font-bold transition-all">
                            View Detailed Report
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}