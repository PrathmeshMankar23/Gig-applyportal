"use client";

import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import {
    TrendingUp, Users, Briefcase, Target
} from 'lucide-react';

// Sample Data for Charts
const revenueData = [
    { name: 'Jan', revenue: 45000 }, { name: 'Feb', revenue: 52000 },
    { name: 'Mar', revenue: 48000 }, { name: 'Apr', revenue: 65000 },
    { name: 'May', revenue: 59000 }, { name: 'Jun', revenue: 74000 },
];

const categoryData = [
    { name: 'Web Dev', count: 25 }, { name: 'Mobile', count: 18 },
    { name: 'Design', count: 15 }, { name: 'AI/ML', count: 12 },
    { name: 'DevOps', count: 10 }, { name: 'Other', count: 8 },
];

const statusData = [
    { name: 'Completed', value: 65, color: '#10b981' },
    { name: 'In Progress', value: 23, color: '#3b82f6' },
    { name: 'Not Started', value: 12, color: '#94a3b8' },
];

export default function AnalyticsPage() {
    return (
        <div className="space-y-6 pb-10">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Analytics & Insights</h1>
                <p className="text-gray-500 mt-1">Comprehensive overview of platform performance</p>
            </div>

            {/* Top Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard title="Total Revenue" value="$340K" change="+12%" color="bg-blue-600" icon={<TrendingUp />} />
                <MetricCard title="Active Projects" value="65" change="15 in progress" color="bg-emerald-500" icon={<Briefcase />} />
                <MetricCard title="Total Users" value="155" change="124 freelancers" color="bg-purple-600" icon={<Users />} />
                <MetricCard title="Success Rate" value="94%" change="Completed on time" color="bg-orange-500" icon={<Target />} />
            </div>

            {/* Main Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Revenue Trend - Large */}
                <div className="lg:col-span-2 bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">Revenue Trend</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={revenueData}>
                                <defs>
                                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                                <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Project Status Distribution */}
                <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">Project Status</h3>
                    <div className="h-[300px] w-full relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={statusData} innerRadius={80} outerRadius={100} paddingAngle={5} dataKey="value">
                                    {statusData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-3xl font-bold text-gray-900">65%</span>
                            <span className="text-xs font-bold text-gray-400 uppercase">Completed</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Secondary Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Projects by Category */}
                <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">Projects by Category</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={categoryData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none' }} />
                                <Bar dataKey="count" fill="#10b981" radius={[6, 6, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Platform Health Section */}
                <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">Platform Health</h3>
                    <div className="space-y-8 mt-4">
                        <HealthBar label="Avg Response Time" value="2.4 hours" progress={85} color="bg-emerald-500" />
                        <HealthBar label="Client Satisfaction" value="92%" progress={92} color="bg-blue-500" />
                        <HealthBar label="Project Success Rate" value="94%" progress={94} color="bg-purple-500" />
                    </div>
                </div>
            </div>
        </div>
    );
}

// Sub-components
interface MetricCardProps {
    title: string;
    value: string | number;
    change: string;
    color: string;
    icon: React.ReactNode;
}

function MetricCard({ title, value, change, color, icon }: MetricCardProps) {
    return (
        <div className={`${color} p-6 rounded-[24px] text-white shadow-lg`}>
            <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-white/20 rounded-xl">{icon}</div>
                <span className="text-xs font-bold bg-white/20 px-2 py-1 rounded-lg">{change}</span>
            </div>
            <p className="text-white/80 text-sm font-medium">{title}</p>
            <h2 className="text-3xl font-bold mt-1">{value}</h2>
        </div>
    );
}

interface HealthBarProps {
    label: string;
    value: string | number;
    progress: number;
    color: string;
}

function HealthBar({ label, value, progress, color }: HealthBarProps) {
    return (
        <div className="space-y-2">
            <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-gray-500">{label}</span>
                <span className="text-sm font-bold text-gray-900">{value}</span>
            </div>
            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full ${color} rounded-full transition-all duration-1000`} style={{ width: `${progress}%` }} />
            </div>
        </div>
    );
}