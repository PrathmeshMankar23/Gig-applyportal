"use client";

import React, { useState, useRef } from 'react';
import { X, Upload, Check, ArrowLeft } from 'lucide-react';
import { useApplications } from '@/context/ApplicationContext';

interface ApplyModalProps {
    isOpen: boolean;
    onClose: () => void;
    projectId: number;
    projectTitle: string;
    role: 'freelancer' | 'agency';
}

export function ApplyModal({ isOpen, onClose, projectId, projectTitle, role }: ApplyModalProps) {
    const { addApplication } = useApplications();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [fileName, setFileName] = useState<string | null>(null);
    const [fileData, setFileData] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        coverLetter: '',
        budget: '',
        duration: '',
        portfolioUrl: '',
        experience: ''
    });

    const themeColor = role === 'freelancer' ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-100' : 'bg-purple-600 hover:bg-purple-700 shadow-purple-100';

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        addApplication({
            projectId: projectId,
            projectTitle: projectTitle,
            applicantName: formData.name || (role === 'freelancer' ? "Freelancer User" : "Agency User"),
            applicantRole: role,
            email: formData.email || "user@example.com",
            phone: formData.phone,
            portfolioUrl: formData.portfolioUrl,
            portfolioPdf: fileName,
            portfolioPdfData: fileData,
            experience: formData.experience,
            budget: formData.budget,
            duration: formData.duration,
            coverLetter: formData.coverLetter,
            profileId: `user-${Date.now()}`
        });

        setIsSubmitted(true);
        setTimeout(() => {
            setIsSubmitted(false);
            onClose();
        }, 2000);
    };

    if (isSubmitted) {
        return (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-white/80 backdrop-blur-md animate-in fade-in duration-300">
                <div className="text-center space-y-4">
                    <div className={`w-20 h-20 ${role === 'freelancer' ? 'bg-blue-600' : 'bg-purple-600'} rounded-full flex items-center justify-center mx-auto shadow-2xl animate-bounce`}>
                        <Check className="w-10 h-10 text-white" strokeWidth={4} />
                    </div>
                    <h2 className="text-3xl font-black text-gray-900">Application Sent!</h2>
                    <p className="text-gray-500 font-bold">Your application for {projectTitle} has been submitted successfully.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-start justify-center p-0 md:p-8 bg-slate-50/90 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-300">
            <div className="w-full max-w-4xl bg-white min-h-screen md:min-h-0 md:rounded-[40px] shadow-2xl border border-gray-100 relative mb-8">
                {/* Close Button */}
                <div className="p-6 border-b border-gray-50 flex items-center justify-end">
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-400">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-8 md:p-12">
                    <div className="mb-10">
                        <h1 className="text-4xl font-black text-gray-900 tracking-tight">Apply for Project</h1>
                        <p className="text-xl text-gray-500 font-bold mt-1">{projectTitle}</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <label className="block text-sm font-black text-gray-900 mb-3 uppercase tracking-widest">Full Name *</label>
                                <input 
                                    required
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    className="w-full px-6 py-4 bg-white border border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition-all font-bold text-gray-900 shadow-sm"
                                    placeholder="Enter your full name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-black text-gray-900 mb-3 uppercase tracking-widest">Email Address *</label>
                                <input 
                                    required
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    className="w-full px-6 py-4 bg-white border border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition-all font-bold text-gray-900 shadow-sm"
                                    placeholder="your.email@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-black text-gray-900 mb-3 uppercase tracking-widest">Phone Number *</label>
                            <input 
                                required
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                className="w-full px-6 py-4 bg-white border border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition-all font-bold text-gray-900 shadow-sm"
                                placeholder="+1 (555) 000-0000"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-black text-gray-900 mb-3 uppercase tracking-widest">Why do you want to work on this project? *</label>
                            <textarea 
                                required
                                rows={6}
                                value={formData.coverLetter}
                                onChange={(e) => setFormData({...formData, coverLetter: e.target.value})}
                                className="w-full px-6 py-4 bg-white border border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition-all font-medium text-gray-900 resize-none shadow-sm"
                                placeholder="Explain why you're the best fit for this role and how your skills align with the project goals..."
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <label className="block text-sm font-black text-gray-900 mb-3 uppercase tracking-widest">Proposed Budget (USD) *</label>
                                <input 
                                    required
                                    type="number"
                                    value={formData.budget}
                                    onChange={(e) => setFormData({...formData, budget: e.target.value})}
                                    className="w-full px-6 py-4 bg-white border border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition-all font-bold text-gray-900 shadow-sm"
                                    placeholder="15000"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-black text-gray-900 mb-3 uppercase tracking-widest">Estimated Duration *</label>
                                <input 
                                    required
                                    type="text"
                                    value={formData.duration}
                                    onChange={(e) => setFormData({...formData, duration: e.target.value})}
                                    className="w-full px-6 py-4 bg-white border border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition-all font-bold text-gray-900 shadow-sm"
                                    placeholder="e.g., 6 weeks"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-black text-gray-900 mb-3 uppercase tracking-widest">Portfolio URL</label>
                            <input 
                                type="url"
                                value={formData.portfolioUrl}
                                onChange={(e) => setFormData({...formData, portfolioUrl: e.target.value})}
                                className="w-full px-6 py-4 bg-white border border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition-all font-bold text-gray-900 shadow-sm"
                                placeholder="https://yourportfolio.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-black text-gray-900 mb-3 uppercase tracking-widest">Relevant Experience *</label>
                            <textarea 
                                required
                                rows={4}
                                value={formData.experience}
                                onChange={(e) => setFormData({...formData, experience: e.target.value})}
                                className="w-full px-6 py-4 bg-white border border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition-all font-medium text-gray-900 resize-none shadow-sm"
                                placeholder="Describe your relevant experience and past projects..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-black text-gray-900 mb-4 uppercase tracking-widest">Upload Portfolio (PDF)</label>
                            <input 
                                type="file" 
                                accept=".pdf"
                                ref={fileInputRef} 
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        setFileName(file.name);
                                        const reader = new FileReader();
                                        reader.onload = (event) => {
                                            setFileData(event.target?.result as string);
                                        };
                                        reader.readAsDataURL(file);
                                    } else {
                                        setFileName(null);
                                        setFileData(null);
                                    }
                                }}
                                className="hidden" 
                            />
                            <div 
                                onClick={() => fileInputRef.current?.click()}
                                className="border-2 border-dashed border-gray-200 rounded-[32px] p-12 text-center hover:border-blue-500 hover:bg-blue-50/10 transition-all cursor-pointer group bg-gray-50/30"
                            >
                                <Upload className="w-10 h-10 mx-auto text-gray-400 group-hover:text-blue-500 mb-4" />
                                <p className="text-gray-900 font-black text-lg">{fileName || "Click to upload your portfolio PDF"}</p>
                                <p className="text-sm font-bold text-gray-400 mt-1 uppercase tracking-widest">PDF format up to 10MB</p>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-4 pt-6">
                            <button 
                                type="button"
                                onClick={onClose}
                                className="flex-1 py-5 border-2 border-gray-100 rounded-2xl font-black text-gray-600 hover:bg-gray-50 transition-all text-lg"
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit"
                                className={`flex-[2] py-5 ${themeColor} text-white rounded-2xl font-black text-lg transition-all shadow-xl`}
                            >
                                Submit Application
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
