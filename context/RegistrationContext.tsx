"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface RegistrationRequest {
    id: number;
    type: 'freelancer' | 'agency';
    name: string;
    email: string;
    phone: string;
    date: string;
    status: 'Pending' | 'Approved' | 'Rejected';
    details: any;
}

interface RegistrationContextType {
    registrations: RegistrationRequest[];
    addRegistration: (registration: Omit<RegistrationRequest, 'id' | 'status' | 'date'>) => void;
    updateRegistrationStatus: (id: number, status: RegistrationRequest['status']) => void;
}

const RegistrationContext = createContext<RegistrationContextType | undefined>(undefined);

export function RegistrationProvider({ children }: { children: React.ReactNode }) {
    const [registrations, setRegistrations] = useState<RegistrationRequest[]>([]);
    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
        const savedRegs = localStorage.getItem('app_registrations');
        if (savedRegs) setRegistrations(JSON.parse(savedRegs));
        setHasLoaded(true);
    }, []);

    useEffect(() => {
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'app_registrations' && e.newValue) {
                setRegistrations(JSON.parse(e.newValue));
            }
        };
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    useEffect(() => {
        if (hasLoaded) {
            localStorage.setItem('app_registrations', JSON.stringify(registrations));
        }
    }, [registrations, hasLoaded]);

    const addRegistration = (regData: Omit<RegistrationRequest, 'id' | 'status' | 'date'>) => {
        const newReg: RegistrationRequest = {
            ...regData,
            id: Math.max(0, ...registrations.map(r => r.id)) + 1,
            status: 'Pending',
            date: new Date().toISOString().split('T')[0]
        };
        setRegistrations(prev => [newReg, ...prev]);
    };

    const updateRegistrationStatus = (id: number, status: RegistrationRequest['status']) => {
        setRegistrations(regs => regs.map(r => r.id === id ? { ...r, status } : r));
    };

    return (
        <RegistrationContext.Provider value={{ registrations, addRegistration, updateRegistrationStatus }}>
            {children}
        </RegistrationContext.Provider>
    );
}

export function useRegistration() {
    const context = useContext(RegistrationContext);
    if (context === undefined) {
        throw new Error('useRegistration must be used within a RegistrationProvider');
    }
    return context;
}
