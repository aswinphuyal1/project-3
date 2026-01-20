"use client";

import Link from "next/link";
import { MountainIcon, Twitter, Linkedin, Github } from "lucide-react";

// Define the footer navigation structure
const footerNavs = {
  Company: [
    { title: "About Us", href: "/aboutus" },
    { title: "Contact", href: "/home" },
    { title: "Careers", href: "/home" },
    { title: "Manifesto", href: "/home" },
  ],
  Resources: [
    { title: "Help Center", href: "/home" },
    { title: "Terms of Service", href: "/home" },
    { title: "Privacy Policy", href: "/home" },
    { title: "Knowledge Base", href: "/home" },
  ],
  Features: [
    { title: "Explore Notes", href: "/explore" },
    { title: "AI Assistant", href: "/AI" },
    { title: "Live Sessions", href: "/home" },
    { title: "Creator Tools", href: "/profile" },
  ],
};

const socialLinks = [
  { icon: Twitter, href: "https://x.com/AswinPhuyal1" },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/aswin-phuyal-787272284/",
  },
  { icon: Github, href: "https://github.com/aswinphuyal1" },
];

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-gray-200 bg-white text-gray-700">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Logo and Tagline/Description */}
          <div className="col-span-2 lg:col-span-2 pr-10">
            <Link
              href="/"
              className="flex items-center space-x-2 text-xl font-bold text-gray-900"
            >
              {/* Using a generic icon (MountainIcon) to represent the app logo */}
              <MountainIcon className="h-6 w-6" />
              <span>NotesShare</span>
            </Link>
            <p className="mt-4 text-sm text-gray-500 max-w-xs">
              Unlock Knowledge. Share. Learn. Grow. The community platform for
              educational mastery.
            </p>
            <div className="flex space-x-4 mt-6">
              {socialLinks.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <a
                    key={idx}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-gray-900 transition-colors"
                    aria-label={`Link to NotesShare on ${Icon.displayName}`}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Navigation Links (Responsive Grid) */}
          {Object.entries(footerNavs).map(([section, links], idx) => (
            <div key={idx} className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                {section}
              </h3>
              <ul className="space-y-3">
                {links.map((item, linkIdx) => (
                  <li key={linkIdx}>
                    <Link
                      href={item.href}
                      className="text-sm text-gray-600 hover:text-gray-900 transition-colors hover:underline underline-offset-4"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Footer (Copyright) */}
      <div className="border-t border-gray-100 bg-gray-50 py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p className="order-2 md:order-1 mt-3 md:mt-0">
            &copy; {currentYear} NotesShare, Inc. All rights reserved.
          </p>
          <p className="order-1 md:order-2">Built with passion in the cloud.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
//