"use client";

import Link from "next/link";
import React, { useState, useRef } from 'react';
import {
    Plus,
    Search,
    Eye,
    BarChart2,
    X,
    Edit3,
    Upload,
    Calendar,
    ChevronDown,
    Filter,
    RotateCcw,
    Check
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useProjects } from "@/context/ProjectContext";

export default function Projects() {
    const { projects, categories, addProject, updateProject, deleteProject, addCategory } = useProjects();
    
    // Notification State
    const [notification, setNotification] = useState<string | null>(null);

    const showNotification = (msg: string) => {
        setNotification(msg);
        setTimeout(() => setNotification(null), 3000);
    };

    // State for Categories
    const [newCategoryName, setNewCategoryName] = useState("");

    // State for Filters
    const [searchQuery, setSearchQuery] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("All Categories");
    const [statusFilter, setStatusFilter] = useState("All Status");

    // Filtering Logic
    const filteredProjects = projects.filter(project => {
        const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.client.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCategory = categoryFilter === "All Categories" ||
            project.category.toLowerCase() === categoryFilter.toLowerCase();

        const matchesStatus = statusFilter === "All Status" ||
            project.status.toLowerCase() === statusFilter.toLowerCase();

        return matchesSearch && matchesCategory && matchesStatus;
    });

    // Modal States
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState<any>(null);

    // Form States
    const [formData, setFormData] = useState({
        title: '',
        client: '',
        budget: '',
        deadline: '',
        category: '',
        priority: 'Medium',
        skills: '',
        description: '',
        status: 'not started',
        progress: 0,
        assignedTo: 'Unassigned'
    });

    const handleAddProject = (e: React.FormEvent) => {
        e.preventDefault();
        addProject(formData);
        setIsAddModalOpen(false);
        resetForm();
        showNotification("Project added successfully!");
    };

    const handleEditProject = (e: React.FormEvent) => {
        e.preventDefault();
        updateProject(editingProject);
        setIsEditModalOpen(false);
        setEditingProject(null);
        showNotification("Project edited successfully!");
    };

    const handleAddCategory = (e: React.FormEvent) => {
        e.preventDefault();
        if (newCategoryName && !categories.includes(newCategoryName.toLowerCase())) {
            addCategory(newCategoryName);
            setNewCategoryName("");
            setIsAddCategoryModalOpen(false);
            showNotification(`Category "${newCategoryName}" added successfully!`);
        }
    };

    const resetForm = () => {
        setFormData({
            title: '',
            client: '',
            budget: '',
            deadline: '',
            category: '',
            priority: 'Medium',
            skills: '',
            description: '',
            status: 'not started',
            progress: 0,
            assignedTo: 'Unassigned'
        });
    };

    const clearFilters = () => {
        setSearchQuery("");
        setCategoryFilter("All Categories");
        setStatusFilter("All Status");
        showNotification("Filters cleared");
    };

    return (
        <div className="space-y-6 relative">
            {/* Success Toast */}
            {notification && (
                <div className="fixed top-8 right-8 z-[100] animate-in slide-in-from-right-10 fade-in duration-300">
                    <div className="bg-slate-900 text-white px-6 py-4 rounded-[20px] shadow-2xl flex items-center gap-3 border border-slate-800">
                        <div className="bg-[#00A859] p-1 rounded-full">
                            <Check className="w-4 h-4 text-white" strokeWidth={4} />
                        </div>
                        <p className="font-bold text-sm">{notification}</p>
                    </div>
                </div>
            )}

            {/* Page Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Projects</h1>
                    <p className="text-gray-500 mt-1 font-medium text-sm">Manage and track all projects</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => setIsAddCategoryModalOpen(true)}
                        className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-sm"
                    >
                        <Plus className="w-4 h-4" />
                        Add Category
                    </button>
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="flex items-center gap-2 bg-[#00A859] hover:bg-[#008f4c] text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-emerald-100"
                    >
                        <Plus className="w-5 h-5" />
                        Add New Project
                    </button>
                </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex flex-wrap gap-4 items-center">
                <div className="relative flex-[2] min-w-[300px]">
                    <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search projects or clients..."
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
                    />
                </div>

                <div className="relative flex-1 min-w-[180px]">
                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="w-full pl-4 pr-10 py-3 bg-slate-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 appearance-none cursor-pointer font-bold text-gray-600 text-sm"
                    >
                        <option>All Categories</option>
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                        ))}
                    </select>
                    <ChevronDown className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>

                <div className="relative flex-1 min-w-[180px]">
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="w-full pl-4 pr-10 py-3 bg-slate-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 appearance-none cursor-pointer font-bold text-gray-600 text-sm"
                    >
                        <option>All Status</option>
                        <option value="completed">Completed</option>
                        <option value="in progress">In Progress</option>
                        <option value="not started">Not Started</option>
                    </select>
                    <ChevronDown className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>

                <button
                    onClick={clearFilters}
                    className="flex items-center gap-2 px-4 py-3 text-gray-400 hover:text-red-500 transition-colors font-bold text-sm"
                >
                    <RotateCcw className="w-4 h-4" />
                    Clear
                </button>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredProjects.map((project) => (
                    <div key={project.id} className="bg-white p-8 rounded-[32px] border border-gray-50 shadow-sm hover:shadow-md transition-shadow relative group">
                        <div className="absolute top-8 right-8 flex gap-2">
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setEditingProject(project);
                                    setIsEditModalOpen(true);
                                }}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg font-bold text-xs hover:bg-blue-600 hover:text-white transition-all shadow-sm shadow-blue-100 border border-blue-100"
                            >
                                <Edit3 className="w-3.5 h-3.5" />
                                Edit
                            </button>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    if (window.confirm('Are you sure you want to delete this project?')) {
                                        deleteProject(project.id);
                                        showNotification("Project deleted successfully");
                                    }
                                }}
                                className="p-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all border border-red-100 shadow-sm shadow-red-100"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="flex justify-between items-start mb-6">
                            <div className="pr-16">
                                <h3 className="text-2xl font-bold text-gray-900 tracking-tight leading-tight">{project.title}</h3>
                                <div className="flex items-center gap-2 mt-1">
                                    <p className="text-gray-400 font-medium">{project.client}</p>
                                    <span className="text-gray-200">•</span>
                                    <span className="text-emerald-600 font-bold text-xs uppercase tracking-widest">{project.category}</span>
                                </div>
                            </div>
                        </div>

                        <div className="mb-6 flex gap-2">
                            <span className={cn(
                                "px-3 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-widest border",
                                project.status === "in progress" ? "bg-blue-50 text-blue-600 border-blue-100" :
                                    project.status === "completed" ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                                        "bg-gray-100 text-gray-400 border-gray-200"
                            )}>
                                {project.status}
                            </span>
                        </div>

                        <div className="space-y-4 mb-8">
                            <InfoRow label="Budget (USD)" value={`$${project.budget}`} />
                            <InfoRow label="Deadline" value={project.deadline} />
                            <InfoRow label="Assigned" value={project.assignedTo} />
                        </div>

                        <div className="space-y-3 mb-8">
                            <div className="flex justify-between text-sm font-bold">
                                <span className="text-gray-400">Progress</span>
                                <span className="text-gray-900">{project.progress}%</span>
                            </div>
                            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden shadow-inner">
                                <div
                                    className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                                    style={{ width: `${project.progress}%` }}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <Link
                                href={`/Admin/Dashboard/projects/${project.id}`}
                                className="flex items-center justify-center gap-2 border border-gray-200 hover:bg-gray-50 text-gray-700 py-3.5 rounded-2xl font-bold transition-all"
                            >
                                <Eye className="w-5 h-5" />
                                View Details
                            </Link>

                            <Link
                                href={`/Admin/Dashboard/projects/${project.id}/track`}
                                className="flex items-center justify-center gap-2 bg-[#00A859] hover:bg-[#008f4c] text-white py-3.5 rounded-2xl font-bold transition-all shadow-sm"
                            >
                                <BarChart2 className="w-5 h-5" />
                                Track Progress
                            </Link>
                        </div>
                    </div>
                ))}

                {filteredProjects.length === 0 && (
                    <div className="col-span-2 py-32 text-center bg-white rounded-[40px] border border-dashed border-gray-100">
                        <div className="flex flex-col items-center gap-3">
                            <Filter className="w-12 h-12 text-gray-200" />
                            <p className="text-gray-400 font-bold text-lg tracking-tight">No projects found matching those filters.</p>
                            <button onClick={clearFilters} className="text-emerald-600 font-bold underline underline-offset-4 mt-2">Clear all filters</button>
                        </div>
                    </div>
                )}
            </div>

            {/* Modals */}
            <ProjectModal
                isOpen={isAddModalOpen}
                onClose={() => { setIsAddModalOpen(false); resetForm(); }}
                title="Add New Project"
                subtitle="Create a new project and assign to freelancers or agencies"
                onSubmit={handleAddProject}
                buttonText="Create Project"
            >
                <ProjectForm data={formData} setData={setFormData} categories={categories} />
            </ProjectModal>

            <ProjectModal
                isOpen={isEditModalOpen}
                onClose={() => { setIsEditModalOpen(false); setEditingProject(null); }}
                title="Edit Project"
                subtitle="Update project details and settings"
                onSubmit={handleEditProject}
                buttonText="Save Changes"
            >
                <ProjectForm data={editingProject} setData={setEditingProject} categories={categories} />
            </ProjectModal>

            <ProjectModal
                isOpen={isAddCategoryModalOpen}
                onClose={() => setIsAddCategoryModalOpen(false)}
                title="Add New Category"
                subtitle="Create a new project category for better organization"
                onSubmit={handleAddCategory}
                buttonText="Create Category"
            >
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-900 mb-2.5">Category Name *</label>
                        <input
                            required
                            value={newCategoryName}
                            onChange={e => setNewCategoryName(e.target.value)}
                            className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-xl focus:border-emerald-500 outline-none transition-all font-medium text-gray-900 shadow-sm"
                            placeholder="e.g. BlockChain, AI, etc."
                        />
                    </div>
                </div>
            </ProjectModal>
        </div>
    );
}

// Sub-components
function InfoRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400 font-bold uppercase tracking-wider text-[10px]">{label}</span>
            <span className="text-gray-900 font-bold">{value}</span>
        </div>
    );
}

function ProjectModal({ isOpen, onClose, title, subtitle, children, onSubmit, buttonText }: any) {
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
                        <button type="button" onClick={onClose} className="flex-1 py-4 border border-gray-200 rounded-xl font-bold text-gray-600 hover:bg-gray-50 transition-all text-lg">
                            Cancel
                        </button>
                        <button type="submit" className="flex-1 py-4 bg-[#00A859] text-white rounded-xl font-bold hover:bg-[#008f4c] transition-all shadow-xl shadow-emerald-100 text-lg">
                            {buttonText}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

function ProjectForm({ data, setData, categories }: any) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [fileName, setFileName] = useState<string | null>(null);

    if (!data) return null;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) setFileName(file.name);
    };

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2.5">Project Title *</label>
                    <input required value={data.title} onChange={e => setData({ ...data, title: e.target.value })} className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-xl focus:border-emerald-500 outline-none transition-all font-medium text-gray-900 shadow-sm" placeholder="E-commerce Website Development" />
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2.5">Client Name *</label>
                    <input required value={data.client} onChange={e => setData({ ...data, client: e.target.value })} className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-xl focus:border-emerald-500 outline-none transition-all font-medium text-gray-900 shadow-sm" placeholder="ABC Corporation" />
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2.5">Budget (USD) *</label>
                    <input required type="number" value={data.budget} onChange={e => setData({ ...data, budget: e.target.value })} className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-xl focus:border-emerald-500 outline-none transition-all font-medium text-gray-900 shadow-sm" placeholder="15000" />
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2.5">Deadline *</label>
                    <input required type="date" value={data.deadline} onChange={e => setData({ ...data, deadline: e.target.value })} className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-xl focus:border-emerald-500 outline-none transition-all font-medium text-gray-900 shadow-sm" />
                </div>
                <div className="relative">
                    <label className="block text-sm font-bold text-gray-900 mb-2.5">Category *</label>
                    <select required value={data.category} onChange={e => setData({ ...data, category: e.target.value })} className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-xl focus:border-emerald-500 outline-none transition-all font-medium text-gray-900 appearance-none cursor-pointer shadow-sm uppercase text-xs font-black">
                        <option value="">Select category</option>
                        {categories.map((cat: string) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                    <ChevronDown className="w-5 h-5 absolute right-5 top-[52px] text-gray-400 pointer-events-none" />
                </div>
                <div className="relative">
                    <label className="block text-sm font-bold text-gray-900 mb-2.5">Priority *</label>
                    <select required value={data.priority} onChange={e => setData({ ...data, priority: e.target.value })} className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-xl focus:border-emerald-500 outline-none transition-all font-medium text-gray-900 appearance-none cursor-pointer shadow-sm">
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                    <ChevronDown className="w-5 h-5 absolute right-5 top-[52px] text-gray-400 pointer-events-none" />
                </div>
                <div className="col-span-2">
                    <label className="block text-sm font-bold text-gray-900 mb-2.5">Required Skills *</label>
                    <input required value={data.skills} onChange={e => setData({ ...data, skills: e.target.value })} className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-xl focus:border-emerald-500 outline-none transition-all font-medium text-gray-900 shadow-sm" placeholder="React, Node.js, MongoDB..." />
                </div>
                <div className="col-span-2">
                    <label className="block text-sm font-bold text-gray-900 mb-2.5">Project Description *</label>
                    <textarea required value={data.description} onChange={e => setData({ ...data, description: e.target.value })} rows={6} className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-xl focus:border-emerald-500 outline-none transition-all font-medium text-gray-900 resize-none shadow-sm" placeholder="Provide detailed description..." />
                </div>
                <div className="col-span-2">
                    <label className="block text-sm font-bold text-gray-900 mb-4">Upload Project Documents</label>
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
                    <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-gray-200 rounded-2xl p-12 text-center hover:border-emerald-500 hover:bg-emerald-50/10 transition-all cursor-pointer group shadow-sm bg-gray-50/50">
                        <Upload className="w-8 h-8 mx-auto text-gray-400 group-hover:text-emerald-500 mb-3" />
                        <p className="text-gray-900 font-bold">{fileName || "Click to upload or drag and drop"}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}