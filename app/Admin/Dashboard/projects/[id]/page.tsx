"use client";

import React, { useEffect, useState, useRef } from 'react';
import Link from "next/link";
import {
    ArrowLeft,
    Edit,
    Play,
    X,
    Upload,
    ChevronDown
} from "lucide-react";

import { useProjects } from '@/context/ProjectContext';
import { ProjectDetailView } from '@/components/ProjectDetailView';

export default function ProjectDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = React.use(params);
    const id = parseInt(resolvedParams.id);
    const { projects, updateProject } = useProjects();
    const project = projects.find(p => p.id === id);
    
    const [mounted, setMounted] = useState(false);

    // Modal State
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState<any>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;
    if (!project) return (
        <div className="py-20 text-center">
            <h2 className="text-2xl font-bold text-gray-900">Project not found</h2>
            <Link href="/Admin/Dashboard/projects" className="text-emerald-600 font-bold underline mt-4 inline-block">Back to Projects</Link>
        </div>
    );

    const handleEditProject = (e: React.FormEvent) => {
        e.preventDefault();
        updateProject(editingProject);
        setIsEditModalOpen(false);
        setEditingProject(null);
    };

    return (
        <div className="space-y-6">
            {/* Top Actions */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                <Link
                    href="/Admin/Dashboard/projects"
                    className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors w-fit font-bold"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Projects
                </Link>

                <div className="flex gap-3">
                    <button
                        onClick={() => {
                            setEditingProject({ ...project });
                            setIsEditModalOpen(true);
                        }}
                        className="flex items-center gap-2 px-6 py-2.5 border border-gray-200 rounded-xl font-bold text-gray-700 hover:bg-gray-50 transition-all shadow-sm"
                    >
                        <Edit className="w-4 h-4" /> Edit Project
                    </button>

                    <Link
                        href={`/Admin/Dashboard/projects/${id}/track`}
                        className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100"
                    >
                        <Play className="w-4 h-4 fill-current" /> Track Progress
                    </Link>
                </div>
            </div>

            {/* Shared Detail View */}
            <ProjectDetailView project={project} role="admin" />

            {/* Edit Modal */}
            <ProjectModal 
                isOpen={isEditModalOpen} 
                onClose={() => setIsEditModalOpen(false)} 
                title="Edit Project Details"
                subtitle="Update project requirements and specifications"
                onSubmit={handleEditProject}
            >
                <ProjectForm data={editingProject} setData={setEditingProject} />
            </ProjectModal>
        </div>
    );
}

function ProjectModal({ isOpen, onClose, title, subtitle, children, onSubmit }: any) {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-[40px] w-full max-w-4xl p-12 shadow-2xl relative animate-in zoom-in-95 duration-200 max-h-[95vh] overflow-y-auto">
                <button onClick={onClose} className="absolute right-10 top-10 p-2 hover:bg-gray-100 rounded-full text-gray-400">
                    <X className="w-6 h-6" />
                </button>
                <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">{title}</h2>
                <p className="text-gray-500 font-medium mt-2 mb-10">{subtitle}</p>
                <form onSubmit={onSubmit}>
                    {children}
                    <div className="mt-12 flex gap-4">
                        <button type="button" onClick={onClose} className="flex-1 py-4 border border-gray-200 rounded-xl font-bold text-gray-600 hover:bg-gray-50 text-lg">
                            Cancel
                        </button>
                        <button type="submit" className="flex-1 py-4 bg-[#00A859] text-white rounded-xl font-bold hover:bg-[#008f4c] shadow-xl shadow-emerald-100 text-lg">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

function ProjectForm({ data, setData }: any) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    if (!data) return null;
    return (
        <div className="space-y-8">
            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2.5">Project Title *</label>
                    <input required value={data.title} onChange={e => setData({...data, title: e.target.value})} className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-xl focus:border-emerald-500 outline-none transition-all font-medium text-gray-900 shadow-sm" placeholder="Project Title" />
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2.5">Client Name *</label>
                    <input required value={data.client} onChange={e => setData({...data, client: e.target.value})} className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-xl focus:border-emerald-500 outline-none transition-all font-medium text-gray-900 shadow-sm" placeholder="Client Name" />
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2.5">Budget (USD) *</label>
                    <input required type="number" value={data.budget} onChange={e => setData({...data, budget: e.target.value})} className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-xl focus:border-emerald-500 outline-none transition-all font-medium text-gray-900 shadow-sm" />
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2.5">Deadline *</label>
                    <input required type="date" value={data.deadline} onChange={e => setData({...data, deadline: e.target.value})} className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-xl focus:border-emerald-500 outline-none transition-all font-medium text-gray-900 shadow-sm" />
                </div>
                <div className="relative">
                    <label className="block text-sm font-bold text-gray-900 mb-2.5">Category *</label>
                    <select value={data.category} onChange={e => setData({...data, category: e.target.value})} className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-xl focus:border-emerald-500 outline-none transition-all font-medium text-gray-900 appearance-none cursor-pointer shadow-sm">
                        <option value="web">Web Development</option>
                        <option value="mobile">Mobile Apps</option>
                        <option value="design">UI/UX Design</option>
                    </select>
                    <ChevronDown className="w-5 h-5 absolute right-5 top-[52px] text-gray-400 pointer-events-none" />
                </div>
                <div className="relative">
                    <label className="block text-sm font-bold text-gray-900 mb-2.5">Priority *</label>
                    <select value={data.priority} onChange={e => setData({...data, priority: e.target.value})} className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-xl focus:border-emerald-500 outline-none transition-all font-medium text-gray-900 appearance-none cursor-pointer shadow-sm">
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                    <ChevronDown className="w-5 h-5 absolute right-5 top-[52px] text-gray-400 pointer-events-none" />
                </div>
                <div className="col-span-2">
                    <label className="block text-sm font-bold text-gray-900 mb-2.5">Required Skills *</label>
                    <input required value={data.skills} onChange={e => setData({...data, skills: e.target.value})} className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-xl focus:border-emerald-500 outline-none transition-all font-medium text-gray-900 shadow-sm" />
                </div>
                <div className="col-span-2">
                    <label className="block text-sm font-bold text-gray-900 mb-2.5">Project Description *</label>
                    <textarea required value={data.description} onChange={e => setData({...data, description: e.target.value})} rows={6} className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-xl focus:border-emerald-500 outline-none transition-all font-medium text-gray-900 resize-none shadow-sm" />
                </div>
                <div className="col-span-2">
                    <label className="block text-sm font-bold text-gray-900 mb-4">Upload Project Documents</label>
                    <input type="file" ref={fileInputRef} className="hidden" />
                    <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-gray-200 rounded-2xl p-12 text-center hover:border-emerald-500 hover:bg-emerald-50/10 transition-all cursor-pointer group shadow-sm bg-gray-50/50">
                        <Upload className="w-8 h-8 mx-auto text-gray-400 group-hover:text-emerald-500 mb-3" />
                        <p className="text-gray-900 font-bold">Click to upload or drag and drop</p>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">PDF, DOC, images up to 50MB</p>
                    </div>
                </div>
            </div>
        </div>
    );
}