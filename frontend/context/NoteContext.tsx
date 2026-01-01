"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import axios from "axios";
import { useAuth } from "./Authcontext";

export interface Note {
    _id: string;
    title: string;
    description: string;
    subject: string;
    semester: string;
    fileUrl: string;
    fileType: string;
    fileName: string;
    views?: number;
    createdAt: string;
}

type NoteContextType = {
    notes: Note[];
    userNotes: Note[]; // Notes uploaded by the current user
    loading: boolean;
    fetchAllNotes: () => Promise<void>;
    fetchNoteById: (id: string) => Promise<Note | null | any>;
    fetchUserNotes: (userId: string) => Promise<void>;
    deleteNote: (noteId: string) => Promise<boolean>;
    totalUserViews: number;
};

const NoteContext = createContext<NoteContextType | undefined>(undefined);

export const NoteProvider = ({ children }: { children: ReactNode }) => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

    const { token } = useAuth(); // Get token from AuthContext

    const fetchAllNotes = useCallback(async () => {
        if (!token) return; // Don't fetch if no token
        setLoading(true);
        try {
            const response = await axios.get(`${BACKEND_URL}/api/notes/list`, {
                headers: { token }
            });
            if (response.data.success) {
                setNotes(response.data.notes);
            }
        } catch (error) {
            console.error("Error fetching notes:", error);
        } finally {
            setLoading(false);
        }
    }, [token]);

    const fetchNoteById = useCallback(async (id: string) => {
        try {
            // Check if token is needed for this one, usually safer to include if user is logged in
            const headers = token ? { token } : {};
            const response = await axios.get(`${BACKEND_URL}/api/notes/${id}`, { headers });
            if (response.data.success) {
                return response.data.note;
            }
            return null;
        } catch (error) {
            console.error("Error fetching note:", error);
            return null;
        }
    }, [token]);

    const [userNotes, setUserNotes] = useState<Note[]>([]);

    const fetchUserNotes = useCallback(async (userId: string) => {
        if (!token) return;
        try {
            const response = await axios.get(`${BACKEND_URL}/api/notes/user/${userId}`, {
                headers: { token }
            });
            if (response.data.success) {
                setUserNotes(response.data.notes);
            }
        } catch (error) {
            console.error("Error fetching user notes:", error);
        }
    }, [token]);

    const deleteNote = useCallback(async (noteId: string) => {
        if (!token) return false;
        try {
            const response = await axios.delete(`${BACKEND_URL}/api/notes/delete/${noteId}`, {
                headers: { token }
            });
            if (response.data.success) {
                setUserNotes(prev => prev.filter(note => note._id !== noteId));
                setNotes(prev => prev.filter(note => note._id !== noteId)); // Also remove from main list
                return true;
            }
            return false;
        } catch (error) {
            console.error("Error deleting note:", error);
            return false;
        }
    }, [token]);

    useEffect(() => {
        if (token) {
            fetchAllNotes();
        }
    }, [token]);

    const totalUserViews = userNotes.reduce((acc, note) => acc + (note.views || 0), 0);

    return (
        <NoteContext.Provider value={{ notes, userNotes, loading, fetchAllNotes, fetchNoteById, fetchUserNotes, deleteNote, totalUserViews }}>
            {children}
        </NoteContext.Provider>
    );
};

export const useNotes = () => {
    const context = useContext(NoteContext);
    if (!context) {
        throw new Error("useNotes must be used within a NoteProvider");
    }
    return context;
};
