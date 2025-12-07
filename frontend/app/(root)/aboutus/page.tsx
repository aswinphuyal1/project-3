"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation"; // 1. Import useRouter
import illustration from "@/image/backgrounnd.png";
// Ensure your illustration image is either black/white/monochrome or its colors work well with this theme.

export default function About() {
  const router = useRouter(); // 2. Initialize the router hook

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center py-16 px-6">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl w-full flex flex-col md:flex-row items-center gap-16"
      >
        {/* Text */}
        <div className="flex-1 md:order-1 order-2 max-w-lg md:max-w-none">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-snug mb-4">
            Unlock Knowledge. <br />
            <span className="text-gray-600">Share. Learn. Grow.</span>
          </h1>

          <p className="text-gray-700 text-xl leading-relaxed mt-4">
            NotesShare is a **community-driven digital learning ecosystem**
            designed to connect students and educational creators worldwide. Our
            mission is to facilitate the seamless exchange of **high-quality
            educational notes** (PDFs, images, etc.) to promote mastery and
            growth.
          </p>
        </div>

        {/* Image */}
        <div className="flex-1 flex justify-center md:order-2 order-1">
          <Image
            src={illustration}
            alt="NotesShare Illustration"
            className="w-full max-w-lg drop-shadow-2xl rounded-xl"
            // Removed style={{ filter: 'grayscale(100%)' }} to match the provided code
          />
        </div>
      </motion.div>

      {/* Unique Value Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-6xl w-full mt-24 bg-white shadow-2xl shadow-gray-200 rounded-3xl p-10 border border-gray-100"
      >
        <h2 className="text-4xl font-bold text-gray-800 mb-10 text-center">
          Our Unique Value
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {/* Card 1: AI-Powered Learning */}
          <div className="p-8 bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition cursor-pointer">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              AI-Powered Learning
            </h3>
            <p className="text-gray-600">
              Go beyond simple reading with our integrated AI Assistant,
              offering summaries, explanations, and answers directly related to
              study materials.
            </p>
          </div>

          {/* Card 2: Live Interaction */}
          <div className="p-8 bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition cursor-pointer">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Live Interaction
            </h3>
            <p className="text-gray-600">
              Engage with creators through live sessions for real-time subject
              reviews and interactive discussions.
            </p>
          </div>

          {/* Card 3: Support & Rewards */}
          <div className="p-8 bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition cursor-pointer">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Support & Rewards
            </h3>
            <p className="text-gray-600">
              Creators are rewarded with a point system and simple donation
              tools like “Buy Me a Coffee,” supporting their valuable
              contributions.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Final Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="max-w-4xl w-full mt-16 text-center"
      >
        <p className="text-xl text-gray-800 leading-relaxed font-medium">
          NotesShare is the all-in-one platform for sharing knowledge,
          connecting with experts, and elevating your learning journey.
        </p>

        {/* 3. Updated Button with onClick handler */}
        <button
          onClick={() => router.push("/explore-notes")} // Navigate to the Notes/Explore page
          className="mt-8 bg-gray-900 text-white px-10 py-3 rounded-full text-lg font-semibold hover:bg-black transition shadow-lg"
        >
          Start Your Journey Today
        </button>
      </motion.div>
    </div>
  );
}
