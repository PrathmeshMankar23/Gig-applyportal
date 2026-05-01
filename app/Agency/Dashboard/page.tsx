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

export default function AgencyDashboardPage() {
    const stats = [
        { label: "Active Projects", value: "8", icon: Briefcase, color: "text-blue-600", bg: "bg-blue-50" },
        { label: "Team Members", value: "12", icon: Users, color: "text-purple-600", bg: "bg-purple-50" },
        { label: "Completion Rate", value: "94%", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
        { label: "Avg. Response", value: "2h", icon: Clock, color: "text-orange-500", bg: "bg-orange-50" },
    ];

    const recentProjects = [
        { name: "E-commerce Redesign", client: "TechStore Inc.", status: "In Progress", progress: 65, team: 4 },
        { name: "Mobile Banking App", client: "Global Bank", status: "Planning", progress: 15, team: 3 },
        { name: "CRM Integration", client: "SalesForce Pro", status: "Review", progress: 90, team: 2 },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Agency Dashboard</h1>
                    <p className="text-gray-500 mt-1 font-medium">Overview of your agency's performance and projects</p>
                </div>
                <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-purple-100">
                    <Plus className="w-5 h-5" />
                    New Project
                </button>
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
                    <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-xl font-bold text-gray-900">Active Projects</h3>
                            <button className="text-sm font-bold text-purple-600 hover:underline">View All</button>
                        </div>
                        <div className="space-y-6">
                            {recentProjects.map((project, i) => (
                                <div key={i} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-2xl transition-colors border border-transparent hover:border-gray-100">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center font-bold text-gray-400">
                                            {project.name[0]}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900">{project.name}</h4>
                                            <p className="text-xs text-gray-400 font-medium">{project.client}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-8">
                                        <div className="text-right hidden md:block">
                                            <p className="text-xs font-bold text-gray-400 uppercase">Progress</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                    <div className="h-full bg-purple-500" style={{ width: `${project.progress}%` }} />
                                                </div>
                                                <span className="text-xs font-bold text-gray-900">{project.progress}%</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${
                                                project.status === 'In Progress' ? 'bg-blue-50 text-blue-600' :
                                                project.status === 'Review' ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-500'
                                            }`}>
                                                {project.status}
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