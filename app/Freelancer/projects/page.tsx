"use client";

import React from "react";
import Link from "next/link";
import {
  Search,
  ArrowLeft,
  DollarSign,
  Calendar,
  Clock,
  Users,
  Send
} from "lucide-react";

// Mock Data for Projects
const projects = [
  {
    id: 1,
    title: "E-commerce Website Redesign",
    client: "TechStore Inc.",
    description: "Complete redesign of the existing e-commerce platform with modern UI/UX, improved performance, and mobile responsiveness.",
    category: "Web Development",
    tags: ["React", "Node.js", "MongoDB", "UI/UX Design"],
    budget: "$15,000",
    deadline: "2026-06-15",
    posted: "2026-04-20",
    applicants: 12
  },
  {
    id: 2,
    title: "Mobile App Development",
    client: "FinanceApp Co.",
    description: "Build a cross-platform financial management app with real-time data synchronization.",
    category: "Mobile Development",
    tags: ["React Native", "Firebase", "iOS", "Android"],
    budget: "$25,000",
    deadline: "2026-07-20",
    posted: "2026-04-22",
    applicants: 8
  }
];

export default function AvailableProjects() {
  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      {/* Top Navigation */}
      <Link
        href="/Freelancer/Dashboard"
        className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Dashboard
      </Link>

      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Available Projects</h1>
        <p className="text-gray-500 font-medium">Browse and apply to projects that match your skills</p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-[24px] shadow-sm border border-gray-100 flex flex-wrap gap-4 mb-8">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search projects or skills..."
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all text-black"
          />
        </div>
        <select className="px-6 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 font-medium min-w-[200px]">
          <option>All Categories</option>
          <option>Web Development</option>
          <option>Mobile Development</option>
          <option>UI/UX Design</option>
        </select>
      </div>

      {/* Projects List */}
      <div className="space-y-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            {/* Title and Category */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">{project.title}</h2>
                <p className="text-gray-400 font-medium">{project.client}</p>
              </div>
              <span className="bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-sm font-bold">
                {project.category}
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed mb-6 max-w-4xl">
              {project.description}
            </p>

            {/* Skills/Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {project.tags.map(tag => (
                <span key={tag} className="bg-gray-100 text-gray-600 px-4 py-1.5 rounded-full text-xs font-bold">
                  {tag}
                </span>
              ))}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 border-t border-gray-50 pt-8">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-50 rounded-lg text-gray-400">
                  <DollarSign className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400">Budget</p>
                  <p className="text-gray-900 font-bold">{project.budget}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-50 rounded-lg text-gray-400">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400">Deadline</p>
                  <p className="text-gray-900 font-bold">{project.deadline}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-50 rounded-lg text-gray-400">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400">Posted</p>
                  <p className="text-gray-900 font-bold">{project.posted}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-50 rounded-lg text-gray-400">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400">Applicants</p>
                  <p className="text-gray-900 font-bold">{project.applicants}</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                href={`/Freelancer/Projects/${project.id}`}
                className="flex items-center justify-center py-4 px-6 border-2 border-gray-100 rounded-2xl font-bold text-gray-700 hover:bg-gray-50 transition-all"
              >
                View Details
              </Link>
              <button className="flex items-center justify-center gap-2 py-4 px-6 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all">
                <Send className="w-5 h-5" />
                Apply Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}