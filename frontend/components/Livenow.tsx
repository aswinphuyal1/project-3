"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { PlayCircle } from "lucide-react";

// --- SessionItem Component ---
interface SessionItemProps {
  nameOrTitle: string;
  isSession: boolean;
  avatarSrc: string;
  isHovered: boolean;
  onJoin: () => void;
  isInactiveButton?: boolean;
  participants?: number; // Added participants prop
  topic?: string; // Added topic prop
}

const SessionItem: React.FC<SessionItemProps> = ({
  nameOrTitle,
  isSession,
  avatarSrc,
  isHovered,
  onJoin,
  isInactiveButton = false,
  participants,
  topic,
}) => {
  // Button style changes based on hover state
  const buttonStyle = isInactiveButton
    ? "bg-gray-300 text-[#222222] cursor-not-allowed shadow-none"
    : isHovered
    ? "bg-[#222222] text-white shadow-md" // Black when hovered
    : "bg-[#FF6D1F] text-white hover:bg-[#E05E1A] shadow-md"; // Orange when not hovered

  return (
    <div
      className={`flex items-center justify-between p-3 rounded-lg transition-colors duration-200 
        ${isHovered ? "bg-[#F5E7C6] bg-opacity-70" : ""}
      `}
    >
      <div className="flex items-center space-x-3 flex-1">
        {/* Avatar/Icon */}
        <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-gray-200">
          {isSession ? (
            <PlayCircle className="w-6 h-6 text-[#FF6D1F]" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-100 to-amber-200">
              <span className="text-lg font-semibold text-[#222222]">
                {nameOrTitle.charAt(0)}
              </span>
            </div>
          )}
        </div>

        {/* Name/Title and Topic */}
        <div className="flex-1">
          <span
            className={`text-[#222222] ${
              isSession ? "font-medium" : "font-normal"
            }`}
          >
            {nameOrTitle}
          </span>
          {isSession && topic && (
            <p className="text-xs text-gray-500 mt-0.5">{topic}</p>
          )}
        </div>
      </div>

      {/* Join Button */}
      <button
        onClick={isInactiveButton ? undefined : onJoin}
        className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${buttonStyle} whitespace-nowrap`}
        disabled={isInactiveButton}
      >
        Join
      </button>
    </div>
  );
};

// --- Main Component ---
const LiveSessionsWidget: React.FC = () => {
  const router = useRouter();
  const [hoveredItemId, setHoveredItemId] = useState<number | null>(null);

  // Dummy data for 4 live sessions
  const liveSessionsData = [
    {
      id: 1,
      nameOrTitle: "Mathematics Masterclass",
      isSession: true,
      avatarSrc: "",
      isInactiveExample: false,
      topic: "Calculus",
    },
    {
      id: 2,
      nameOrTitle: "Physics Discussion",
      isSession: true,
      avatarSrc: "",
      isInactiveExample: false,
      topic: "Quantum Mechanics",
    },
    {
      id: 3,
      nameOrTitle: "Chemistry Lab Session",
      isSession: true,
      avatarSrc: "",
      isInactiveExample: true, // This will show as inactive
      topic: "Organic Chemistry",
    },
    {
      id: 4,
      nameOrTitle: "Biology Study Group",
      isSession: true,
      avatarSrc: "",
      isInactiveExample: false,
      topic: "Genetics",
    },
  ];

  const handleJoin = (sessionId: number) => {
    // Navigate to live session page with the session ID
    router.push(`/live-sessions/${sessionId}`);
  };

  return (
    <div className="w-full max-w-md">
      {/* Widget Card Container */}
      <div className="bg-white p-6 rounded-2xl shadow-xl relative overflow-hidden border border-[#F5E7C6]">
        {/* Top Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-[#FF6D1F]"></div>

        {/* Header */}
        <div className="mb-6 pt-2">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#222222]">Live Sessions</h2>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-[#222222]">
                {liveSessionsData.length} Live Now
              </span>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Join interactive study sessions with peers
          </p>
        </div>

        {/* Sessions List */}
        <div className="space-y-3">
          {liveSessionsData.map((item) => (
            <div
              key={item.id}
              onMouseEnter={() => setHoveredItemId(item.id)}
              onMouseLeave={() => setHoveredItemId(null)}
              className="cursor-pointer"
            >
              <SessionItem
                nameOrTitle={item.nameOrTitle}
                isSession={item.isSession}
                avatarSrc={item.avatarSrc}
                isInactiveButton={item.isInactiveExample}
                isHovered={item.id === hoveredItemId}
                onJoin={() => handleJoin(item.id)}
                topic={item.topic}
              />
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-6 pt-4 border-t border-[#F5E7C6]">
          <button
            onClick={() => router.push("/live-sessions")}
            className="w-full py-3 bg-gradient-to-r from-[#FF6D1F] to-[#FF853F] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity duration-200 flex items-center justify-center"
          >
            <PlayCircle className="w-5 h-5 mr-2" />
            View All Sessions
          </button>
        </div>
      </div>
    </div>
  );
};

export default LiveSessionsWidget;
