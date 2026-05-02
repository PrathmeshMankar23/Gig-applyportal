"use client";

import React, { useState } from 'react';
import {
  Search,
  Plus,
  Mail,
  Phone,
  Briefcase,
  MoreVertical,
  X,
  UserPlus,
  Check
} from 'lucide-react';
import Link from 'next/link';

// Initial mock data
const initialMembers = [
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
    initials: "JDS",
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
  const [members, setMembers] = useState(initialMembers);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newMember, setNewMember] = useState({
    name: "",
    role: "",
    email: "",
    phone: "",
    skills: ""
  });

  const filteredMembers = members.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    const id = members.length + 1;
    const initials = newMember.name.split(' ').map(n => n[0]).join('').toUpperCase();
    const skillsArray = newMember.skills.split(',').map(s => s.trim());
    
    const memberToAdd = {
      ...newMember,
      id,
      projects: 0,
      initials,
      skills: skillsArray,
      status: "active"
    };

    setMembers([...members, memberToAdd]);
    setIsAddModalOpen(false);
    setNewMember({ name: "", role: "", email: "", phone: "", skills: "" });
  };

  const teamStats = [
    { label: "Total Members", value: members.length.toString(), color: "text-gray-900" },
    { label: "On Projects", value: members.filter(m => m.projects > 0).length.toString(), color: "text-purple-600" },
    { label: "Available", value: members.filter(m => m.projects === 0).length.toString(), color: "text-blue-500" },
  ];

  return (
    <div className="p-8 bg-slate-50 min-h-screen font-sans">
      {/* Header with Add Member Button */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Team Members</h1>
          <p className="text-gray-500 font-medium">Manage your agency team</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-purple-100 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Member
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-10 group">
        <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400 group-focus-within:text-purple-600 transition-colors" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search team members..."
          className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-2xl shadow-sm outline-none focus:ring-4 focus:ring-purple-50 focus:border-purple-200 transition-all text-gray-700 font-medium"
        />
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {teamStats.map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-[24px] border border-gray-100 shadow-sm">
            <p className="text-sm font-bold text-gray-400 mb-2">{stat.label}</p>
            <p className={`text-4xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredMembers.map((member) => (
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
            <div className="mb-8 h-[72px] overflow-hidden">
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
              href={`/Agency/portfolio?id=${member.id}&from=team`}
              className="w-full py-4 bg-purple-600 text-white rounded-2xl font-bold hover:bg-purple-700 shadow-lg shadow-purple-100 transition-all flex items-center justify-center"
            >
              View Portfolio
            </Link>
          </div>
        ))}
      </div>

      {/* Add Member Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[40px] w-full max-w-2xl shadow-2xl relative animate-in zoom-in-95 duration-300">
            <button 
              onClick={() => setIsAddModalOpen(false)}
              className="absolute right-8 top-8 p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="p-12">
              <div className="flex items-center gap-4 mb-2">
                <div className="p-3 bg-purple-100 text-purple-600 rounded-2xl">
                  <UserPlus className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-gray-900">Add New Member</h2>
                  <p className="text-gray-500 font-bold">Invite a professional to your agency</p>
                </div>
              </div>

              <form onSubmit={handleAddMember} className="mt-10 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-black text-gray-900 uppercase tracking-widest ml-1">Full Name</label>
                    <input 
                      required
                      type="text"
                      value={newMember.name}
                      onChange={e => setNewMember({...newMember, name: e.target.value})}
                      placeholder="e.g. Robert Fox"
                      className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-50 focus:border-purple-500 outline-none transition-all font-bold text-gray-900 placeholder:text-gray-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-black text-gray-900 uppercase tracking-widest ml-1">Professional Role</label>
                    <input 
                      required
                      type="text"
                      value={newMember.role}
                      onChange={e => setNewMember({...newMember, role: e.target.value})}
                      placeholder="e.g. Frontend Developer"
                      className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-50 focus:border-purple-500 outline-none transition-all font-bold text-gray-900 placeholder:text-gray-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-black text-gray-900 uppercase tracking-widest ml-1">Email Address</label>
                    <input 
                      required
                      type="email"
                      value={newMember.email}
                      onChange={e => setNewMember({...newMember, email: e.target.value})}
                      placeholder="name@agency.com"
                      className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-50 focus:border-purple-500 outline-none transition-all font-bold text-gray-900 placeholder:text-gray-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-black text-gray-900 uppercase tracking-widest ml-1">Phone Number</label>
                    <input 
                      required
                      type="tel"
                      value={newMember.phone}
                      onChange={e => setNewMember({...newMember, phone: e.target.value})}
                      placeholder="+1 234..."
                      className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-50 focus:border-purple-500 outline-none transition-all font-bold text-gray-900 placeholder:text-gray-300"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-black text-gray-900 uppercase tracking-widest ml-1">Skills (Comma separated)</label>
                  <input 
                    required
                    type="text"
                    value={newMember.skills}
                    onChange={e => setNewMember({...newMember, skills: e.target.value})}
                    placeholder="React, Tailwind, Node.js..."
                    className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-50 focus:border-purple-500 outline-none transition-all font-bold text-gray-900 placeholder:text-gray-300"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button 
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="flex-1 py-5 border-2 border-gray-100 rounded-2xl font-black text-gray-600 hover:bg-gray-50 transition-all text-lg"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-[2] py-5 bg-purple-600 text-white rounded-2xl font-black text-lg hover:bg-purple-700 transition-all shadow-xl shadow-purple-100 flex items-center justify-center gap-2"
                  >
                    <Check className="w-6 h-6" />
                    Confirm Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}