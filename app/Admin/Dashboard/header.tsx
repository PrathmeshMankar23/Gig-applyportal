"use client";

import { Sun, Moon, Bell, ChevronDown } from "lucide-react";
import { useTheme } from "next-themes";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function AdminHeader() {
    const { setTheme, theme } = useTheme();
    const router = useRouter();

    const handleLogout = () => {
        router.push("/auth/admin-login");
    };

    return (
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-30">
            {/* Left Side: Welcome Message */}
            <div>
                <h2 className="text-xl font-bold text-gray-900">Welcome, Admin</h2>
            </div>

            {/* Right Side: Tools & Profile */}
            <div className="flex items-center gap-6">




                {/* Notifications */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="p-2.5 rounded-xl bg-gray-50 text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 transition-colors relative outline-none">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-80 mt-2 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-gray-900">Notifications</h3>
                            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded-md">2 New</span>
                        </div>
                        <div className="space-y-4">
                            <div className="flex gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                                    <Bell className="w-4 h-4 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-900">New registration request</p>
                                    <p className="text-[10px] text-gray-500 font-medium">Sarah Johnson applied as Freelancer</p>
                                </div>
                            </div>
                            <div className="flex gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                                <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                                    <Bell className="w-4 h-4 text-emerald-600" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-900">Project Approved</p>
                                    <p className="text-[10px] text-gray-500 font-medium">"E-commerce Redesign" is now live</p>
                                </div>
                            </div>
                        </div>
                        <Link href="/Admin/Dashboard/notifications" className="w-full mt-4 py-2 text-[10px] font-black text-gray-400 hover:text-gray-900 uppercase tracking-widest border-t border-gray-50 pt-4 text-center block">
                            View all notifications
                        </Link>
                    </DropdownMenuContent>
                </DropdownMenu>

                <div className="h-8 w-[1px] bg-gray-200 mx-2" />

                {/* Profile Dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-3 hover:bg-gray-50 p-1.5 pr-3 rounded-xl transition-colors outline-none">
                        <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                            AD
                        </div>
                        <div className="text-left hidden lg:block">
                            <p className="text-sm font-bold text-gray-900 leading-tight">Admin User</p>
                            <p className="text-xs text-emerald-600 font-medium">Super Admin</p>
                        </div>
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 mt-2 rounded-xl p-2">
                        <DropdownMenuItem asChild className="rounded-lg cursor-pointer py-2.5">
                            <Link href="/Admin/Dashboard/settings" className="w-full">
                                Profile Settings
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={handleLogout}
                            className="rounded-lg cursor-pointer py-2.5 text-red-500 focus:text-red-500 focus:bg-red-50"
                        >
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}