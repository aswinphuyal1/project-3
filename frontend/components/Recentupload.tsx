"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { FileText } from "lucide-react";

interface Note {
  id: number;
  title: string;
  imageUrl: string;
}

const dummyNotes: Note[] = [
  {
    id: 1,
    title: "Quantum Physics Basics",
    imageUrl: "/images/notes-1.jpg",
  },
  {
    id: 2,
    title: "Advanced Calculus",
    imageUrl: "/images/notes-2.jpg",
  },
];

const RecentUpload: React.FC = () => {
  const router = useRouter();

  // Function to handle expand button click
  const handleExpand = (noteId: number, noteTitle: string) => {
    console.log(`Expanding ${noteTitle}`);
    router.push(`/notes/${noteId}`);
  };

  return (
    <div className="bg-white rounded-lg p-4 sm:p-5 w-full max-w-full md:max-w-2xl border border-gray-200">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Your Recent Uploads</h2>
        <button
          onClick={() => router.push("/profile")}
          className="text-sm font-medium text-[#FF6D1F] hover:underline"
        >
          Manage Uploads
        </button>
      </div>

      {/* Notes List */}
      <div className="space-y-3">
        {dummyNotes.map((note) => (
          <div
            key={note.id}
            // Removed onClick from entire card
            className="flex items-center p-3 bg-[#FAF3E1] rounded-lg border border-[#F5E7C6] hover:bg-[#F5E7C6] transition-colors"
          >
            {/* Note Icon/Image */}
            <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center mr-4">
              <FileText className="w-6 h-6 text-[#FF6D1F]" />
            </div>

            {/* Note Title Only */}
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">{note.title}</h3>
            </div>

            {/* Orange Expand Button - ONLY this navigates */}
            <div className="flex">
              <button
                onClick={() => handleExpand(note.id, note.title)}
                className="px-4 py-2 text-sm bg-[#FF6D1F] text-white rounded hover:bg-[#E05E1A] transition-colors font-medium"
              >
                Expand
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {dummyNotes.length === 0 && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-500">No recent uploads found</p>
          <button
            onClick={() => router.push("/upload")}
            className="mt-4 text-sm text-[#FF6D1F] hover:underline"
          >
            Upload your first note
          </button>
        </div>
      )}
    </div>
  );
};

export default RecentUpload;
