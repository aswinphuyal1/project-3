// SideNavbar.tsx
"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // For determining active link
import {
  Home,
  NotebookText,
  MessageSquare,
  Video,
  Brain,
  User,
  Settings,
} from "lucide-react";

interface NavItem {
  id: number;
  label: string;
  icon: React.ElementType;
  path: string;
}

const navItems: NavItem[] = [
  { id: 1, label: "Home", icon: Home, path: "/home" },
  { id: 2, label: "Explore Notes", icon: NotebookText, path: "/explore" },
  { id: 3, label: "Messages", icon: MessageSquare, path: "/message" },
  { id: 4, label: "Live Sessions", icon: Video, path: "/live" },
  { id: 5, label: "AI Assistant", icon: Brain, path: "/ai" },
  { id: 6, label: "My Profile", icon: User, path: "/profile" },
  { id: 7, label: "Upload", icon: NotebookText, path: "/upload" },
  { id: 8, label: "Settings", icon: Settings, path: "/setting" },
];

const SideNavbar: React.FC = () => {
  const pathname = usePathname();

  return (
    <div className="h-full w-56 lg:w-64 text-[#222222] shadow-2xl pt-6">
      <nav className="flex flex-col space-y-1">
        {navItems.map((item) => {
          const isActive =
            pathname === item.path || pathname?.startsWith(`${item.path}/`);

          const itemClasses = `
            flex items-center p-3 text-base font-medium transition-colors duration-150 relative
            ${
              isActive
                ? "bg-[#F5E7C6] font-semibold text-[#222222]"
                : "hover:bg-[#F5E7C6] hover:bg-opacity-50 text-[#222222]"
            }
          `;

          return (
            <Link key={item.id} href={item.path} className={itemClasses}>
              {isActive && (
                <div
                  className="absolute left-0 top-0 bottom-0 w-1 bg-[#FF6D1F]"
                  aria-hidden="true"
                />
              )}

              <item.icon className="w-5 h-5 mr-3" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default SideNavbar;
