"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
    Search,
    Bell,
    Building2,
    ChevronDown,
    PlusCircle,
    LayoutDashboard
} from 'lucide-react';

export default function AgencyHeader() {
    const [agencyName, setAgencyName] = useState("Agency Console");

    useEffect(() => {
        const storedName = localStorage.getItem('agencyName');
        if (storedName) {
            setAgencyName(storedName);
        }
    }, []);

    return (
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-40">
            {/* Left: Branding & Page Context */}
            <div className="flex items-center gap-8">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-purple-100">
                        <Building2 className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-sm font-bold text-gray-900 leading-none">Welcome</h2>
                        <p className="text-[11px] font-bold text-purple-600 uppercase tracking-wider mt-1">{agencyName}</p>
                    </div>
                </div>



            </div>

            {/* Right: Actions & User Profile */}
            <div className="flex items-center gap-4">
                {/* Notifications */}
                <Link href="/Agency/notifications">
                    <button className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all relative">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
                    </button>
                </Link>

                {/* Vertical Divider */}
                <div className="w-px h-6 bg-gray-100 mx-1"></div>

                {/* Profile Dropdown */}
                <div className="flex items-center gap-3 pl-2 cursor-pointer group">
                    <div className="text-right hidden lg:block">
                        <p className="text-sm font-bold text-gray-900 leading-none">Nexus Agency</p>
                        <p className="text-xs font-medium text-gray-500 mt-1">Admin Account</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-slate-100 border-2 border-white overflow-hidden group-hover:border-purple-100 transition-all">
                        <img
                            src="https://ui-avatars.com/api/?name=Nexus+Agency&background=7c3aed&color=fff"
                            alt="Agency Avatar"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-purple-600 transition-colors" />
                </div>
            </div>
        </header>
    );
}