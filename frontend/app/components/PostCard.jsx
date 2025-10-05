//path: frontend/app/components/PostCard.jsx
"use client";

import Link from "next/link";
import { API_URL } from "../config/api";

export default function PostCard({ post, onDelete, showDelete = true }) {

  // Format date into a readable string like: Oct 5, 2025
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  

  // Generate full image URL from path or return as-is if already complete
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('http')) return imagePath;
    return `${API_URL}/uploads/${imagePath}`;
  };

  const imageUrl = getImageUrl(post.image);

  return (
    <div className="relative w-full bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      
      {/* Delete button shown only if showDelete is true and onDelete callback is provided */}
      {showDelete && onDelete && (
        <button
          onClick={(e) => {
            e.preventDefault();
            onDelete(post._id);
          }}
          className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded hover:bg-red-700 z-10"
        >
          Delete
        </button>
      )}
      

      {/* Post image (if available) */}
      {imageUrl && (
        <div className="w-full aspect-video bg-gray-200">
          <img
            src={imageUrl}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      

      {/* Clicking anywhere else on the card opens the post details page */}
      <Link href={`/posts/${post._id}`}>
        <div className="p-5 cursor-pointer">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 line-clamp-3">
            {post.title.length > 100
              ? `${post.title.slice(0, 100)}...`
              : post.title}
          </h3>

          {/* <p className="text-gray-700 text-sm sm:text-base mb-4 line-clamp-3">
            {post.content.length > 100
              ? `${post.content.slice(0, 100)}...`
              : post.content}
          </p> */}
          
          {/* Author and Date Section */}
          <div className="flex items-center justify-between text-xs sm:text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold">
                {post.author?.email?.charAt(0).toUpperCase() || 'U'}
              </div>
              <span className="truncate max-w-[80px] sm:max-w-[120px]">
                {post.author?.email || "Unknown"}
              </span>
            </div>

            <span>{formatDate(post.createdAt || post.date)}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}