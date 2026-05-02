"use client";

import React, { useState, useRef } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Users,
  Calendar,
  Star,
  Briefcase,
  Edit3,
  Eye,
  X,
  Check,
  Upload,
  FileText
} from 'lucide-react';
import Link from 'next/link';

export default function AgencyProfilePage() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [agencyData, setAgencyData] = useState({
    name: "Creative Studios Inc.",
    title: "Full-Service Digital Agency",
    email: "contact@creativestudios.com",
    phone: "+1 234 567 8900",
    location: "San Francisco, USA",
    website: "www.creativestudios.com",
    about: "Creative Studios Inc. is a full-service digital agency specializing in web development, mobile applications, and digital design. Founded in 2018, we have grown to a team of 24 talented professionals dedicated to delivering exceptional digital experiences. Our portfolio spans various industries, and we pride ourselves on our ability to understand client needs and deliver innovative solutions that drive business growth.",
    specializations: ["Web Development", "Mobile Apps", "UI/UX Design", "Branding", "Digital Marketing", "Cloud Solutions", "E-commerce", "Custom Software"],
    established: "2018",
    teamSize: 24
  });

  const [tempData, setTempData] = useState(agencyData);
  const [uploadedFiles, setUploadedFiles] = useState<{name: string, size: string}[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const teamDistribution = [
    { label: "Developers", count: Math.floor(agencyData.teamSize * 0.5) },
    { label: "Designers", count: Math.floor(agencyData.teamSize * 0.3) },
    { label: "Project Managers", count: Math.floor(agencyData.teamSize * 0.2) }
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setAgencyData(tempData);
    setIsEditModalOpen(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const size = (file.size / (1024 * 1024)).toFixed(2) + ' MB';
      setUploadedFiles([...uploadedFiles, { name: file.name, size }]);
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen font-sans text-black">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Agency Profile</h1>
        <div className="flex gap-4">
          <button 
            onClick={() => {
              setTempData(agencyData);
              setIsEditModalOpen(true);
            }}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-purple-100 flex items-center gap-2"
          >
            <Edit3 className="w-4 h-4" />
            Edit Profile
          </button>
        </div>
      </div>

      {/* Main Profile Card */}
      <div className="bg-white rounded-[32px] p-10 border border-gray-100 shadow-sm mb-8">
        <div className="flex flex-col md:flex-row gap-10">
          {/* Agency Logo/Avatar */}
          <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-[28px] flex items-center justify-center text-white text-4xl font-bold shadow-xl shadow-purple-100 shrink-0">
            {getInitials(agencyData.name)}
          </div>

          {/* Agency Details */}
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-2">
              <h2 className="text-3xl font-bold text-gray-900">{agencyData.name}</h2>
              <span className="bg-emerald-50 text-emerald-500 px-3 py-1 rounded-full text-xs font-bold">
                Available
              </span>
            </div>
            <p className="text-gray-500 font-medium text-lg mb-6">{agencyData.title}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
              <div className="flex items-center gap-3 text-gray-600 font-medium">
                <Mail className="w-5 h-5 text-gray-400" />
                {agencyData.email}
              </div>
              <div className="flex items-center gap-3 text-gray-600 font-medium">
                <Phone className="w-5 h-5 text-gray-400" />
                {agencyData.phone}
              </div>
              <div className="flex items-center gap-3 text-gray-600 font-medium">
                <MapPin className="w-5 h-5 text-gray-400" />
                {agencyData.location}
              </div>
              <div className="flex items-center gap-3 text-gray-600 font-medium">
                <Globe className="w-5 h-5 text-gray-400" />
                {agencyData.website}
              </div>
              <div className="flex items-center gap-3 text-gray-600 font-medium">
                <Users className="w-5 h-5 text-gray-400" />
                {agencyData.teamSize} Team Members
              </div>
              <div className="flex items-center gap-3 text-gray-600 font-medium">
                <Calendar className="w-5 h-5 text-gray-400" />
                Est. {agencyData.established}
              </div>
            </div>

            <div className="flex items-center gap-8 mt-8 pt-8 border-t border-gray-50">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                <span className="font-bold text-gray-900">4.8 Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-gray-400" />
                <span className="font-bold text-gray-900">52 Projects Completed</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2 space-y-8">
          {/* About Section */}
          <div className="bg-white rounded-[32px] p-10 border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-6">About Our Agency</h3>
            <p className="text-gray-500 font-medium leading-relaxed">
              {agencyData.about}
            </p>
          </div>

          {/* Specializations Section */}
          <div className="bg-white rounded-[32px] p-10 border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Specializations</h3>
            <div className="flex flex-wrap gap-3">
              {agencyData.specializations.map((spec) => (
                <span key={spec} className="bg-purple-50 text-purple-600 px-5 py-2 rounded-xl text-sm font-bold">
                  {spec}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Documents Section */}
        <div className="bg-white rounded-[32px] p-10 border border-gray-100 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Agency Documents</h3>
          <div className="space-y-4">
            {uploadedFiles.length === 0 ? (
              <p className="text-gray-400 font-medium text-center py-8 border-2 border-dashed border-gray-50 rounded-2xl">
                No legal documents uploaded
              </p>
            ) : (
              uploadedFiles.map((file, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 group">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-purple-600 shadow-sm">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900 truncate">{file.name}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{file.size}</p>
                  </div>
                </div>
              ))
            )}
            <button 
              onClick={() => setIsEditModalOpen(true)}
              className="w-full py-4 border-2 border-dashed border-gray-100 rounded-2xl text-gray-400 font-bold hover:border-purple-500 hover:text-purple-600 transition-all text-sm"
            >
              Add New Document
            </button>
          </div>
        </div>
      </div>

      {/* Team Overview Section */}
      <div className="bg-white rounded-[32px] p-10 border border-gray-100 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-8">Team Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {teamDistribution.map((group) => (
            <div key={group.label} className="bg-slate-50 p-6 rounded-2xl border border-gray-100">
              <p className="text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider">{group.label}</p>
              <p className="text-4xl font-bold text-gray-900">{group.count}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[40px] w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in zoom-in-95 duration-300">
            <button 
              onClick={() => setIsEditModalOpen(false)}
              className="absolute right-8 top-8 p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="p-12">
              <h2 className="text-4xl font-black text-gray-900 mb-2">Edit Agency Profile</h2>
              <p className="text-gray-500 font-bold mb-10">Update your agency information and public presence</p>

              <form onSubmit={handleSave} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-sm font-black text-gray-900 uppercase tracking-widest ml-1">Agency Name</label>
                    <input 
                      type="text"
                      value={tempData.name}
                      onChange={e => setTempData({...tempData, name: e.target.value})}
                      className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-50 focus:border-purple-500 outline-none transition-all font-bold text-gray-900"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-black text-gray-900 uppercase tracking-widest ml-1">Tagline/Title</label>
                    <input 
                      type="text"
                      value={tempData.title}
                      onChange={e => setTempData({...tempData, title: e.target.value})}
                      className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-50 focus:border-purple-500 outline-none transition-all font-bold text-gray-900"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-black text-gray-900 uppercase tracking-widest ml-1">Email</label>
                    <input 
                      type="email"
                      value={tempData.email}
                      onChange={e => setTempData({...tempData, email: e.target.value})}
                      className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-50 focus:border-purple-500 outline-none transition-all font-bold text-gray-900"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-black text-gray-900 uppercase tracking-widest ml-1">Team Size</label>
                    <input 
                      type="number"
                      value={tempData.teamSize}
                      onChange={e => setTempData({...tempData, teamSize: parseInt(e.target.value)})}
                      className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-50 focus:border-purple-500 outline-none transition-all font-bold text-gray-900"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-black text-gray-900 uppercase tracking-widest ml-1">About Agency</label>
                  <textarea 
                    rows={4}
                    value={tempData.about}
                    onChange={e => setTempData({...tempData, about: e.target.value})}
                    className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-50 focus:border-purple-500 outline-none transition-all font-medium text-gray-900 resize-none"
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-sm font-black text-gray-900 uppercase tracking-widest ml-1 block">Upload New Documents</label>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileUpload}
                    className="hidden" 
                    accept=".pdf,.doc,.docx"
                  />
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="border-4 border-dashed border-gray-100 rounded-[32px] p-12 text-center hover:border-purple-500 hover:bg-purple-50/10 transition-all cursor-pointer group bg-gray-50/50"
                  >
                    <Upload className="w-12 h-12 mx-auto text-gray-400 group-hover:text-purple-500 mb-4 transition-colors" />
                    <p className="text-gray-900 font-black text-xl">Click to upload or drag and drop</p>
                    <p className="text-gray-400 font-bold mt-2 uppercase tracking-widest text-xs">PDF, DOC up to 50MB</p>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button 
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="flex-1 py-5 border-2 border-gray-100 rounded-2xl font-black text-gray-600 hover:bg-gray-50 transition-all text-lg"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-[2] py-5 bg-purple-600 text-white rounded-2xl font-black text-lg hover:bg-purple-700 transition-all shadow-xl shadow-purple-100 flex items-center justify-center gap-2"
                  >
                    <Check className="w-6 h-6" />
                    Save Changes
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