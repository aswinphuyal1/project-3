"use client";
import React from "react";
import Image from "next/image";
import { DollarSign, Eye, TrendingUp, LucideIcon } from "lucide-react";
import { useAuth } from "../context/Authcontext";
import { useNotes } from "../context/NoteContext";

// 1. Separate Reusable Sub-component for Stats
interface StatCardProps {
  label: string;
  value: string;
  Icon: LucideIcon;
  variant?: "primary" | "dark";
}

const StatCard = ({
  label,
  value,
  Icon,
  variant = "primary",
}: StatCardProps) => {
  const isPrimary = variant === "primary";

  return (
    <div
      className={`flex flex-col rounded-[28px] p-8 border border-[#F5E7C6] min-w-[220px] transition-all hover:translate-y-[-4px] hover:shadow-lg ${isPrimary ? "bg-[#FAF3E1]" : "bg-white"
        }`}
    >
      <div
        className={`${isPrimary ? "bg-[#FF6D1F]" : "bg-[#222222]"
          } w-fit p-3 rounded-2xl mb-6`}
      >
        <Icon size={28} className="text-white" />
      </div>
      <div>
        <p className="text-[#222222]/50 text-xs font-black uppercase tracking-[0.15em] mb-1">
          {label}
        </p>
        <p className="text-[#222222] text-4xl font-black">
          {label.includes("Money") ? `$${value}` : value}
        </p>
      </div>
    </div>
  );
};

interface ProfileBannerProps {
  userData?: {
    name: string;
    bio: string;
    imageUrl: string;
    moneyEarned: string;
    totalViews: string;
  };
}

export default function ProfileBanner({ userData }: ProfileBannerProps) {
  const { user } = useAuth();
  const { totalUserViews, fetchUserNotes } = useNotes();

  React.useEffect(() => {
    if (user?.id && !userData) {
      fetchUserNotes(user.id);
    }
  }, [user?.id, fetchUserNotes, userData]);

  // Use passed data or fall back to context/sample data
  const data = userData || {
    name: user?.name || "Dr. Sarah Lee",
    bio: "Expert in digital health and wellness. Sharing insights on modern medicine and lifestyle through weekly knowledge-sharing sessions. Dedicated to making complex medical information accessible to everyone.",
    imageUrl: `https://api.dicebear.com/9.x/bottts/svg?seed=${user?.name || "Sarah"}`,
    moneyEarned: "25",
    totalViews: totalUserViews.toLocaleString(),
  };

  return (
    <section className="w-full bg-white border-b border-[#F5E7C6] font-sans">
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between gap-10">
          {/* Left: Avatar and Info */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 flex-1">
            <div className="relative flex-shrink-0">
              <div className="relative w-32 h-32 lg:w-44 lg:h-44 rounded-full overflow-hidden border-4 border-[#FAF3E1] shadow-xl">
                <img
                  src={data.imageUrl}
                  alt={`${data.name}'s profile`}

                  className="object-cover"

                />
              </div>
              <div className="absolute bottom-2 right-2 bg-[#FF6D1F] p-2.5 rounded-full border-4 border-white shadow-lg">
                <TrendingUp size={20} className="text-white" />
              </div>
            </div>

            <div className="text-center md:text-left space-y-4 pt-4">
              <h1 className="text-[#222222] text-4xl lg:text-6xl font-black tracking-tight leading-none">
                {data.name}
              </h1>
              <p className="text-[#222222]/70 text-lg lg:text-xl max-w-xl leading-relaxed">
                {data.bio}
              </p>
            </div>
          </div>

          {/* Right: Reusable Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full lg:w-auto">
            <StatCard
              label="Money Earned"
              value={data.moneyEarned}
              Icon={DollarSign}
              variant="primary"
            />
            <StatCard
              label="Total Views"
              value={data.totalViews}
              Icon={Eye}
              variant="dark"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
