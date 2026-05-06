"use client";

import React from 'react';
import { Bell, Clock, CheckCircle2, MessageSquare, AlertCircle, FileText, UserPlus } from 'lucide-react';
import { useApplications } from '@/context/ApplicationContext';
import { cn } from "@/lib/utils";

export default function AdminNotificationsPage() {
    const { notifications, markAsRead } = useApplications();
    const [projectFilter, setProjectFilter] = React.useState("All Projects");
    
    const getIcon = (type: string) => {
        switch (type) {
            case 'comment': return MessageSquare;
            case 'file': return FileText;
            case 'status': return CheckCircle2;
            case 'application': return UserPlus;
            default: return Bell;
        }
    };

    const getColorClass = (type: string) => {
        switch (type) {
            case 'comment': return "text-purple-600 bg-purple-50";
            case 'file': return "text-blue-600 bg-blue-50";
            case 'status': return "text-emerald-600 bg-emerald-50";
            case 'application': return "text-orange-600 bg-orange-50";
            default: return "text-gray-600 bg-gray-50";
        }
    };

    const projects = ["All Projects", ...new Set(notifications.map(n => n.projectTitle))];
    const filteredNotifications = notifications.filter(n => projectFilter === "All Projects" || n.projectTitle === projectFilter);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight">Notifications</h1>
                    <p className="text-gray-500 font-bold mt-1">Activity tailored to your active projects</p>
                </div>

                {/* Project Filter */}
                <div className="bg-white p-1.5 rounded-full shadow-sm border border-gray-100 flex items-center gap-1.5">
                    {projects.map((proj) => (
                        <button
                            key={proj}
                            onClick={() => setProjectFilter(proj)}
                            className={cn(
                                "px-6 py-2.5 rounded-full font-black text-[10px] uppercase tracking-widest transition-all",
                                projectFilter === proj 
                                ? "bg-emerald-600 text-white shadow-lg shadow-emerald-100" 
                                : "text-gray-400 hover:text-gray-900 hover:bg-gray-50"
                            )}
                        >
                            {proj}
                        </button>
                    ))}
                </div>
            </div>

            <div className="bg-white rounded-[48px] border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-10 border-b border-gray-50 flex items-center justify-between bg-slate-50/30">
                    <h2 className="text-2xl font-black text-gray-900">Recent Activity</h2>
                    <button className="text-xs font-black text-emerald-600 uppercase tracking-widest hover:bg-emerald-50 px-6 py-3 rounded-2xl transition-all">
                        Mark all as read
                    </button>
                </div>

                <div className="divide-y divide-gray-50">
                    {filteredNotifications.map((notif) => {
                        const Icon = getIcon(notif.type);
                        return (
                            <div 
                                key={notif.id} 
                                onClick={() => markAsRead(notif.id)}
                                className={cn(
                                    "p-10 flex gap-8 hover:bg-gray-50/50 transition-colors group cursor-pointer relative",
                                    !notif.read && "bg-emerald-50/10"
                                )}
                            >
                                {!notif.read && (
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500" />
                                )}
                                <div className={cn(
                                    "w-16 h-16 rounded-[24px] flex items-center justify-center shrink-0 shadow-inner",
                                    getColorClass(notif.type)
                                )}>
                                    <Icon className="w-7 h-7" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-3">
                                            <h3 className="text-lg font-black text-gray-900 group-hover:text-emerald-600 transition-colors">{notif.title}</h3>
                                            <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-lg text-[9px] font-black uppercase tracking-tighter">
                                                {notif.projectTitle}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-400 font-bold text-[10px] uppercase tracking-widest">
                                            <Clock className="w-3.5 h-3.5" />
                                            {notif.time}
                                        </div>
                                    </div>
                                    <p className="text-gray-500 font-medium leading-relaxed max-w-3xl text-sm">{notif.message}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {filteredNotifications.length === 0 && (
                    <div className="py-32 text-center">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Bell className="w-10 h-10 text-gray-200" />
                        </div>
                        <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">No notifications for this project</p>
                    </div>
                )}
            </div>
        </div>
    );
}
