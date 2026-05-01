"use client";

import React from "react";
import {
  Clock,
  CheckCircle2,
  DollarSign,
  Star,
  TrendingUp,
  ChevronRight
} from "lucide-react";

// Mock Data for Active Projects
const activeProjects = [
  {
    title: "E-commerce Website Redesign",
    client: "TechStore Inc.",
    due: "2026-06-15",
    amount: "$15,000",
    progress: 65,
  },
  {
    title: "Marketing Dashboard",
    client: "Marketing Pro",
    due: "2026-05-30",
    amount: "$8,000",
    progress: 85,
  },
  {
    title: "Mobile App Prototype",
    client: "StartupXYZ",
    due: "2026-07-10",
    amount: "$12,000",
    progress: 40,
  },
];

export default function FreelancerDashboard() {
  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, Sarah!</h1>
        <p className="text-gray-500">Here&apos;s your freelance activity overview</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          label="Applications"
          value="0"
          subValue="0 pending"
          icon={<Clock className="w-6 h-6" />}
          color="bg-blue-600"
        />
        <StatCard
          label="Completed"
          value="28"
          subValue="Total projects"
          icon={<CheckCircle2 className="w-6 h-6" />}
          color="bg-emerald-500"
        />
        <StatCard
          label="Total Earnings"
          value="$45,230"
          subValue="+$8,000 this month"
          icon={<DollarSign className="w-6 h-6" />}
          color="bg-amber-500"
        />
        <StatCard
          label="Rating"
          value="4.9"
          subValue="Client satisfaction"
          icon={<Star className="w-6 h-6" />}
          color="bg-purple-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Projects List */}
        <div className="lg:col-span-2 bg-white rounded-[32px] p-8 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Active Projects</h2>
            <button className="text-blue-600 font-semibold flex items-center hover:underline">
              Browse More <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>

          <div className="space-y-6">
            {activeProjects.map((project, idx) => (
              <div key={idx} className="group border-b border-gray-50 last:border-0 pb-6 last:pb-0">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{project.title}</h3>
                    <p className="text-sm text-gray-400">{project.client}</p>
                  </div>
                  <span className="bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1 rounded-full">
                    {project.progress}%
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-100 h-2.5 rounded-full mb-4">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>

                <div className="flex justify-between text-sm font-medium">
                  <div className="flex items-center text-gray-500">
                    <Clock className="w-4 h-4 mr-2" />
                    Due: {project.due}
                  </div>
                  <div className="text-gray-900 font-bold">
                    {project.amount}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-8">
          {/* Monthly Metrics */}
          <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6">This Month</h2>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-500 font-medium">Hours Worked</span>
                  <span className="text-gray-900 font-bold">142 hrs</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full">
                  <div className="bg-blue-600 h-2 rounded-full w-[70%]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-500 font-medium">Revenue Goal</span>
                  <span className="text-gray-900 font-bold">$8,000 / $10,000</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full">
                  <div className="bg-emerald-500 h-2 rounded-full w-[80%]"></div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-50 flex items-center text-emerald-600 font-bold text-sm">
                <TrendingUp className="w-4 h-4 mr-2" />
                +15% from last month
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
            <div className="space-y-6">
              <ActivityItem
                title='Submitted deliverables for "E-commerce Website"'
                time="2 hours ago"
              />
              <ActivityItem
                title="Received payment of $8,000"
                time="1 day ago"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper Components
function StatCard({ label, value, subValue, icon, color }: { label: string; value: string; subValue: string; icon: React.ReactNode; color: string }) {
  return (
    <div className={`${color} rounded-[32px] p-6 text-white shadow-lg`}>
      <div className="flex justify-between items-start mb-4">
        <span className="text-white/80 font-medium">{label}</span>
        <div className="bg-white/20 p-2 rounded-xl">
          {icon}
        </div>
      </div>
      <div className="text-3xl font-bold mb-1">{value}</div>
      <div className="text-white/60 text-sm">{subValue}</div>
    </div>
  );
}

function ActivityItem({ title, time }: { title: string; time: string }) {
  return (
    <div className="flex gap-4">
      <div className="w-1 bg-blue-600 rounded-full h-auto"></div>
      <div>
        <p className="text-sm font-semibold text-gray-900 leading-snug">{title}</p>
        <p className="text-xs text-gray-400 mt-1">{time}</p>
      </div>
    </div>
  );
}