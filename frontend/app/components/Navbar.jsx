//path: frontend/app/components/Navbar.jsx
"use client";

import Link from "next/link";
import { useState } from "react";
import UserProfileDropdown from "./UserProfileDropdown";

export default function Navbar({ onCreateClick, onLogout }) {
  // Tracks whether the mobile menu is open or closed
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo / Brand Name */}
          <div className="flex-shrink-0 text-2xl font-bold text-purple-600">
            Vichaar
          </div>
          
          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-10">
            <Link href="/dashboard" className="text-gray-700 hover:text-purple-600 transition">
              Home
            </Link>
            <Link href="/my-blogs" className="text-gray-700 hover:text-purple-600 transition">
              My blogs
            </Link>
            
            {/* Create Button */}
            <button
              onClick={onCreateClick}
              className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition"
            >
              Create
            </button>
             
             {/* User Profile dropdown (e.g., logout, profile) */}
            <UserProfileDropdown onLogout={onLogout} />
          </div>
            

            {/* Mobile Menu Toggle Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600 rounded"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              > 

                {/* Hamburger or Close icon based on menu state */}
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      

      {/* Mobile Menu - shown only when isMenuOpen is true */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="px-4 pt-2 pb-4 space-y-1">

            {/* Mobile: Home Link */}
            <Link
              href="/dashboard"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>

            {/* Mobile: My Blogs Link */}
            <Link
              href="/my-blogs"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-700"
              onClick={() => setIsMenuOpen(false)}
            >
              My blogs
            </Link>
           
           {/* Mobile: Create Button */}
            <button
              onClick={() => {
                onCreateClick();
                setIsMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-md bg-purple-600 text-white hover:bg-purple-700 transition"
            >
              Create
            </button>
            
            {/* Mobile: User profile dropdown (e.g., Logout) */}
            <div className="border-t border-gray-200 mt-2 pt-2">
              <UserProfileDropdown onLogout={onLogout} />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}