"use client";

import React from 'react';
import { Bell, Clock, CheckCircle2, MessageSquare, AlertCircle } from 'lucide-react';

export default function AdminNotificationsPage() {
    const notifications = [
        {
            id: 1,
            title: "New Registration Request",
            message: "Sarah Johnson has applied as a Freelancer for the 'Web Development' category.",
            time: "2 hours ago",
            type: "request",
            icon: Bell,
            color: "text-blue-600",
            bgColor: "bg-blue-50"
        },
        {
            id: 2,
            title: "Project Approved",
            message: "The project 'E-commerce Redesign' has been approved and is now live.",
            time: "5 hours ago",
            type: "project",
            icon: CheckCircle2,
            color: "text-emerald-600",
            bgColor: "bg-emerald-50"
        },
        {
            id: 3,
            title: "New Message",
            message: "You have a new message from 'Creative Studios Inc.' regarding their agency application.",
            time: "1 day ago",
            type: "message",
            icon: MessageSquare,
            color: "text-purple-600",
            bgColor: "bg-purple-50"
        },
        {
            id: 4,
            title: "System Update",
            message: "The platform will undergo maintenance on Sunday at 2:00 AM UTC.",
            time: "2 days ago",
            type: "system",
            icon: AlertCircle,
            color: "text-orange-600",
            bgColor: "bg-orange-50"
        }
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="text-3xl font-black text-gray-900 tracking-tight">Notifications</h1>
                <p className="text-gray-500 font-medium mt-1">Stay updated with the latest platform activity</p>
            </div>

            <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-gray-50 flex items-center justify-between">
                    <h2 className="text-xl font-black text-gray-900">Recent Updates</h2>
                    <button className="text-xs font-black text-emerald-600 uppercase tracking-widest hover:text-emerald-700 transition-colors">
                        Mark all as read
                    </button>
                </div>

                <div className="divide-y divide-gray-50">
                    {notifications.map((notif) => (
                        <div key={notif.id} className="p-8 flex gap-6 hover:bg-gray-50/50 transition-colors group cursor-pointer">
                            <div className={`w-14 h-14 rounded-2xl ${notif.bgColor} ${notif.color} flex items-center justify-center shrink-0 shadow-sm`}>
                                <notif.icon className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                    <h3 className="font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">{notif.title}</h3>
                                    <div className="flex items-center gap-2 text-gray-400 font-bold text-[10px] uppercase tracking-widest">
                                        <Clock className="w-3 h-3" />
                                        {notif.time}
                                    </div>
                                </div>
                                <p className="text-gray-500 font-medium leading-relaxed max-w-2xl">{notif.message}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="p-8 bg-gray-50/50 border-t border-gray-50 text-center">
                    <button className="text-sm font-bold text-gray-400 hover:text-gray-900 transition-colors">
                        View older notifications
                    </button>
                </div>
            </div>
        </div>
    );
}
