"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { FaFilePdf, FaImage } from "react-icons/fa";

type ContentItem = {
  id: number;
  title: string;
  type: "pdf" | "image";
};

// Sample data with unique IDs
const content: ContentItem[] = [
  { id: 1, title: "Calculus III Notes", type: "pdf" },
  { id: 2, title: "History of AI", type: "image" },
  { id: 3, title: "Quantum Physics", type: "pdf" },
  { id: 4, title: "Modern Art", type: "image" },
  { id: 5, title: "Linear Algebra", type: "pdf" },
  { id: 6, title: "World War II", type: "pdf" },
  { id: 7, title: "Biology Lab", type: "image" },
  { id: 8, title: "Macroeconomics", type: "pdf" },
  { id: 9, title: "Neural Networks", type: "image" },
  { id: 10, title: "Poetry Anthology", type: "pdf" },
  { id: 11, title: "Chem Equations", type: "pdf" },
  { id: 12, title: "UI/UX Design", type: "image" },
];

const Recommended = () => {
  const router = useRouter();

  // Function to handle unique navigation
  const handleNavigate = (id: number) => {
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
          {content.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col bg-white transition-all duration-300"
            >
              {/* Thumbnail Area - Clicking this box navigates */}
              <div
                onClick={() => handleNavigate(item.id)}
                className="relative aspect-[4/3] bg-slate-50 rounded-[2rem] overflow-hidden flex items-center justify-center border border-slate-100 shadow-sm group-hover:shadow-md transition-shadow cursor-pointer"
              >
                {/* Centered Icon Button */}
                <div
                  className={`z-10 flex items-center justify-center w-16 h-16 rounded-2xl shadow-lg transform group-hover:scale-110 transition-all duration-300 ${
                    item.type === "pdf"
                      ? "bg-blue-600 text-white"
                      : "bg-green-500 text-white"
                  }`}
                >
                  {item.type === "pdf" ? (
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
                  onClick={() => handleNavigate(item.id)}
                >
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recommended;
