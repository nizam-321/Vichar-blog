//path: frontend/app/page.js
"use client"
import { useEffect } from 'react';
import { useRouter } from "next/navigation";
export default function HomePage() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/signup');
  },[router])
  return (
   <div className="min-h-screen flex items-center justify-center">
    <p className="text-gray-500">Redirecting to signup...</p>
  </div>
  );
}
