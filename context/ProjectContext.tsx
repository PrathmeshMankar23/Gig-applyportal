"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Project {
    id: number;
    title: string;
    client: string;
    status: string;
    budget: string;
    deadline: string;
    category: string;
    priority: string;
    skills: string;
    description: string;
    assignedTo: string;
    progress: number;
    posted: string;
    applicants: number;
}

interface ProjectContextType {
    projects: Project[];
    categories: string[];
    addProject: (project: Omit<Project, 'id' | 'posted' | 'applicants'>) => void;
    updateProject: (project: Project) => void;
    deleteProject: (id: number) => void;
    addCategory: (category: string) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: React.ReactNode }) {
    const [categories, setCategories] = useState(['web', 'mobile', 'design', 'Web Development', 'Mobile Development', 'UI/UX Design']);
    const [projects, setProjects] = useState<Project[]>([
        {
            id: 1,
            title: "E-commerce Website Redesign",
            client: "TechStore Inc.",
            status: "in progress",
            budget: "15000",
            deadline: "2026-06-15",
            category: "web",
            priority: "High",
            skills: "React, Node.js, MongoDB",
            description: "Full redesign of the existing e-commerce platform with modern UI/UX, improved performance, and mobile responsiveness.",
            assignedTo: "Sarah Johnson",
            progress: 65,
            posted: "2026-04-20",
            applicants: 12
        },
        {
            id: 2,
            title: "Mobile App Development",
            client: "FinanceApp Co.",
            status: "not started",
            budget: "25000",
            deadline: "2026-07-20",
            category: "mobile",
            priority: "Medium",
            skills: "React Native, Firebase",
            description: "Development of a new fintech mobile application with real-time data synchronization.",
            assignedTo: "Unassigned",
            progress: 0,
            posted: "2026-04-22",
            applicants: 8
        },
        {
            id: 3,
            title: "Brand Identity Design",
            client: "Luxe Fashion",
            status: "completed",
            budget: "8000",
            deadline: "2026-04-10",
            category: "design",
            priority: "Medium",
            skills: "Figma, Illustrator, Branding",
            description: "New brand identity and guidelines for a luxury fashion house.",
            assignedTo: "Elena Rodriguez",
            progress: 100,
            posted: "2026-04-15",
            applicants: 5
        }
    ]);

    const addProject = (projectData: Omit<Project, 'id' | 'posted' | 'applicants'>) => {
        const newProject: Project = {
            ...projectData,
            id: Math.max(0, ...projects.map(p => p.id)) + 1,
            posted: new Date().toISOString().split('T')[0],
            applicants: 0
        };
        setProjects([...projects, newProject]);
    };

    const updateProject = (updatedProject: Project) => {
        setProjects(projects.map(p => p.id === updatedProject.id ? updatedProject : p));
    };

    const deleteProject = (id: number) => {
        setProjects(projects.filter(p => p.id !== id));
    };

    const addCategory = (category: string) => {
        if (!categories.includes(category)) {
            setCategories([...categories, category]);
        }
    };

    return (
        <ProjectContext.Provider value={{ projects, categories, addProject, updateProject, deleteProject, addCategory }}>
            {children}
        </ProjectContext.Provider>
    );
}

export function useProjects() {
    const context = useContext(ProjectContext);
    if (context === undefined) {
        throw new Error('useProjects must be used within a ProjectProvider');
    }
    return context;
}
