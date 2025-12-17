"use client";

import React, { useState } from "react";
import Link from "next/link"; // Import Link for Next.js navigation

// Icons
const CoffeeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
    <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
    <line x1="6" x2="6" y1="2" y2="4" />
    <line x1="10" x2="10" y1="2" y2="4" />
    <line x1="14" x2="14" y1="2" y2="4" />
  </svg>
);
const MessageIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

export default function FullPageUploader() {
  const [isFollowing, setIsFollowing] = useState(false);

  const uploader = {
    name: "Dr. Sarah Lee",

    bio: "I am a dedicated researcher and educator specialized in digital knowledge sharing. My goal is to make complex topics accessible to everyone through well-structured notes and interactive live sessions.",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=400",
    coverImage:
      "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=1200&h=300",
  };

  return (
    <main className="min-h-screen bg-[#F5E7C6] font-sans text-[#222222]">
      {/* Cover Header */}
      <div className="h-48 md:h-64 w-full bg-[#222222] relative overflow-hidden">
        <img
          src={uploader.coverImage}
          alt="Cover"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F5E7C6] to-transparent"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 -mt-24 relative z-10 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar Area */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#FAF3E1] rounded-[2.5rem] p-8 shadow-sm border border-[#F5E7C6] flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div className="w-36 h-36 rounded-full border-4 border-[#FF6D1F] p-1.5 bg-[#FAF3E1]">
                  <img
                    src={uploader.avatar}
                    alt={uploader.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              </div>

              <h1 className="text-2xl font-black mb-1">{uploader.name}</h1>
             

              <div className="flex flex-col w-full gap-3">
                {/* Follow Button */}
                <button
                  onClick={() => setIsFollowing(!isFollowing)}
                  className={`w-full py-4 rounded-2xl font-bold transition-all shadow-sm ${
                    isFollowing
                      ? "bg-[#222222] text-white"
                      : "bg-[#FF6D1F] text-white hover:bg-[#e65a10]"
                  }`}
                >
                  {isFollowing ? "Following" : "Follow"}
                </button>

                {/* Updated Message Link Navigation */}
                <Link
                  href="/message"
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-bold bg-white border-2 border-[#222222] text-[#222222] hover:bg-[#222222] hover:text-white transition-all"
                >
                  <MessageIcon />
                  <span>Send Message</span>
                </Link>
              </div>
            </div>

            {/* Support Box */}
            <div className="bg-[#222222] rounded-[2.5rem] p-8 text-white shadow-xl">
              <p className="text-gray-400 text-sm mb-4">
                Support my knowledge sharing
              </p>
              <button className="w-full bg-[#FF6D1F] hover:bg-white hover:text-[#FF6D1F] text-white py-4 rounded-2xl font-black transition-all flex items-center justify-center gap-2">
                <CoffeeIcon />
                <span>Buy Me a Coffee</span>
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-8">
            <div className="bg-[#FAF3E1] rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-[#F5E7C6]">
              <h2 className="text-xl font-black mb-6">About the Uploader</h2>
              <p className="text-lg leading-relaxed text-[#222222]/80 italic">
                "{uploader.bio}"
              </p>

              <div className="grid grid-cols-2 gap-4 mt-12 pt-8 border-t border-[#F5E7C6]">
                <div>
                  <p className="text-[#222222]/40 text-xs font-bold uppercase tracking-widest">
                    Rewards
                  </p>
                  <p className="text-2xl font-black text-[#FF6D1F]">
                    1,250 pts
                  </p>
                </div>
                <div>
                  <p className="text-[#222222]/40 text-xs font-bold uppercase tracking-widest">
                    Notes Uploaded
                  </p>
                  <p className="text-2xl font-black">42</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
