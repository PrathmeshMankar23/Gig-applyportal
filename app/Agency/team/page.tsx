"use client";

import React from 'react';
import {
  Search,
  Plus,
  Mail,
  Phone,
  Briefcase,
  MoreVertical
} from 'lucide-react';
import Link from 'next/link';

// Mock data based on the provided screenshot
const teamStats = [
  { label: "Total Members", value: "24", color: "text-gray-900" },
  { label: "Active Now", value: "18", color: "text-emerald-500" },
  { label: "On Projects", value: "20", color: "text-purple-600" },
  { label: "Available", value: "4", color: "text-blue-500" },
];

const members = [
  {
    id: 1,
    name: "John Developer",
    role: "Senior Developer",
    email: "john@creativestudios.com",
    phone: "+1 234 567 8901",
    projects: 3,
    initials: "JD",
    skills: ["React", "Node.js", "TypeScript"],
    status: "active"
  },
  {
    id: 2,
    name: "Jane Designer",
    role: "UI/UX Lead",
    email: "jane@creativestudios.com",
    phone: "+1 234 567 8902",
    projects: 2,
    initials: "JD",
    skills: ["Figma", "Adobe XD", "UI Design"],
    status: "active"
  },
  {
    id: 3,
    name: "Mike DevOps",
    role: "DevOps Engineer",
    email: "mike@creativestudios.com",
    phone: "+1 234 567 8903",
    projects: 4,
    initials: "MD",
    skills: ["AWS", "Docker", "Kubernetes"],
    status: "active"
  }
];

export default function TeamMembersPage() {
  return (
    <div className="p-8 bg-slate-50 min-h-screen font-sans">
      {/* Header with Add Member Button */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Team Members</h1>
          <p className="text-gray-500 font-medium">Manage your agency team</p>
        </div>
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-purple-100 flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add Member
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-10 group">
        <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400 group-focus-within:text-purple-600 transition-colors" />
        <input
          type="text"
          placeholder="Search team members..."
          className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-2xl shadow-sm outline-none focus:ring-4 focus:ring-purple-50 focus:border-purple-200 transition-all text-gray-700 font-medium"
        />
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {teamStats.map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-[24px] border border-gray-100 shadow-sm">
            <p className="text-sm font-bold text-gray-400 mb-2">{stat.label}</p>
            <p className={`text-4xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {members.map((member) => (
          <div key={member.id} className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all group relative">
            <div className="flex items-start gap-4 mb-6">
              {/* Avatar */}
              <div className="w-16 h-16 rounded-2xl bg-purple-600 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-purple-100">
                {member.initials}
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                    {member.name}
                  </h3>
                  <button className="text-gray-300 hover:text-gray-600 transition-colors">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-sm font-medium text-gray-400 mb-2">{member.role}</p>
                <span className="bg-emerald-50 text-emerald-500 px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  {member.status}
                </span>
              </div>
            </div>

            {/* Contact & Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-gray-500 text-sm font-medium">
                <Mail className="w-4 h-4" />
                {member.email}
              </div>
              <div className="flex items-center gap-3 text-gray-500 text-sm font-medium">
                <Phone className="w-4 h-4" />
                {member.phone}
              </div>
              <div className="flex items-center gap-3 text-gray-500 text-sm font-medium">
                <Briefcase className="w-4 h-4" />
                {member.projects} Active Projects
              </div>
            </div>

            {/* Skills */}
            <div className="mb-8">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Skills:</p>
              <div className="flex flex-wrap gap-2">
                {member.skills.map(skill => (
                  <span key={skill} className="bg-purple-50 text-purple-600 px-3 py-1 rounded-lg text-xs font-bold">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* View Profile Button */}
            <Link
              href="/portfolio?id=sarah"
              className="w-full py-4 bg-purple-600 text-white rounded-2xl font-bold hover:bg-purple-700 shadow-lg shadow-purple-100 transition-all flex items-center justify-center"
            >
              View Portfolio
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}