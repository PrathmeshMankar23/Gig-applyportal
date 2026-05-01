import React from 'react';
import { Bell, Search, UserCircle } from 'lucide-react';

export default function Header() {
  return (
    <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-30">
        <div>
            <h2 className="text-xl font-bold text-gray-900">Welcome back, Freelancer</h2>
            <p className="text-sm text-gray-500 font-medium">Here&apos;s what&apos;s happening with your projects today.</p>
        </div>

        <div className="flex items-center gap-6">
            {/* Search */}
            <div className="relative hidden md:block">
                <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                    type="text" 
                    placeholder="Search projects..." 
                    className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
            </div>

            {/* Notifications */}
            <button className="p-2.5 rounded-xl bg-gray-50 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            <div className="h-8 w-[1px] bg-gray-200 mx-2" />

            {/* Profile */}
            <div className="flex items-center gap-3 hover:bg-gray-50 p-1.5 pr-3 rounded-xl transition-colors cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                    FL
                </div>
                <div className="text-left hidden lg:block">
                    <p className="text-sm font-bold text-gray-900 leading-tight">Freelancer User</p>
                    <p className="text-xs text-blue-600 font-medium">Available for work</p>
                </div>
            </div>
        </div>
    </header>
  );
}