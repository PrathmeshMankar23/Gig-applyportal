"use client";

import React from 'react';
import { 
    Calendar, 
    DollarSign, 
    BarChart3, 
    Users, 
    Briefcase,
    Clock,
    Tag,
    Trophy
} from "lucide-react";

import { ApplyModal } from './ApplyModal';

interface ProjectDetailViewProps {
    project: {
        title: string;
        client: string;
        budget: string;
        deadline: string;
        category: string;
        priority: string;
        skills: string;
        description: string;
        progress: number;
        applicants: number;
        posted: string;
        status: string;
    };
    role: 'admin' | 'freelancer' | 'agency';
}

export function ProjectDetailView({ project, role }: ProjectDetailViewProps) {
    const [isApplyModalOpen, setIsApplyModalOpen] = React.useState(false);
    const themeColor = role === 'admin' ? 'emerald' : role === 'freelancer' ? 'blue' : 'purple';
    
    const colors: any = {
        emerald: "bg-emerald-50 text-emerald-600 border-emerald-100 icon-bg-emerald-100",
        blue: "bg-blue-50 text-blue-600 border-blue-100 icon-bg-blue-100",
        purple: "bg-purple-50 text-purple-600 border-purple-100 icon-bg-purple-100"
    };

    const accentColor = role === 'admin' ? 'bg-emerald-600' : role === 'freelancer' ? 'bg-blue-600' : 'bg-purple-600';

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header Section */}
            <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm relative overflow-hidden">
                <div className={`absolute top-0 left-0 w-2 h-full ${accentColor}`} />
                <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${colors[themeColor]}`}>
                                {project.category}
                            </span>
                            <span className="bg-gray-100 text-gray-500 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-gray-200">
                                {project.priority} Priority
                            </span>
                        </div>
                        <h1 className="text-4xl font-black text-gray-900 tracking-tight leading-tight mb-2">{project.title}</h1>
                        <p className="text-lg text-gray-500 font-medium flex items-center gap-2">
                            <Briefcase className="w-5 h-5 text-gray-400" />
                            {project.client}
                        </p>
                    </div>
                    
                    <div className="flex flex-col items-end gap-2">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Project Status</p>
                        <span className={`px-6 py-2 rounded-2xl text-sm font-black uppercase tracking-widest border ${
                            project.status === 'completed' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                            project.status === 'in progress' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                            'bg-orange-50 text-orange-600 border-orange-100'
                        }`}>
                            {project.status}
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-10 border-t border-gray-50">
                    <StatBox icon={DollarSign} label="Budget" value={`$${project.budget}`} color={themeColor} />
                    <StatBox icon={Calendar} label="Deadline" value={project.deadline} color={themeColor} />
                    <StatBox icon={Clock} label="Posted on" value={project.posted} color={themeColor} />
                    <StatBox icon={Users} label="Applicants" value={`${project.applicants} ${role === 'agency' ? 'Agencies' : 'Freelancers'}`} color={themeColor} />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Description & Skills */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm">
                        <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${accentColor} text-white`}>
                                <Trophy className="w-5 h-5" />
                            </div>
                            Project Description
                        </h3>
                        <p className="text-gray-600 leading-relaxed text-lg font-medium whitespace-pre-line">
                            {project.description}
                        </p>
                    </div>

                    <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm">
                        <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${accentColor} text-white`}>
                                <Tag className="w-5 h-5" />
                            </div>
                            Required Skills & Expertise
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            {project.skills.split(',').map(skill => (
                                <span key={skill} className="px-5 py-2.5 bg-gray-50 text-gray-700 rounded-2xl text-sm font-bold border border-gray-100 shadow-sm">
                                    {skill.trim()}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-8">
                    <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm">
                        <h3 className="text-xl font-black text-gray-900 mb-8">Overall Progress</h3>
                        <div className="relative pt-1">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <span className={`text-xs font-black inline-block py-1 px-3 uppercase rounded-full ${colors[themeColor]}`}>
                                        Completion
                                    </span>
                                </div>
                                <div className="text-right">
                                    <span className="text-3xl font-black inline-block text-gray-900">
                                        {project.progress}%
                                    </span>
                                </div>
                            </div>
                            <div className="overflow-hidden h-4 mb-4 text-xs flex rounded-full bg-gray-100 shadow-inner">
                                <div style={{ width: `${project.progress}%` }} className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${accentColor} transition-all duration-1000`}></div>
                            </div>
                        </div>
                        <p className="text-gray-400 text-xs font-bold leading-relaxed">
                            This progress bar indicates the current stage of the project based on completed milestones.
                        </p>
                    </div>

                    {role !== 'admin' && (
                        <button 
                            onClick={() => setIsApplyModalOpen(true)}
                            className={`w-full py-6 ${accentColor} text-white rounded-[32px] font-black text-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-${themeColor}-100 flex items-center justify-center gap-3`}
                        >
                            Apply for Project
                        </button>
                    )}
                </div>
            </div>

            {role !== 'admin' && (
                <ApplyModal 
                    isOpen={isApplyModalOpen} 
                    onClose={() => setIsApplyModalOpen(false)} 
                    projectTitle={project.title}
                    role={role as 'freelancer' | 'agency'}
                />
            )}
        </div>
    );
}

function StatBox({ icon: Icon, label, value, color }: any) {
    const iconColors: any = {
        emerald: "bg-emerald-50 text-emerald-600",
        blue: "bg-blue-50 text-blue-600",
        purple: "bg-purple-50 text-purple-600"
    };
    return (
        <div className="space-y-3">
            <div className="flex items-center gap-2">
                <div className={`p-2 rounded-lg ${iconColors[color]}`}>
                    <Icon className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</span>
            </div>
            <p className="text-xl font-black text-gray-900 tracking-tight">{value}</p>
        </div>
    );
}
