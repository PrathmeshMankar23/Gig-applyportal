"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import {
  UserCircle,
  Building2,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

export default function Home() {
  const router = useRouter();

  const roles = [
    {
      title: "Freelancer",
      description: "Find your next project and manage your work",
      icon: UserCircle,
      path: "/auth/freelancer-login",
      color: "bg-blue-600",
      lightColor: "bg-blue-50",
      iconColor: "text-blue-600",
      shadow: "shadow-blue-100"
    },
    {
      title: "Agency",
      description: "Manage your team and scale your projects",
      icon: Building2,
      path: "/auth/agency-login",
      color: "bg-purple-600",
      lightColor: "bg-purple-50",
      iconColor: "text-purple-600",
      shadow: "shadow-purple-100"
    },
    {
      title: "Administrator",
      description: "System oversight and platform management",
      icon: ShieldCheck,
      path: "/auth/admin-login",
      color: "bg-emerald-600",
      lightColor: "bg-emerald-50",
      iconColor: "text-emerald-600",
      shadow: "shadow-emerald-100"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 font-sans">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-3 tracking-tight">
          Welcome to the Portal
        </h1>
        <p className="text-gray-500 text-lg font-medium">
          Please select your role to continue
        </p>
      </div>

      {/* Role Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
        {roles.map((role) => (
          <div
            key={role.title}
            onClick={() => router.push(role.path)}
            className="group bg-white rounded-[32px] p-8 border border-gray-100 shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer flex flex-col items-center text-center"
          >
            {/* Icon Container */}
            <div className={`w-20 h-20 ${role.lightColor} ${role.iconColor} rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
              <role.icon className="w-10 h-10" />
            </div>

            {/* Text Content */}
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              {role.title}
            </h2>
            <p className="text-gray-500 font-medium mb-8 leading-relaxed">
              {role.description}
            </p>

            {/* Login Button State */}
            <div className={`mt-auto w-full py-4 rounded-2xl ${role.color} text-white font-bold flex items-center justify-center gap-2 shadow-lg ${role.shadow} group-hover:brightness-110 transition-all`}>
              Login as {role.title}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {/* Simple Footer */}
      <p className="mt-12 text-gray-400 font-medium text-sm">
        Secure enterprise access for all platform members.
      </p>
    </div>
  );
}