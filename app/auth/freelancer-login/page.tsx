"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ArrowRight, UserCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function FreelancerLoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulated Freelancer Login
        setTimeout(() => {
            if (email && password) {
                // Store dummy name for demo
                localStorage.setItem('freelancer_name', 'Sarah Johnson');
                router.push('/Freelancer/Dashboard');
            } else {
                setIsLoading(false);
            }
        }, 1200);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                {/* Back Button */}
                <button 
                    onClick={() => router.push('/')}
                    className="flex items-center gap-2 text-gray-500 hover:text-blue-600 font-bold mb-6 transition-colors group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Selection
                </button>

                <div className="bg-white rounded-[32px] shadow-2xl shadow-blue-100 border border-gray-100 p-10">
                    {/* Header */}
                    <div className="flex flex-col items-center mb-8">
                        <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-4">
                            <UserCircle className="w-10 h-10" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">Freelancer Login</h1>
                        <p className="text-gray-500 mt-1 text-center font-medium">
                            Find your next project and manage your work
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleLogin} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 ml-1">Work Email</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@company.com"
                                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-black font-medium"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-sm font-bold text-gray-700">Password</label>
                                <Link href="#" className="text-xs font-semibold text-blue-600 hover:underline">
                                    Forgot?
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
                                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-black font-medium"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? "Signing in..." : "Continue to Workspace"}
                            {!isLoading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                        </button>
                    </form>

                    {/* Social Login Divider */}
                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-100"></div>
                        </div>
                        <div className="relative flex justify-center text-xs">
                            <span className="px-4 bg-white text-gray-400 font-bold uppercase tracking-widest">Switch Account Type</span>
                        </div>
                    </div>

                    {/* Cross Login Links */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <Link 
                            href="/auth/agency-login" 
                            className="flex flex-col items-center p-4 bg-purple-50 hover:bg-purple-100 rounded-2xl transition-all group"
                        >
                            <span className="text-[10px] font-black text-purple-600 uppercase tracking-widest mb-1">Agency</span>
                            <span className="text-xs font-bold text-gray-600 group-hover:text-purple-700">Login</span>
                        </Link>
                        <Link 
                            href="/auth/admin-login" 
                            className="flex flex-col items-center p-4 bg-emerald-50 hover:bg-emerald-100 rounded-2xl transition-all group"
                        >
                            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">Admin</span>
                            <span className="text-xs font-bold text-gray-600 group-hover:text-emerald-700">Login</span>
                        </Link>
                    </div>

                    {/* Footer */}
                    <p className="text-center text-sm text-gray-500 font-medium">
                        Don&apos;t have an account?{' '}
                        <Link href="/auth/freelancer-signup" className="text-blue-600 font-bold hover:underline">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}