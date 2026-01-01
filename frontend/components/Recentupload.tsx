"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { FileText, Trash2 } from "lucide-react"; // Added Trash2 for delete icon
import { useAuth } from "../context/Authcontext";
import { useNotes } from "../context/NoteContext";

const RecentUpload: React.FC = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { userNotes, fetchUserNotes, deleteNote } = useNotes();

  useEffect(() => {
    if (user?.id) {
      fetchUserNotes(user.id);
    }
  }, [user?.id]); // Removed fetchUserNotes from dependency to avoid loop if unstable ref, or assume it's stable

  // Function to handle expand button click
  const handleExpand = (noteId: string) => {
    router.push(`/notes/${noteId}`);
  };

  const handleDelete = async (noteId: string) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      await deleteNote(noteId);
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 sm:p-5 w-full max-w-full md:max-w-2xl border border-gray-200 shadow-sm relative overflow-hidden">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF6D1F] to-[#fab1a0]" />

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Your Recent Uploads</h2>
        <button
          onClick={() => router.push("/upload")} // 'Manage uploads' makes sense to go to upload page or profile
          className="text-sm font-medium text-[#FF6D1F] hover:underline"
        >
          Manage Uploads
        </button>
      </div>

      {/* Notes List */}
      <div className="space-y-3">
        {userNotes.slice(0, 3).map((note) => ( // Show only top 3 recent
          <div
            key={note._id}
            className="flex items-center p-3 bg-[#FAF3E1] rounded-lg border border-[#F5E7C6] hover:bg-[#F5E7C6] transition-colors group"
          >
            {/* Note Icon/Image */}
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mr-4 shadow-sm">
              <FileText className="w-6 h-6 text-[#FF6D1F]" />
            </div>

            {/* Note Title Only */}
            <div className="flex-1 min-w-0 pr-4">
              <h3 className="font-semibold text-gray-800 truncate" title={note.title}>{note.title}</h3>
              <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">{note.subject || "General"}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              {/* Delete Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(note._id);
                }}
                className="p-2 text-red-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete"
              >
                <Trash2 size={18} />
              </button>

              {/* Expand Button */}
              <button
                onClick={() => handleExpand(note._id)}
                className="px-4 py-2 text-sm bg-[#FF6D1F] text-white rounded hover:bg-[#E05E1A] transition-colors font-medium whitespace-nowrap"
              >
                Expand
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {userNotes.length === 0 && (
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
