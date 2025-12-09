// layout.tsx
import Navbar from "@/components/Navbar";
import React from "react";
import { ToastContainer } from "react-toastify";
import Footer from "./footer/page";
import SideNavbar from "@/components/SideNavbar";

// Replace this with your actual authentication logic
const isLoggedIn = true; // e.g., get from context, cookies, etc.

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* --- Main Content Area Wrapper --- */}
      {/* Use flex to put SideNavbar and Main Content side-by-side */}
      <div className="flex flex-grow">
        {/* 1. SideNavbar (Fixed Width on the left) */}
        {/* We use the custom background color from your palette: #FAF3E1 */}
        {isLoggedIn && (
          // flex-shrink-0 prevents the sidebar from shrinking
          <div className="w-64  flex-shrink-0 hidden md:block">
            <SideNavbar />
          </div>
        )}

        {/* 2. Main Content Area */}
        {/* overflow-y-auto allows the main content to scroll independently */}
        <div className="flex-grow overflow-y-auto bg-white p-0">
          <div className="main-content">{children}</div>
        </div>
      </div>

      <Footer />
      <ToastContainer />
    </div>
  );
};

export default Layout;
