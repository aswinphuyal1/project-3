"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

export interface Note {
    _id: string;
    title: string;
    description: string;
    subject: string;
    semester: string;
    fileUrl: string;
    fileType: string;
    fileName: string;
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
};

const NoteContext = createContext<NoteContextType | undefined>(undefined);

export const NoteProvider = ({ children }: { children: ReactNode }) => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

    const fetchAllNotes = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${BACKEND_URL}/api/notes/list`);
            if (response.data.success) {
                setNotes(response.data.notes);
            }
        } catch (error) {
            console.error("Error fetching notes:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchNoteById = async (id: string) => {
        try {
            const response = await axios.get(`${BACKEND_URL}/api/notes/${id}`);
            if (response.data.success) {
                return response.data.note;
            }
            return null;
        } catch (error) {
            console.error("Error fetching note:", error);
            return null;
        }
    };

    const [userNotes, setUserNotes] = useState<Note[]>([]);

    const fetchUserNotes = async (userId: string) => {
        try {
            const response = await axios.get(`${BACKEND_URL}/api/notes/user/${userId}`);
            if (response.data.success) {
                setUserNotes(response.data.notes);
            }
        } catch (error) {
            console.error("Error fetching user notes:", error);
        }
    };

    const deleteNote = async (noteId: string) => {
        try {
            const response = await axios.delete(`${BACKEND_URL}/api/notes/delete/${noteId}`);
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
    };

    useEffect(() => {
        fetchAllNotes();
    }, []);

    return (
        <NoteContext.Provider value={{ notes, userNotes, loading, fetchAllNotes, fetchNoteById, fetchUserNotes, deleteNote }}>
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
