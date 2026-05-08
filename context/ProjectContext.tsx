"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface ProjectUpdate {
    id: number;
    text: string;
    date: string;
    sender: string;
    senderRole: string;
}

export interface ProjectFile {
    id: number;
    name: string;
    size: string;
    date: string;
    sender: string;
    senderRole: string;
    url: string;
}

export interface Project {
    id: number;
    title: string;
    client: string;
    budget: string;
    deadline: string;
    category: string;
    priority: string;
    skills: string;
    description: string;
    progress: number;
    applicants: number;
    posted: string;
    status: string;
    assignedTo: string;
    assignedUsers?: string[];
    updates?: ProjectUpdate[];
    files?: ProjectFile[];
}

interface ProjectContextType {
    projects: Project[];
    categories: string[];
    addProject: (project: Omit<Project, 'id' | 'posted' | 'applicants'>) => void;
    updateProject: (project: Project) => void;
    deleteProject: (id: number) => void;
    addCategory: (category: string) => void;
    addProjectUpdate: (projectId: number, text: string, sender: string, senderRole: string) => void;
    addProjectFile: (projectId: number, file: Omit<ProjectFile, 'id' | 'date'>) => void;
    removeProjectFile: (projectId: number, fileId: number) => void;
    assignProject: (projectId: number, assignedTo: string) => void;
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

    const [hasLoaded, setHasLoaded] = useState(false);

    // 1. Load from LocalStorage on Mount
    useEffect(() => {
        const savedProjects = localStorage.getItem('app_projects');
        const savedCategories = localStorage.getItem('app_categories');
        
        if (savedProjects) {
            try {
                setProjects(JSON.parse(savedProjects));
            } catch (e) {
                console.error("Failed to parse projects", e);
            }
        }
        
        if (savedCategories) {
            try {
                setCategories(JSON.parse(savedCategories));
            } catch (e) {
                console.error("Failed to parse categories", e);
            }
        }
        
        setHasLoaded(true);
    }, []);

    // 1.5 Listen for Cross-Tab Changes
    useEffect(() => {
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'app_projects' && e.newValue) {
                setProjects(JSON.parse(e.newValue));
            }
            if (e.key === 'app_categories' && e.newValue) {
                setCategories(JSON.parse(e.newValue));
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    // 2. Save to LocalStorage on Change (ONLY after initial load)
    useEffect(() => {
        if (hasLoaded) {
            localStorage.setItem('app_projects', JSON.stringify(projects));
            localStorage.setItem('app_categories', JSON.stringify(categories));
        }
    }, [projects, categories, hasLoaded]);

    const addProject = (projectData: Omit<Project, 'id' | 'posted' | 'applicants'>) => {
        const newProject: Project = {
            ...projectData,
            id: Math.max(0, ...projects.map(p => p.id)) + 1,
            posted: new Date().toISOString().split('T')[0],
            applicants: 0
        };
        setProjects(prev => [...prev, newProject]);
    };

    const updateProject = (updatedProject: Project) => {
        setProjects(prev => prev.map(p => p.id === updatedProject.id ? updatedProject : p));
    };

    const deleteProject = (id: number) => {
        setProjects(prev => prev.filter(p => p.id !== id));
    };

    const addCategory = (category: string) => {
        if (!categories.includes(category)) {
            setCategories([...categories, category]);
        }
    };

    const addProjectUpdate = (projectId: number, text: string, sender: string, senderRole: string) => {
        setProjects(prev => prev.map(p => {
            if (p.id === projectId) {
                const newUpdate: ProjectUpdate = {
                    id: Date.now(),
                    text,
                    date: new Date().toLocaleString(),
                    sender,
                    senderRole
                };
                return { ...p, updates: [...(p.updates || []), newUpdate] };
            }
            return p;
        }));
    };

    const addProjectFile = (projectId: number, fileData: Omit<ProjectFile, 'id' | 'date'>) => {
        setProjects(prev => prev.map(p => {
            if (p.id === projectId) {
                const newFile: ProjectFile = {
                    ...fileData,
                    id: Date.now(),
                    date: new Date().toLocaleString()
                };
                return { ...p, files: [...(p.files || []), newFile] };
            }
            return p;
        }));
    };

    const removeProjectFile = (projectId: number, fileId: number) => {
        setProjects(prev => prev.map(p => {
            if (p.id === projectId) {
                return { ...p, files: (p.files || []).filter(f => f.id !== fileId) };
            }
            return p;
        }));
    };

    const assignProject = (projectId: number, assignedTo: string) => {
        setProjects(prev => prev.map(p => {
            if (p.id === projectId) {
                const currentUsers = p.assignedUsers || (p.assignedTo !== 'Unassigned' ? [p.assignedTo] : []);
                const updatedUsers = Array.from(new Set([...currentUsers, assignedTo]));
                return { 
                    ...p, 
                    status: 'in progress', 
                    assignedTo: updatedUsers.join(', '), 
                    assignedUsers: updatedUsers,
                    progress: p.progress || 0 
                };
            }
            return p;
        }));
    };

    return (
        <ProjectContext.Provider value={{ 
            projects, 
            categories, 
            addProject, 
            updateProject, 
            deleteProject, 
            addCategory, 
            addProjectUpdate, 
            addProjectFile,
            removeProjectFile,
            assignProject 
        }}>
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
