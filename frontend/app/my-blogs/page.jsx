//path: frontend/app/my-blogs/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CreatePostForm from "../components/CreatePostForm";
import Navbar from "../components/Navbar";
import PostCard from "../components/PostCard";
import Loader from "../components/Loader";
import { API_URL } from "../config/api";

export default function MyBlogsPage() {
  const [posts, setPosts] = useState([]);           // Stores user's own posts
  const [showForm, setShowForm] = useState(false);  // Whether to show the post creation form
  const [isLoading, setIsLoading] = useState(true); // Loading state for data fetch
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

   // If not logged in, redirect to login page
    if (!token) {
      router.push("/login");
      return;
    }
  
    fetchPosts(token);  // Fetch user's own posts
  }, []);
  
  // Fetch only the logged-in user's posts
  const fetchPosts = async (token) => {
    try {
      const res = await fetch(`${API_URL}/api/posts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setPosts(data);
      } else if (res.status === 401) {
        router.push("/login"); // Unauthorized access, redirect to login
      }
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Add newly created post to the top of the list
  const handlePostCreated = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
  };
 
  // Delete post by ID and remove it from UI if successful
  const deletePost = async (id) => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${API_URL}/api/posts/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setPosts((prev) => prev.filter((post) => post._id !== id));
      } else if (res.status === 401) {
        router.push("/login");
      }
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  // Logout handler: clears token and redirects
  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar with create and logout handlers */}
      <Navbar
        onCreateClick={() => setShowForm(true)}
        onLogout={handleLogout}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Show create post form if triggered */}
        {showForm && (
          <CreatePostForm
            onClose={() => setShowForm(false)}
            onPostCreated={handlePostCreated}
          />
        )}
        
        {/* Loader while fetching posts */}
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <Loader size={48} />
          </div>
        ) : (
          // Posts grid
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
                  onDelete={deletePost}
                  showDelete={true}
                />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}