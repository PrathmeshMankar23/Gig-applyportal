"use client";

import { Sun, Moon, Bell, ChevronDown } from "lucide-react";
import { useTheme } from "next-themes";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


export default function AdminHeader() {
    const { setTheme, theme } = useTheme();

    return (
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-30">
            {/* Left Side: Welcome Message */}
            <div>
                <h2 className="text-xl font-bold text-gray-900">Welcome, Admin</h2>
                <p className="text-sm text-gray-500 font-medium">Thursday, 30 April 2026</p>
            </div>

            {/* Right Side: Tools & Profile */}
            <div className="flex items-center gap-6">


                {/* Theme Toggle */}
                <button
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="p-2.5 rounded-xl bg-gray-50 text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                >
                    <Sun className="w-5 h-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="w-5 h-5 absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                </button>

                {/* Notifications */}
                <button className="p-2.5 rounded-xl bg-gray-50 text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 transition-colors relative">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>

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
                        <DropdownMenuItem className="rounded-lg cursor-pointer py-2.5">
                            Profile Settings
                        </DropdownMenuItem>
                        <DropdownMenuItem className="rounded-lg cursor-pointer py-2.5 text-red-500 focus:text-red-500 focus:bg-red-50">
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}