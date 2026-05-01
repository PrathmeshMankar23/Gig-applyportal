"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
    LayoutDashboard,
    Briefcase,
    Users,
    Building2,
    FileText,
    Bell,
    LogOut
} from 'lucide-react';

export default function AgencySidebar() {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = () => {
        router.push('/auth/agency-login');
    };

    const menuItems = [
        { name: 'Dashboard', icon: LayoutDashboard, path: '/Agency/Dashboard' },
        { name: 'Browse Projects', icon: Briefcase, path: '/Agency/projects' },
        { name: 'Team Members', icon: Users, path: '/Agency/team' },
        { name: 'Agency Profile', icon: Building2, path: '/Agency/profile' },
        { name: 'My Applications', icon: FileText, path: '/Agency/applications' },
        { name: 'Notifications', icon: Bell, path: '/Agency/notifications' },
    ];

    return (
        <aside className="w-72 h-screen bg-white border-r border-gray-100 flex flex-col sticky top-0">
            {/* Logo Section */}
            <div className="p-8">
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                    Agency Portal
                </h1>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 px-4 space-y-2">
                {menuItems.map((item) => {
                    const isActive = pathname === item.path;
                    return (
                        <Link
                            key={item.name}
                            href={item.path}
                            className={`flex items-center gap-4 px-4 py-4 rounded-2xl font-bold transition-all ${isActive
                                    ? 'bg-purple-50 text-purple-600'
                                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                        >
                            <item.icon className={`w-6 h-6 ${isActive ? 'text-purple-600' : 'text-gray-400'}`} />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            {/* Logout Section */}
            <div className="p-4 border-t border-gray-50">
                <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl font-bold text-red-500 hover:bg-red-50 transition-all group"
                >
                    <LogOut className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                    Logout
                </button>
            </div>
        </aside>
    );
}