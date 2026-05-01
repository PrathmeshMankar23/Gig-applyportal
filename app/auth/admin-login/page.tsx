"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ArrowRight, ShieldCheck, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AdminLoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulation
        setTimeout(() => {
            if (email === "admin@gmail.com" && password === "admin123") {
                router.push('/Admin/Dashboard');
            } else {
                alert("Invalid credentials.");
                setIsLoading(false);
            }
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                {/* Back Button */}
                <button 
                    onClick={() => router.push('/')}
                    className="flex items-center gap-2 text-gray-500 hover:text-emerald-600 font-bold mb-6 transition-colors group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Selection
                </button>

                <div className="bg-white rounded-[32px] shadow-xl border border-gray-100 p-10">
                    <div className="flex flex-col items-center mb-8">
                        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-4">
                            <ShieldCheck className="w-10 h-10" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">Admin Portal</h1>
                        <p className="text-gray-500 mt-1 font-medium">Please sign in to your account</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@example.com"
                                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all text-black font-medium"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 ml-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all text-black font-medium"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-emerald-200 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? "Authenticating..." : "Login to Dashboard"}
                            {!isLoading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                        </button>
                    </form>

                    {/* Switch Account Divider */}
                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-100"></div>
                        </div>
                        <div className="relative flex justify-center text-xs">
                            <span className="px-4 bg-white text-gray-400 font-bold uppercase tracking-widest">Switch Account Type</span>
                        </div>
                    </div>

                    {/* Cross Login Links */}
                    <div className="grid grid-cols-2 gap-4">
                        <Link 
                            href="/auth/freelancer-login" 
                            className="flex flex-col items-center p-4 bg-blue-50 hover:bg-blue-100 rounded-2xl transition-all group"
                        >
                            <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Freelancer</span>
                            <span className="text-xs font-bold text-gray-600 group-hover:text-blue-700">Login</span>
                        </Link>
                        <Link 
                            href="/auth/agency-login" 
                            className="flex flex-col items-center p-4 bg-purple-50 hover:bg-purple-100 rounded-2xl transition-all group"
                        >
                            <span className="text-[10px] font-black text-purple-600 uppercase tracking-widest mb-1">Agency</span>
                            <span className="text-xs font-bold text-gray-600 group-hover:text-purple-700">Login</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}