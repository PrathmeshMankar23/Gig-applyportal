"use client";

import { Bell, ChevronDown } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRegistration } from "@/context/RegistrationContext";


export default function AdminHeader() {
    const router = useRouter();
    const { registrations } = useRegistration();

    const pendingRegs = registrations.filter(r => r.status === 'Pending');
    const pendingCount = pendingRegs.length;

    const handleLogout = () => {
        router.push("/auth/admin-login");
    };

    return (
        <header className="h-20 bg-white dark:bg-slate-950 border-b border-gray-100 dark:border-slate-800 flex items-center justify-between px-8 sticky top-0 z-30 transition-colors duration-300">
            {/* Left Side: Welcome Message */}
            <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Welcome, Admin</h2>
            </div>

            {/* Right Side: Tools & Profile */}
            <div className="flex items-center gap-6">
                {/* Notifications */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="p-2.5 rounded-xl bg-gray-50 dark:bg-slate-900 text-gray-600 dark:text-gray-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors relative outline-none">
                            <Bell className="w-5 h-5" />
                            {pendingCount > 0 && (
                                <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                            )}
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-80 mt-2 rounded-xl p-4 z-50">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-gray-900">Notifications</h3>
                            {pendingCount > 0 && (
                                <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded-md">{pendingCount} New</span>
                            )}
                        </div>
                        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                            {pendingCount === 0 ? (
                                <p className="text-xs text-gray-500 text-center py-4">No new notifications</p>
                            ) : (
                                pendingRegs.slice(0, 5).map(reg => (
                                    <div key={reg.id} className="flex gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors" onClick={() => router.push('/Admin/requests')}>
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${reg.type === 'freelancer' ? 'bg-blue-50' : 'bg-purple-50'}`}>
                                            <Bell className={`w-4 h-4 ${reg.type === 'freelancer' ? 'text-blue-600' : 'text-purple-600'}`} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-gray-900">New registration request</p>
                                            <p className="text-[10px] text-gray-500 font-medium">{reg.name} applied as {reg.type}</p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                        <Link href="/Admin/requests" className="w-full mt-4 py-2 text-[10px] font-black text-gray-400 hover:text-gray-900 uppercase tracking-widest border-t border-gray-50 pt-4 text-center block">
                            View all requests
                        </Link>
                    </DropdownMenuContent>
                </DropdownMenu>

                <div className="h-8 w-[1px] bg-gray-200 dark:bg-slate-800 mx-2" />

                {/* Profile Dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-slate-900 p-1.5 pr-3 rounded-xl transition-colors outline-none">
                        <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                            AD
                        </div>
                        <div className="text-left hidden lg:block">
                            <p className="text-sm font-bold text-gray-900 dark:text-white leading-tight">Admin User</p>
                            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Super Admin</p>
                        </div>
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 mt-2 rounded-xl p-2">
                        <DropdownMenuItem asChild className="rounded-lg cursor-pointer py-2.5">
                            <Link href="/Admin/settings" className="w-full">
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