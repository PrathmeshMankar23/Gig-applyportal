"use client";

import React, { useState } from 'react';
import { 
    Clock, 
    CheckCircle2, 
    MessageSquare, 
    Upload, 
    FileText, 
    Send,
    Bell,
    MoreVertical,
    Lock
} from 'lucide-react';
import { useApplications, Application, Notification } from '@/context/ApplicationContext';
import { cn } from "@/lib/utils";

interface ProjectWorkspaceProps {
    application: Application;
    currentUserRole: 'Admin' | 'Freelancer' | 'Agency';
    currentUserName: string;
}

export default function ProjectWorkspace({ application, currentUserRole, currentUserName }: ProjectWorkspaceProps) {
    const { notifications, addComment, uploadFile } = useApplications();
    const [commentText, setCommentText] = useState("");
    const [activeTab, setActiveTab] = useState<'discussion' | 'files' | 'activity'>('discussion');

    const projectNotifications = notifications.filter(n => n.applicationId === application.id);

    const handleAddComment = (e: React.FormEvent) => {
        e.preventDefault();
        if (!commentText.trim()) return;
        addComment(application.id, currentUserName, currentUserRole, commentText);
        setCommentText("");
    };

    const handleUploadSim = () => {
        const fileName = prompt("Enter file name for simulation:");
        if (fileName) {
            uploadFile(application.id, fileName, currentUserName, currentUserRole, "#");
        }
    };

    return (
        <div className="flex flex-col h-full space-y-6">
            {/* Selection Announcement Message */}
            {application.status === 'Selected' && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-[28px] p-6 animate-in zoom-in duration-500 shadow-sm shadow-emerald-500/5">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-emerald-200">
                            <CheckCircle2 className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h4 className="text-emerald-900 font-black text-lg tracking-tight leading-tight">Congratulations!</h4>
                            <p className="text-emerald-700/80 text-xs font-bold mt-1 leading-relaxed">
                                You have been selected for <span className="text-emerald-900">{application.projectTitle}</span>. 
                                You now have full permissions to collaborate, upload deliverables, and communicate with the project manager.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Project Header Info */}
            <div className="bg-slate-900 rounded-[32px] p-8 text-white shadow-xl shadow-slate-200">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-2xl font-black tracking-tight">{application.projectTitle}</h3>
                        <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-1">Project Workspace</p>
                    </div>
                    <div className="px-4 py-1.5 bg-white/10 rounded-full border border-white/10 text-[10px] font-black uppercase tracking-widest">
                        {application.status}
                    </div>
                </div>
                <div className="mt-8 flex gap-6">
                    <div>
                        <p className="text-slate-500 text-[8px] font-black uppercase tracking-widest">Budget</p>
                        <p className="text-lg font-black">${application.budget}</p>
                    </div>
                    <div>
                        <p className="text-slate-500 text-[8px] font-black uppercase tracking-widest">Applicant</p>
                        <p className="text-lg font-black text-orange-400">{application.applicantName}</p>
                    </div>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex p-1.5 bg-gray-100 rounded-[24px] gap-1">
                <button 
                    onClick={() => setActiveTab('discussion')}
                    className={cn(
                        "flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all",
                        activeTab === 'discussion' ? "bg-white text-slate-900 shadow-sm" : "text-gray-400 hover:text-gray-600"
                    )}
                >
                    <MessageSquare className="w-3.5 h-3.5" />
                    Discussion
                </button>
                <button 
                    onClick={() => setActiveTab('files')}
                    className={cn(
                        "flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all",
                        activeTab === 'files' ? "bg-white text-slate-900 shadow-sm" : "text-gray-400 hover:text-gray-600"
                    )}
                >
                    <FileText className="w-3.5 h-3.5" />
                    Files
                </button>
                <button 
                    onClick={() => setActiveTab('activity')}
                    className={cn(
                        "flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all",
                        activeTab === 'activity' ? "bg-white text-slate-900 shadow-sm" : "text-gray-400 hover:text-gray-600"
                    )}
                >
                    <Bell className="w-3.5 h-3.5" />
                    Activity
                </button>
            </div>

            {/* Tab Content */}
            <div className="flex-1 min-h-0">
                {activeTab === 'discussion' && (
                    <div className="flex flex-col h-full space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4">
                            {application.messages.length > 0 ? application.messages.map(msg => {
                                const isMe = msg.sender === currentUserName;
                                return (
                                    <div key={msg.id} className={cn(
                                        "p-5 rounded-[24px] max-w-[85%] space-y-1 shadow-sm border",
                                        isMe 
                                        ? "ml-auto bg-slate-900 text-white rounded-tr-none border-slate-800" 
                                        : "bg-white border-gray-100 rounded-tl-none text-gray-900"
                                    )}>
                                        <div className="flex items-center gap-2 mb-1">
                                            <p className={cn("text-[10px] font-black uppercase tracking-widest", isMe ? "text-slate-400" : "text-orange-500")}>
                                                {msg.sender} <span className="opacity-60 text-[8px] font-bold">({msg.senderRole || 'User'})</span>
                                            </p>
                                        </div>
                                        <p className="text-xs font-bold leading-relaxed">{msg.content}</p>
                                        <p className={cn("text-[8px] font-black uppercase opacity-40 mt-1", isMe ? "text-white" : "text-gray-400")}>{msg.timestamp}</p>
                                    </div>
                                );
                            }) : (
                                <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                                    <MessageSquare className="w-12 h-12 mb-4" />
                                    <p className="text-[10px] font-black uppercase tracking-widest">No messages yet</p>
                                </div>
                            )}
                        </div>
                        {(application.status === 'Selected' || currentUserRole === 'Admin') ? (
                            <form onSubmit={handleAddComment} className="relative pt-4">
                                <input 
                                    type="text"
                                    value={commentText}
                                    onChange={(e) => setCommentText(e.target.value)}
                                    placeholder="Type your message..."
                                    className="w-full pl-6 pr-16 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-orange-500/10 focus:bg-white font-bold text-xs transition-all"
                                />
                                <button 
                                    type="submit"
                                    disabled={!commentText.trim()}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-orange-500 text-white rounded-xl shadow-lg shadow-orange-200 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </form>
                        ) : (
                            <div className="pt-4 px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-center">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Discussion will be unlocked after selection</p>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'files' && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex justify-between items-center px-2">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Shared Files ({application.files.length})</p>
                            {(application.status === 'Selected' || currentUserRole === 'Admin') && (
                                <button 
                                    onClick={handleUploadSim}
                                    className="p-2 bg-orange-50 text-orange-500 rounded-lg hover:bg-orange-100 transition-colors"
                                >
                                    <Upload className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                        {(application.status !== 'Selected' && currentUserRole !== 'Admin') && (
                            <div className="px-4 py-8 bg-slate-50 border-2 border-dashed border-gray-100 rounded-[32px] text-center">
                                <Lock className="w-8 h-8 text-slate-300 mx-auto mb-3" />
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">File sharing unlocks after selection</p>
                            </div>
                        )}
                        <div className="grid grid-cols-1 gap-3">
                            {application.files.length > 0 ? application.files.map(file => (
                                <div key={file.id} className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl hover:border-orange-200 transition-all group shadow-sm">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-orange-50 rounded-xl text-orange-500">
                                            <FileText className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-black text-gray-900">{file.name}</p>
                                            <div className="flex items-center gap-2 mt-0.5">
                                                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter">{file.timestamp}</p>
                                                <span className="text-[9px] text-gray-300">•</span>
                                                <p className="text-[9px] text-orange-500 font-black uppercase tracking-tighter">
                                                    {file.sender} <span className="text-gray-400 text-[8px] font-bold">({file.senderRole})</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="p-2 text-gray-300 hover:text-gray-900 transition-colors">
                                        <MoreVertical className="w-4 h-4" />
                                    </button>
                                </div>
                            )) : (
                                <div className="py-20 text-center opacity-30 flex flex-col items-center">
                                    <FileText className="w-12 h-12 mb-4" />
                                    <p className="text-[10px] font-black uppercase tracking-widest">No shared files</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'activity' && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">Project Activity Log</p>
                        <div className="space-y-4">
                            {projectNotifications.length > 0 ? projectNotifications.map((notif) => (
                                <div key={notif.id} className="flex gap-4 p-4 bg-gray-50/50 rounded-2xl border border-gray-100/50">
                                    <div className={cn(
                                        "w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-sm",
                                        notif.type === 'comment' ? "bg-purple-50 text-purple-600" :
                                        notif.type === 'file' ? "bg-blue-50 text-blue-600" :
                                        notif.type === 'status' ? "bg-emerald-50 text-emerald-600" :
                                        "bg-orange-50 text-orange-600"
                                    )}>
                                        {notif.type === 'comment' ? <MessageSquare className="w-4 h-4" /> :
                                         notif.type === 'file' ? <FileText className="w-4 h-4" /> :
                                         notif.type === 'status' ? <CheckCircle2 className="w-4 h-4" /> :
                                         <Bell className="w-4 h-4" />}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[11px] font-black text-gray-900 leading-tight">{notif.title}</p>
                                        <p className="text-[10px] text-gray-500 font-medium mt-0.5">{notif.message}</p>
                                        <p className="text-[8px] text-gray-400 font-black uppercase mt-1 tracking-tighter opacity-60">{notif.time}</p>
                                    </div>
                                </div>
                            )) : (
                                <div className="py-20 text-center opacity-30 flex flex-col items-center">
                                    <Bell className="w-12 h-12 mb-4" />
                                    <p className="text-[10px] font-black uppercase tracking-widest">No activity recorded</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
