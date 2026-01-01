"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  Command,
  X,
  ArrowRight,
  Sparkles,
  History,
  TrendingUp,
  FileText
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNotes } from "../context/NoteContext";
import { useRouter } from "next/navigation";

const FullWidthSearchBar = () => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { notes } = useNotes(); // Get all notes from context
  const router = useRouter();

  // Debounce logic: Update debouncedQuery 2000ms after user stops typing
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 2000);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  // Filter notes based on debouncedQuery
  const filteredNotes = debouncedQuery.trim() === ""
    ? []
    : notes.filter((note) =>
      note.title.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
      note.subject?.toLowerCase().includes(debouncedQuery.toLowerCase())
    ).slice(0, 5); // Limit to top 5 results

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleResultClick = (noteId: string) => {
    router.push(`/notes/${noteId}`);
    setIsFocused(false);
    setQuery("");
  };

  return (
    <div className="w-full px-4 py-8">
      <div className="relative group w-full">
        {/* Horizontal Glow Effect */}
        <div
          className={`absolute -inset-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 rounded-2xl blur-lg opacity-10 group-hover:opacity-25 transition-all duration-700 ${isFocused ? "opacity-40 blur-xl" : ""
            }`}
        ></div>

        <div
          className={`relative flex items-center w-full bg-white border rounded-2xl transition-all duration-300 shadow-sm ${isFocused
            ? "border-blue-500 shadow-2xl shadow-blue-100/50 scale-[1.01]"
            : "border-slate-200"
            }`}
        >
          {/* Leading Icon */}
          <div className="pl-8 flex items-center">
            <Search
              className={`h-6 w-6 transition-colors duration-300 ${isFocused ? "text-blue-500" : "text-slate-400"
                }`}
            />
          </div>

          {/* Stretched Input */}
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)} // Delay blur to allow clicks
            placeholder="Search for notes..."
            className="flex-1 bg-transparent px-6 py-6 text-lg text-slate-700 placeholder-slate-400 focus:outline-none font-normal italic"
          />

          {/* Interaction Cluster */}
          <div className="pr-4 flex items-center gap-3">
            <AnimatePresence>
              {query && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setQuery("")}
                  className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
                >
                  <X className="h-5 w-5" />
                </motion.button>
              )}
            </AnimatePresence>

            {/* Keyboard Hint */}
            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-md text-[10px] font-bold text-slate-400">
              <Command className="h-3 w-3" />
              <span>K</span>
            </div>

            {/* Action Button */}
            <button className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-blue-600 transition-all active:scale-95 shadow-lg shadow-slate-200">
              <span>Search</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Wide Results Panel */}
        <AnimatePresence>
          {isFocused && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute top-full left-0 right-0 mt-3 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 overflow-hidden"
            >
              {query.trim().length > 0 ? (
                // Search Results Logic
                <div className="p-4">
                  <h3 className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4 px-2">
                    <Search className="h-3 w-3" /> Results for "{debouncedQuery || query}"
                  </h3>

                  {filteredNotes.length > 0 ? (
                    <div className="space-y-1">
                      {filteredNotes.map((note) => (
                        <button
                          key={note._id}
                          onClick={() => handleResultClick(note._id)}
                          className="w-full flex items-center gap-3 px-3 py-3 hover:bg-slate-50 rounded-xl transition-colors text-left group"
                        >
                          <div className="p-2 bg-blue-50 text-blue-500 rounded-lg group-hover:bg-blue-100 transition-colors">
                            <FileText className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-700">{note.title}</p>
                            <p className="text-xs text-slate-500 uppercase tracking-wide">{note.subject}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="px-4 py-8 text-center text-slate-400 text-sm">
                      {debouncedQuery ? "No results found." : "Typing..."}
                    </div>
                  )}
                </div>
              ) : (
                // Default State (Recent/Popular)
                <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-slate-100">
                  <div className="flex-1 p-4">
                    <h3 className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4 px-2">
                      <History className="h-3 w-3" /> Recent Searches
                    </h3>
                    <div className="space-y-1">
                      {["physics", "User Persona Research"].map((item) => (
                        <button
                          key={item}
                          onClick={() => setQuery(item)}
                          className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-slate-50 rounded-xl transition-colors text-sm text-slate-600 group"
                        >
                          <Search className="h-4 w-4 text-slate-300 group-hover:text-blue-500" />
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="w-full md:w-72 bg-slate-50/50 p-4">
                    <h3 className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4 px-2">
                      <TrendingUp className="h-3 w-3" /> Popular
                    </h3>
                    <div className="flex flex-wrap gap-2 px-2">
                      {["Analytics", "Invoices", "Team", "Settings", "Billing"].map((tag) => (
                        <button
                          key={tag}
                          onClick={() => setQuery(tag)}
                          className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-600 hover:border-blue-400 hover:text-blue-600 transition-all"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Footer info */}
              <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center gap-2">
                <Sparkles className="h-3 w-3 text-blue-500" />
                <span className="text-[10px] text-slate-400 font-medium">
                  {filteredNotes.length} matching notes found
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FullWidthSearchBar;
