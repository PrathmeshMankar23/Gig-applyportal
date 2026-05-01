"use client";

import React, { useState } from "react";
import {
  Check,
  Trash2,
  Bell,
  MessageSquare,
  CheckCircle2,
  CreditCard,
  RefreshCcw
} from "lucide-react";

// Mock Data based on your uploaded screenshot
const initialNotifications = [
  {
    id: 1,
    type: "Application Approved",
    content: 'Your application for "E-commerce Website Redesign" has been approved!',
    time: "10 minutes ago",
    isNew: true,
    icon: CheckCircle2,
    color: "text-blue-600",
    bgColor: "border-l-blue-600"
  },
  {
    id: 2,
    type: "New Message",
    content: "TechStore Inc. sent you a message regarding the project.",
    time: "2 hours ago",
    isNew: true,
    icon: MessageSquare,
    color: "text-blue-600",
    bgColor: "border-l-blue-600"
  },
  {
    id: 3,
    type: "Project Milestone",
    content: 'Milestone "UI Design" has been marked as complete.',
    time: "1 day ago",
    isNew: false,
    icon: Check,
    color: "text-gray-400",
    bgColor: "border-l-transparent"
  },
  {
    id: 4,
    type: "Payment Received",
    content: "You received a payment of $5,000 for Marketing Dashboard project.",
    time: "2 days ago",
    isNew: false,
    icon: CreditCard,
    color: "text-gray-400",
    bgColor: "border-l-transparent"
  },
  {
    id: 5,
    type: "Application Update",
    content: "Your application for another project has been updated.",
    time: "3 days ago",
    isNew: false,
    icon: RefreshCcw,
    color: "text-gray-400",
    bgColor: "border-l-transparent"
  }
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications);

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isNew: false, bgColor: "border-l-transparent" })));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const unreadCount = notifications.filter(n => n.isNew).length;

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Notifications</h1>
          <p className="text-gray-500 font-medium">{unreadCount} unread notifications</p>
        </div>
        <button
          onClick={markAllRead}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-100 flex items-center gap-2"
        >
          Mark All as Read
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {notifications.map((note) => (
          <div
            key={note.id}
            className={`bg-white rounded-[24px] p-6 shadow-sm border border-gray-100 border-l-4 ${note.bgColor} transition-all flex justify-between items-center group`}
          >
            <div className="flex gap-4">
              <div className={`mt-1 ${note.isNew ? 'text-blue-600' : 'text-gray-400'}`}>
                <note.icon className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-lg font-bold text-gray-900">{note.type}</h3>
                  {note.isNew && (
                    <span className="bg-blue-50 text-blue-600 px-3 py-0.5 rounded-full text-xs font-bold">
                      New
                    </span>
                  )}
                </div>
                <p className="text-gray-600 font-medium mb-1">{note.content}</p>
                <p className="text-gray-400 text-sm font-medium">{note.time}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              {note.isNew && (
                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
                  <Check className="w-5 h-5" />
                </button>
              )}
              <button
                onClick={() => deleteNotification(note.id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}

        {notifications.length === 0 && (
          <div className="bg-white rounded-[32px] p-20 text-center border border-dashed border-gray-200">
            <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 font-bold text-lg">All caught up!</p>
            <p className="text-gray-400">No new notifications to show.</p>
          </div>
        )}
      </div>
    </div>
  );
}