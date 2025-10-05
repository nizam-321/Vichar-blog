// path: frontend/app/login/page.jsx
'use client';

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "../components/Loader";
import { API_URL } from "../config/api";

export default function Login() {
  const router = useRouter();

  // State variables for form input and UI state
  const [email, setEmail] = useState("");         // User email input
  const [password, setPassword] = useState("");   // User password input
  const [error, setError] = useState(null);       // Error message
  const [isLoading, setIsLoading] = useState(false); // Loading spinner visibility

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default page reload
    setError(null);     // Reset any previous error
    setIsLoading(true); // Show loader

    try {
      // Send login request to backend API
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      // Handle error response from server
      if (!res.ok) {
        setError(data.message || "Login failed");
        setIsLoading(false);
        return;
      }

      // Save JWT token to localStorage
      localStorage.setItem("token", data.token);

      // Redirect to dashboard after successful login
      router.push("/dashboard");
    } catch {
      setError("Something went wrong");
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Loader overlay during login process */}
      {isLoading && (
        <div className="fixed inset-0 bg-[rgba(0, 0, 0, 0.2)] flex items-center justify-center z-50">
          <Loader size={48} color="white" />
        </div>
      )}

      {/* Main container */}
      <div className="flex min-h-screen items-center justify-center bg-gray-200 p-4">
        <div className="flex flex-col md:flex-row w-full max-w-4xl rounded-3xl shadow-lg overflow-hidden bg-white">

          {/* Left Section – Login Form */}
          <div className="w-full md:w-1/2 p-8 sm:p-10">
            <h2 className="text-2xl font-semibold text-center mb-2">Log In</h2>
            <p className="text-center text-sm text-gray-500 mb-6">Welcome back! Please enter your details</p>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Email Input */}
              <div>
                <label className="block text-sm font-semibold mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                  placeholder="Enter your email"
                />
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-semibold mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                  placeholder="Enter your password"
                />
              </div>

              {/* Forgot Password (UI only) */}
              <div className="text-right text-sm text-purple-600 hover:underline cursor-pointer">
                Forgot password?
              </div>

              {/* Error Message */}
              {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
              >
                Log in
              </button>
            </form>

            {/* Alternative Login Options */}
            <div className="my-6 flex items-center justify-center text-sm text-gray-500">
              <span className="mx-2">Or Continue With</span>
            </div>

            {/* Social Login Buttons (UI only) */}
            <div className="flex justify-center space-x-4">
              <button className="flex items-center px-4 py-2 font-semibold border border-gray-400 rounded-md hover:bg-gray-100 transition">
                <img src="/google.png" alt="Google" className="h-5 mr-2" />
                Google
              </button>
              <button className="flex items-center px-4 py-2 font-semibold border border-gray-400 rounded-md hover:bg-gray-100 transition">
                <img src="/facebook.png" alt="Facebook" className="h-6 mr-2" />
                Facebook
              </button>
            </div>

            {/* Signup Link */}
            <p className="text-center mt-6 text-sm">
              Don’t have an account?{" "}
              <span
                onClick={() => router.push("/signup")}
                className="text-purple-600 cursor-pointer hover:underline"
              >
                Sign up
              </span>
            </p>
          </div>

          {/* Right Section – Illustration Image */}
          <div className="hidden md:block md:w-1/2 bg-gradient-to-br from-purple-500 to-pink-500 relative">
            <Image
              src="/loginImg2.png"
              fill
              alt="Login Illustration"
              className="object-cover opacity-90"
              priority
            />
          </div>
        </div>
      </div>
    </>
  );
}

