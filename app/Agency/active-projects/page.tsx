"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useApplications } from "@/context/ApplicationContext";
import { cn } from "@/lib/utils";
import { 
    FolderCheck, 
    ArrowRight, 
    Calendar, 
    DollarSign,
    MessageSquare,
    Files,
    Activity
} from "lucide-react";

export default function AgencyActiveProjects() {
    const router = useRouter();
    const { applications } = useApplications();

    // Filter for current user's SELECTED projects (Agency mock: Creative Studios Inc.)
    const activeProjects = applications.filter(
        app => app.applicantName === "Creative Studios Inc." && app.status === "Selected"
    );

    return (
        <div className="p-8 bg-slate-50 min-h-screen">
            {/* Header Section */}
            <div className="mb-10 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">Active Projects</h1>
                    <p className="text-gray-500 font-medium">Projects your agency is currently handling</p>
                </div>
                <div className="bg-purple-50 px-4 py-2 rounded-xl border border-purple-100 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-purple-600" />
                    <span className="text-purple-600 font-black text-xs uppercase tracking-widest">{activeProjects.length} Ongoing</span>
                </div>
            </div>

            {activeProjects.length > 0 ? (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    {activeProjects.map((app) => (
                        <div 
                            key={app.id}
                            className="bg-white rounded-[40px] p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden"
                        >
                            {/* Accent Background */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50/50 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110" />

                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="w-16 h-16 bg-purple-50 rounded-[24px] flex items-center justify-center text-purple-600 font-black text-2xl border border-purple-100">
                                        {app.projectTitle[0]}
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 text-gray-400 rounded-lg font-bold text-[10px] uppercase tracking-widest border border-gray-100">
                                            <MessageSquare className="w-3 h-3" />
                                            {app.messages.length}
                                        </div>
                                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 text-gray-400 rounded-lg font-bold text-[10px] uppercase tracking-widest border border-gray-100">
                                            <Files className="w-3 h-3" />
                                            {app.files.length}
                                        </div>
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                                    {app.projectTitle}
                                </h3>
                                <p className="text-gray-400 font-bold text-sm mb-8 uppercase tracking-widest">Team Assigned • Selected: {app.appliedDate}</p>

                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    <div className="p-4 bg-slate-50 rounded-2xl border border-gray-50">
                                        <div className="flex items-center gap-2 mb-1">
                                            <DollarSign className="w-4 h-4 text-gray-400" />
                                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Contract Value</span>
                                        </div>
                                        <p className="text-gray-900 font-black text-lg">${app.budget}</p>
                                    </div>
                                    <div className="p-4 bg-slate-50 rounded-2xl border border-gray-50">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Calendar className="w-4 h-4 text-gray-400" />
                                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Deadline</span>
                                        </div>
                                        <p className="text-gray-900 font-black text-lg">{app.duration}</p>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <button 
                                        onClick={() => router.push(`/Agency/Dashboard?appId=${app.id}`)}
                                        className="w-full flex items-center justify-center gap-3 py-5 bg-purple-600 text-white rounded-[24px] font-black uppercase tracking-widest text-xs hover:bg-purple-700 shadow-lg shadow-purple-100 transition-all group/btn"
                                    >
                                        Open Agency Workspace
                                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                    </button>
                                    <button 
                                        onClick={() => router.push(`/Agency/projects/${app.projectId}/track`)}
                                        className="w-full flex items-center justify-center gap-3 py-5 bg-white text-purple-600 border border-purple-100 rounded-[24px] font-black uppercase tracking-widest text-xs hover:bg-purple-50 transition-all"
                                    >
                                        Track Progress
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-[40px] p-32 border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center">
                    <div className="w-24 h-24 bg-gray-50 rounded-[32px] flex items-center justify-center mb-8 border border-gray-50">
                        <FolderCheck className="w-12 h-12 text-gray-200" />
                    </div>
                    <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">No Active Projects</h2>
                    <p className="text-gray-500 font-medium max-w-sm mb-10 leading-relaxed text-lg">
                        Once an admin selects your agency for a project, it will appear here for team collaboration and file management.
                    </p>
                    <button 
                        onClick={() => router.push("/Agency/applications")}
                        className="bg-purple-600 hover:bg-purple-700 text-white font-black py-5 px-12 rounded-[24px] transition-all shadow-xl shadow-purple-100 uppercase tracking-widest text-xs"
                    >
                        Review Applications
                    </button>
                </div>
            )}
        </div>
    );
}
