import Navbar from "@/components/Navbar";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import Footer from "./footer/page";
// Replace this with your actual authentication logic
const isLoggedIn = true; // e.g., get from context, cookies, etc.
import SideNavbar from "@/components/SideNavbar";
const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      {isLoggedIn && <SideNavbar /> }
      <div className="main-content">{children}</div>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default layout;
