import React from "react";
import RecommendedForYou from "@/components/Recommended";
import SearchBar from "@/components/SearchBar";
import Recommended from "@/components/Recommendedd";

const Page = () => {
  return (
    // min-h-screen ensures the page is at least the height of the window
    // flex-col stacks them vertically
    <div className="min-h-screen flex flex-col bg-slate-50">
      <div className="w-full">
        <SearchBar />
      </div>

      {/* flex-1 tells this div to grow and fill all available vertical space */}
      <main className="flex-1 w-full">
        
        
      </main>
    </div>
  );
};

export default Page;
