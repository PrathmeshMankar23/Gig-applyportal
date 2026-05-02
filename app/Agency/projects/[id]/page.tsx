"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useProjects } from '@/context/ProjectContext';
import { ProjectDetailView } from '@/components/ProjectDetailView';

export default function AgencyProjectDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = React.use(params);
    const id = parseInt(resolvedParams.id);
    const { projects } = useProjects();
    const project = projects.find(p => p.id === id);

    if (!project) return (
        <div className="py-20 text-center">
            <h2 className="text-2xl font-bold text-gray-900">Project not found</h2>
            <Link href="/Agency/projects" className="text-purple-600 font-bold underline mt-4 inline-block">Back to Projects</Link>
        </div>
    );

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-6">
            <Link
                href="/Agency/projects"
                className="flex items-center gap-2 text-gray-500 hover:text-purple-600 transition-colors mb-4 w-fit font-bold"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Available Projects
            </Link>

            <ProjectDetailView project={project} role="agency" />
        </div>
    );
}
