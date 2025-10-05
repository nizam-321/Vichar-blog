//path: frontend/app/dashboard/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CreatePostForm from "../components/CreatePostForm";
import Navbar from "../components/Navbar";
import PostCard from "../components/PostCard";
import Loader from "../components/Loader";
import { API_URL } from "../config/api";

export default function Dashboard() {
  const [posts, setPosts] = useState([]); // All posts to display
  const [showForm, setShowForm] = useState(false); // Whether CreatePostForm is visible
  const [isLoading, setIsLoading] = useState(true); // Indicates if posts are being loaded

  const router = useRouter(); 

  useEffect(() => {
    const token = localStorage.getItem("token");
  
    // If not logged in, redirect to login
    if (!token) {
      router.push("/login");
      return;
    }

    fetchPosts(token); // Fetch all posts from API
  }, []);
  
  // Fetch all posts (visible to the user)
  const fetchPosts = async (token) => {
    try {
      const res = await fetch(`${API_URL}/api/posts/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setPosts(data);
      } else if (res.status === 401) {
        router.push("/login");  // If token is invalid or expired, redirect to login
      }
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Add new post to top of posts list
  const handlePostCreated = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  // Logout user and redirect to login page
  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar with create and logout handlers */}
      <Navbar
        onCreateClick={() => setShowForm(true)}
        onLogout={handleLogout}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Post creation form (conditionally rendered) */}
        {showForm && (
          <CreatePostForm
            onClose={() => setShowForm(false)}
            onPostCreated={handlePostCreated}
          />
        )}
       
       {/* Loading spinner while posts are being fetched */}
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <Loader size={48} />
          </div>
        ) : (
          // Show posts in a responsive grid layout
          <div className="mt-8 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {posts.length === 0 ? (
              <p className="text-center text-gray-500 col-span-full">
                No posts yet. Click on Create to add one!
              </p>
            ) : (
              posts.map((post) => (
                <PostCard 
                  key={post._id} 
                  post={post} 
                  showDelete={false} 
                />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}