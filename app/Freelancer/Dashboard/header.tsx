"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Bell, Search, UserCircle } from 'lucide-react';

export default function Header() {
  const [userName, setUserName] = useState('Sarah Johnson');

  useEffect(() => {
    const storedName = localStorage.getItem('freelancer_name');
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-30">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Welcome back, {userName.split(' ')[0]}</h2>
      </div>

      <div className="flex items-center gap-6">
        {/* Notifications */}
        <Link href="/Freelancer/notifications">
          <button className="p-2.5 rounded-xl bg-gray-50 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
        </Link>

        <div className="h-8 w-[1px] bg-gray-200 mx-2" />

        {/* Profile */}
        <div className="flex items-center gap-3 hover:bg-gray-50 p-1.5 pr-3 rounded-xl transition-colors cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
            {getInitials(userName)}
          </div>
          <div className="text-left hidden lg:block">
            <p className="text-sm font-bold text-gray-900 leading-tight">{userName}</p>
            <p className="text-xs text-blue-600 font-medium">Freelancer</p>
          </div>
        </div>
      </div>
    </header>
  );
}