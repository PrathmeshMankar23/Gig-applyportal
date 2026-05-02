"use client";

import React from 'react';
import Link from 'next/link';
import {
  Search,
  ArrowLeft,
  DollarSign,
  Calendar,
  Clock,
  Send,
  ExternalLink
} from 'lucide-react';

import { useProjects } from '@/context/ProjectContext';
import { ApplyModal } from '@/components/ApplyModal';

export default function AgencyProjectsPage() {
  const { projects, categories } = useProjects();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [categoryFilter, setCategoryFilter] = React.useState("All Categories");
  const [applyModal, setApplyModal] = React.useState<{isOpen: boolean, title: string}>({ isOpen: false, title: "" });

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.skills.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "All Categories" ||
      project.category.toLowerCase() === categoryFilter.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-8 bg-slate-50 min-h-screen font-sans">
      {/* Back Navigation */}
      <Link href="/Agency/Dashboard" className="flex items-center gap-2 text-gray-500 hover:text-purple-600 font-bold text-sm mb-6 transition-colors group">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Dashboard
      </Link>

      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Available Projects</h1>
        <p className="text-gray-500 font-medium">Browse and apply to projects that match your agency's expertise</p>
      </div>

      {/* Filters & Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400 group-focus-within:text-purple-600 transition-colors" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects or skills..."
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-2xl shadow-sm focus:ring-4 focus:ring-purple-50 focus:border-purple-200 outline-none transition-all font-medium text-gray-700"
          />
        </div>
        <select 
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-6 py-3 bg-white border border-gray-100 rounded-2xl shadow-sm outline-none font-bold text-gray-600 focus:ring-4 focus:ring-purple-50 appearance-none min-w-[200px]"
        >
          <option>All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
          ))}
        </select>
      </div>

      {/* Projects List */}
      <div className="space-y-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-purple-100/50 transition-all group"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1 group-hover:text-purple-600 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 font-bold text-sm tracking-wide">{project.client}</p>
              </div>
              <span className="bg-purple-50 text-purple-600 px-4 py-1.5 rounded-xl text-xs font-bold uppercase tracking-widest">
                {project.category}
              </span>
            </div>

            <p className="text-gray-500 font-medium mb-6 leading-relaxed max-w-4xl">
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {project.skills.split(',').map(tag => (
                <span key={tag.trim()} className="bg-slate-50 text-gray-500 px-4 py-1.5 rounded-full text-xs font-bold border border-gray-100">
                  {tag.trim()}
                </span>
              ))}
            </div>

            {/* Metadata Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 py-6 border-y border-gray-50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                  <DollarSign className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-gray-400 tracking-tighter leading-none mb-1">Budget</p>
                  <p className="font-bold text-gray-900">${project.budget}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-gray-400 tracking-tighter leading-none mb-1">Deadline</p>
                  <p className="font-bold text-gray-900">{project.deadline}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-gray-400 tracking-tighter leading-none mb-1">Posted</p>
                  <p className="font-bold text-gray-900">{project.posted}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                  <Send className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-gray-400 tracking-tighter leading-none mb-1">Applicants</p>
                  <p className="font-bold text-gray-900">{project.applicants} {project.applicants === 1 ? 'Agency' : 'Agencies'}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href={`/Agency/projects/${project.id}`}
                className="flex-1 py-4 border-2 border-gray-100 rounded-2xl font-bold text-gray-600 hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
              >
                View Details
                <ExternalLink className="w-4 h-4" />
              </Link>
              <button 
                onClick={() => setApplyModal({ isOpen: true, title: project.title })}
                className="flex-[2] py-4 bg-purple-600 text-white rounded-2xl font-bold hover:bg-purple-700 shadow-lg shadow-purple-100 transition-all flex items-center justify-center gap-2"
              >
                Apply Now
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <ApplyModal 
        isOpen={applyModal.isOpen}
        onClose={() => setApplyModal({ ...applyModal, isOpen: false })}
        projectTitle={applyModal.title}
        role="agency"
      />
    </div>
  );
}