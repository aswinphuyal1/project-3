// RecommendedForYou.tsx
"use client";
import React, { useMemo } from "react";
import { useRouter } from "next/navigation";
import { Brain, Atom, FlaskConical, Code, Heart, FileText, Image as ImageIcon } from "lucide-react";
import { useNotes } from "../context/NoteContext";

// Helper to assign random but consistent colors/icons for dynamic notes
const getRandomStyle = (id: string, index: number) => {
  const icons = [Brain, Atom, FlaskConical, Code, Heart, FileText, ImageIcon];
  const colors = [
    "bg-gradient-to-br from-purple-500 to-pink-500",
    "bg-gradient-to-br from-indigo-500 to-blue-500",
    "bg-gradient-to-br from-orange-500 to-red-500",
    "bg-gradient-to-br from-green-500 to-emerald-500",
    "bg-gradient-to-br from-gray-700 to-gray-900"
  ];
  // Simple hash to pick consistent style for same ID
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  const safeHash = Math.abs(hash);

  return {
    icon: icons[safeHash % icons.length],
    color: colors[safeHash % colors.length]
  };
};

const RecommendedForYou: React.FC = () => {
  const router = useRouter();
  const { notes, loading } = useNotes();

  // Fisher-Yates (Knuth) Shuffle Algorithm
  const shuffleArray = <T extends any[]>(array: T): T => {
    const shuffledArray = [...array] as T;
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  // Shuffle the notes and display a maximum of 4
  const shuffledNotes = useMemo(() => {
    if (!notes || notes.length === 0) return [];
    return shuffleArray(notes).slice(0, 4);
  }, [notes]);

  if (loading) return null; // Or a skeleton if desired, but user said "do not change ui" so maybe just empty or null while loading is safer for layout stability

  if (shuffledNotes.length === 0) {
    // Fallback to static if no notes? Or just show nothing/message. 
    // User asking for "file that are uploaded", so if 0 uploaded, 0 shown.
    return (
      <div className="rounded-xl p-6 w-full max-w-4xl border border-[#F5E7C6] shadow-md">
        <h2 className="text-xl font-bold text-[#222222]">No recommended notes yet.</h2>
      </div>
    );
  }

  return (
    <div className="rounded-xl p-4 sm:p-6 w-full max-w-full md:max-w-4xl border border-[#F5E7C6] shadow-md">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-2">
        <h2 className="text-xl sm:text-2xl font-bold text-[#222222]">
          Recommended for You
        </h2>
        <button
          onClick={() => router.push("/notes/recommended")}
          className="text-[#FF6D1F] font-semibold text-base sm:text-lg hover:text-[#E05E1A] transition-colors"
        >
          View All
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {shuffledNotes.map((note, index) => {
          const style = getRandomStyle(note._id, index);
          const Icon = style.icon;

          return (
            // Card Item
            <div
              key={note._id}
              onClick={() => router.push(`/notes/${note._id}`)}
              className="group bg-white rounded-xl border border-[#F5E7C6] overflow-hidden 
                         hover:border-[#FF6D1F] transition-all duration-300 cursor-pointer 
                         shadow-sm hover:shadow-lg"
            >
              {/* Icon Placeholder Area (Smaller Icon) */}
              <div
                className={`relative w-full h-32 overflow-hidden flex items-center justify-center ${style.color}`}
              >
                <Icon
                  // Icon size: w-12 h-12
                  className="w-12 h-12 text-white transition-transform duration-500 
                               group-hover:scale-[1.15] opacity-80 group-hover:opacity-100"
                  strokeWidth={1.5}
                />
                {/* Subtle hover overlay using #FF6D1F */}
                <div className="absolute inset-0 bg-[#FF6D1F]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Content Area */}
              <div className="p-3">
                {/* Title (PDF Name) - Only content displayed here */}
                <h3 className="font-semibold text-base text-[#222222] transition-colors line-clamp-2">
                  {note.title}
                </h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecommendedForYou;
