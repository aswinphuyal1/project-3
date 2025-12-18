"use client";

import React, { useState } from "react";
import { FaFilePdf, FaImage, FaTimes } from "react-icons/fa";

// --- Types ---
interface NotePreviewProps {
  title?: string;
  category?: string;
  subtitle?: string;
  description?: string;
  fileUrl?: string;
  fileType?: "pdf" | "image";
}

/**
 * NotePreviewCard Component
 * Features: PDF/Image detection, Full-screen preview modal,
 * Border style matching UploaderCard.
 */
const NotePreviewCard: React.FC<NotePreviewProps> = ({
  title = "Calculus III Notes",
  category = "Mathematics",
  subtitle = "Detailed III Study Guide",
  description = "Transcription the provided notes and clinical study for math. Created for students looking for help in their study goals.",
  fileUrl = "https",
  fileType = "pdf",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // --- Modal Component ---
  const PreviewModal = () => (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#222222]/95 backdrop-blur-sm p-4 md:p-10">
      <button
        onClick={() => setIsOpen(false)}
        className="absolute top-6 right-6 text-white hover:text-[#FF6D1F] transition-colors p-2 bg-white/10 rounded-full"
      >
        <FaTimes size={28} />
      </button>

      <div className="w-full h-full max-w-6xl bg-white rounded-2xl overflow-hidden shadow-2xl">
        {fileType === "pdf" ? (
          <iframe src={fileUrl} className="w-full h-full" title="PDF Preview" />
        ) : (
          <div className="w-full h-full flex items-center justify-center p-4">
            <img
              src={fileUrl}
              alt="Full Preview"
              className="max-w-full max-h-full object-contain"
            />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="w-full bg-white p-4 md:p-8 flex justify-center items-center font-sans">
      {/* Modal Trigger */}
      {isOpen && <PreviewModal />}

      {/* Main Card */}
      <div className="w-full max-w-5xl bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-[#F5E7C6]/50">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-10">
          <div>
            <h2 className="text-[#222222] text-3xl md:text-4xl font-bold tracking-tight">
              {title} —
            </h2>
            <h2 className="text-[#222222]/30 text-3xl md:text-4xl font-bold tracking-tight">
              {category}
            </h2>
          </div>
          <button className="px-6 py-2 rounded-full border-2 border-[#222222] text-[#222222] hover:bg-[#222222] hover:text-white transition-all font-bold text-sm">
            View All
          </button>
        </div>

        {/* Content Section */}
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* File Preview Mockup */}
          <div className="w-full lg:w-[42%] shrink-0">
            <div
              onClick={() => setIsOpen(true)}
              className="group relative cursor-pointer bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-gray-100 transition-transform hover:scale-[1.02]"
            >
              {/* Browser Bar */}
              <div className="bg-[#222222] p-4 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#FF5F57]"></div>
                  <div className="w-2 h-2 rounded-full bg-[#FFBD2E]"></div>
                  <div className="w-2 h-2 rounded-full bg-[#27C93F]"></div>
                </div>
              </div>

              {/* Preview Content */}
              <div className="aspect-[3/4] bg-gray-50 flex flex-col items-center justify-center p-8 relative">
                {/* File Icon logic */}
                <div className="text-[#FF6D1F] transition-transform group-hover:scale-110 duration-300">
                  {fileType === "pdf" ? (
                    <FaFilePdf size={80} />
                  ) : (
                    <FaImage size={80} />
                  )}
                </div>

                <p className="mt-4 text-[#222222]/40 font-bold text-xs uppercase tracking-widest">
                  Click to preview {fileType}
                </p>

                {/* Internal Branding */}
                <div className="absolute bottom-6 left-6 flex items-center gap-2 opacity-20">
                  <div className="w-3 h-3 rounded-full bg-[#FF6D1F]"></div>
                  <span className="text-[10px] font-black tracking-tighter text-[#222222]">
                    KNOWLEDGE PLATFORM
                  </span>
                </div>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-[#FF6D1F]/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="bg-[#222222] text-white px-4 py-2 rounded-full text-xs font-bold">
                  Open Document
                </span>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="flex-1 flex flex-col pt-4">
            <div className="w-12 h-1 bg-[#FF6D1F] mb-6 rounded-full"></div>
            <h3 className="text-[#222222] text-2xl md:text-3xl font-bold mb-4 tracking-tight">
              {subtitle}
            </h3>
            <p className="text-[#222222]/60 leading-relaxed text-lg md:text-xl font-medium">
              {description}
            </p>

            <div className="mt-10 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100">
                <span className="text-[#FF6D1F] text-[10px] font-bold uppercase">
                  Edu
                </span>
              </div>
              <div className="text-[#222222]/40 text-sm font-bold tracking-wide uppercase italic">
                University of California for study guides.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotePreviewCard;
