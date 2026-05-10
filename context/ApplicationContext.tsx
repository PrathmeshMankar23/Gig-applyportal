"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Message {
    id: number;
    sender: string;
    senderRole?: string;
    content: string;
    timestamp: string;
}

export interface ProjectFile {
    id: number;
    name: string;
    sender: string;
    senderRole?: string;
    url: string;
    timestamp: string;
}

export interface Application {
    id: number;
    projectId: number;
    projectTitle: string;
    applicantName: string;
    applicantRole: 'freelancer' | 'agency';
    email: string;
    phone?: string;
    portfolioUrl?: string;
    portfolioPdf?: string | null;
    portfolioPdfData?: string | null;
    experience?: string;
    budget: string;
    duration: string;
    coverLetter: string;
    status: 'Pending' | 'Selected' | 'Rejected';
    appliedDate: string;
    profileId: string;
    messages: Message[];
    files: ProjectFile[];
}

export interface Notification {
    id: number;
    applicationId: number;
    projectTitle: string;
    title: string;
    message: string;
    time: string;
    type: 'comment' | 'file' | 'status' | 'application';
    read: boolean;
}

interface ApplicationContextType {
    applications: Application[];
    notifications: Notification[];
    addApplication: (application: Omit<Application, 'id' | 'status' | 'appliedDate' | 'messages' | 'files'>) => void;
    updateApplicationStatus: (id: number, status: Application['status']) => void;
    addComment: (applicationId: number, sender: string, senderRole: string, content: string) => void;
    uploadFile: (applicationId: number, name: string, sender: string, senderRole: string, url: string) => void;
    markAsRead: (notificationId: number) => void;
}

const ApplicationContext = createContext<ApplicationContextType | undefined>(undefined);

export function ApplicationProvider({ children }: { children: React.ReactNode }) {
    const [applications, setApplications] = useState<Application[]>([
        {
            id: 1,
            projectId: 1,
            projectTitle: "E-commerce Website Redesign",
            applicantName: "Sarah Johnson",
            applicantRole: "freelancer",
            email: "sarah.j@email.com",
            budget: "14500",
            duration: "5 weeks",
            coverLetter: "I have extensive experience with React and modern UI/UX design. I've built similar e-commerce platforms before.",
            status: "Pending",
            appliedDate: "2026-05-01",
            profileId: "sarah",
            messages: [],
            files: []
        },
        {
            id: 2,
            projectId: 2,
            projectTitle: "Mobile App Development",
            applicantName: "Creative Studios Inc.",
            applicantRole: "agency",
            email: "contact@creativestudios.com",
            budget: "24000",
            duration: "8 weeks",
            coverLetter: "Our agency specializing in cross-platform mobile apps. We have a team of 3 developers ready to start.",
            status: "Selected",
            appliedDate: "2026-05-02",
            profileId: "creative",
            messages: [
                { id: 1, sender: "Admin", senderRole: "Admin", content: "We'd like to move forward with your proposal.", timestamp: "2026-05-03 10:00" }
            ],
            files: [
                { id: 1, name: "project_brief.pdf", sender: "Admin", senderRole: "Admin", url: "#", timestamp: "2026-05-03 10:05" }
            ]
        }
    ]);

    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [hasLoaded, setHasLoaded] = useState(false);

    // 1. Load from LocalStorage on Mount
    useEffect(() => {
        const savedApps = localStorage.getItem('app_applications');
        const savedNotifs = localStorage.getItem('app_notifications');
        if (savedApps) setApplications(JSON.parse(savedApps));
        if (savedNotifs) setNotifications(JSON.parse(savedNotifs));
        setHasLoaded(true);
    }, []);

    // 1.5 Listen for Cross-Tab Changes
    useEffect(() => {
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'app_applications' && e.newValue) {
                setApplications(JSON.parse(e.newValue));
            }
            if (e.key === 'app_notifications' && e.newValue) {
                setNotifications(JSON.parse(e.newValue));
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    // 2. Save to LocalStorage on Change (ONLY after initial load)
    useEffect(() => {
        if (hasLoaded) {
            localStorage.setItem('app_applications', JSON.stringify(applications));
            localStorage.setItem('app_notifications', JSON.stringify(notifications));
        }
    }, [applications, notifications, hasLoaded]);

    const createNotification = (applicationId: number, projectTitle: string, title: string, message: string, type: Notification['type']) => {
        const newNotif: Notification = {
            id: Date.now() + Math.random(),
            applicationId,
            projectTitle,
            title,
            message,
            time: "Just now",
            type,
            read: false
        };
        setNotifications(prev => [newNotif, ...prev]);
    };

    const addApplication = (appData: Omit<Application, 'id' | 'status' | 'appliedDate' | 'messages' | 'files'>) => {
        const newApp: Application = {
            ...appData,
            id: Math.max(0, ...applications.map(a => a.id)) + 1,
            status: 'Pending',
            appliedDate: new Date().toISOString().split('T')[0],
            messages: [],
            files: []
        };
        setApplications(prev => [...prev, newApp]);
        createNotification(newApp.id, newApp.projectTitle, "New Application", `${newApp.applicantName} applied for ${newApp.projectTitle}`, 'application');
    };

    const updateApplicationStatus = (id: number, status: Application['status']) => {
        const app = applications.find(a => a.id === id);
        if (!app) return;

        setApplications(apps => apps.map(a => a.id === id ? { ...a, status } : a));
        createNotification(app.id, app.projectTitle, `Status Updated: ${status}`, `Application for ${app.projectTitle} is now ${status}`, 'status');
    };

    const addComment = (applicationId: number, sender: string, senderRole: string, content: string) => {
        const app = applications.find(a => a.id === applicationId);
        if (!app) return;

        const newMessage: Message = {
            id: Date.now(),
            sender,
            senderRole,
            content,
            timestamp: new Date().toLocaleString()
        };

        setApplications(apps => apps.map(a => 
            a.id === applicationId ? { ...a, messages: [...a.messages, newMessage] } : a
        ));
        createNotification(app.id, app.projectTitle, `New Message: ${sender} (${senderRole})`, content.substring(0, 50) + (content.length > 50 ? '...' : ''), 'comment');
    };

    const uploadFile = (applicationId: number, name: string, sender: string, senderRole: string, url: string) => {
        const app = applications.find(a => a.id === applicationId);
        if (!app) return;

        const newFile: ProjectFile = {
            id: Date.now(),
            name,
            sender,
            senderRole,
            url,
            timestamp: new Date().toLocaleString()
        };

        setApplications(apps => apps.map(a => 
            a.id === applicationId ? { ...a, files: [...a.files, newFile] } : a
        ));
        createNotification(app.id, app.projectTitle, "File Uploaded", `New file: ${name} by ${sender} (${senderRole})`, 'file');
    };

    const markAsRead = (notificationId: number) => {
        setNotifications(prev => prev.map(n => n.id === notificationId ? { ...n, read: true } : n));
    };

    return (
        <ApplicationContext.Provider value={{ applications, notifications, addApplication, updateApplicationStatus, addComment, uploadFile, markAsRead }}>
            {children}
        </ApplicationContext.Provider>
    );
}

export function useApplications() {
    const context = useContext(ApplicationContext);
    if (context === undefined) {
        throw new Error('useApplications must be used within an ApplicationProvider');
    }
    return context;
}
