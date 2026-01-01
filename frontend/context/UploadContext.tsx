"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import axios from "axios";
import { useAuth } from "./Authcontext";

type UploadContextType = {
    title: string;
    description: string;
    subject: string;
    semester: string;
    selectedFile: File | null;
    previewUrl: string | null;
    isLoading: boolean;
    setTitle: (value: string) => void;
    setDescription: (value: string) => void;
    setSubject: (value: string) => void;
    setSemester: (value: string) => void;
    handleFileChange: (file: File | null) => void;
    uploadNote: () => Promise<{ success: boolean; message: string }>;
    resetForm: () => void;
};

const UploadContext = createContext<UploadContextType | undefined>(undefined);

export const UploadProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subject, setSubject] = useState("");
  const [semester, setSemester] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const BACKEND_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

  const handleFileChange = (file: File | null) => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl); // Clean up previous preview URL to prevent memory leaks
    }

    if (file) {
      setSelectedFile(file); // Store the selected file
      if (file.type.startsWith("image/")) {
        // Check if file is an image
        setPreviewUrl(URL.createObjectURL(file)); // Create preview URL for images
      } else {
        setPreviewUrl(null); // No preview for non-image files
      }
    } else {
      setSelectedFile(null); // Clear file selection
      setPreviewUrl(null); // Clear preview
    }
  };
  const resetForm = () => {
    setTitle("");
    setDescription("");
    setSubject("");
    setSemester("");
    handleFileChange(null);
  };
  //Upload Function (Core Logic)
  const uploadNote = async () => {
    if (!selectedFile) {
      return { success: false, message: "Please select a file to upload." };
    }

    setIsLoading(true);
    try {
      const formData = new FormData(); // Create FormData for multipart upload
      formData.append("title", title);
      formData.append("description", description);
      formData.append("subject", subject);
      formData.append("semester", semester);
      formData.append("file", selectedFile);
      if (user?.id) {
        formData.append("userId", user.id);
      }

      const response = await axios.post(
        `${BACKEND_URL}/api/notes/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        resetForm();
        return { success: true, message: "Note uploaded successfully!" };
      } else {
        return {
          success: false,
          message: response.data.message || "Upload failed.",
        };
      }
    } catch (error: any) {
      console.error("Upload error:", error);
      return {
        success: false,
        message:
          error.response?.data?.message ||
          error.message ||
          "An error occurred during upload.",
      };
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <UploadContext.Provider
      value={{
        title,
        description,
        subject,
        semester,
        selectedFile,
        previewUrl,
        isLoading,
        setTitle,
        setDescription,
        setSubject,
        setSemester,
        handleFileChange,
        uploadNote,
        resetForm,
      }}
    >
      {children}
    </UploadContext.Provider>
  );
};

export const useUpload = () => {
    const context = useContext(UploadContext);
    if (!context) {
        throw new Error("useUpload must be used within an UploadProvider");
    }
    return context;
};
