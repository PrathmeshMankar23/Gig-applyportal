"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ArrowRight, Building2, Globe } from 'lucide-react';
import Link from 'next/link';

export default function AgencyLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulated Agency Authentication
    setTimeout(() => {
      if (email && password) {
        // Navigate to the Agency Dashboard (Ensure this folder exists)
        router.push('/Agency/Dashboard');
      } else {
        setIsLoading(false);
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-[32px] shadow-2xl shadow-purple-100 border border-gray-100 p-10">

        {/* Agency Branding */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-4">
            <Building2 className="w-10 h-10" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Agency Portal</h1>
          <p className="text-gray-500 mt-1 text-center">
            Manage your team and scale your projects
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-1">Company Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="contact@agency.com"
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-black"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <label className="text-sm font-bold text-gray-700">Password</label>
              <Link href="#" className="text-xs font-semibold text-purple-600 hover:underline">
                Reset Password
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-black"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-purple-200 flex items-center justify-center gap-2 group disabled:opacity-70"
          >
            {isLoading ? "Verifying..." : "Access Agency Dashboard"}
            {!isLoading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>

        {/* Integration Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-100"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-400 font-medium">Partnership Login</span>
          </div>
        </div>

        {/* Alternative Login */}
        <button className="w-full flex items-center justify-center gap-3 py-3.5 border border-gray-200 rounded-2xl font-bold text-gray-700 hover:bg-gray-50 transition-colors mb-6">
          <Globe className="w-5 h-5 text-purple-500" />
          Sign in with Corporate SSO
        </button>

        {/* Sign up Link */}
        <p className="text-center text-sm text-gray-500 font-medium">
          New agency?{' '}
          <Link href="/auth/agency-signup" className="text-purple-600 font-bold hover:underline">
            Register Firm
          </Link>
        </p>
      </div>
    </div>
  );
}