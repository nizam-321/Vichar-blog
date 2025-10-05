//path: frontend/app/signup/page.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Loader from "../components/Loader";
import { API_URL } from "../config/api";

export default function SignUp() {
  const router = useRouter();

  // Form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");            // Error message
  const [isLoading, setIsLoading] = useState(false); // Loader flag

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
   
    // Basic validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      setIsLoading(false);
      return;
    }

    try {
      // Send signup request
      const res = await fetch(`${API_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Signup failed");
        setIsLoading(false);
        return;
      }
     
       // Save token and redirect
      localStorage.setItem("token", data.token);
      router.push("/dashboard");
    } catch (err) {
      console.error("Signup error:", err);
      setError("Something went wrong");
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Loader overlay when submitting */}
      {isLoading && (
        <div className="fixed inset-0 bg-[rgba(0, 0, 0, 0.2)] flex items-center justify-center z-50">
          <Loader size={48} color="white" />
        </div>
      )}
      
      {/* Signup form */}
      <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
        <div className="flex flex-col md:flex-row w-full max-w-4xl rounded-3xl shadow-lg overflow-hidden bg-white">
          <div className="w-full md:w-1/2 p-8 sm:p-10">
            <h2 className="text-2xl font-semibold text-center mb-2">Sign Up</h2>
            <p className="text-center text-sm text-gray-500 mb-6">
              Create your account to get started
            </p>

            <form className="space-y-4" onSubmit={handleSubmit}>
               {/* Email */}
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                  placeholder="Enter your email"
                  disabled={isLoading}
                />
              </div>
            
              {/* Password */}
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                  placeholder="Enter your password"
                  disabled={isLoading}
                />
              </div>
              
              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                  placeholder="Confirm your password"
                  disabled={isLoading}
                />
              </div>
              
              {/* Show error if any */}
              {error && <p className="text-red-600 text-sm">{error}</p>}
              
              {/* Submit button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Signing up..." : "Sign up"}
              </button>
            </form>

            {/* Alternative Sign-in Options,  OAuth placeholders */}
            <div className="my-6 flex items-center justify-center text-sm text-gray-500">
              <span className="mx-2">Or Continue With</span>
            </div>
            
            {/* Social signup Buttons (UI only) */}
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
           
            {/* Link to login page */}
            <p className="text-center mt-6 text-sm">
              Already have an account?{" "}
              <span
                onClick={() => router.push("/login")}
                className="text-purple-600 cursor-pointer hover:underline"
              >
                Log in
              </span>
            </p>
          </div>
         
         {/* Right Section – Illustration Image */}
          <div className="hidden md:block md:w-1/2 bg-gradient-to-br from-purple-500 to-pink-500 relative">
            <Image
              src="/signupImg.png"
              fill
              alt="Signup Illustration"
              className="object-cover opacity-90"
              priority
            />
          </div>
        </div>
      </div>
    </>
  );
}
