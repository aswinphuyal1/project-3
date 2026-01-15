"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import human from "@/image/human.png";

export default function Home() {
  const router = useRouter();

  return (
    // Wrap everything in a single parent or a Fragment
    <main className="w-full min-h-screen flex flex-col items-center justify-center text-center bg-[#f5f5f5] px-4 relative overflow-hidden">
      {/* Background gradient using your palette */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FAF3E1] to-[#F5E7C6] -z-10"></div>

      {/* Hero Section */}
      <div className="z-10 flex flex-col items-center">
        <h1 className="text-4xl md:text-6xl font-bold text-[#222222] leading-tight mt-10">
          Unlock Knowledge. <span className="text-[#FF6D1F]">Share.</span>{" "}
          <br />
          Learn. Grow.
        </h1>

        <p className="text-[#222222] opacity-80 max-w-xl mt-4 text-sm md:text-lg">
          A community-driven platform for students and creators to share,
          explore, and master notes with the power of AI.
        </p>

        {/* Reusable-style Button */}
        <button
          onClick={() => router.push("/login")}
          className="mt-8 bg-[#FF6D1F] text-white font-semibold px-8 py-3 rounded-full text-sm md:text-base hover:scale-105 transition-transform duration-200 shadow-lg"
        >
          Get started
        </button>
      </div>

      {/* Illustration Container */}
      <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 mt-12">
        <Image
          src={human}
          alt="Walking person illustration"
          priority // Added priority for LCP optimization
          width={470}
          height={1000}
          className="object-contain"
        />
      </div>
    </main>
  );
}
//
