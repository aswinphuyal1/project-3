"use client";
import React, { useCallback } from "react";
import { CupSoda, Eye, Award, TrendingUp } from "lucide-react";
import { useAuth } from "../context/Authcontext";
import { useNotes } from "../context/NoteContext";

// --- Sub-Component: Reusable Stat Card ---
interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ElementType;
  variant?: "orange" | "dark";
}

const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon: Icon,
  variant = "orange",
}) => {
  return (
    <div className="flex-1 min-w-[200px] bg-white rounded-[24px] p-6 border border-[#F5E7C6] transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
      <div className="flex items-center justify-between mb-4">
        <div
          className={`p-3 rounded-2xl ${variant === "orange"
            ? "bg-[#FF6D1F]/10 text-[#FF6D1F]"
            : "bg-[#222222]/10 text-[#222222]"
            }`}
        >
          <Icon size={24} strokeWidth={2.5} />
        </div>
        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[#222222]/30">
          Live Metric
        </div>
      </div>
      <div>
        <div className="text-[#222222]/50 text-xs font-bold uppercase mb-1 tracking-wide">
          {label}
        </div>
        <div className="text-3xl font-black text-[#222222] tabular-nums">
          {value}
        </div>
      </div>
    </div>
  );
};

// --- Main Component: WelcomeForProfile ---
interface WelcomeForProfileProps {
  username?: string;
  points?: number;
  donations?: number; // Cents equivalent
  totalViews?: number;
}

export default function WelcomeForProfile({
  username = "User",
  points = 0,
  donations = 0.99,
  totalViews = 0,
}: WelcomeForProfileProps) {
  const { user } = useAuth();
  const { totalUserViews, fetchUserNotes } = useNotes();

  React.useEffect(() => {
    if (user?.id) {
      fetchUserNotes(user.id);
    }
  }, [user?.id, fetchUserNotes]);

  // Use context user name if available, otherwise fall back to props
  const displayName = user?.name || username;
  // Format data
  const formattedDonations = ` रु${donations}`;
  const formattedViews = totalUserViews > 0 ? totalUserViews.toLocaleString() : totalViews.toLocaleString();
  const formattedPoints = points.toLocaleString();

  return (
    <section className="w-full bg-white border-b border-[#F5E7C6] font-sans overflow-hidden">
      {/* Subtle Background Accent */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FAF3E1] rounded-full blur-[120px] -z-10 opacity-50 translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
        <div className="flex flex-col space-y-12">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 bg-[#FAF3E1] text-[#FF6D1F] px-4 py-1.5 rounded-full w-fit border border-[#F5E7C6]">
                <TrendingUp size={16} strokeWidth={3} />
                <span className="text-xs font-black uppercase tracking-widest">
                  Platform Creator
                </span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-black text-[#222222] leading-[0.9] tracking-tight">
                Welcome Back, <br />
                <span className="text-[#FF6D1F]">{displayName}</span>
              </h1>
              <p className="text-[#222222]/50 text-lg lg:text-xl font-medium max-w-2xl leading-relaxed">
                Your knowledge-sharing journey is growing. Here is a snapshot of
                your activity and earnings for this month.
              </p>
            </div>
          </div>

          {/* Stats Grid - Full Width */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatCard
              label="Reward Points"
              value={formattedPoints}
              icon={Award}
              variant="orange"
            />
            <StatCard
              label="Total Donations"
              value={formattedDonations}
              icon={CupSoda}
              variant="orange"
            />
            <StatCard
              label="Engagement (Views)"
              value={formattedViews}
              icon={Eye}
              variant="dark"
            />
          </div>
        </div>
      </div>
    </section>
  );
  
}
