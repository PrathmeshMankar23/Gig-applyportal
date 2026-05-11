"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutGrid,
    BarChart3,
    FolderOpen,
    Users,
    UserCircle2,
    LogOut,
    Clock
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
    { label: "Dashboard", href: "/Admin/Dashboard", icon: LayoutGrid },
    { label: "Analytics", href: "/Admin/analytics", icon: BarChart3 },
    { label: "Projects", href: "/Admin/projects", icon: FolderOpen },
    { label: "Freelancers", href: "/Admin/freelancers", icon: Users },
    { label: "Agencies", href: "/Admin/agencies", icon: UserCircle2 },
    { label: "Requests", href: "/Admin/requests", icon: Clock },
];

export default function AdminSidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    const handleLogout = () => {
        // Clear session if needed
        // localStorage.removeItem('admin_session');
        router.push("/auth/admin-login");
    };

    return (
        <aside className="w-72 h-screen bg-white dark:bg-slate-950 border-r border-gray-100 dark:border-slate-800 flex flex-col py-8 px-6 sticky top-0 transition-colors duration-300">
            {/* Portal Title */}
            <div className="mb-12 px-4">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                    Admin Portal
                </h1>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 space-y-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group",
                                isActive
                                    ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400"
                                    : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-900 hover:text-gray-900 dark:hover:text-white"
                            )}
                        >
                            <item.icon
                                className={cn(
                                    "w-6 h-6",
                                    isActive ? "text-emerald-600 dark:text-emerald-400" : "text-gray-400 dark:text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white"
                                )}
                            />
                            <span className="font-semibold text-[16px]">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Logout - Pushed to Bottom */}
            <div className="mt-auto pt-4 border-t border-gray-50 dark:border-slate-800 space-y-2">

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-4 px-4 py-3 w-full text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-colors group cursor-pointer"
                >
                    {/* We check 'mounted' to ensure the Lucide SVG classes match exactly during hydration */}
                    <LogOut
                        className={cn(
                            "w-6 h-6 transition-transform",
                            mounted ? "group-hover:-translate-x-1" : ""
                        )}
                    />
                    <span className="font-semibold text-[16px]">Logout</span>
                </button>
            </div>
        </aside>
    );
}