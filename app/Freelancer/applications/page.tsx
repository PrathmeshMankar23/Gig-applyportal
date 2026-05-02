"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function MyApplications() {
  const router = useRouter();

  // Stats data based on the provided UI
  const applicationStats = [
    { label: "Total Applications", value: 0, color: "text-gray-900" },
    { label: "Pending", value: 0, color: "text-orange-600" },
    { label: "Approved", value: 0, color: "text-emerald-600" },
    { label: "Rejected", value: 0, color: "text-red-600" },
  ];

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Applications</h1>
        <p className="text-gray-500 font-medium">Track all your project applications</p>
      </div>

      {/* Application Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {applicationStats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-8 rounded-[24px] shadow-sm border border-gray-100"
          >
            <p className="text-sm font-medium text-gray-500 mb-2">{stat.label}</p>
            <p className={`text-4xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Main Content Area / Empty State */}
      <div className="bg-white rounded-[32px] p-20 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
        <div className="mb-6">
          {/* Placeholder for the empty state message */}
          <p className="text-gray-500 font-medium text-lg mb-8">No applications yet</p>

          {/* Functional Navigation Button */}
          <button
            onClick={() => router.push("/Freelancer/projects")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-2xl transition-all shadow-lg shadow-blue-100"
          >
            Browse Projects
          </button>
        </div>
      </div>
    </div>
  );
}