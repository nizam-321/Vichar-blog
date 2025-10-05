//path: frontend/app/components/UserProfileDropdown.jsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { API_URL } from '../config/api';

export default function UserProfileDropdown({ onLogout }) {
  const [showDropdown, setShowDropdown] = useState(false);  // Toggle dropdown visibility
  const [user, setUser] = useState(null);  // Stores fetched user data
  const [error, setError] = useState('');
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const dropdownRef = useRef(null);  // For click outside detection
  

  // Fetch user profile on mount
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Not logged in');
        return;
      }

      try {
        const res = await fetch(`${API_URL}/api/profile`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const data = await res.json();
          setError(data.message || 'Failed to fetch profile');
          return;
        }

        const data = await res.json();
        setUser(data);  // Set fetched user data
      } catch (err) {
        console.error('Profile fetch error:', err);
        setError('Something went wrong');
      }
    };

    fetchUser();
  }, []);
  

  // Close dropdown if user clicks outside of it
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  

  // Handle logout process
  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await onLogout(); // Trigger parent logout callback
    } finally {
      setIsLoggingOut(false);
      setShowDropdown(false);
    }
  };
  
  // Error state: show error messag
  if (error) {
    return <p className="text-red-600 text-sm">{error}</p>;
  }
  
  // Loading state: show loading message until user is fetched
  if (!user) {
    return <p className="text-gray-500 text-sm">Loading...</p>;
  }

  return (
    <div
      ref={dropdownRef}
      className="relative inline-block text-left"
      onMouseEnter={() => {
        // Show dropdown on hover (only on devices that support hover)
        if (window.matchMedia("(hover: hover)").matches) {
          setShowDropdown(true);
        }
      }}
      onMouseLeave={() => {
        if (window.matchMedia("(hover: hover)").matches) {
          setShowDropdown(false);
        }
      }}
    > 
    {/* Toggle button for dropdown (used for mobile devices) */}
      <button
        onClick={() => {
          if (!window.matchMedia("(hover: hover)").matches) {
            setShowDropdown((prev) => !prev);
          }
        }}
        className="px-3 py-2 rounded-md hover:text-purple-600 transition"
        aria-haspopup="true"
        aria-expanded={showDropdown}
        disabled={isLoggingOut}
      >
        Profile
      </button>
      
      {/* Dropdown content */}
      {showDropdown && (
        <div
          className="origin-top-right absolute right-0 w-48 sm:w-56 mt-0 shadow-lg bg-white rounded-md z-20 sm:right-0 left-0 sm:left-auto"
          role="menu"
        > 
          {/* User email display */}
          <div className="py-2 px-4 text-gray-700" role="none">
            <p className="text-sm font-medium truncate" title={user.email}>
              {user.email}
            </p>
          </div>
          
          <div className="border-t border-gray-200"></div>
          {/* Logout button */}
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className={`w-full text-left px-4 py-2 ${
              isLoggingOut
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-red-600 hover:bg-red-50'
            } focus:outline-none`}
            role="menuitem"
          >
            {isLoggingOut ? 'Logging out...' : 'Logout'}
          </button>
        </div>
      )}
    </div>
  );
}