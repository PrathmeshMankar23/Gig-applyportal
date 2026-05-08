"use client";

import React from "react";
import {
  Clock,
  CheckCircle2,
  DollarSign,
  TrendingUp,
  ChevronRight
} from "lucide-react";

import { useApplications, Application } from "@/context/ApplicationContext";
import ProjectWorkspace from "@/components/ProjectWorkspace";
import { cn } from "@/lib/utils";

export default function FreelancerDashboard() {
  const { applications } = useApplications();
  const [selectedApp, setSelectedApp] = React.useState<Application | null>(null);
  const [isWorkspaceOpen, setIsWorkspaceOpen] = React.useState(false);

  // Filter applications for Sarah (Mocking current user)
  const myApplications = applications.filter(app => app.applicantName === "Sarah Johnson");

  return (
    <div className="p-8 bg-slate-50 min-h-screen relative overflow-hidden">
      {/* Header */}
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Welcome back, Sarah!</h1>
          <p className="text-gray-500 font-medium">Here&apos;s your freelance activity overview</p>
        </div>
      </div>

      {/* Workspace Side Panel */}
      <div className={cn(
        "fixed inset-y-0 right-0 w-full lg:w-[500px] bg-white shadow-2xl z-[100] transform transition-transform duration-500 ease-in-out border-l border-gray-100 flex flex-col",
        isWorkspaceOpen ? "translate-x-0" : "translate-x-full"
      )}>
        {selectedApp && (
          <>
            <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-slate-50/30">
              <div>
                <h2 className="text-xl font-black text-gray-900">{selectedApp.projectTitle}</h2>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Project Workspace</p>
              </div>
              <button
                onClick={() => setIsWorkspaceOpen(false)}
                className="p-3 bg-white border border-gray-100 rounded-2xl text-gray-400 hover:text-gray-900 hover:shadow-md transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
              <ProjectWorkspace
                application={selectedApp}
                currentUserRole="Freelancer"
                currentUserName="Sarah Johnson"
              />
            </div>
          </>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          label="Applications"
          value={myApplications.length.toString()}
          subValue={`${myApplications.filter(a => a.status === 'Pending').length} pending`}
          icon={<Clock className="w-6 h-6" />}
          color="bg-blue-600"
        />
        <StatCard
          label="Active"
          value={myApplications.filter(a => a.status === 'Selected').length.toString()}
          subValue="Ongoing projects"
          icon={<CheckCircle2 className="w-6 h-6" />}
          color="bg-emerald-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Projects List */}
        <div className="lg:col-span-2 bg-white rounded-[40px] p-10 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">Your Projects</h2>
          </div>

          <div className="space-y-4">
            {myApplications.length > 0 ? myApplications.map((app) => (
              <div
                key={app.id}
                onClick={() => {
                  setSelectedApp(app);
                  setIsWorkspaceOpen(true);
                }}
                className="group p-6 bg-white border border-gray-100 rounded-[32px] hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 transition-all cursor-pointer relative overflow-hidden"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-4 items-center">
                    <div className={cn(
                      "w-14 h-14 rounded-2xl flex items-center justify-center font-black transition-colors border",
                      app.status === 'Selected'
                        ? "bg-emerald-50 text-emerald-600 border-emerald-100 shadow-lg shadow-emerald-500/10"
                        : "bg-slate-50 text-slate-400 border-gray-100 group-hover:bg-blue-50 group-hover:text-blue-500"
                    )}>
                      {app.projectTitle[0]}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-black text-gray-900 text-lg group-hover:text-blue-600 transition-colors">{app.projectTitle}</h3>
                        {app.status === 'Selected' && (
                          <span className="text-[8px] font-black bg-emerald-500 text-white px-2 py-0.5 rounded-md uppercase tracking-widest animate-pulse">Active</span>
                        )}
                      </div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Admin</p>
                    </div>
                  </div>
                  <span className={cn(
                    "text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest border",
                    app.status === 'Selected' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                      app.status === 'Rejected' ? "bg-red-50 text-red-600 border-red-100" :
                        "bg-orange-50 text-orange-600 border-orange-100"
                  )}>
                    {app.status}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm font-bold pt-4 border-t border-gray-50">
                  <div className="flex items-center text-gray-400">
                    <Clock className="w-4 h-4 mr-2" />
                    Applied: {app.appliedDate}
                  </div>
                  <div className="text-gray-900 flex items-center gap-2">
                    <span className="text-[10px] text-gray-400 uppercase tracking-tighter">Budget</span>
                    ${app.budget}
                  </div>
                </div>
              </div>
            )) : (
              <div className="text-center py-20 bg-slate-50 rounded-[40px] border-2 border-dashed border-gray-100">
                <p className="text-gray-400 font-bold">No applications yet. Start exploring projects!</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-8">
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