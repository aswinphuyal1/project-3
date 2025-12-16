// WelcomeCard.tsx
"use client";
import React, { useCallback } from "react";
import { CupSoda, Eye, Award } from "lucide-react";

// --- Default Data for quick mounting ---
const DUMMY_USER_DATA = {
  username: "Aswin phuyal",
  points: 1250,
  donations: 2500, // $25.00
  totalViews: 5800,
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
  username?: string;
  points?: number;
  donations?: number; // Cents equivalent (e.g., 2500 for $25.00)
  totalViews?: number;
  onViewAllClick?: () => void;
}

const WelcomeCard: React.FC<WelcomeCardProps> = ({
  username = DUMMY_USER_DATA.username,
  points = DUMMY_USER_DATA.points,
  donations = DUMMY_USER_DATA.donations,
  totalViews = DUMMY_USER_DATA.totalViews,
  onViewAllClick,
}) => {
  // Use a default alert if no specific function is provided
  const handleViewAll = useCallback(() => {
    if (onViewAllClick) {
      onViewAllClick();
    } else {
      console.log("View All clicked! (Default action)");
      // Optional: Add a subtle user feedback here like an alert if this is truly a standalone demo
    }
  }, [onViewAllClick]);

  // Format data for display
  const formattedDonations = `$${(donations / 100)
    .toFixed(2)
    .replace(".", ",")}`;
  const formattedViews = totalViews.toLocaleString();
  const formattedPoints = points.toLocaleString();

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-full md:max-w-4xl mx-auto rounded-3xl bg-white shadow-2xl shadow-gray-300 border border-[#F5E7C6]">
      <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#222222]">
          Welcome Back, <span className="text-[#FF6D1F]">{username}</span>
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
