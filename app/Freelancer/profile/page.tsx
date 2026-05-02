"use client";

import React, { useState, useRef } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Star,
  Briefcase,
  DollarSign,
  Edit3,
  Eye,
  X,
  Upload,
  Check,
  FileText
} from 'lucide-react';
import Link from 'next/link';

export default function FreelancerProfile() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Sarah Johnson",
    title: "Senior Full Stack Developer",
    email: "sarah.j@email.com",
    phone: "+1 234 567 8900",
    location: "New York, USA",
    portfolio: "portfolio.sarahjohnson.com",
    about: "Experienced full-stack developer with over 8 years of expertise in building scalable web applications. Specialized in React, Node.js, and cloud technologies. Passionate about creating clean, maintainable code and delivering exceptional user experiences. Proven track record of successful project delivery and client satisfaction.",
    skills: ["React", "Node.js", "TypeScript", "JavaScript", "Python", "MongoDB", "PostgreSQL", "AWS", "Docker", "Git", "UI/UX Design", "REST APIs"],
    hourlyRate: "75"
  });

  const [tempProfileData, setTempProfileData] = useState(profileData);
  const [uploadedFiles, setUploadedFiles] = useState<{name: string, size: string}[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileData(tempProfileData);
    setIsEditModalOpen(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const size = (file.size / (1024 * 1024)).toFixed(2) + ' MB';
      setUploadedFiles([...uploadedFiles, { name: file.name, size }]);
    }
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      {/* Header with Title and Edit Button */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
        <div className="flex gap-4">
          <button 
            onClick={() => {
              setTempProfileData(profileData);
              setIsEditModalOpen(true);
            }}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-100"
          >
            <Edit3 className="w-4 h-4" />
            Edit Profile
          </button>
        </div>
      </div>

      {/* Profile Main Card */}
      <div className="bg-white rounded-[32px] p-10 shadow-sm border border-gray-100 mb-8">
        <div className="flex flex-col md:flex-row gap-10 items-start">
          {/* Avatar */}
          <div className="w-32 h-32 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-xl shadow-blue-100 shrink-0">
            {profileData.name.split(' ').map(n => n[0]).join('')}
          </div>

          {/* Basic Info */}
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-1">
              <h2 className="text-3xl font-bold text-gray-900">{profileData.name}</h2>
              <span className="bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full text-xs font-bold">
                Available
              </span>
            </div>
            <p className="text-gray-500 text-lg font-medium mb-6">{profileData.title}</p>

            {/* Contact & Location Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12 mb-8">
              <div className="flex items-center text-gray-600 gap-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <span className="font-medium">{profileData.email}</span>
              </div>
              <div className="flex items-center text-gray-600 gap-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <span className="font-medium">{profileData.phone}</span>
              </div>
              <div className="flex items-center text-gray-600 gap-3">
                <MapPin className="w-5 h-5 text-gray-400" />
                <span className="font-medium">{profileData.location}</span>
              </div>
              <div className="flex items-center text-gray-600 gap-3">
                <Globe className="w-5 h-5 text-gray-400" />
                <span className="font-medium">{profileData.portfolio}</span>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-8 pt-6 border-t border-gray-50">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                <span className="text-gray-900 font-bold text-lg">4.9</span>
                <span className="text-gray-400 font-medium">Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-blue-500" />
                <span className="text-gray-900 font-bold text-lg">28</span>
                <span className="text-gray-400 font-medium">Projects Completed</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-emerald-500" />
                <span className="text-gray-900 font-bold text-lg">${profileData.hourlyRate}/hr</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* About Me Section */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-[32px] p-10 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6">About Me</h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              {profileData.about}
            </p>
          </div>

          {/* Skills Section */}
          <div className="bg-white rounded-[32px] p-10 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Skills & Expertise</h3>
            <div className="flex flex-wrap gap-3">
              {profileData.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-6 py-2.5 bg-blue-50 text-blue-600 rounded-xl font-bold text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Documents Section */}
        <div className="bg-white rounded-[32px] p-10 shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Documents</h3>
          <div className="space-y-4">
            {uploadedFiles.length === 0 ? (
              <p className="text-gray-400 font-medium text-center py-8 border-2 border-dashed border-gray-50 rounded-2xl">
                No documents uploaded yet
              </p>
            ) : (
              uploadedFiles.map((file, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 group hover:border-blue-200 transition-colors">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900 truncate">{file.name}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{file.size}</p>
                  </div>
                  <button className="text-gray-400 hover:text-red-500 transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
            <button 
              onClick={() => setIsEditModalOpen(true)}
              className="w-full py-4 border-2 border-dashed border-gray-100 rounded-2xl text-gray-400 font-bold hover:border-blue-500 hover:text-blue-600 transition-all text-sm"
            >
              Add New Document
            </button>
          </div>
        </div>
      </div>

      {/* Experience Section */}
      <div className="bg-white rounded-[32px] p-10 shadow-sm border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-8">Experience</h3>
        <div className="space-y-10">
          <ExperienceItem
            title="Senior Full Stack Developer"
            company="Freelance"
            period="2020 - Present"
            description="Working with various clients on web application development, specializing in React and Node.js ecosystems."
          />
          <ExperienceItem
            title="Full Stack Developer"
            company="Tech Company Inc."
            period="2018 - 2020"
            description="Developed and maintained enterprise-level applications serving millions of users."
          />
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
              <h2 className="text-4xl font-black text-gray-900 mb-2">Edit Profile</h2>
              <p className="text-gray-500 font-bold mb-10">Update your professional identity and documents</p>

              <form onSubmit={handleSave} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-sm font-black text-gray-900 uppercase tracking-widest ml-1">Full Name</label>
                    <input 
                      type="text"
                      value={tempProfileData.name}
                      onChange={e => setTempProfileData({...tempProfileData, name: e.target.value})}
                      className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all font-bold text-gray-900"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-black text-gray-900 uppercase tracking-widest ml-1">Professional Title</label>
                    <input 
                      type="text"
                      value={tempProfileData.title}
                      onChange={e => setTempProfileData({...tempProfileData, title: e.target.value})}
                      className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all font-bold text-gray-900"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-black text-gray-900 uppercase tracking-widest ml-1">Email Address</label>
                    <input 
                      type="email"
                      value={tempProfileData.email}
                      onChange={e => setTempProfileData({...tempProfileData, email: e.target.value})}
                      className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all font-bold text-gray-900"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-black text-gray-900 uppercase tracking-widest ml-1">Hourly Rate (USD)</label>
                    <input 
                      type="number"
                      value={tempProfileData.hourlyRate}
                      onChange={e => setTempProfileData({...tempProfileData, hourlyRate: e.target.value})}
                      className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all font-bold text-gray-900"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-black text-gray-900 uppercase tracking-widest ml-1">About Me</label>
                  <textarea 
                    rows={4}
                    value={tempProfileData.about}
                    onChange={e => setTempProfileData({...tempProfileData, about: e.target.value})}
                    className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all font-medium text-gray-900 resize-none"
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-sm font-black text-gray-900 uppercase tracking-widest ml-1 block">Upload New Documents (Resume, Certifications, etc.)</label>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileUpload}
                    className="hidden" 
                    accept=".pdf,.doc,.docx"
                  />
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="border-4 border-dashed border-gray-100 rounded-[32px] p-12 text-center hover:border-blue-500 hover:bg-blue-50/10 transition-all cursor-pointer group bg-gray-50/50"
                  >
                    <Upload className="w-12 h-12 mx-auto text-gray-400 group-hover:text-blue-500 mb-4 transition-colors" />
                    <p className="text-gray-900 font-black text-xl">Click to upload or drag and drop</p>
                    <p className="text-gray-400 font-bold mt-2 uppercase tracking-widest text-xs">PDF, DOC up to 20MB</p>
                  </div>
                </div>

                <div className="flex gap-4 pt-6">
                  <button 
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="flex-1 py-5 border-2 border-gray-100 rounded-2xl font-black text-gray-600 hover:bg-gray-50 transition-all text-lg"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-[2] py-5 bg-blue-600 text-white rounded-2xl font-black text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 flex items-center justify-center gap-2"
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

function ExperienceItem({ title, company, period, description }: { title: string; company: string; period: string; description: string }) {
  return (
    <div className="relative pl-0">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="text-lg font-bold text-gray-900">{title}</h4>
          <p className="text-gray-500 font-medium">{company}</p>
        </div>
        <span className="text-gray-400 font-medium">{period}</span>
      </div>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}