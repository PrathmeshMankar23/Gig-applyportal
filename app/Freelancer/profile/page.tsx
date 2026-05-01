"use client";

import React from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Star,
  Briefcase,
  DollarSign,
  Edit3,
  Eye
} from 'lucide-react';
import Link from 'next/link';

export default function FreelancerProfile() {
  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      {/* Header with Title and Edit Button */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
        <div className="flex gap-4">
          <Link
            href="/portfolio?id=sarah"
            className="bg-slate-900 hover:bg-black text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-gray-200 flex items-center gap-2"
          >
            <Eye className="w-4 h-4" />
            View Public Portfolio
          </Link>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-100">
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
            SJ
          </div>

          {/* Basic Info */}
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-1">
              <h2 className="text-3xl font-bold text-gray-900">Sarah Johnson</h2>
              <span className="bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full text-xs font-bold">
                Available
              </span>
            </div>
            <p className="text-gray-500 text-lg font-medium mb-6">Senior Full Stack Developer</p>

            {/* Contact & Location Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12 mb-8">
              <div className="flex items-center text-gray-600 gap-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <span className="font-medium">sarah.j@email.com</span>
              </div>
              <div className="flex items-center text-gray-600 gap-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <span className="font-medium">+1 234 567 8900</span>
              </div>
              <div className="flex items-center text-gray-600 gap-3">
                <MapPin className="w-5 h-5 text-gray-400" />
                <span className="font-medium">New York, USA</span>
              </div>
              <div className="flex items-center text-gray-600 gap-3">
                <Globe className="w-5 h-5 text-gray-400" />
                <span className="font-medium">portfolio.sarahjohnson.com</span>
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
                <span className="text-gray-900 font-bold text-lg">$75/hr</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Me Section */}
      <div className="bg-white rounded-[32px] p-10 shadow-sm border border-gray-100 mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6">About Me</h3>
        <p className="text-gray-600 leading-relaxed text-lg">
          Experienced full-stack developer with over 8 years of expertise in building scalable web applications.
          Specialized in React, Node.js, and cloud technologies. Passionate about creating clean,
          maintainable code and delivering exceptional user experiences. Proven track record of successful
          project delivery and client satisfaction.
        </p>
      </div>

      {/* Skills Section */}
      <div className="bg-white rounded-[32px] p-10 shadow-sm border border-gray-100 mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Skills & Expertise</h3>
        <div className="flex flex-wrap gap-3">
          {[
            "React", "Node.js", "TypeScript", "JavaScript", "Python",
            "MongoDB", "PostgreSQL", "AWS", "Docker", "Git",
            "UI/UX Design", "REST APIs"
          ].map((skill) => (
            <span
              key={skill}
              className="px-6 py-2.5 bg-blue-50 text-blue-600 rounded-xl font-bold text-sm"
            >
              {skill}
            </span>
          ))}
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