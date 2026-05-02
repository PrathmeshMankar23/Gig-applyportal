"use client";

import React, { useState } from 'react';
import { 
    User, 
    Mail, 
    Shield, 
    Camera, 
    Bell, 
    Lock, 
    Globe, 
    Check,
    Save
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function ProfileSettings() {
    const [notification, setNotification] = useState<string | null>(null);

    const showNotification = (msg: string) => {
        setNotification(msg);
        setTimeout(() => setNotification(null), 3000);
    };

    const adminInfo = {
        name: "Admin User",
        email: "admin@gigapply.com",
        role: "Super Admin",
        lastLogin: "2026-05-02 14:30",
        avatar: "AD"
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        showNotification("Profile settings saved successfully!");
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Success Toast */}
            {notification && (
                <div className="fixed top-8 right-8 z-[100] animate-in slide-in-from-right-10 fade-in duration-300">
                    <div className="bg-slate-900 text-white px-6 py-4 rounded-[20px] shadow-2xl flex items-center gap-3 border border-slate-800">
                        <div className="bg-emerald-500 p-1 rounded-full">
                            <Check className="w-4 h-4 text-white" strokeWidth={4} />
                        </div>
                        <p className="font-bold text-sm">{notification}</p>
                    </div>
                </div>
            )}

            {/* Header */}
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight">Profile Settings</h1>
                    <p className="text-gray-500 mt-2 font-medium text-lg">Manage your account details and preferences</p>
                </div>
                <button 
                    onClick={handleSave}
                    className="flex items-center gap-2 bg-slate-900 hover:bg-black text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-gray-200"
                >
                    <Save className="w-5 h-5" />
                    Save Changes
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left Column: Profile Card */}
                <div className="md:col-span-1 space-y-6">
                    <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm text-center">
                        <div className="relative inline-block">
                            <div className="w-32 h-32 rounded-[40px] bg-emerald-100 text-emerald-700 flex items-center justify-center text-4xl font-black shadow-inner">
                                {adminInfo.avatar}
                            </div>
                            <button className="absolute -bottom-2 -right-2 p-3 bg-white rounded-2xl shadow-lg border border-gray-50 text-gray-400 hover:text-emerald-600 transition-colors">
                                <Camera className="w-5 h-5" />
                            </button>
                        </div>
                        <h3 className="text-2xl font-extrabold text-gray-900 mt-6 tracking-tight">{adminInfo.name}</h3>
                        <p className="text-emerald-600 font-bold text-sm uppercase tracking-widest mt-1">{adminInfo.role}</p>
                        
                        <div className="mt-8 pt-8 border-t border-gray-50 space-y-4 text-left">
                            <div className="flex items-center gap-3 text-gray-500">
                                <Shield className="w-4 h-4" />
                                <span className="text-xs font-bold uppercase tracking-widest">Access: Full</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-500">
                                <Globe className="w-4 h-4" />
                                <span className="text-xs font-bold uppercase tracking-widest">Timezone: UTC+5:30</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-emerald-600 p-8 rounded-[40px] text-white shadow-xl shadow-emerald-100 relative overflow-hidden group">
                        <div className="relative z-10">
                            <h4 className="text-lg font-bold mb-2">Security Level</h4>
                            <p className="text-emerald-100 text-sm font-medium mb-6">Your account is fully secured with 2FA.</p>
                            <button className="bg-white/20 hover:bg-white/30 backdrop-blur-md px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all">
                                Manage Security
                            </button>
                        </div>
                        <Shield className="w-32 h-32 absolute -right-8 -bottom-8 text-white/10 rotate-12 group-hover:scale-110 transition-transform" />
                    </div>
                </div>

                {/* Right Column: Form Sections */}
                <div className="md:col-span-2 space-y-8">
                    {/* Personal Info */}
                    <section className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm space-y-8">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-50 rounded-2xl text-blue-600">
                                <User className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-gray-900">Personal Information</h4>
                                <p className="text-sm text-gray-400 font-medium">Update your name and primary email</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                                <input 
                                    defaultValue={adminInfo.name}
                                    className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-bold text-gray-900"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                                <div className="relative">
                                    <Mail className="w-4 h-4 absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input 
                                        disabled
                                        defaultValue={adminInfo.email}
                                        className="w-full pl-14 pr-6 py-4 bg-gray-100/50 border border-gray-100 rounded-2xl text-gray-400 font-bold cursor-not-allowed"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Account Settings */}
                    <section className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm space-y-8">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-purple-50 rounded-2xl text-purple-600">
                                <Lock className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-gray-900">Security & Authentication</h4>
                                <p className="text-sm text-gray-400 font-medium">Manage your password and session</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-2xl transition-colors group">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-white transition-colors">
                                        <Lock className="w-5 h-5" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-sm font-bold text-gray-900">Change Password</p>
                                        <p className="text-xs text-gray-400 font-medium">Last changed 3 months ago</p>
                                    </div>
                                </div>
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-emerald-600">Update</span>
                            </button>

                            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-2xl transition-colors group text-left">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-white transition-colors">
                                        <Shield className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-900">Two-Factor Authentication</p>
                                        <p className="text-xs text-emerald-600 font-bold">Enabled</p>
                                    </div>
                                </div>
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-red-500 transition-colors">Configure</span>
                            </button>
                        </div>
                    </section>

                    {/* Preferences */}
                    <section className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm space-y-8">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-orange-50 rounded-2xl text-orange-600">
                                <Bell className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-gray-900">Notifications & Preferences</h4>
                                <p className="text-sm text-gray-400 font-medium">Control how you receive updates</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {[
                                { title: "Email Notifications", desc: "Get updates about new requests", checked: true },
                                { title: "Security Alerts", desc: "Immediate alerts on suspicious login", checked: true },
                                { title: "Weekly Report", desc: "Summary of platform activity", checked: false }
                            ].map((pref, i) => (
                                <div key={i} className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-bold text-gray-900">{pref.title}</p>
                                        <p className="text-xs text-gray-400 font-medium">{pref.desc}</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" defaultChecked={pref.checked} className="sr-only peer" />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
