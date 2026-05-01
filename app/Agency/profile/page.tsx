"use client";

import React from 'react';
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
  Eye
} from 'lucide-react';
import Link from 'next/link';

export default function AgencyProfilePage() {
  const specializations = [
    "Web Development", "Mobile Apps", "UI/UX Design",
    "Branding", "Digital Marketing", "Cloud Solutions",
    "E-commerce", "Custom Software"
  ];

  const teamDistribution = [
    { label: "Developers", count: 12 },
    { label: "Designers", count: 8 },
    { label: "Project Managers", count: 4 }
  ];

  return (
    <div className="p-8 bg-slate-50 min-h-screen font-sans text-black">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Agency Profile</h1>
        <div className="flex gap-4">
          <Link
            href="/portfolio?id=creative"
            className="bg-slate-900 hover:bg-black text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-gray-200 flex items-center gap-2"
          >
            <Eye className="w-4 h-4" />
            View Public Portfolio
          </Link>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-purple-100 flex items-center gap-2">
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
            CS
          </div>

          {/* Agency Details */}
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-2">
              <h2 className="text-3xl font-bold text-gray-900">Creative Studios Inc.</h2>
              <span className="bg-emerald-50 text-emerald-500 px-3 py-1 rounded-full text-xs font-bold">
                Available
              </span>
            </div>
            <p className="text-gray-500 font-medium text-lg mb-6">Full-Service Digital Agency</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
              <div className="flex items-center gap-3 text-gray-600 font-medium">
                <Mail className="w-5 h-5 text-gray-400" />
                contact@creativestudios.com
              </div>
              <div className="flex items-center gap-3 text-gray-600 font-medium">
                <Phone className="w-5 h-5 text-gray-400" />
                +1 234 567 8900
              </div>
              <div className="flex items-center gap-3 text-gray-600 font-medium">
                <MapPin className="w-5 h-5 text-gray-400" />
                San Francisco, USA
              </div>
              <div className="flex items-center gap-3 text-gray-600 font-medium">
                <Globe className="w-5 h-5 text-gray-400" />
                www.creativestudios.com
              </div>
              <div className="flex items-center gap-3 text-gray-600 font-medium">
                <Users className="w-5 h-5 text-gray-400" />
                24 Team Members
              </div>
              <div className="flex items-center gap-3 text-gray-600 font-medium">
                <Calendar className="w-5 h-5 text-gray-400" />
                Est. 2018
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

      {/* About Section */}
      <div className="bg-white rounded-[32px] p-10 border border-gray-100 shadow-sm mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6">About Our Agency</h3>
        <p className="text-gray-500 font-medium leading-relaxed">
          Creative Studios Inc. is a full-service digital agency specializing in web development, mobile applications, and digital design. Founded in 2018, we have grown to a team of 24 talented professionals dedicated to delivering exceptional digital experiences. Our portfolio spans various industries, and we pride ourselves on our ability to understand client needs and deliver innovative solutions that drive business growth.
        </p>
      </div>

      {/* Specializations Section */}
      <div className="bg-white rounded-[32px] p-10 border border-gray-100 shadow-sm mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Specializations</h3>
        <div className="flex flex-wrap gap-3">
          {specializations.map((spec) => (
            <span key={spec} className="bg-purple-50 text-purple-600 px-5 py-2 rounded-xl text-sm font-bold">
              {spec}
            </span>
          ))}
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
    </div>
  );
}