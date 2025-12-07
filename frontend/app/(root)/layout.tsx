import Navbar from "@/components/Navbar";
import React from "react";
 import {ToastContainer, toast} from 'react-toastify';
// Replace this with your actual authentication logic
const isLoggedIn = false; // e.g., get from context, cookies, etc.

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      {children}
     <ToastContainer />
    </div>
  );
};

export default layout;
