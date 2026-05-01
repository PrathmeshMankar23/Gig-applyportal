"use client";

import React, { useState } from 'react';
import {
    Search,
    MapPin,
    Star,
    Briefcase,
    DollarSign,
    Clock,
    User,
    ChevronDown,
    Check
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from 'next/link';

const freelancerData = [
    {
        id: "sarah",
        name: "Sarah Johnson",
        location: "London, UK",
        rating: 4.9,
        projects: 24,
        rate: 85,
        experience: "5+ years",
        status: "Available",
        initial: "S",
        skills: ["React", "Next.js", "TypeScript", "Tailwind"]
    },
    {
        id: "michael",
        name: "Michael Chen",
        location: "San Francisco, USA",
        rating: 4.7,
        projects: 15,
        rate: 60,
        experience: "3-5 years",
        status: "Available",
        initial: "M",
        skills: ["Python", "Django", "PostgreSQL", "AWS"]
    },
    {
        id: "elena",
        name: "Elena Rodriguez",
        location: "Madrid, Spain",
        rating: 4.8,
        projects: 19,
        rate: 70,
        experience: "4 years",
        status: "Busy",
        initial: "E",
        skills: ["Figma", "UI/UX", "Adobe XD", "Prototyping"]
    }
];

export default function Freelancers() {
    const [searchQuery, setSearchQuery] = useState("");
    const [availabilityFilter, setAvailabilityFilter] = useState("All Availability");
    const [notification, setNotification] = useState<string | null>(null);

    const showNotification = (msg: string) => {
        setNotification(msg);
        setTimeout(() => setNotification(null), 3000);
    };

    const filteredFreelancers = freelancerData.filter(freelancer => {
        const matchesSearch = freelancer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            freelancer.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
        
        const matchesAvailability = availabilityFilter === "All Availability" || 
                                   freelancer.status === availabilityFilter;

        return matchesSearch && matchesAvailability;
    });

    return (
        <div className="space-y-6 max-w-full overflow-hidden">
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
            <div>
                <h1 className="text-3xl font-bold text-gray-900 leading-tight tracking-tight">Freelancer Directory</h1>
                <p className="text-gray-500 mt-1 font-medium text-sm">Browse and search all approved freelancers</p>
            </div>

            {/* Filter Bar - Responsive wrapping */}
            <div className="bg-white p-5 rounded-[28px] border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-stretch md:items-center">
                <div className="relative flex-[3]">
                    <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by name or skills..."
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
                    />
                </div>

                <div className="relative flex-1 min-w-[150px]">
                    <select 
                        value={availabilityFilter}
                        onChange={(e) => {
                            setAvailabilityFilter(e.target.value);
                            showNotification(`Filter updated: ${e.target.value}`);
                        }}
                        className="w-full pl-5 pr-12 py-3 bg-slate-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 appearance-none cursor-pointer font-bold text-gray-600 text-sm"
                    >
                        <option>All Availability</option>
                        <option>Available</option>
                        <option>Busy</option>
                    </select>
                    <ChevronDown className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
            </div>

            {/* Freelancers Grid - Responsive columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredFreelancers.map((freelancer) => (
                    <div key={freelancer.id} className="bg-white p-8 rounded-[40px] border border-gray-50 shadow-sm hover:shadow-md transition-all hover:scale-[1.01] relative group animate-in fade-in slide-in-from-bottom-3 duration-300">
                        {/* Availability Badge */}
                        <span className={cn(
                            "absolute top-8 right-8 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border",
                            freelancer.status === "Available" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-orange-50 text-orange-600 border-orange-100"
                        )}>
                            {freelancer.status}
                        </span>

                        {/* Profile Info */}
                        <div className="space-y-5">
                            <div className="w-16 h-16 rounded-[22px] bg-slate-900 flex items-center justify-center text-white text-2xl font-bold shadow-xl shadow-gray-200">
                                {freelancer.initial}
                            </div>

                            <div>
                                <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight">{freelancer.name}</h3>
                                <div className="flex items-center gap-1.5 text-gray-400 font-bold mt-1">
                                    <MapPin className="w-3.5 h-3.5" />
                                    <span className="text-xs uppercase tracking-wider">{freelancer.location}</span>
                                </div>
                            </div>

                            {/* Stats Row */}
                            <div className="flex items-center gap-6 py-3 border-y border-gray-50">
                                <div className="flex items-center gap-1.5">
                                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                                    <span className="text-sm font-extrabold text-gray-900">{freelancer.rating}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Briefcase className="w-4 h-4 text-gray-400" />
                                    <span className="text-xs text-gray-500 font-bold uppercase tracking-widest">{freelancer.projects} projects</span>
                                </div>
                            </div>

                            {/* Rate and Exp */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-xl font-black text-emerald-600">${freelancer.rate}</span>
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">/ hr</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-gray-400">
                                    <Clock className="w-3.5 h-3.5" />
                                    <span className="text-xs font-bold uppercase tracking-widest">{freelancer.experience}</span>
                                </div>
                            </div>

                            {/* Skills */}
                            <div className="space-y-3 pt-2">
                                <div className="flex flex-wrap gap-2">
                                    {freelancer.skills.map(skill => (
                                        <span key={skill} className="bg-slate-50 text-slate-600 px-3 py-1.5 rounded-xl text-[10px] font-extrabold uppercase tracking-widest border border-slate-100 group-hover:border-slate-200 transition-colors">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* View Portfolio Link (Subtle) */}
                            <div className="pt-4 mt-2 border-t border-gray-50">
                                <Link
                                    href={`/portfolio?id=${freelancer.id}`}
                                    className="flex items-center gap-2 text-emerald-600 font-black text-xs uppercase tracking-widest hover:text-emerald-700 transition-colors"
                                >
                                    <User className="w-4 h-4" />
                                    View Detailed Portfolio
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredFreelancers.length === 0 && (
                <div className="py-24 text-center bg-white rounded-[40px] border border-dashed border-gray-100">
                    <Search className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                    <p className="text-gray-400 font-bold text-lg tracking-tight">No freelancers matching your filters.</p>
                </div>
            )}
        </div>
    );
}