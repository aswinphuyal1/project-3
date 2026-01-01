"use client";
import React, { useEffect, useState } from 'react';
import NotePreviewCard from '@/components/NotePreviewCard';
import UploaderCard from '@/components/UploaderCard';
import { useNotes } from '@/context/NoteContext';
import { useParams } from 'next/navigation';

const Page = () => {
  const { id } = useParams(); // Get ID from URL
  const { fetchNoteById } = useNotes();
  const [note, setNote] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const loadNote = async () => {
        const data = await fetchNoteById(id as string);
        setNote(data);
        setLoading(false);
      };
      loadNote();
    }
  }, [id, fetchNoteById]);

  if (loading) return <div className="p-10 text-center">Loading Note...</div>;
  if (!note) return <div className="p-10 text-center">Note not found.</div>;

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-4 flex flex-col items-center gap-10">
      <NotePreviewCard
        title={note.title}
        category={note.subject}
        subtitle={note.semester}
        description={note.description}
        fileUrl={note.fileUrl}
        fileType={note.fileType?.includes("image") ? "image" : "pdf"}
      />

      <UploaderCard
        uploader={{
          name: note.userId?.name || "Anonymous",
          bio: "Education enthusiast sharing knowledge.",
          avatar: `https://api.dicebear.com/9.x/bottts/svg?seed=${note.userId?.name || "User"}`
        }}
      />
    </div>
  );
}

export default Page;