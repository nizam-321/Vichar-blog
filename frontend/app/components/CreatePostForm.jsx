//path: frontend/app/components/CreatePostForm.jsx
'use client';

import { useState } from 'react';
import { API_URL } from '../config/api';

export default function CreatePostForm({ onClose, onPostCreated }) {
 // Form fields state
  const [title, setTitle] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [content, setContent] = useState('');
  const [isPublic, setIsPublic] = useState(true);

   // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
  
  // Get auth token from local storage
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please login first');
      setIsSubmitting(false);
      return;
    }

    try {
      // Prepare form data for API request
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('isPublic', isPublic);
      
      // Append image file if selected
      if (imageFile) {
        formData.append('image', imageFile);
      }
      
       // Send POST request to backend to create the post
      const res = await fetch(`${API_URL}/api/posts`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      
      // Handle non-success response
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to create post');
      }
      
       // On success: notify parent and close modal
      const savedPost = await res.json();
      onPostCreated(savedPost);
      onClose();
    } catch (err) {
      setError(err.message); // Show error to user
    } finally {
      setIsSubmitting(false); // Reset submitting state

    }
  };

  return (
    <div className="p-6 rounded bg-white shadow-md max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-center sm:text-left">
        Create New Post
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title input */}
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
          disabled={isSubmitting}
        />
        
         {/* Image upload input */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          className="w-full border border-gray-300 px-3 py-2 text-sm text-gray-500 rounded-md file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
          disabled={isSubmitting}
        />
        
        {/* Content textarea */}
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border border-gray-300 px-3 py-2 h-32 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
          required
          disabled={isSubmitting}
        />
        
        {/* Public/Private checkbox */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={isPublic}
            onChange={() => setIsPublic(!isPublic)}
            id="public-checkbox"
            className="w-4 h-4"
            disabled={isSubmitting}
          />
          <label htmlFor="public-checkbox" className="text-gray-700 select-none">
            Public
          </label>
        </div>
        
        {/* Error message display */}
        {error && (
          <p className="text-red-600 text-sm">{error}</p>
        )}
        

        {/* Submit and Cancel buttons */}
        <div className="flex flex-col sm:flex-row justify-end gap-4 mt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Publishing...' : 'Publish'}
          </button>
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="text-red-600 hover:underline disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
