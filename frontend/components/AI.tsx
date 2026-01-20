"use client";
import React, { useState, useCallback } from "react";
import { Mic } from "lucide-react";
import { useRouter } from "next/navigation"; // For Next.js App Router
// OR if using React Router:
// import { useNavigate } from "react-router-dom";

// Suggested prompts are included for visual completeness but are no longer interactive buttons.
const suggestedPrompts = [
  { id: 1, text: "Summarize my latest notes" },
  { id: 2, text: "Explain string theory" },
];

/**
 * A self-contained AI Assistant widget designed as a launchpad.
 * Clicking anywhere on the input area or the send button navigates
 * to the full AI Assistant page.
 */
const AIAssistantWidget: React.FC = () => {
  // We keep state to manage the visual feedback and disabled status.
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isDisabled, setIsDisabled] = useState(false);

  // Initialize router for navigation
  const router = useRouter(); // For Next.js App Router
  // OR if using React Router:
  // const navigate = useNavigate();

  // Handles clicking the interactive area and redirects to AI page
  const handleLaunch = useCallback(() => {
    if (isDisabled) return;

    // 1. Initiate Navigation: Disable interaction and set feedback
    setIsDisabled(true);
    setFeedback("Redirecting to AI Assistant...");

    // 2. Navigate to AI page after a brief delay for visual feedback
    setTimeout(() => {
      // For Next.js App Router:
      router.push("/AI"); // Make sure this matches your route

      // OR for React Router:
      // navigate("/ai-assistant");

      // OR if you're not using a router, use window.location:
      // window.location.href = "/ai-assistant";

      // Reset state after navigation
      setFeedback(null);
      setIsDisabled(false);
    }, 500); // Shorter delay for better UX
  }, [isDisabled, router]); // Add router to dependencies

  // Handle click on input field specifically
  const handleInputClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent double triggering
    handleLaunch();
  };

  // Handle click on send button specifically
  const handleSendClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent double triggering
    handleLaunch();
  };

  return (
    // Card container: Styles matching the image, using the color palette
    <div className="relative p-4 sm:p-6 w-full max-w-full md:max-w-sm rounded-xl bg-white shadow-xl overflow-hidden border border-[#F5E7C6]">
      {/* Top Orange Accent Bar */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-[#FF6D1F]" />

      {/* Content Padding */}
      <div className="pt-4">
        <h3 className="text-xl font-bold text-[#222222]">AI Assistant</h3>
        <p className="text-sm text-gray-500 mt-1 mb-4">
          Ask a question about your notes or any subject.
        </p>

        {/* --- Interactive Area Wrapper (The Launchpad) --- */}
        <div
          onClick={handleLaunch} // Main click handler for the entire area
          className={`cursor-pointer ${
            isDisabled ? "opacity-70 pointer-events-none" : ""
          }`}
        >
          {/* Input Field - Clickable */}
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Click to go to AI Assistant"
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-0 focus:border-gray-300 transition-colors cursor-pointer"
              onClick={handleInputClick}
              readOnly // Make it non-editable
              disabled={isDisabled}
            />
            {/* Microphone Icon */}
            <Mic className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>

          {/* Suggested Prompts and Send Button */}
          <div className="flex justify-between items-end">
            <div className="flex flex-col text-sm text-[#222222] space-y-1">
              {suggestedPrompts.map((prompt) => (
                <span
                  key={prompt.id}
                  className="text-left text-sm text-gray-600"
                >
                  {prompt.text}
                </span>
              ))}
            </div>

            {/* Send Button - Clickable */}
            <button
              onClick={handleSendClick}
              disabled={isDisabled}
              className={`px-6 py-2 font-semibold rounded-lg text-white transition-colors shadow-md flex items-center justify-center
                          ${
                            isDisabled
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-[#FF6D1F] hover:bg-[#FF853F]"
                          }`}
            >
              {feedback ? "Redirecting..." : "Send"}
            </button>
          </div>
        </div>
        {/* --- End Interactive Area Wrapper --- */}

        {/* Optional Feedback Message */}
        {feedback && (
          <div className="mt-4 text-center text-sm text-[#FF6D1F] font-medium animate-pulse">
            {feedback}
          </div>
        )}
      </div>
    </div>
  );
};

export default AIAssistantWidget;
