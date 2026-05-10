"use client";

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
    Mail,
    Phone,
    MapPin,
    Globe,
    Briefcase,
    ArrowLeft,
    ExternalLink,
    CheckCircle2,
    Clock
} from 'lucide-react';
import Link from 'next/link';
import { useProjects } from '@/context/ProjectContext';
import { useApplications } from '@/context/ApplicationContext';

// Mock Data
const profiles: any = {
    'sarah': {
        name: "Sarah Johnson",
        type: "Freelancer",
        role: "Senior Full Stack Developer",
        bio: "Experienced full-stack developer with over 8 years of expertise in building scalable web applications. Specialized in React, Node.js, and cloud technologies.",
        email: "sarah.j@email.com",
        phone: "+1 234 567 8900",
        location: "New York, USA",
        website: "portfolio.sarahjohnson.com",
        skills: ["React", "Node.js", "TypeScript", "AWS", "Docker", "Git"],
    },
    'michael': {
        name: "Michael Chen",
        type: "Freelancer",
        role: "Backend Engineer",
        bio: "Backend specialist with a focus on Python, Django, and cloud infrastructure.",
        email: "michael.c@email.com",
        phone: "+1 234 567 8902",
        location: "San Francisco, USA",
        website: "michaelchen.dev",
        skills: ["Python", "Django", "PostgreSQL", "AWS", "Redis"],
    },
    'elena': {
        name: "Elena Rodriguez",
        type: "Freelancer",
        role: "UI/UX Designer",
        bio: "Creative designer focused on building intuitive and beautiful user interfaces.",
        email: "elena.r@email.com",
        phone: "+34 912 345 678",
        location: "Madrid, Spain",
        website: "elena.design",
        skills: ["Figma", "UI/UX", "Adobe XD", "Prototyping"],
    },
    'creative': {
        name: "Creative Studios Inc.",
        type: "Agency",
        role: "Full-Service Digital Agency",
        bio: "Creative Studios Inc. is a full-service digital agency specializing in web development, mobile applications, and digital design. Founded in 2018.",
        email: "contact@creativestudios.com",
        phone: "+1 234 567 8901",
        location: "San Francisco, USA",
        website: "www.creativestudios.com",
        skills: ["Web Development", "Mobile Apps", "UI/UX Design", "Branding"],
    }
};

function PortfolioContent() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id') || 'sarah';
    const appId = searchParams.get('appId');
    const from = searchParams.get('from') || 'dashboard';
    
    const { projects } = useProjects();
    const { applications } = useApplications();
    
    // Find dynamic application data if appId is provided
    const dynamicApp = appId ? applications.find(a => a.id.toString() === appId) : null;
    
    // Base profile (fallback to mock data)
    let profile = profiles[id] || profiles['sarah'];
    
    // Override with real application data if it exists
    if (dynamicApp) {
        profile = {
            ...profile,
            name: dynamicApp.applicantName || profile.name,
            type: dynamicApp.applicantRole === 'agency' ? 'Agency' : 'Freelancer',
            email: dynamicApp.email || profile.email,
            phone: dynamicApp.phone || profile.phone,
            bio: dynamicApp.coverLetter || profile.bio,
            website: dynamicApp.portfolioUrl !== undefined ? dynamicApp.portfolioUrl : profile.website,
            portfolioPdf: dynamicApp.portfolioPdf !== undefined ? dynamicApp.portfolioPdf : profile.portfolioPdf,
            portfolioPdfData: dynamicApp.portfolioPdfData !== undefined ? dynamicApp.portfolioPdfData : profile.portfolioPdfData,
        };
    }

    // Filter projects where this user is assigned
    const assignedProjects = projects.filter(p => 
        p.assignedTo === profile.name || 
        (p.assignedUsers && p.assignedUsers.includes(profile.name))
    );

    const backPath = from === 'freelancers' 
        ? '/Admin/freelancers' 
        : from === 'agencies' 
            ? '/Admin/agencies' 
            : '/Admin/Dashboard';

    return (
        <div className="font-sans text-black pb-20">
            {/* Simple Back Button */}
            <div className="mb-8">
                <Link href={backPath} className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 font-bold transition-colors group">
                    <div className="p-2 bg-white rounded-xl border border-gray-100 group-hover:border-gray-200 shadow-sm transition-all">
                        <ArrowLeft className="w-5 h-5" />
                    </div>
                    <span>Back to {from.charAt(0).toUpperCase() + from.slice(1)}</span>
                </Link>
            </div>

            <div className="space-y-12">
                {/* Profile Hero Card */}
                <div className="bg-white rounded-[40px] p-10 md:p-16 border border-gray-100 shadow-sm flex flex-col md:flex-row gap-12 items-center text-center md:text-left">
                    <div className={`w-48 h-48 rounded-[32px] flex items-center justify-center text-white text-6xl font-bold shadow-2xl shrink-0 ${
                        profile.type === 'Freelancer' ? 'bg-gradient-to-tr from-blue-600 to-indigo-600' : 'bg-gradient-to-tr from-purple-600 to-pink-600'
                    }`}>
                        {profile.name.split(' ').map((n: string) => n[0]).join('')}
                    </div>

                    <div className="flex-1">
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-4 mb-4">
                            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">{profile.name}</h1>
                            <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border ${
                                profile.type === 'Freelancer' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-purple-50 text-purple-600 border-purple-100'
                            }`}>
                                {profile.type}
                            </span>
                        </div>
                        <p className="text-xl text-gray-500 font-medium mb-8">{profile.role}</p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-12">
                            <InfoItem icon={<Mail />} text={profile.email} />
                            <InfoItem icon={<Phone />} text={profile.phone} />
                            <InfoItem icon={<MapPin />} text={profile.location} />
                            <InfoItem icon={<Globe />} text={profile.website} isLink />
                        </div>

                        <div className="flex flex-wrap justify-center md:justify-start gap-8 mt-10 pt-10 border-t border-gray-50">
                            <Metric icon={<CheckCircle2 className="text-emerald-500" />} label="Projects" value={assignedProjects.length} />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left Column: Bio & Experience */}
                    <div className="lg:col-span-2 space-y-12">
                        <section className="bg-white rounded-[32px] p-10 border border-gray-100 shadow-sm">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">About</h3>
                            <p className="text-gray-500 text-lg leading-relaxed font-medium">
                                {profile.bio}
                            </p>

                            {(profile.portfolioPdf || (profile.website && profile.website !== 'No website provided' && profile.website !== 'portfolio.sarahjohnson.com')) && (
                                <div className="mt-10 pt-10 border-t border-gray-50">
                                    <h3 className="text-xl font-bold text-gray-900 mb-6">Portfolio / Attachments</h3>
                                    <button 
                                        onClick={() => {
                                            if (profile.portfolioPdfData) {
                                                const pdfWindow = window.open("");
                                                if (pdfWindow) {
                                                    pdfWindow.document.write(
                                                        `<iframe width='100%' height='100%' src='${profile.portfolioPdfData}' style='border:none; margin:0; padding:0; overflow:hidden; z-index:999999;'></iframe>`
                                                    );
                                                    pdfWindow.document.title = profile.portfolioPdf || "Portfolio PDF";
                                                    pdfWindow.document.body.style.margin = "0";
                                                } else {
                                                    alert("Please allow pop-ups to view the PDF.");
                                                }
                                            } else if (profile.website && profile.website.startsWith('http')) {
                                                window.open(profile.website, '_blank');
                                            } else {
                                                alert("Portfolio file data not found. Please ask the applicant to re-upload.");
                                            }
                                        }}
                                        className="inline-flex items-center justify-between w-full sm:w-auto min-w-[300px] p-4 bg-gray-50 hover:bg-blue-50 border-2 border-dashed border-gray-200 hover:border-blue-200 rounded-2xl transition-all group"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 bg-white rounded-xl shadow-sm text-blue-600 group-hover:scale-110 transition-transform">
                                                <Briefcase className="w-6 h-6" />
                                            </div>
                                            <div className="text-left">
                                                <p className="text-gray-900 font-black text-sm">{profile.portfolioPdf ? profile.portfolioPdf : 'View Portfolio Website'}</p>
                                                <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest mt-0.5">{profile.portfolioPdf ? 'PDF Document' : 'External Link'}</p>
                                            </div>
                                        </div>
                                    </button>
                                </div>
                            )}
                        </section>
                    </div>

                    {/* Right Column: Skills & Sidebar */}
                    <div className="space-y-12">
                        <section className="bg-white rounded-[32px] p-10 border border-gray-100 shadow-sm">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">Skills & Expertise</h3>
                            <div className="flex flex-wrap gap-3">
                                {profile.skills.map((skill: string) => (
                                    <span key={skill} className="px-5 py-2.5 bg-slate-50 text-gray-600 rounded-xl font-bold text-sm border border-gray-100">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function PortfolioPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Clock className="animate-spin text-emerald-600" /></div>}>
            <PortfolioContent />
        </Suspense>
    );
}

// Helper Components
function InfoItem({ icon, text, isLink }: { icon: any; text: string; isLink?: boolean }) {
    return (
        <div className="flex items-center gap-4 text-gray-500 font-bold group">
            <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                {React.cloneElement(icon, { className: "w-5 h-5" })}
            </div>
            <span className={isLink ? "hover:text-blue-600 cursor-pointer" : ""}>{text}</span>
        </div>
    );
}

function Metric({ icon, label, value }: { icon: any; label: string; value: any }) {
    return (
        <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-50 rounded-xl">
                {icon}
            </div>
            <div>
                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">{label}</p>
                <p className="text-xl font-bold text-gray-900">{value}</p>
            </div>
        </div>
    );
}

