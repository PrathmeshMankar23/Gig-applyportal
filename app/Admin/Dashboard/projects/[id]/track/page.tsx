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

export default function ProjectTrackingPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = React.use(params);
    const id = resolvedParams.id;
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Notification State
    const [notification, setNotification] = useState<string | null>(null);

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

    // State for Files
    const [files, setFiles] = useState([
        { name: 'Project_Requirements.pdf', size: '2.4 MB' },
        { name: 'Design_Mockups.fig', size: '15.8 MB' },
        { name: 'API_Documentation.pdf', size: '1.1 MB' }
    ]);

    // Modal States
    const [isMilestoneModalOpen, setIsMilestoneModalOpen] = useState(false);
    const [newMilestone, setNewMilestone] = useState({ title: '', date: '', description: '', status: 'pending' });

    // Handlers
    const handleAddMilestone = (e: React.FormEvent) => {
        e.preventDefault();
        setMilestones([...milestones, { ...newMilestone, status: 'pending' }]);
        setIsMilestoneModalOpen(false);
        setNewMilestone({ title: '', date: '', description: '', status: 'pending' });
        showNotification("Milestone added successfully!");
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const fileSize = (file.size / (1024 * 1024)).toFixed(1) + ' MB';
            setFiles([{ name: file.name, size: fileSize }, ...files]);
            showNotification(`File "${file.name}" uploaded successfully!`);
        }
    };

    const removeFile = (index: number) => {
        const fileName = files[index].name;
        setFiles(files.filter((_, i) => i !== index));
        showNotification(`File "${fileName}" removed`);
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
            <Link href="/Admin/Dashboard/projects" className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors mb-4 w-fit">
                <ArrowLeft className="w-4 h-4" />
                Back to Projects
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
                        <button 
                            onClick={() => setIsMilestoneModalOpen(true)}
                            className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-emerald-700 transition-all shadow-sm shadow-emerald-100"
                        >
                            <Plus className="w-4 h-4" /> Add Milestone
                        </button>
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
                            {files.map((file, i) => (
                                <div key={i} className="flex justify-between items-center p-4 bg-white border border-gray-100 rounded-xl hover:border-blue-200 transition-colors group shadow-sm">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2.5 bg-blue-50 text-blue-500 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                                            <FileText className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <span className="text-sm font-bold text-gray-900 block">{file.name}</span>
                                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{file.size}</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"><Download className="w-4 h-4" /></button>
                                        <button 
                                            onClick={() => removeFile(i)}
                                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Recent Activity Side Column */}
                <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm h-fit">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h3>
                    <div className="space-y-8 relative">
                        <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-gray-50" />
                        {[
                            { act: "Completed milestone 'UI/UX Design'", user: "Sarah Johnson", time: "2 days ago" },
                            { act: "Updated project deadline", user: "Admin", time: "3 days ago" },
                            { act: "Uploaded design mockups", user: "Sarah Johnson", time: "5 days ago" },
                        ].map((a, i) => (
                            <div key={i} className="relative pl-10">
                                <div className="absolute left-3 w-2.5 h-2.5 bg-emerald-500 rounded-full border-4 border-white ring-1 ring-emerald-500" />
                                <p className="text-sm font-bold text-gray-900 leading-snug">{a.act}</p>
                                <p className="text-xs text-gray-400 mt-1 font-medium">{a.user} • {a.time}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Add Milestone Modal */}
            {isMilestoneModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-[32px] w-full max-w-lg p-10 shadow-2xl relative animate-in zoom-in-95 duration-200">
                        <button onClick={() => setIsMilestoneModalOpen(false)} className="absolute right-8 top-8 p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-colors">
                            <X className="w-6 h-6" />
                        </button>
                        <h2 className="text-2xl font-bold text-gray-900 mb-8 tracking-tight">Add Milestone</h2>
                        <form onSubmit={handleAddMilestone} className="space-y-6">
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase mb-2 tracking-widest">Milestone Title *</label>
                                <input 
                                    required
                                    value={newMilestone.title}
                                    onChange={e => setNewMilestone({...newMilestone, title: e.target.value})}
                                    className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-xl focus:border-emerald-500 outline-none transition-all font-medium text-gray-900 shadow-sm"
                                    placeholder="e.g. Design Completion"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase mb-2 tracking-widest">Due Date *</label>
                                <input 
                                    required
                                    type="date"
                                    value={newMilestone.date}
                                    onChange={e => setNewMilestone({...newMilestone, date: e.target.value})}
                                    className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-xl focus:border-emerald-500 outline-none transition-all font-medium text-gray-900 shadow-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase mb-2 tracking-widest">Description</label>
                                <textarea 
                                    value={newMilestone.description}
                                    onChange={e => setNewMilestone({...newMilestone, description: e.target.value})}
                                    className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-xl focus:border-emerald-500 outline-none transition-all font-medium text-gray-900 resize-none shadow-sm"
                                    placeholder="Briefly describe what this milestone covers..."
                                    rows={3}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase mb-3 tracking-widest">Supporting Document</label>
                                <button 
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-xl py-4 text-gray-500 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all font-bold shadow-sm"
                                >
                                    <Upload className="w-5 h-5" />
                                    Upload File
                                </button>
                            </div>
                            <div className="mt-10 flex gap-4">
                                <button type="button" onClick={() => setIsMilestoneModalOpen(false)} className="flex-1 py-4 border border-gray-200 rounded-2xl font-bold text-gray-600 hover:bg-gray-50 transition-all">
                                    Cancel
                                </button>
                                <button type="submit" className="flex-1 py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-100 transition-all">
                                    Add Milestone
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

// Helper function for conditional classes
function cn(...classes: unknown[]) {
    return classes.filter(Boolean).join(' ');
}