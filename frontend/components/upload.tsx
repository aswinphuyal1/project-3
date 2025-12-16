"use client";
import React from "react";
import { useRouter } from "next/navigation"; // Next.js App Router navigation
import { Plus } from "lucide-react";

// Define the reusable component interface
interface UploadButtonProps {
  /** The destination path when the button is clicked. */
  uploadPath?: string;
}

/**
 * A prominent, reusable component for initiating the knowledge-sharing platform's upload process.
 * Matches the user's design image and uses the defined color palette.
 */
const UploadButton: React.FC<UploadButtonProps> = ({
  uploadPath = "/upload-notes", // Default path based on platform pages
}) => {
  const router = useRouter();

  const handleUploadClick = () => {
    // Navigates the user to the specified upload page/route using Next.js router
    router.push(uploadPath);
  };

  return (
    <div
      className="
        p-4 sm:p-6 md:p-8 
        rounded-xl 
        shadow-2xl 
        max-w-full md:max-w-md 
        mx-auto 
        text-center 
        border border-[#F5E7C6]
        transition-all 
        hover:shadow-lg
      "
    >
      {/* Optional: Header/Context similar to the image's top section */}
      <div className="mb-8 text-left">
        <h2 className="text-xl font-bold text-[#222222] flex items-center justify-between">
          Knowledge Sharing Platform
          {/* Plus Icon placeholder for the 'AI Assistant' text in the image */}
          <Plus className="text-[#FF6D1F] h-6 w-6" />
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Share your expertise with the community
        </p>
      </div>

      {/* --- Main Upload Button/Circle --- */}
      <div
        onClick={handleUploadClick}
        className="
          cursor-pointer 
          w-32 h-32 sm:w-40 sm:h-40 
          mx-auto 
          rounded-full 
          bg-[#FF6D1F] // Primary orange accent color
          flex 
          flex-col 
          items-center 
          justify-center 
          shadow-lg 
          transform 
          transition-transform 
          duration-200 
          hover:scale-105 
          active:scale-95
          relative
          overflow-hidden
        "
      >
        {/* Inner Plus Icon */}
        <Plus className="h-10 w-10 text-white font-bold" strokeWidth={3} />

        {/* Button Text */}
        <span className="text-white text-sm font-semibold mt-1">
          Upload Notes
        </span>
      </div>

      {/* --- Text Link below the button (matches the image) --- */}
      <button
        onClick={handleUploadClick}
        className="
          mt-6 
          text-lg 
          font-semibold 
          text-[#FF6D1F] // Primary orange accent color
          hover:underline 
          focus:outline-none
        "
      >
        Upload Notes
      </button>
    </div>
  );
};

export default UploadButton;
