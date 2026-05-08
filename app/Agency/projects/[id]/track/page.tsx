"use client";

import React, { useState, useRef } from 'react';
import Link from "next/link";
import {
    ArrowLeft,
    Plus,
    Upload,
    Download,
    X,
    FileText,
    CheckCircle2,
    Clock,
    Circle,
    Check
} from "lucide-react";
import { useProjects } from '@/context/ProjectContext';

export default function AgencyProjectTrackingPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = React.use(params);
    const id = resolvedParams.id;
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { projects, addProjectUpdate, addProjectFile, removeProjectFile } = useProjects();
    const project = projects.find(p => p.id === parseInt(id));

    // Notification State
    const [notification, setNotification] = useState<string | null>(null);
    const [updateText, setUpdateText] = useState("");

    const showNotification = (msg: string) => {
        setNotification(msg);
        setTimeout(() => setNotification(null), 3000);
    };

    // State for Milestones
    const [milestones, setMilestones] = useState([
        { title: "Project Setup & Planning", date: "2026-04-05", comp: "2026-04-04", status: "completed", description: "Initial project kickoff and planning." },
        { title: "UI/UX Design", date: "2026-04-20", comp: "2026-04-18", status: "completed", description: "Design phase including wireframes and mockups." },
        { title: "Frontend Development", date: "2026-05-15", progress: 65, status: "progress", description: "Development of the user interface components." },
        { title: "Backend Integration", date: "2026-05-30", status: "pending", description: "Connecting the frontend with the backend APIs." },
    ]);

    // Files are now managed via ProjectContext

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const fileSize = (file.size / (1024 * 1024)).toFixed(1) + ' MB';
            addProjectFile(parseInt(id), {
                name: file.name,
                size: fileSize,
                sender: "Agency",
                senderRole: "Agency",
                url: "#"
            });
            showNotification(`File "${file.name}" uploaded successfully!`);
        }
    };

    const removeFile = (fileId: number) => {
        removeProjectFile(parseInt(id), fileId);
        showNotification(`File removed`);
    };

    const handleAddUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        if (!updateText.trim()) return;
        addProjectUpdate(parseInt(id), updateText, "Agency", "Agency");
        setUpdateText("");
        showNotification("Public update posted successfully!");
    };

    return (
        <div className="space-y-6 relative">
            {/* Success Toast */}
            {notification && (
                <div className="fixed top-8 right-8 z-[100] animate-in slide-in-from-right-10 fade-in duration-300">
                    <div className="bg-slate-900 text-white px-6 py-4 rounded-[20px] shadow-2xl flex items-center gap-3 border border-slate-800">
                        <div className="bg-emerald-500 p-1 rounded-full">
                            <Check className="w-4 h-4 text-white" strokeWidth={4} />
                        </div>
                        <p className="font-bold text-sm">{notification}</p>
                    </div>
                </div>
            )}

            {/* Back Button */}
            <Link href="/Agency/active-projects" className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors mb-4 w-fit">
                <ArrowLeft className="w-4 h-4" />
                Back to Active Projects
            </Link>

            {/* Header / Overall Progress Card */}
            <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
                <h1 className="text-3xl font-bold text-gray-900">Project Tracking</h1>
                <p className="text-gray-500 mt-1 mb-8 font-medium">Monitor milestones, progress, and activity timeline</p>

                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-gray-900">Overall Progress</span>
                        <span className="text-2xl font-bold text-gray-900">44%</span>
                    </div>
                    <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden shadow-inner">
                        <div className="h-full bg-emerald-500 rounded-full w-[44%] shadow-lg shadow-emerald-500/20" />
                    </div>

                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-50">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-emerald-600">2</p>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Completed</p>
                        </div>
                        <div className="text-center border-x border-gray-100">
                            <p className="text-2xl font-bold text-blue-600">1</p>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">In Progress</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-bold text-gray-400">3</p>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Pending</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Milestones Column */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xl font-bold text-gray-900">Milestones</h3>
                    </div>

                    {/* Milestone Items */}
                    <div className="space-y-4">
                        {milestones.map((m: any, i: number) => (
                            <div key={i} className={cn(
                                "p-6 rounded-2xl border transition-all",
                                m.status === 'completed' ? "bg-emerald-50/30 border-emerald-100" :
                                    m.status === 'progress' ? "bg-blue-50/30 border-blue-200 ring-2 ring-blue-500/10" : "bg-white border-gray-100 shadow-sm"
                            )}>
                                <div className="flex justify-between items-start">
                                    <div className="flex gap-4">
                                        {m.status === 'completed' ? <CheckCircle2 className="w-6 h-6 text-emerald-500" /> :
                                            m.status === 'progress' ? <Clock className="w-6 h-6 text-blue-500" /> : <Circle className="w-6 h-6 text-gray-300" />}
                                        <div>
                                            <h4 className="font-bold text-gray-900">{m.title}</h4>
                                            <p className="text-sm text-gray-500 mt-1">Due: {m.date}</p>
                                            {m.description && <p className="text-sm text-gray-500 mt-2 italic font-medium leading-relaxed">"{m.description}"</p>}
                                            {m.status === 'progress' && (
                                                <div className="mt-4 w-64 space-y-2">
                                                    <div className="flex justify-between text-xs font-bold">
                                                        <span className="text-blue-600">Progress</span>
                                                        <span>{m.progress}%</span>
                                                    </div>
                                                    <div className="h-1.5 w-full bg-blue-100 rounded-full overflow-hidden">
                                                        <div className="h-full bg-blue-500" style={{ width: `${m.progress}%` }} />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    {m.comp && <span className="text-xs font-bold text-emerald-600 px-3 py-1 bg-white rounded-lg shadow-sm">Completed: {m.comp}</span>}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Project Files Section */}
                    <div className="mt-12 space-y-4">
                        <div className="flex justify-between items-center">
                            <h3 className="text-xl font-bold text-gray-900">Project Files</h3>
                            <div className="flex items-center gap-2">
                                <input 
                                    type="file" 
                                    ref={fileInputRef} 
                                    className="hidden" 
                                    onChange={handleFileUpload} 
                                />
                                <button 
                                    onClick={() => fileInputRef.current?.click()}
                                    className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                                >
                                    <Upload className="w-4 h-4" /> Upload Files
                                </button>
                            </div>
                        </div>
                        <div className="space-y-2">
                            {project?.files?.map((file) => (
                                <div key={file.id} className="flex justify-between items-center p-4 bg-white border border-gray-100 rounded-xl hover:border-blue-200 transition-colors group shadow-sm">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2.5 bg-blue-50 text-blue-500 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                                            <FileText className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <span className="text-sm font-bold text-gray-900 block">{file.name}</span>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{file.size}</span>
                                                <span className="text-[10px] text-gray-300">•</span>
                                                <span className="text-[10px] text-orange-500 font-black uppercase tracking-widest">
                                                    {file.sender} ({file.senderRole})
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"><Download className="w-4 h-4" /></button>
                                        <button 
                                            onClick={() => removeFile(file.id)}
                                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {(!project?.files || project.files.length === 0) && (
                                <p className="text-center py-8 text-gray-400 font-bold text-xs">No files uploaded yet.</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Side Columns Container */}
                <div className="space-y-6 h-fit">
                    {/* Public Announcements Column */}
                    <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">Public Announcements</h3>
                        <p className="text-sm text-gray-500 mb-6 font-medium">Post updates here that all applicants can see on the project details page.</p>
                        
                        <form onSubmit={handleAddUpdate} className="space-y-4">
                            <textarea
                                value={updateText}
                                onChange={e => setUpdateText(e.target.value)}
                                className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-emerald-500 outline-none transition-all font-medium text-gray-900 resize-none shadow-sm text-sm"
                                placeholder="Type a public update..."
                                rows={3}
                            />
                            <button type="submit" disabled={!updateText.trim()} className="w-full flex justify-center items-center gap-2 py-3.5 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all disabled:opacity-50">
                                <FileText className="w-4 h-4" /> Post Update
                            </button>
                        </form>

                        {project?.updates && project.updates.length > 0 && (
                            <div className="mt-8 space-y-4 relative">
                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 border-b border-gray-100 pb-2">Past Updates</h4>
                                {project.updates.slice().reverse().map(update => (
                                    <div key={update.id} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 shadow-sm">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-[9px] font-black text-orange-500 uppercase tracking-widest">
                                                {update.sender} <span className="text-gray-400 font-bold">({update.senderRole})</span>
                                            </span>
                                            <span className="text-[9px] text-gray-400 font-black uppercase tracking-widest">{update.date}</span>
                                        </div>
                                        <p className="text-sm text-gray-900 font-bold whitespace-pre-wrap leading-relaxed">{update.text}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

// Helper function for conditional classes
function cn(...classes: unknown[]) {
    return classes.filter(Boolean).join(' ');
}