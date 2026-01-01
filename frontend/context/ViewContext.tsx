"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import axios from "axios";

// Context Shape
interface ViewContextType {
    incrementView: (noteId: string) => Promise<boolean>;
}

const ViewContext = createContext<ViewContextType | undefined>(undefined);

export const ViewProvider = ({ children }: { children: ReactNode }) => {

    // We assume NEXT_PUBLIC_BACKEND_URL is set
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

    const incrementView = async (noteId: string) => {
        try {
            const { data } = await axios.put(`${BACKEND_URL}/api/notes/view/${noteId}`);
            if (data.success) {
                return true;
            }
            return false;
        } catch (error) {
            console.error("Error incrementing view:", error);
            return false;
        }
    };

    return (
        <ViewContext.Provider value={{ incrementView }}>
            {children}
        </ViewContext.Provider>
    );
};

export const useView = () => {
    const context = useContext(ViewContext);
    if (!context) throw new Error("useView must be used within ViewProvider");
    return context;
};
