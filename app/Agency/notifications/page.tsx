"use client";

import React from 'react';
import {
  Bell,
  Check,
  Trash2,
  MessageSquare,
  CheckCircle2,
  DollarSign,
  Clock
} from 'lucide-react';

// Mock data based on your design screenshots
const notifications = [
  {
    id: 1,
    type: 'approval',
    title: 'Application Approved',
    message: 'Your application for "E-commerce Website Redesign" has been approved!',
    time: '10 minutes ago',
    isNew: true,
    icon: CheckCircle2,
    color: 'text-emerald-500'
  },
  {
    id: 2,
    type: 'message',
    title: 'New Message',
    message: 'TechStore Inc. sent you a message regarding the project.',
    time: '2 hours ago',
    isNew: true,
    icon: MessageSquare,
    color: 'text-purple-600'
  },
  {
    id: 3,
    type: 'milestone',
    title: 'Project Milestone',
    message: 'Milestone "UI Design" has been marked as complete.',
    time: '1 day ago',
    isNew: false,
    icon: Clock,
    color: 'text-blue-500'
  },
  {
    id: 4,
    type: 'payment',
    title: 'Payment Received',
    message: 'You received a payment of $5,000 for Marketing Dashboard project.',
    time: '2 days ago',
    isNew: false,
    icon: DollarSign,
    color: 'text-emerald-500'
  },
  {
    id: 5,
    type: 'update',
    title: 'Application Update',
    message: 'Your application for "Mobile App Development" is under review.',
    time: '3 days ago',
    isNew: false,
    icon: Bell,
    color: 'text-purple-600'
  }
];

export default function AgencyNotifications() {
  return (
    <div className="p-8 bg-slate-50 min-h-screen font-sans">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Notifications</h1>
          <p className="text-gray-500 font-medium">2 unread notifications</p>
        </div>
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-purple-100 flex items-center gap-2">
          Mark All as Read
        </button>
      </div>

      {/* Notifications List */}
      <div className="max-w-5xl space-y-4">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className={`bg-white rounded-3xl p-6 border transition-all flex items-center justify-between group ${notif.isNew ? 'border-l-4 border-l-purple-600 border-gray-100' : 'border-gray-100'
              } hover:shadow-md`}
          >
            <div className="flex items-center gap-6">
              {/* Icon Container */}
              <div className={`p-3 rounded-2xl bg-slate-50 ${notif.color}`}>
                <notif.icon className="w-6 h-6" />
              </div>

              {/* Text Content */}
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-bold text-gray-900">{notif.title}</h3>
                  {notif.isNew && (
                    <span className="bg-purple-50 text-purple-600 px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-widest">
                      New
                    </span>
                  )}
                </div>
                <p className="text-gray-500 font-medium text-sm mb-1">{notif.message}</p>
                <p className="text-gray-400 text-xs font-bold">{notif.time}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-2 hover:bg-purple-50 text-gray-400 hover:text-purple-600 rounded-lg transition-colors">
                <Check className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-lg transition-colors">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}