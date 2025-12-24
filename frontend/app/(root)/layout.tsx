"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "./footer/page";
import SideNavbar from "@/components/SideNavbar";
import { ToastContainer } from "react-toastify";
import { useAuth } from "@/context/Authcontext";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth(); // <-- use context

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-grow min-h-0">
        {user && (
          <div className="hidden md:flex w-56 lg:w-64 flex-shrink-0 flex-col min-h-0">
            <SideNavbar />
          </div>
        )}
        <div className="flex-grow overflow-y-auto bg-white p-0 min-h-0 flex flex-col">
          <div className="main-content flex-grow">{children}</div>
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default Layout;
