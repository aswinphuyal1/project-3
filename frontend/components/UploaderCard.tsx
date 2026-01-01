"use client";

import React, { useState } from "react";
import Link from "next/link";

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
    <line x1="6" y1="2" x2="6" y2="4" />
    <line x1="10" y1="2" x2="10" y2="4" />
    <line x1="14" y1="2" x2="14" y2="4" />
  </svg>
);

interface UploaderCardProps {
  uploader?: {
    id?: string;
    name: string;
    bio?: string;
    avatar?: string;
  }
}

export default function UploaderCard({ uploader: propUploader }: UploaderCardProps) {
  const [isFollowing, setIsFollowing] = useState(false);

  const defaultUploader = {
    id: "1",
    name: "Dr. Sarah Lee",
    bio: "It strikes a beautiful balance between the simple and the sophisticated. I focus on delivering educational content that guides the next generation toward impactful results in their respective fields.",
    avatar:
      "https://api.dicebear.com/9.x/bottts/svg?seed=Sarah",
  };

  const uploader = propUploader || defaultUploader;

  const profilePath = `/uploaderprofile/${uploader.id || "1"}`;

  return (
    <section className="flex items-center justify-center min-h-[400px] p-4 font-sans">
      <div className="w-full max-w-2xl bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-[#F5E7C6]/50">
        <div className="flex flex-col gap-8">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-5">
              <Link href={profilePath} className="group">
                <div className="h-20 w-20 rounded-full border-2 border-[#FF6D1F] p-1 overflow-hidden bg-white shadow-sm transition-transform group-hover:scale-105">
                  <img
                    src={uploader.avatar}
                    alt={uploader.name}
                    className="h-full w-full rounded-full object-cover"
                  />
                </div>
              </Link>
              <Link href={profilePath}>
                <h2 className="text-[#222222] text-2xl font-bold tracking-tight hover:text-[#FF6D1F] transition-colors cursor-pointer">
                  {uploader.name}
                </h2>
              </Link>
            </div>
            <button
              onClick={() => setIsFollowing((f) => !f)}
              className={`px-6 py-2 rounded-full font-bold text-sm transition-all border-2 ${isFollowing
                ? "bg-[#222222] border-[#222222] text-white"
                : "bg-transparent border-[#222222] text-[#222222] hover:bg-[#222222] hover:text-white"
                }`}
            >
              {isFollowing ? "Following" : "Follow"}
            </button>
          </div>
          {/* Bio */}
          <div>
            <h3 className="text-[#222222] font-bold text-lg mb-1">
              About the Uploader
            </h3>
            <p className="text-[#222222]/70 leading-relaxed text-base">
              {uploader.bio}
            </p>
          </div>
          {/* Buy Me a Coffee */}
          <div className="pt-6 border-t border-[#FF6D1F]/10 flex flex-wrap items-center justify-between gap-4">
            <p className="text-[#222222]/60 text-sm font-medium italic">
              Love these notes? Support the creator.
            </p>
            <button className="flex items-center gap-2 bg-[#FF6D1F] hover:bg-[#e65a10] text-white px-6 py-3 rounded-2xl font-bold transition-all active:scale-95 shadow-lg shadow-[#FF6D1F]/20">
              <CoffeeIcon />
              <span>Buy Me a Coffee</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
