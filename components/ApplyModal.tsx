"use client";

import React, { useState, useRef } from 'react';
import { X, Upload, Check, ArrowLeft } from 'lucide-react';

interface ApplyModalProps {
    isOpen: boolean;
    onClose: () => void;
    projectTitle: string;
    role: 'freelancer' | 'agency';
}

export function ApplyModal({ isOpen, onClose, projectTitle, role }: ApplyModalProps) {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [fileName, setFileName] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    const themeColor = role === 'freelancer' ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-100' : 'bg-purple-600 hover:bg-purple-700 shadow-purple-100';

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
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
                        <div>
                            <label className="block text-sm font-black text-gray-900 mb-3 uppercase tracking-widest">Cover Letter *</label>
                            <textarea 
                                required
                                rows={6}
                                className="w-full px-6 py-4 bg-white border border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition-all font-medium text-gray-900 resize-none shadow-sm"
                                placeholder="Explain why you're the best fit for this project..."
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <label className="block text-sm font-black text-gray-900 mb-3 uppercase tracking-widest">Proposed Budget (USD) *</label>
                                <input 
                                    required
                                    type="number"
                                    className="w-full px-6 py-4 bg-white border border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition-all font-bold text-gray-900 shadow-sm"
                                    placeholder="15000"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-black text-gray-900 mb-3 uppercase tracking-widest">Estimated Duration *</label>
                                <input 
                                    required
                                    type="text"
                                    className="w-full px-6 py-4 bg-white border border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition-all font-bold text-gray-900 shadow-sm"
                                    placeholder="e.g., 6 weeks"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-black text-gray-900 mb-3 uppercase tracking-widest">Portfolio URL</label>
                            <input 
                                type="url"
                                className="w-full px-6 py-4 bg-white border border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition-all font-bold text-gray-900 shadow-sm"
                                placeholder="https://yourportfolio.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-black text-gray-900 mb-3 uppercase tracking-widest">Relevant Experience *</label>
                            <textarea 
                                required
                                rows={4}
                                className="w-full px-6 py-4 bg-white border border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition-all font-medium text-gray-900 resize-none shadow-sm"
                                placeholder="Describe your relevant experience and past projects..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-black text-gray-900 mb-4 uppercase tracking-widest">Upload Documents (Portfolio, Resume, etc.)</label>
                            <input 
                                type="file" 
                                ref={fileInputRef} 
                                onChange={(e) => setFileName(e.target.files?.[0]?.name || null)}
                                className="hidden" 
                            />
                            <div 
                                onClick={() => fileInputRef.current?.click()}
                                className="border-2 border-dashed border-gray-200 rounded-[32px] p-12 text-center hover:border-blue-500 hover:bg-blue-50/10 transition-all cursor-pointer group bg-gray-50/30"
                            >
                                <Upload className="w-10 h-10 mx-auto text-gray-400 group-hover:text-blue-500 mb-4" />
                                <p className="text-gray-900 font-black text-lg">{fileName || "Click to upload or drag and drop"}</p>
                                <p className="text-sm font-bold text-gray-400 mt-1 uppercase tracking-widest">PDF, DOC, images up to 10MB</p>
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
