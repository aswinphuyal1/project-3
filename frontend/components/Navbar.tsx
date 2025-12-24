"use client";
import React from "react";
import { useAuth } from "@/context/Authcontext"; // ✅ import context

interface NavItem {
  name: string;
  href: string;
  isHighlighted?: boolean;
}

const navItems: NavItem[] = [
  { name: "Home", href: "/home", isHighlighted: true },
  { name: "Notes", href: "/notes", isHighlighted: true },
  { name: "About us", href: "/aboutus", isHighlighted: true },
];

const Navbar: React.FC = () => {
  const { user, logout } = useAuth(); // ✅ get user + logout

  return (
    <nav className="flex flex-wrap items-center justify-between h-16 w-full px-4 sm:px-6 md:px-12 bg-white border-b border-gray-100">
      {/* --- Left Section: Noteshare Logo/Brand --- */}
      <div className="flex items-center">
        <a
          href="/"
          className="flex items-center text-xl font-bold tracking-tight text-gray-900 cursor-pointer"
        >
          <span className="inline-block transform translate-y-[-2px]"></span>
          Noteshare
        </a>
      </div>

      {/* --- Right Section: Navigation Links and Auth Button --- */}
      <div className="flex items-center space-x-2">
        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className={`
              p-2.5 text-base font-medium text-gray-700 rounded-full transition-colors duration-200
              ${
                item.isHighlighted
                  ? "bg-gray-100 hover:bg-gray-200"
                  : "hover:text-gray-900 hover:bg-gray-50"
              }
            `}
          >
            {item.name}
          </a>
        ))}

        {/* ✅ Show only one button depending on login state */}
        {user ? (
          <button
            onClick={logout}
            className="
              ml-4 px-4 py-2.5 text-sm font-medium
              text-white bg-red-600 rounded-full
              shadow-lg transition-shadow duration-200
              hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600
              whitespace-nowrap
            "
          >
            Logout
          </button>
        ) : (
          <a
            href="/create-account"
            className="
              ml-4 px-4 py-2.5 text-sm font-medium
              text-white bg-black rounded-full
              shadow-lg transition-shadow duration-200
              hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black
              whitespace-nowrap
            "
          >
            Create account
          </a>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
