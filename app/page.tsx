"use client";

import React, { useState } from 'react'; // 1. Added useState to imports
import { useRouter } from 'next/navigation';
import {
  UserCircle,
  Building2,
  ShieldCheck,
  ArrowRight,
  UserPlus
} from 'lucide-react';
import AgencyForm from '@/components/forms/AgencyForm';
import FreelancerForm from '@/components/forms/FreelancerForm';

export default function Home() {
  const router = useRouter();

  // 2. State MUST be inside the component function
  const [activeForm, setActiveForm] = useState<string | null>(null);

  const roles = [
    {
      id: 'freelancer', // Added ID to match state
      title: "Freelancer",
      description: "Find your next project and manage your work",
      icon: UserCircle,
      loginPath: "/auth/freelancer-login",
      color: "bg-blue-600",
      lightColor: "bg-blue-50",
      iconColor: "text-blue-600",
      shadow: "shadow-blue-100",
      showRegister: true
    },
    {
      id: 'agency', // Added ID to match state
      title: "Agency",
      description: "Manage your team and scale your projects",
      icon: Building2,
      loginPath: "/auth/agency-login",
      color: "bg-purple-600",
      lightColor: "bg-purple-50",
      iconColor: "text-purple-600",
      shadow: "shadow-purple-100",
      showRegister: true
    },
    {
      id: 'admin',
      title: "Administrator",
      description: "System oversight and platform management",
      icon: ShieldCheck,
      loginPath: "/auth/admin-login",
      color: "bg-emerald-600",
      lightColor: "bg-emerald-50",
      iconColor: "text-emerald-600",
      shadow: "shadow-emerald-100",
      showRegister: false
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 font-sans">

      {/* 3. Render the Forms based on activeForm state */}
      {activeForm === 'agency' && (
        <AgencyForm onClose={() => setActiveForm(null)} />
      )}

      {activeForm === 'freelancer' && (
        <FreelancerForm onClose={() => setActiveForm(null)} />
      )}

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
            className="group bg-white rounded-[32px] p-8 border border-gray-100 shadow-xl shadow-gray-200/50 hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center"
          >
            <div className={`w-20 h-20 ${role.lightColor} ${role.iconColor} rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
              <role.icon className="w-10 h-10" />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              {role.title}
            </h2>
            <p className="text-gray-500 font-medium mb-8 leading-relaxed h-12">
              {role.description}
            </p>

            <div className="mt-auto w-full space-y-3">
              <button
                onClick={() => router.push(role.loginPath)}
                className={`w-full py-4 rounded-2xl ${role.color} text-white font-bold flex items-center justify-center gap-2 shadow-lg ${role.shadow} hover:brightness-110 transition-all`}
              >
                Login as {role.title}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* 4. Updated Register Button to open the form instead of routing */}
              {role.showRegister && (
                <button
                  onClick={() => setActiveForm(role.id)}
                  className="w-full py-4 rounded-2xl bg-white border-2 border-gray-100 text-gray-600 font-bold flex items-center justify-center gap-2 hover:bg-gray-50 hover:border-gray-200 transition-all"
                >
                  <UserPlus className="w-5 h-5" />
                  Register as {role.title}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-12 text-gray-400 font-medium text-sm">
        Secure enterprise access for all platform members.
      </p>
    </div>
  );
}