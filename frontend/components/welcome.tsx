// WelcomeCard.tsx
"use client";
import React, { useCallback } from "react";
import { CupSoda, Eye, Award } from "lucide-react";
import { useAuth } from "@/context/Authcontext";
import { useNotes } from "@/context/NoteContext";

// --- Default Data for quick mounting ---
const DUMMY_USER_DATA = {
  name: "Aswin phuyal",
  points: 0,
  donations: 0.99, // $25.00
  totalViews:0,
};

// --- Sub-Component: Stat Card ---
interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ElementType; // Icon component
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon: Icon }) => {
  return (
    <div className="flex flex-col items-center p-4 border border-[#F5E7C6] rounded-xl bg-white shadow-sm transition-shadow hover:shadow-md min-w-[150px]">
      <div className="text-sm font-medium text-gray-500 mb-2">{label}</div>
      <div className="flex items-center">
        <span className="text-3xl font-bold text-[#222222] mr-2">{value}</span>
        <Icon className="w-6 h-6 text-[#FF6D1F]" />
      </div>
    </div>
  );
};

// --- Main Component: Welcome Card ---
interface WelcomeCardProps {
  name?: string;
  points?: number;
  donations?: number; // Cents equivalent (e.g., 2500 for $25.00)
  totalViews?: number;
  onViewAllClick?: () => void;
}

const WelcomeCard: React.FC<WelcomeCardProps> = (props) => {
  // move hook inside component
  const { user } = useAuth();
  const { totalUserViews, fetchUserNotes } = useNotes();

  React.useEffect(() => {
    if (user?.id) {
      fetchUserNotes(user.id);
    }
  }, [user?.id, fetchUserNotes]);

  // derive values with fallbacks
  const name = props.name ?? user?.name ?? DUMMY_USER_DATA.name;
  const points = props.points ?? DUMMY_USER_DATA.points;
  const donations = props.donations ?? DUMMY_USER_DATA.donations;
  const totalViews = totalUserViews > 0 ? totalUserViews : (props.totalViews ?? DUMMY_USER_DATA.totalViews);
  const { onViewAllClick } = props;

  // Use a default alert if no specific function is provided
  const handleViewAll = useCallback(() => {
    if (onViewAllClick) {
      onViewAllClick();
    } else {
      console.log("View All clicked! (Default action)");
    }
  }, [onViewAllClick]);

  // Format data for display
  const formattedDonations = ` रु${donations}`;
  const formattedViews = totalViews.toLocaleString();
  const formattedPoints = points.toLocaleString();

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-full md:max-w-4xl mx-auto rounded-3xl bg-white shadow-2xl shadow-gray-300 border border-[#F5E7C6]">
      <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#222222]">
          Welcome Back, <span className="text-[#FF6D1F]">{name}</span>
        </h2>

        {/* 'View All' Button */}
      </div>

      <p className="text-gray-500 text-xs mb-8">
        Recent activity summary placeholder: notes uploaded, points earned, and
        donations received.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        <StatCard label="Points" value={formattedPoints} icon={Award} />
        <StatCard label="Donations" value={formattedDonations} icon={CupSoda} />
        <StatCard label="Total Views" value={formattedViews} icon={Eye} />
      </div>
    </div>
  );
};

export default WelcomeCard;
