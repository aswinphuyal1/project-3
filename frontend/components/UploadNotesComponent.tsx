"use client";

import React, { useRef } from "react";
import { Upload, LayoutGrid, FileText, Plus, Check, X } from "lucide-react";
import { useUpload } from "../context/UploadContext";

import { useAuth } from "../context/Authcontext";
import { useNotes } from "../context/NoteContext";
import { useEffect } from "react";

/**
 * UploadNotesComponent - Optimized for Next.js
 * Removed Chevron arrows from Title & Description.
 * Palette: #FAF3E1, #F5E7C6, #FF6D1F, #222222
 */

const FormInput = ({
  value,
  onChange,
  placeholder,
  icon: Icon,
  label,
  id,
  required = false,
}: {
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
  icon?: any;
  label: string;
  id: string;
  required?: boolean;
}) => (
  <div className="w-full space-y-1.5">
    <div className="flex justify-between items-center ml-1">
      <label htmlFor={id} className="text-sm font-bold text-[#222222]">
        {label} {required && <span className="text-[#FF6D1F]">*</span>}
      </label>
      {!required && (
        <span className="text-[10px] uppercase tracking-wider text-[#222222]/40 font-bold">
          Optional
        </span>
      )}
    </div>
    <div className="relative">
      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-required={required}
        className="w-full bg-[#FAF3E1] border-2 border-transparent rounded-xl py-3 px-4 text-[#222222] placeholder-[#222222]/30 focus:outline-none focus:border-[#FF6D1F]/30 transition-all"
      />
      {Icon && (
        <Icon
          className="absolute right-4 top-3.5 text-[#222222]/30 w-5 h-5"
          aria-hidden="true"
        />
      )}
    </div>
  </div>
);

export default function UploadNotesComponent() {

  
  const {
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
  } = useUpload();

  const { user } = useAuth();
  const { userNotes, fetchUserNotes, deleteNote } = useNotes();

  useEffect(() => {
    if (user?.id) {
      fetchUserNotes(user.id);
    }
  }, [user?.id]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    handleFileChange(file || null);
  };

  const handlePublish = async () => {
    const result = await uploadNote();
    if (result.success) {
      alert("Success: " + result.message);
    } else {
      alert("Error: " + result.message);
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
  };

  return (
    <main className="min-h-screen bg-[#FAF3E1]/30 flex items-center justify-center p-4 md:p-10 font-sans">
      <div className="bg-white w-full max-w-5xl rounded-[3rem] shadow-2xl shadow-[#222222]/5 p-8 md:p-16">
        <input
          id="note-file-upload"
          type="file"
          ref={fileInputRef}
          onChange={onFileChange}
          className="hidden"
          accept=".pdf,.docx,.png,.jpg,.jpeg"
          aria-label="Upload note file"
        />

        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-[#222222] tracking-tight">
            Upload New Notes
          </h1>
          <h2 className="text-2xl font-semibold text-[#222222]/40 mt-2">
            Mathematics
          </h2>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column */}
          <div className="flex flex-col h-full">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              aria-label="Click to browse and upload files"
              className="flex-1 min-h-[300px] border-2 border-dashed border-[#222222]/10 rounded-[2.5rem] flex flex-col items-center justify-center bg-white hover:border-[#FF6D1F] group cursor-pointer transition-all mb-8 w-full"
            >
              <div className="bg-[#FF6D1F] p-6 rounded-2xl mb-6 shadow-xl shadow-[#FF6D1F]/20 group-hover:scale-110 transition-transform">
                <Upload className="text-white w-10 h-10" aria-hidden="true" />
              </div>
              <p className="text-[#222222] text-xl font-bold text-center leading-tight px-6">
                {selectedFile ? "Ready to switch?" : "Drag & Drop your files"}
                <br />
                <span className="text-[#FF6D1F] underline underline-offset-8">
                  Browse files
                </span>
              </p>
            </button>

            <div className="space-y-4 mb-10">
              <div className="flex items-center gap-3 text-sm font-bold text-[#222222]/50">
                <Check
                  className="w-5 h-5 text-[#FF6D1F]"
                  strokeWidth={3}
                  aria-hidden="true"
                />
                <span>PDF, DOCX, PNG, JPG</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-bold text-[#222222]/50">
                <div
                  className="w-2 h-2 bg-[#FF6D1F] rounded-full animate-pulse"
                  aria-hidden="true"
                />
                <span>Max size: 10MB</span>
              </div>
            </div>

            <button
              disabled={!selectedFile || isLoading}
              onClick={handlePublish}
              className="w-full bg-[#FF6D1F] text-white py-5 rounded-[1.25rem] font-black text-xl hover:shadow-2xl hover:shadow-[#FF6D1F]/30 active:scale-95 transition-all disabled:opacity-30 disabled:grayscale flex items-center justify-center gap-2"
            >
              {isLoading ? "Uploading..." : "Publish Notes"}
            </button>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-3 border-b-2 border-[#FAF3E1]">
              <div
                className="w-2 h-6 bg-[#FF6D1F] rounded-full"
                aria-hidden="true"
              />
              <h3 className="text-xl font-black text-[#222222]">
                Note Details
              </h3>
            </div>

            <div className="space-y-5">
              <FormInput
                id="note-title"
                label="Title"
                placeholder="Enter title"
                required
                value={title}
                onChange={setTitle}
              />
              <FormInput
                id="note-desc"
                label="Description"
                placeholder="Short summary"
                required
                value={description}
                onChange={setDescription}
              />

              <FormInput
                id="note-subject"
                label="Subject"
                placeholder="e.g. Algebra"
                icon={LayoutGrid}
                value={subject}
                onChange={setSubject}
              />
              <FormInput
                id="note-semester"
                label="Semester"
                placeholder="e.g. Semester 2"
                icon={LayoutGrid}
                value={semester}
                onChange={setSemester}
              />
            </div>

            <div className="bg-[#FAF3E1] rounded-2xl px-6 py-4 flex justify-between items-center">
              <span className="text-[#222222]/40 font-bold text-sm">
                Actual File Size
              </span>
              <span className="text-[#222222] font-black text-lg">
                {selectedFile ? formatFileSize(selectedFile.size) : "0.0 KB"}
              </span>
            </div>

            {selectedFile && (
              <div className="bg-[#F5E7C6]/40 border-2 border-[#F5E7C6] rounded-[2rem] p-5 flex items-center justify-between group">
                <div className="flex items-center gap-4 truncate">
                  <div className="w-16 h-16 bg-white rounded-2xl flex-shrink-0 flex items-center justify-center overflow-hidden shadow-sm">
                    {previewUrl ? (
                      <img
                        src={previewUrl}
                        alt="File Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FileText
                        className="text-[#FF6D1F] w-8 h-8"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                  <div className="truncate">
                    <p className="text-[10px] text-[#FF6D1F] font-black tracking-widest uppercase">
                      File Preview
                    </p>
                    <p className="text-sm font-bold text-[#222222] truncate">
                      {selectedFile.name}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleFileChange(null)}
                  aria-label="Remove selected file"
                  title="Remove selected file"
                  className="p-3 bg-white rounded-xl hover:bg-red-50 text-[#222222]/20 hover:text-red-500 transition-all shadow-sm"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 text-[#222222]/30 font-black text-xs hover:text-[#FF6D1F] transition-all"
            >
              <Plus
                className="w-5 h-5 p-1 bg-[#222222]/5 rounded-full"
                strokeWidth={4}
                aria-hidden="true"
              />
              {selectedFile ? "CHANGE FILE" : "ADD PREVIEW"}
            </button>
          </div>
        </div>

        {/* Recent Uploads Section */}
        <div className="mt-20 border-t-2 border-[#FAF3E1] pt-10">
          <h3 className="text-3xl font-black text-[#222222] mb-8">Your Recent Uploads</h3>

          {userNotes.length === 0 ? (
            <p className="text-[#222222]/40 font-bold">No uploads yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userNotes.map((note) => (
                <div key={note._id} className="bg-[#FAF3E1]/30 border-2 border-[#FAF3E1] rounded-2xl p-5 flex flex-col justify-between group hover:border-[#FF6D1F]/30 transition-all">
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <div className="p-3 bg-white rounded-xl shadow-sm">
                        <FileText className="text-[#FF6D1F] w-6 h-6" />
                      </div>
                      <button
                        onClick={async (e) => {
                          e.stopPropagation();
                          if (window.confirm("Are you sure you want to delete this note?")) {
                            await deleteNote(note._id);
                          }
                        }}
                        className="text-red-300 hover:text-red-500 transition-colors p-2"
                        title="Delete Note"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <h4 className="font-bold text-[#222222] text-lg leading-tight mb-1 line-clamp-1">{note.title}</h4>
                    <p className="text-[#222222]/50 text-xs font-bold uppercase tracking-wider">{note.subject}</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-[#222222]/5 flex justify-between items-center">
                    <span className="text-xs font-bold text-[#222222]/30">
                      {new Date(note.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </main>
  );
}
