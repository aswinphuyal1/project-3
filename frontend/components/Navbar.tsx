// NoteshareNavbar.tsx

import React from "react";

// Define the type for a navigation item
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
  return (
    // 1. Ensure maximum separation using 'justify-between'
    // 2. Add padding for visual spacing from screen edges (e.g., px-12 for desktop)
    <nav className="flex items-center justify-between h-16 w-full px-4 sm:px-8 md:px-12 bg-white border-b border-gray-100">
      {/* --- Left Section: Noteshare Logo/Brand --- */}
      <div className="flex items-center">
        <a
          href="/"
          className="flex items-center text-xl font-bold tracking-tight text-gray-900 cursor-pointer"
        >
          <span className="inline-block transform translate-y-[-2px]">
            
          </span>
          Noteshare
        </a>
      </div>

      {/* --- Right Section: Navigation Links and Button --- */}
      {/* 3. Use 'space-x-2' for small, tight spacing between the links themselves (as seen in the original image) */}
      <div className="flex items-center space-x-2">
        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className={`
              p-2.5 text-base font-medium text-gray-700 rounded-full transition-colors duration-200
              ${
                item.isHighlighted
                  ? // Styling for 'Resources' (light gray background, rounded-full shape)
                    "bg-gray-100 hover:bg-gray-200"
                  : // Styling for standard links
                    "hover:text-gray-900 hover:bg-gray-50"
              }
            `}
          >
            {item.name}
          </a>
        ))}

        {/* --- The Dark Button ('Access For Web') --- */}
        {/* 4. Use a slightly larger margin 'ml-4' to visually separate the button from the last nav link */}
        <a
          href="/login"
          className="
            ml-4 px-4 py-2.5 text-sm font-medium
            text-white bg-black rounded-full
            shadow-lg transition-shadow duration-200
            hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black
            whitespace-nowrap
          "
        >
          create account
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
