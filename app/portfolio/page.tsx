"use client";

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
    Mail,
    Phone,
    MapPin,
    Globe,
    Star,
    Briefcase,
    Calendar,
    ArrowLeft,
    ExternalLink,
    CheckCircle2,
    Award,
    Clock
} from 'lucide-react';
import Link from 'next/link';

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
        rating: 4.9,
        completed: 28,
        skills: ["React", "Node.js", "TypeScript", "AWS", "Docker", "Git"],
        projects: [
            { name: "E-commerce Redesign", description: "Led the frontend migration to Next.js 14, improving performance by 40%.", date: "2025" },
            { name: "SaaS Dashboard", description: "Built a real-time data visualization dashboard for a fintech startup.", date: "2024" }
        ],
        testimonials: [
            { from: "TechStore Inc.", text: "Sarah is an exceptional developer who delivered high-quality code on time." }
        ]
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
        rating: 4.8,
        completed: 52,
        skills: ["Web Development", "Mobile Apps", "UI/UX Design", "Branding"],
        projects: [
            { name: "Banking Mobile App", description: "Developed a cross-platform mobile app with high security standards.", date: "2025" },
            { name: "Enterprise CMS", description: "Custom CMS built for a Fortune 500 company.", date: "2024" }
        ],
        testimonials: [
            { from: "Global Bank", text: "Professional, creative, and highly technically proficient agency." }
        ]
    }
};

function PortfolioContent() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id') || 'sarah';
    const profile = profiles[id] || profiles['sarah'];

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-black pb-20">
            {/* Navigation Header */}
            <header className="bg-white border-b border-gray-100 sticky top-0 z-50 px-8 h-20 flex items-center justify-between">
                <Link href="/Admin/Dashboard" className="flex items-center gap-2 text-gray-500 hover:text-gray-900 font-bold transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                    Back
                </Link>
                <div className="flex items-center gap-4">
                    <button className="bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100">
                        Hire Now
                    </button>
                </div>
            </header>

            <div className="max-w-6xl mx-auto px-6 mt-12 space-y-12">
                {/* Profile Hero Card */}
                <div className="bg-white rounded-[40px] p-10 md:p-16 border border-gray-100 shadow-xl shadow-gray-200/50 flex flex-col md:flex-row gap-12 items-center text-center md:text-left">
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
                            <Metric icon={<Star className="text-amber-400 fill-amber-400" />} label="Rating" value={profile.rating} />
                            <Metric icon={<CheckCircle2 className="text-emerald-500" />} label="Projects" value={profile.completed} />
                            <Metric icon={<Award className="text-blue-500" />} label="Success" value="100%" />
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
                        </section>

                        <section className="bg-white rounded-[32px] p-10 border border-gray-100 shadow-sm">
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-2xl font-bold text-gray-900">Featured Projects</h3>
                            </div>
                            <div className="space-y-8">
                                {profile.projects.map((project: any, i: number) => (
                                    <div key={i} className="group cursor-pointer">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{project.name}</h4>
                                            <span className="text-gray-400 font-bold">{project.date}</span>
                                        </div>
                                        <p className="text-gray-500 font-medium mb-4">{project.description}</p>
                                        <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
                                            View Case Study <ExternalLink className="w-4 h-4" />
                                        </div>
                                    </div>
                                ))}
                            </div>
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

                        <section className="bg-gradient-to-br from-slate-900 to-black rounded-[32px] p-10 text-white shadow-2xl">
                            <h3 className="text-xl font-bold mb-6">Testimonials</h3>
                            {profile.testimonials.map((t: any, i: number) => (
                                <div key={i} className="space-y-4">
                                    <p className="text-gray-300 italic font-medium leading-relaxed">
                                        "{t.text}"
                                    </p>
                                    <p className="font-bold text-emerald-400 text-sm">— {t.from}</p>
                                </div>
                            ))}
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function PortfolioPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center"><Clock className="animate-spin" /></div>}>
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
