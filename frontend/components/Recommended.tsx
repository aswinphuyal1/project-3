// RecommendedForYou.tsx
"use client";
import React, { useMemo } from "react";
import { useRouter } from "next/navigation";
import { Brain, Atom, FlaskConical, Code, Heart } from "lucide-react";

// 1. Data Structure (Minimal: only title, icon, and color)
interface RecommendedNote {
  id: number;
  title: string;
  icon: React.ElementType;
  color: string;
}

// Full list of notes, simplified further
const initialRecommendedNotes: RecommendedNote[] = [
  {
    id: 2,
    title: "History of AI: From Turing to Today",
    icon: Brain,
    color: "bg-gradient-to-br from-purple-500 to-pink-500",
  },
  {
    id: 3,
    title: "Quantum Physics Fundamentals",
    icon: Atom,
    color: "bg-gradient-to-br from-indigo-500 to-blue-500",
  },
  {
    id: 4,
    title: "Web Development Basics",
    icon: Code,
    color: "bg-gradient-to-br from-orange-500 to-red-500",
  },
  {
    id: 5,
    title: "Organic Chemistry Reactions",
    icon: FlaskConical,
    color: "bg-gradient-to-br from-green-500 to-emerald-500",
  },
  {
    id: 6,
    title: "Space Exploration Policy",
    icon: Heart,
    color: "bg-gradient-to-br from-gray-700 to-gray-900",
  },
];

const RecommendedForYou: React.FC = () => {
  const router = useRouter();

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
    return shuffleArray(initialRecommendedNotes).slice(0, 4);
  }, []);

  return (
    // Main container uses #FAF3E1
    <div className=" rounded-xl p-6 w-full max-w-4xl border border-[#F5E7C6] shadow-md">
      {/* Header with View All Link */}
      <div className="flex justify-between items-center mb-6">
        {/* Title uses #222222 */}
        <h2 className="text-2xl font-bold text-[#222222]">
          Recommended for You
        </h2>

        {/* View All link styled with the accent color #FF6D1F */}
        <button
          onClick={() => router.push("/notes/recommended")}
          className="text-[#FF6D1F] font-semibold text-lg hover:text-[#E05E1A] transition-colors"
        >
          View All
        </button>
      </div>

      {/* Recommended Notes Grid: 2 columns */}
      <div className="grid grid-cols-2 gap-4">
        {shuffledNotes.map((note) => {
          const Icon = note.icon;

          return (
            // Card Item
            <div
              key={note.id}
              onClick={() => router.push(`/notes/${note.id}`)}
              className="group bg-white rounded-xl border border-[#F5E7C6] overflow-hidden 
                         hover:border-[#FF6D1F] transition-all duration-300 cursor-pointer 
                         shadow-sm hover:shadow-lg"
            >
              {/* Icon Placeholder Area (Smaller Icon) */}
              <div
                className={`relative w-full h-32 overflow-hidden flex items-center justify-center ${note.color}`}
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

                {/* Removed the author row completely */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecommendedForYou;
