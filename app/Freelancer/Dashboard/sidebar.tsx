"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    Home,
    Briefcase,
    User,
    ClipboardList,
    Bell,
    LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
    { label: "Dashboard", href: "/Freelancer/Dashboard", icon: Home },
    { label: "Browse Projects", href: "/Freelancer/projects", icon: Briefcase },
    { label: "My Profile", href: "/Freelancer/profile", icon: User },
    { label: "My Applications", href: "/Freelancer/applications", icon: ClipboardList },
    { label: "Notifications", href: "/Freelancer/notifications", icon: Bell },
];

export default function FreelancerSidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    const handleLogout = () => {
        router.push("/auth/freelancer-login");
    };

    return (
        <aside className="w-72 h-screen bg-white border-r border-gray-100 flex flex-col py-8 px-6 sticky top-0">
            {/* Sidebar Title */}
            <div className="mb-10 px-4">
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                    Freelancer Portal
                </h1>
            </div>

            {/* Navigation Menu */}
            <nav className="flex-1 space-y-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 group",
                                isActive
                                    ? "bg-blue-50 text-blue-600 shadow-sm shadow-blue-50/50"
                                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                            )}
                        >
                            <item.icon
                                className={cn(
                                    "w-5 h-5 transition-colors",
                                    isActive ? "text-blue-600" : "text-gray-900"
                                )}
                            />
                            <span className="font-bold text-[17px]">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Logout Button */}
            <div className="mt-auto pt-6 border-t border-gray-50">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-4 px-4 py-3.5 w-full text-red-600 hover:bg-red-50 rounded-xl transition-all group cursor-pointer"
                >
                    <LogOut
                        className={cn(
                            "w-5 h-5 transition-transform",
                            mounted ? "group-hover:-translate-x-1" : ""
                        )}
                    />
                    <span className="font-bold text-[17px]">Logout</span>
                </button>
            </div>
        </aside>
    );
}