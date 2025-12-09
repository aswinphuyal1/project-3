// pages/dashboard/page.tsx (or similar)
import AIAssistantWidget from "@/components/AI";
import LiveSessionsWidget from "@/components/Livenow";
import RecentUpload from "@/components/Recentupload";
// Use RecommendedForYou once to cover both 'Recommended' sections in the design
import RecommendedForYou from "@/components/Recommended";
import SideNavbar from "@/components/SideNavbar"; // SideNavbar is in layout, but you don't need it here
import UploadButton from "@/components/upload";
import WelcomeCard from "@/components/welcome";

import React from "react";

const DashboardPage = () => {
  return (
    // Use a Flexbox or Grid container for the main two-column content
    <div className="p-4 md:p-8 space-y-8 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8">
      {/* 🚀 Column 1: Takes up 2/3 of the space (lg:col-span-2) */}
      <div className="lg:col-span-2 space-y-8">
        {/* Welcome Card & Stats (Must be styled to span the full width of Column 1) */}
        <WelcomeCard />

        {/* Recommended For You Section */}
        <RecommendedForYou  />

        {/* Your Recent Uploads Section */}
        <RecentUpload />
      </div>

      {/* 💡 Column 2: The Right Sidebar/Widget Column (Takes up 1/3 of the space) */}
      <div className="lg:col-span-1 space-y-8">
        {/* AI Assistant Widget (Top Right) */}
        <AIAssistantWidget />

        {/* Upload Notes/Buy Me a Coffee Section (Assuming UploadButton handles this complex card) */}
        <UploadButton />

        {/* Live Now/Quick Uploads Widget (Bottom Right) */}
        <LiveSessionsWidget />
      </div>
    </div>
  );
};

export default DashboardPage;
