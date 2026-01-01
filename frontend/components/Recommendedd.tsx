"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { FaFilePdf, FaImage } from "react-icons/fa";
import { useNotes } from "../context/NoteContext";

const Recommended = () => {
  const router = useRouter();
  const { notes, loading } = useNotes();

  // Function to handle unique navigation
  const handleNavigate = (id: string) => {
    router.push(`/notes/${id}`);
  };

  return (
    <div className="bg-white min-h-screen w-full px-6 py-10 lg:px-16">
      <div className="max-w-[1400px] mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-slate-800 tracking-tight">
              Recommended for You
            </h2>
            <div className="h-1.5 w-16 bg-orange-500 mt-2 rounded-full" />
          </div>
          <button className="text-blue-600 font-bold hover:text-blue-700 transition-colors text-sm">
            View All
          </button>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-10">
          {notes.map((item) => {
            const isPdf = item.fileType?.includes("pdf") || !item.fileType?.includes("image");
            return (
              <div
                key={item._id}
                className="group flex flex-col bg-white transition-all duration-300"
              >
                {/* Thumbnail Area - Clicking this box navigates */}
                <div
                  onClick={() => handleNavigate(item._id)}
                  className="relative aspect-[4/3] bg-slate-50 rounded-[2rem] overflow-hidden flex items-center justify-center border border-slate-100 shadow-sm group-hover:shadow-md transition-shadow cursor-pointer"
                >
                  {/* Centered Icon Button */}
                  <div
                    className={`z-10 flex items-center justify-center w-16 h-16 rounded-2xl shadow-lg transform group-hover:scale-110 transition-all duration-300 ${isPdf
                        ? "bg-blue-600 text-white"
                        : "bg-green-500 text-white"
                      }`}
                  >
                    {isPdf ? (
                      <div className="flex flex-col items-center">
                        <FaFilePdf size={22} />
                        <span className="text-[10px] font-black mt-1 tracking-tighter">
                          PDF
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <FaImage size={24} />
                        <span className="text-[10px] font-black mt-1 tracking-tighter">
                          IMG
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Title Section - Clicking this also navigates */}
                <div className="mt-4 px-1">
                  <h3
                    className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors cursor-pointer line-clamp-2"
                    onClick={() => handleNavigate(item._id)}
                  >
                    {item.title}
                  </h3>
                </div>
              </div>
            );
          })}
          {notes.length === 0 && !loading && (
            <div className="col-span-full py-10 text-center text-slate-500">
              No notes uploaded yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Recommended;
