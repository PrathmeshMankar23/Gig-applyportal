"use client";

import React, { useState } from 'react';
import {
    Search,
    MapPin,
    Star,
    Briefcase,
    Globe,
    Users2,
    Building2
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from 'next/link';

const agencyData = [
    {
        id: "creative",
        name: "Creative Studios Inc.",
        location: "New York, USA",
        est: "2015",
        rating: 4.7,
        projects: 38,
        teamSize: "51-200",
        website: "www.creativestudios.com",
        status: "Available",
        initial: "C",
        specializations: ["Mobile Apps", "UI/UX Design", "Brand Identity"]
    },
    {
        id: "techflow",
        name: "TechFlow Systems",
        location: "Berlin, Germany",
        est: "2018",
        rating: 4.8,
        projects: 22,
        teamSize: "11-50",
        website: "www.techflow.io",
        status: "Available",
        initial: "T",
        specializations: ["Cloud Infrastructure", "DevOps", "Cybersecurity"]
    },
    {
        id: "nexus",
        name: "Nexus Digital",
        location: "Singapore",
        est: "2020",
        rating: 4.6,
        projects: 14,
        teamSize: "1-10",
        website: "www.nexusdigital.sg",
        status: "Busy",
        initial: "N",
        specializations: ["E-commerce", "Shopify", "Digital Marketing"]
    }
];

export default function Agencies() {
    const [searchQuery, setSearchQuery] = useState("");
    const [specFilter, setSpecFilter] = useState("");
    const [availabilityFilter, setAvailabilityFilter] = useState("All Availability");

    const filteredAgencies = agencyData.filter(agency => {
        const matchesSearch = agency.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            agency.specializations.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
        
        const matchesSpec = specFilter === "" || 
                           agency.specializations.some(s => s.toLowerCase().includes(specFilter.toLowerCase()));
        
        const matchesAvailability = availabilityFilter === "All Availability" || 
                                   agency.status === availabilityFilter;

        return matchesSearch && matchesSpec && matchesAvailability;
    });

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 leading-tight tracking-tight">Agency Directory</h1>
                <p className="text-gray-500 mt-1 font-medium">Browse and search all approved agencies</p>
            </div>

            {/* Filter Bar */}
            <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex flex-wrap gap-4 items-center">
                <div className="relative flex-[2] min-w-[300px]">
                    <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by name or specialization..."
                        className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
                    />
                </div>

                <div className="relative flex-1 min-w-[200px]">
                    <input
                        type="text"
                        value={specFilter}
                        onChange={(e) => setSpecFilter(e.target.value)}
                        placeholder="Filter by specialization..."
                        className="w-full px-5 py-3 bg-white border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
                    />
                </div>

                <select 
                    value={availabilityFilter}
                    onChange={(e) => setAvailabilityFilter(e.target.value)}
                    className="bg-white border border-gray-100 rounded-2xl px-6 py-3 text-gray-600 font-bold min-w-[180px] focus:outline-none focus:ring-2 focus:ring-emerald-500/20 appearance-none cursor-pointer"
                >
                    <option>All Availability</option>
                    <option>Available</option>
                    <option>Busy</option>
                </select>
            </div>

            {/* Agencies Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAgencies.map((agency) => (
                    <div key={agency.id} className="bg-white p-8 rounded-[40px] border border-gray-50 shadow-sm hover:shadow-md transition-all hover:scale-[1.01] relative group animate-in fade-in slide-in-from-bottom-3 duration-300">
                        {/* Availability Badge */}
                        <span className={cn(
                            "absolute top-8 right-8 px-4 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest border",
                            agency.status === "Available" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-orange-50 text-orange-600 border-orange-100"
                        )}>
                            {agency.status}
                        </span>

                        {/* Profile Info */}
                        <div className="space-y-5">
                            {/* Gradient Avatar */}
                            <div className="w-16 h-16 rounded-[22px] bg-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-xl shadow-purple-100">
                                {agency.initial}
                            </div>

                            <div>
                                <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight leading-tight">{agency.name}</h3>
                                <div className="space-y-1.5 mt-2">
                                    <div className="flex items-center gap-1.5 text-gray-400 font-bold">
                                        <MapPin className="w-3.5 h-3.5" />
                                        <span className="text-xs uppercase tracking-wider">{agency.location}</span>
                                    </div>
                                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest ml-5">EST. {agency.est}</p>
                                </div>
                            </div>

                            {/* Stats Row */}
                            <div className="flex items-center gap-6 py-3 border-y border-gray-50">
                                <div className="flex items-center gap-1.5">
                                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                                    <span className="text-sm font-extrabold text-gray-900">{agency.rating}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Briefcase className="w-4 h-4 text-gray-400" />
                                    <span className="text-xs text-gray-500 font-bold uppercase tracking-widest">{agency.projects} projects</span>
                                </div>
                            </div>

                            {/* Agency Specific Info */}
                            <div className="space-y-3 py-1">
                                <div className="flex items-center gap-2.5 text-gray-500">
                                    <Users2 className="w-4 h-4" />
                                    <span className="text-xs font-bold text-gray-700 uppercase tracking-widest">Team: {agency.teamSize}</span>
                                </div>
                                <div className="flex items-center gap-2.5 text-gray-400 hover:text-emerald-600 transition-colors cursor-pointer group/link">
                                    <Globe className="w-4 h-4" />
                                    <span className="text-xs font-bold underline underline-offset-4">{agency.website}</span>
                                </div>
                            </div>

                            {/* Specializations */}
                            <div className="space-y-3">
                                <div className="flex flex-wrap gap-2">
                                    {agency.specializations.map(spec => (
                                        <span key={spec} className="bg-purple-50 text-purple-600 px-3 py-1.5 rounded-xl text-[10px] font-extrabold uppercase tracking-widest border border-purple-100 group-hover:border-purple-200 transition-colors">
                                            {spec}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Action Button */}
                            <Link
                                href={`/Admin/Dashboard/portfolio?id=${agency.id}&from=agencies`}
                                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-2xl font-bold transition-all shadow-xl shadow-purple-100 mt-6 flex items-center justify-center gap-2 group-hover:translate-y-[-2px]"
                            >
                                <Building2 className="w-4 h-4" />
                                View Full Profile
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {filteredAgencies.length === 0 && (
                <div className="py-24 text-center bg-white rounded-[40px] border border-dashed border-gray-100">
                    <Search className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                    <p className="text-gray-400 font-bold text-lg tracking-tight">No agencies matching your filters.</p>
                </div>
            )}
        </div>
    );
}