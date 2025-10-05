//path: frontend/app/posts/[id]/page.jsx
"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Loader from "../../components/Loader";
import { API_URL } from "@/app/config/api";

export default function PostDetail() {
  const { id } = useParams();                // Get post ID from dynamic route
  const router = useRouter();  
  const [post, setPost] = useState(null);   // State to store fetched post
  const [error, setError] = useState("");   // Error message (if any)
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchPost = async () => {
      const token = localStorage.getItem("token");
      
       // If no token, redirect to login
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        // Fetch post by ID with auth token
        const res = await fetch(`${API_URL}/api/posts/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
       
        // If response is not ok, handle error
        if (!res.ok) {
          const data = await res.json();
          setError(data.message || "Failed to fetch post");
          setLoading(false);
          return;
        }
       
        // Parse and set post data
        const data = await res.json();
        setPost(data);
        setLoading(false);
      } catch (err) {
        console.error('Fetch post error:', err);
        setError("Something went wrong");
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('http')) return imagePath;
    return `${API_URL}/uploads/${imagePath}`;
  };

  // Show loader while data is being fetched
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader size={48} />
      </div>
    );
  }

   // Show error message and redirect option
  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <p className="text-red-600 text-lg mb-4">{error}</p>
        <button
          onClick={() => router.push("/dashboard")}
          className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  const imageUrl = getImageUrl(post.image);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Go back button */}
        <button
          onClick={() => router.back()}
          className="mb-6 text-purple-600 hover:text-purple-700 font-medium"
        >
          ← Back
        </button>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {/* Show image if present */}
          {imageUrl && (
            <img
              src={imageUrl}
              alt={post.title}
              className="w-full h-64 sm:h-96 object-cover"
            />
          )}

          <div className="p-6 sm:p-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900">
              {post.title}
            </h1>
          
            {/* Author and date info */}
            <div className="flex items-center gap-3 mb-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold">
                  {post.author?.email?.charAt(0).toUpperCase() || 'U'}
                </div>
                <span>{post.author?.email || "Unknown"}</span>
              </div>
              <span>•</span>
              <span>
                {new Date(post.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
               
            {/* Post content */}  
            <div className="prose max-w-none">
              <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
                {post.content}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}