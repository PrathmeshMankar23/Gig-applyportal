"use client";

import React, { useState } from 'react';
import {
    Clock,
    Search,
    Briefcase,
    Building2,
    MessageSquare,
    Mail,
    Calendar,
    ChevronRight,
    ArrowLeft,
    Check,
    X,
    ExternalLink,
    Phone,
    Eye,
    Download
} from 'lucide-react';
import { useRegistration, RegistrationRequest } from '@/context/RegistrationContext';
import { cn } from "@/lib/utils";

export default function AdminRequestsPage() {
    const { registrations, updateRegistrationStatus } = useRegistration();
    const [selectedReg, setSelectedReg] = useState<RegistrationRequest | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [roleFilter, setRoleFilter] = useState("All");
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Filter Logic
    const filteredRegs = registrations.filter(reg => {
        const matchesSearch = reg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            reg.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === "All" || reg.status === statusFilter;
        const matchesRole = roleFilter === "All" ||
            (roleFilter === "Freelancers" && reg.type === 'freelancer') ||
            (roleFilter === "Agencies" && reg.type === 'agency');
        return matchesSearch && matchesStatus && matchesRole;
    });

    const handleAction = (id: number, status: RegistrationRequest['status']) => {
        updateRegistrationStatus(id, status);
        if (selectedReg && selectedReg.id === id) {
            setSelectedReg({ ...selectedReg, status });
        }
    };

    const openViewModal = (reg: RegistrationRequest) => {
        setSelectedReg(reg);
        setIsModalOpen(true);
    };

    const closeViewModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedReg(null), 300); // delay to allow unmount animation
    };

    return (
        <div className="space-y-8 w-full max-w-full relative">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Registration Requests</h1>
                <p className="text-gray-500 mt-1 font-medium text-sm">Review incoming Freelancer and Agency registrations</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-[32px] border bg-emerald-300 border-emerald-400 shadow-sm transition-all hover:shadow-md hover:scale-[1.02] active:scale-[0.98] group">
                    <div className="flex justify-between items-start">
                        <div className="space-y-1">
                            <p className="text-gray-900 text-[10px] font-black uppercase tracking-widest group-hover:text-black transition-colors">Total Freelancers</p>
                            <p className="text-4xl font-black text-gray-900">
                                {registrations.filter(r => r.type === 'freelancer' && r.status === 'Approved').length}
                            </p>
                        </div>
                        <div className="p-3 rounded-2xl bg-white text-emerald-600 shadow-sm group-hover:shadow-md transition-all">
                            <Briefcase className="w-6 h-6" />
                        </div>
                    </div>
                </div>

                <div className="p-6 rounded-[32px] border bg-purple-300 border-purple-400 shadow-sm transition-all hover:shadow-md hover:scale-[1.02] active:scale-[0.98] group">
                    <div className="flex justify-between items-start">
                        <div className="space-y-1">
                            <p className="text-gray-900 text-[10px] font-black uppercase tracking-widest group-hover:text-black transition-colors">Total Agencies</p>
                            <p className="text-4xl font-black text-gray-900">
                                {registrations.filter(r => r.type === 'agency' && r.status === 'Approved').length}
                            </p>
                        </div>
                        <div className="p-3 rounded-2xl bg-white text-purple-600 shadow-sm group-hover:shadow-md transition-all">
                            <Building2 className="w-6 h-6" />
                        </div>
                    </div>
                </div>

                <div className="p-6 rounded-[32px] border bg-orange-300 border-orange-400 shadow-sm transition-all hover:shadow-md hover:scale-[1.02] active:scale-[0.98] group">
                    <div className="flex justify-between items-start">
                        <div className="space-y-1">
                            <p className="text-gray-900 text-[10px] font-black uppercase tracking-widest group-hover:text-black transition-colors">Pending Requests</p>
                            <p className="text-4xl font-black text-gray-900">
                                {registrations.filter(r => r.status === 'Pending').length}
                            </p>
                        </div>
                        <div className="p-3 rounded-2xl bg-white text-orange-500 shadow-sm group-hover:shadow-md transition-all">
                            <Clock className="w-6 h-6" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="flex flex-wrap items-center gap-4 bg-white p-4 rounded-[32px] border border-gray-100 shadow-sm">
                <div className="relative group">
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="appearance-none bg-gray-50 px-8 py-3.5 pr-14 rounded-2xl border border-gray-100 text-slate-800 font-black text-xs outline-none focus:ring-4 focus:ring-orange-500/10 transition-all cursor-pointer hover:bg-white"
                    >
                        <option value="All">All Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                    <ChevronRight className="w-4 h-4 absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 rotate-90 pointer-events-none group-hover:text-slate-900 transition-colors" />
                </div>

                <div className="relative group">
                    <select
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                        className="appearance-none bg-gray-50 px-8 py-3.5 pr-14 rounded-2xl border border-gray-100 text-slate-800 font-black text-xs outline-none focus:ring-4 focus:ring-blue-500/10 transition-all cursor-pointer hover:bg-white"
                    >
                        <option value="All">All Roles</option>
                        <option value="Freelancers">Freelancers</option>
                        <option value="Agencies">Agencies</option>
                    </select>
                    <ChevronRight className="w-4 h-4 absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 rotate-90 pointer-events-none group-hover:text-slate-900 transition-colors" />
                </div>

                <div className="relative flex-1 min-w-[200px]">
                    <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search name or email..."
                        className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-orange-500/10 focus:bg-white outline-none transition-all text-xs font-bold"
                    />
                </div>

                {(statusFilter !== "All" || roleFilter !== "All" || searchQuery !== "") && (
                    <button
                        onClick={() => {
                            setStatusFilter("All");
                            setRoleFilter("All");
                            setSearchQuery("");
                        }}
                        className="flex items-center gap-2 px-6 py-3.5 bg-red-50 text-red-500 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-red-100 transition-all border border-red-100 shadow-sm"
                    >
                        <X className="w-4 h-4" />
                        Clear
                    </button>
                )}
            </div>

            {/* Table Container */}
            <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse table-fixed">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100 h-12">
                                <th className="px-4 py-3 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Type</th>
                                <th className="px-4 py-3 text-[10px] font-black text-gray-400 uppercase tracking-widest">Name</th>
                                <th className="px-4 py-3 text-[10px] font-black text-gray-400 uppercase tracking-widest hidden lg:table-cell">Email</th>
                                <th className="px-4 py-3 text-[10px] font-black text-gray-400 uppercase tracking-widest hidden lg:table-cell">Phone</th>
                                <th className="px-4 py-3 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Status</th>
                                <th className="px-4 py-3 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredRegs.map((reg) => (
                                <tr key={reg.id} className="hover:bg-gray-50 transition-colors h-14">
                                    <td className="px-4 py-3 text-center">
                                        <span className={`inline-flex items-center justify-center min-w-[90px] gap-1.5 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-tighter ${reg.type === 'freelancer' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'}`}>
                                            {reg.type === 'freelancer' ? <Briefcase className="w-3 h-3" /> : <Building2 className="w-3 h-3" />}
                                            {reg.type}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="max-w-full">
                                            <p className="font-extrabold text-gray-900 text-sm truncate">{reg.name}</p>
                                            <p className="text-[10px] text-gray-400 font-bold lg:hidden mt-0.5 truncate">{reg.email}</p>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 hidden lg:table-cell">
                                        <p className="text-gray-500 font-medium text-sm truncate">{reg.email}</p>
                                    </td>
                                    <td className="px-4 py-3 hidden lg:table-cell">
                                        <p className="text-gray-500 font-medium text-sm truncate">{reg.phone}</p>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        <span className={`inline-block min-w-[70px] text-center px-2.5 py-1 rounded-lg text-[9px] font-black uppercase border ${reg.status === 'Approved' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                            reg.status === 'Rejected' ? 'bg-red-50 text-red-600 border-red-100' :
                                                'bg-orange-50 text-orange-600 border-orange-100'
                                            }`}>
                                            {reg.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            <button
                                                onClick={() => openViewModal(reg)}
                                                className="inline-flex items-center justify-center w-7 h-7 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all shadow-sm group/view"
                                                title="View Details"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>

                                            <button
                                                onClick={() => handleAction(reg.id, 'Approved')}
                                                className="px-3 py-1 text-[8px] bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white rounded-md transition-all font-black text-[9px] uppercase tracking-widest border border-emerald-100 shadow-sm"
                                            >
                                                Accept
                                            </button>
                                            <button
                                                onClick={() => handleAction(reg.id, 'Rejected')}
                                                className="px-3 py-1 text-[8px] bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-md transition-all font-black text-[9px] uppercase tracking-widest border border-red-100 shadow-sm"
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Empty State */}
                {filteredRegs.length === 0 && (
                    <div className="py-20 text-center">
                        <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-orange-100 shadow-inner">
                            <Clock className="w-8 h-8 text-orange-500" />
                        </div>
                        <h3 className="text-xl font-black text-gray-900">No matching registrations</h3>
                        <p className="text-gray-400 font-bold mt-2 text-sm">Try adjusting your filters or search terms</p>
                    </div>
                )}
            </div>

            {/* View Modal */}
            {isModalOpen && selectedReg && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-[32px] shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col border border-gray-100 animate-in zoom-in-95 duration-200 overflow-hidden">

                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-50 bg-slate-50/50">
                            <div>
                                <h2 className="text-xl font-black text-gray-900">Registration Details</h2>
                                <p className="text-xs text-gray-500 font-bold mt-1">Review applicant information</p>
                            </div>
                            <button
                                onClick={closeViewModal}
                                className="w-10 h-10 flex items-center justify-center rounded-2xl bg-white border border-gray-100 text-gray-400 hover:text-gray-900 hover:shadow-md transition-all"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="flex-1 overflow-y-auto p-8 space-y-10">
                            {/* Profile Summary */}
                            <div className="flex items-center gap-6">
                                <div className={cn(
                                    "w-24 h-24 rounded-[32px] flex items-center justify-center text-4xl font-black shadow-inner",
                                    selectedReg.type === 'freelancer' ? "bg-blue-50 text-blue-600 border border-blue-100" : "bg-purple-50 text-purple-600 border border-purple-100"
                                )}>
                                    {selectedReg.name.charAt(0)}
                                </div>
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <h2 className="text-2xl font-black text-gray-900">{selectedReg.name}</h2>
                                        <span className={cn(
                                            "px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest",
                                            selectedReg.type === 'freelancer' ? "bg-blue-100 text-blue-600" : "bg-purple-100 text-purple-600"
                                        )}>
                                            {selectedReg.type}
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <p className="text-gray-500 font-bold flex items-center gap-2 text-sm">
                                            <Mail className="w-4 h-4 text-orange-500" />
                                            {selectedReg.email}
                                        </p>
                                        <p className="text-gray-500 font-bold flex items-center gap-2 text-sm">
                                            <Phone className="w-4 h-4 text-orange-500" />
                                            {selectedReg.phone}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Details Grid */}
                            <div className="space-y-6">
                                {/* 1. Basic Details */}
                                <div className="bg-slate-50 p-6 rounded-[32px] space-y-5 border border-gray-100">
                                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                                        <Briefcase className="w-3.5 h-3.5" /> Professional Info
                                    </h4>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-1">
                                            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Role / Designation</p>
                                            <p className="text-sm font-black text-gray-900">{selectedReg.details.designation || 'N/A'}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Location / HQ</p>
                                            <p className="text-sm font-black text-gray-900">{selectedReg.details.location || selectedReg.details.headquarters || 'N/A'}</p>
                                        </div>
                                    </div>
                                    <div className="pt-4 border-t border-gray-200/50">
                                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Selected Services</p>
                                        <p className="text-sm font-bold text-gray-900">
                                            {selectedReg.details.selectedServices?.length > 0 ? selectedReg.details.selectedServices.join(', ') : 'None'}
                                        </p>
                                    </div>

                                    {/* Service Specific Details */}
                                    {selectedReg.details.selectedServices?.includes('BIM') && selectedReg.details.bimDetails && (
                                        <div className="pt-4 border-t border-gray-200/50">
                                            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">BIM & 2D Drafting Details</p>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <p className="text-[8px] text-gray-400 uppercase tracking-widest">Software Stack</p>
                                                    <p className="text-xs font-bold text-gray-900">{selectedReg.details.bimDetails.softwareStack?.join(', ') || 'N/A'}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[8px] text-gray-400 uppercase tracking-widest">Max LOD</p>
                                                    <p className="text-xs font-bold text-gray-900">{selectedReg.details.bimDetails.maxLod || 'N/A'}</p>
                                                </div>
                                                <div className="col-span-2">
                                                    <p className="text-[8px] text-gray-400 uppercase tracking-widest">CDE Experience</p>
                                                    <p className="text-xs font-bold text-gray-900">{selectedReg.details.bimDetails.cdeExperience || 'N/A'}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {selectedReg.details.selectedServices?.includes('Audit') && selectedReg.details.auditDetails && (
                                        <div className="pt-4 border-t border-gray-200/50">
                                            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">As-Built Audit Details</p>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <p className="text-[8px] text-gray-400 uppercase tracking-widest">Equipment Owned</p>
                                                    <p className="text-xs font-bold text-gray-900">{selectedReg.details.auditDetails.equipmentOwned || 'N/A'}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[8px] text-gray-400 uppercase tracking-widest">Service Radius</p>
                                                    <p className="text-xs font-bold text-gray-900">{selectedReg.details.auditDetails.serviceRadius || 'N/A'}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {selectedReg.details.selectedServices?.includes('Peer') && selectedReg.details.peerReviewDetails && (
                                        <div className="pt-4 border-t border-gray-200/50">
                                            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Peer Review Details</p>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <p className="text-[8px] text-gray-400 uppercase tracking-widest">Team Experience</p>
                                                    <p className="text-xs font-bold text-gray-900">{selectedReg.details.peerReviewDetails.teamExperience || 'N/A'}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[8px] text-gray-400 uppercase tracking-widest">Specialisation</p>
                                                    <p className="text-xs font-bold text-gray-900">{selectedReg.details.peerReviewDetails.specialisation || 'N/A'}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {selectedReg.details.selectedServices?.includes('BOQ') && selectedReg.details.boqDetails && (
                                        <div className="pt-4 border-t border-gray-200/50">
                                            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">BOQ Creation Details</p>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <p className="text-[8px] text-gray-400 uppercase tracking-widest">Measurement Standards</p>
                                                    <p className="text-xs font-bold text-gray-900">{selectedReg.details.boqDetails.measurementStandards || 'N/A'}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[8px] text-gray-400 uppercase tracking-widest">Estimation Software</p>
                                                    <p className="text-xs font-bold text-gray-900">{selectedReg.details.boqDetails.estimationSoftware || 'N/A'}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {selectedReg.details.selectedServices?.includes('Viz') && selectedReg.details.vizDetails && (
                                        <div className="pt-4 border-t border-gray-200/50">
                                            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">3D Visualisation Details</p>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="col-span-2">
                                                    <p className="text-[8px] text-gray-400 uppercase tracking-widest">Rendering Engines</p>
                                                    <p className="text-xs font-bold text-gray-900">{selectedReg.details.vizDetails.renderingEngines || 'N/A'}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[8px] text-gray-400 uppercase tracking-widest">Hardware Capacity</p>
                                                    <p className="text-xs font-bold text-gray-900">{selectedReg.details.vizDetails.hardwareCapacity || 'N/A'}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[8px] text-gray-400 uppercase tracking-widest">Animation</p>
                                                    <p className="text-xs font-bold text-gray-900">{selectedReg.details.vizDetails.animationCapability || 'N/A'}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {selectedReg.details.skills && (
                                        <div className="pt-4 border-t border-gray-200/50">
                                            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Skills</p>
                                            <p className="text-sm font-bold text-gray-900">{selectedReg.details.skills}</p>
                                        </div>
                                    )}
                                    {selectedReg.details.teamSize && (
                                        <div className="pt-4 border-t border-gray-200/50">
                                            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Team Size</p>
                                            <p className="text-sm font-bold text-gray-900">{selectedReg.details.teamSize}</p>
                                        </div>
                                    )}
                                </div>

                                {/* 2. Commercial Details */}
                                <div className="bg-slate-50 p-6 rounded-[32px] space-y-5 border border-gray-100">
                                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Commercial Details</h4>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                                        <div className="space-y-1">
                                            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Commercial Basis</p>
                                            <p className="text-sm font-black text-gray-900">{selectedReg.details.commercialBasis || 'N/A'}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Base Rate</p>
                                            <p className="text-sm font-black text-gray-900">{selectedReg.details.baseRate ? `$${selectedReg.details.baseRate}` : 'N/A'}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Billing / Terms</p>
                                            <p className="text-sm font-black text-gray-900">{selectedReg.details.billingCycle || selectedReg.details.paymentTerms || 'N/A'}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* 3. Legal & Tax Identity */}
                                <div className="bg-slate-50 p-6 rounded-[32px] space-y-5 border border-gray-100">
                                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                                        <Building2 className="w-3.5 h-3.5" /> Legal & Tax Identity
                                    </h4>
                                    <div className="grid grid-cols-2 gap-6">
                                        {selectedReg.details.registeredName && (
                                            <div className="space-y-1">
                                                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Registered Name</p>
                                                <p className="text-sm font-black text-gray-900">{selectedReg.details.registeredName}</p>
                                            </div>
                                        )}
                                        {selectedReg.details.legalNamePan && (
                                            <div className="space-y-1">
                                                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Legal Name (PAN)</p>
                                                <p className="text-sm font-black text-gray-900">{selectedReg.details.legalNamePan}</p>
                                            </div>
                                        )}
                                        {selectedReg.details.personalPan && (
                                            <div className="space-y-1">
                                                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Personal PAN</p>
                                                <p className="text-sm font-black text-gray-900">{selectedReg.details.personalPan}</p>
                                            </div>
                                        )}
                                        {selectedReg.details.companyPan && (
                                            <div className="space-y-1">
                                                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Company PAN</p>
                                                <p className="text-sm font-black text-gray-900">{selectedReg.details.companyPan}</p>
                                            </div>
                                        )}
                                        {selectedReg.details.cin && (
                                            <div className="space-y-1">
                                                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">CIN</p>
                                                <p className="text-sm font-black text-gray-900">{selectedReg.details.cin}</p>
                                            </div>
                                        )}
                                        <div className="space-y-1">
                                            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">GST Number</p>
                                            <p className="text-sm font-black text-gray-900">{selectedReg.details.gstNumber || 'Not Provided'}</p>
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-gray-200/50 grid grid-cols-1 gap-4">
                                        {(selectedReg.details.permanentAddress || selectedReg.details.registeredAddress) && (
                                            <div className="space-y-1">
                                                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Permanent / Registered Address</p>
                                                <p className="text-sm font-bold text-gray-900">{selectedReg.details.permanentAddress || selectedReg.details.registeredAddress}</p>
                                            </div>
                                        )}
                                        {(selectedReg.details.currentAddress || selectedReg.details.operatingAddress) && (
                                            <div className="space-y-1">
                                                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Current / Operating Address</p>
                                                <p className="text-sm font-bold text-gray-900">{selectedReg.details.currentAddress || selectedReg.details.operatingAddress}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Links */}
                            <div className="flex flex-wrap gap-4">
                                {selectedReg.details.portfolioUrl && (
                                    selectedReg.details.portfolioUrl.startsWith('http') ? (
                                        <a
                                            href={selectedReg.details.portfolioUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-100 transition-all border border-blue-100"
                                        >
                                            View Portfolio <ExternalLink className="w-3.5 h-3.5" />
                                        </a>
                                    ) : (
                                        <button
                                            onClick={() => {
                                                if (selectedReg.details.portfolioPdfData) {
                                                    const pdfWindow = window.open("");
                                                    if (pdfWindow) {
                                                        pdfWindow.document.write(
                                                            `<iframe width='100%' height='100%' src='${selectedReg.details.portfolioPdfData}' style='border:none; margin:0; padding:0; overflow:hidden; z-index:999999;'></iframe>`
                                                        );
                                                        pdfWindow.document.title = selectedReg.details.portfolioUrl || "Portfolio PDF";
                                                        pdfWindow.document.body.style.margin = "0";
                                                    } else {
                                                        alert("Please allow pop-ups to view the PDF.");
                                                    }
                                                } else {
                                                    alert("File data not available. Please ask the applicant to re-upload.");
                                                }
                                            }}
                                            className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-100 transition-all border border-blue-100"
                                        >
                                            View Portfolio PDF <ExternalLink className="w-3.5 h-3.5" />
                                        </button>
                                    )
                                )}

                                {selectedReg.details.website && (
                                    <a
                                        href={selectedReg.details.website.startsWith('http') ? selectedReg.details.website : '#'}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 text-purple-600 rounded-lg font-black text-[9px] uppercase tracking-widest hover:bg-purple-100 transition-all border border-purple-100"
                                    >
                                        Visit Website <ExternalLink className="w-3 h-3" />
                                    </a>
                                )}

                                {selectedReg.details.linkedinUrl && (
                                    <a
                                        href={selectedReg.details.linkedinUrl.startsWith('http') ? selectedReg.details.linkedinUrl : '#'}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg font-black text-[9px] uppercase tracking-widest hover:bg-slate-200 transition-all border border-slate-200"
                                    >
                                        LinkedIn <ExternalLink className="w-3 h-3" />
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Modal Footer Actions */}
                        <div className="p-6 border-t border-gray-50 flex items-center justify-between bg-slate-50/50">
                            <span className={cn(
                                "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border",
                                selectedReg.status === 'Approved' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                                    selectedReg.status === 'Rejected' ? "bg-red-50 text-red-600 border-red-100" :
                                        "bg-orange-50 text-orange-600 border-orange-100"
                            )}>
                                Current Status: {selectedReg.status}
                            </span>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => window.print()}
                                    className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all shadow-sm font-black text-[10px] uppercase tracking-widest flex items-center gap-1.5"
                                >
                                    <Download className="w-3.5 h-3.5" /> Download PDF
                                </button>
                                <button
                                    onClick={() => { handleAction(selectedReg.id, 'Approved'); closeViewModal(); }}
                                    className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl transition-all shadow-sm font-black text-[10px] uppercase tracking-widest"
                                >
                                    Accept
                                </button>
                                <button
                                    onClick={() => { handleAction(selectedReg.id, 'Rejected'); closeViewModal(); }}
                                    className="px-5 py-2.5 bg-white hover:bg-red-50 text-red-600 border border-red-100 rounded-xl transition-all shadow-sm font-black text-[10px] uppercase tracking-widest"
                                >
                                    Reject
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}
