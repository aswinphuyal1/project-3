"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import human from"@/image/human.png"
export default function Home() {
  const router = useRouter();

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center text-center bg-white px-4 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-200 -z-10"></div>

      {/* Main heading */}
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mt-10">
        Unlock Knowledge. Share. <br /> Learn. Grow.
      </h1>

      {/* Sub text */}
      <p className="text-gray-600 max-w-xl mt-4 text-sm md:text-base">
        A community-driven platform for students and creators to share, explore,
        and master notes (with AI).
      </p>

      {/* Button */}
      <button
        onClick={() => router.push("/login")}
        className="mt-6 bg-black text-white px-6 py-2 rounded-full text-sm md:text-base hover:bg-gray-800 transition"
      >
        Get started
      </button>

      {/* Bottom image */}
      <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 mt-10">
        <Image
          src={human} // replace with actual image path (public folder)
          alt="Walking person"
          width={470}
          height={1000}
          className="object-contain"
        />
      </div>
    </div>
  );
}
