"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

// Types
interface User {
    _id: string;
    name: string;
    email: string;
    provider: string;
    createdAt: string;
}

interface Note {
    _id: string;
    title: string;
    description: string;
    subject: string;
    fileUrl: string;
    createdAt: string;
    userId: string;
}

interface AdminContextType {
    token: string | null;
    users: User[];
    notes: Note[];
    login: (email: string, pass: string) => Promise<boolean>;
    logout: () => void;
    fetchUsers: () => Promise<void>;
    fetchNotes: () => Promise<void>;
    deleteUser: (id: string) => Promise<boolean>;
    deleteNote: (id: string) => Promise<boolean>;
    loading: boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);
    const [users, setUsers] = useState<User[]>([]);
    const [notes, setNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // ENV var check. Admin usually runs on different port, but backend is same.
    // We assume NEXT_PUBLIC_BACKEND_URL is set in admin/.env
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

    useEffect(() => {
        const storedToken = localStorage.getItem("admin_token");
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    const login = async (email: string, pass: string) => {
        setLoading(true);
        try {
            const { data } = await axios.post(`${BACKEND_URL}/api/user/admin`, {
                email,
                password: pass,
            });
            if (data.success) {
                setToken(data.token);
                localStorage.setItem("admin_token", data.token);
                return true;
            }
            return false;
        } catch (error) {
            console.error(error);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem("admin_token");
        router.push("/");
    };

    const fetchUsers = async () => {
        if (!token) return;
        try {
            const { data } = await axios.get(`${BACKEND_URL}/api/user/list`, {
                headers: { token }
            });
            if (data.success) {
                setUsers(data.users);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const fetchNotes = async () => {
        if (!token) return;
        try {
            const { data } = await axios.get(`${BACKEND_URL}/api/notes/admin/list`, {
                headers: { token }
            });
            if (data.success) {
                setNotes(data.notes);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const deleteUser = async (id: string) => {
        if (!token) return false;
        // Confirm?
        try {
            const { data } = await axios.delete(`${BACKEND_URL}/api/user/admin/delete/${id}`, {
                headers: { token }
            });
            if (data.success) {
                setUsers(prev => prev.filter(u => u._id !== id));
                return true;
            }
            return false;
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    const deleteNote = async (id: string) => {
        if (!token) return false;
        try {
            const { data } = await axios.delete(`${BACKEND_URL}/api/notes/admin/delete/${id}`, {
                headers: { token }
            });
            if (data.success) {
                setNotes(prev => prev.filter(n => n._id !== id));
                return true;
            }
            return false;
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    return (
        <AdminContext.Provider
            value={{
                token,
                users,
                notes,
                login,
                logout,
                fetchUsers,
                fetchNotes,
                deleteUser,
                deleteNote,
                loading
            }}
        >
            {children}
        </AdminContext.Provider>
    );
};

export const useAdmin = () => {
    const context = useContext(AdminContext);
    if (!context) throw new Error("useAdmin must be used within AdminProvider");
    return context;
};
