"use client"
import Auth from "@/components/auth/Auth";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { user, loading } = useAuth()
  const router = useRouter()
    useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [user, loading, router]);


  return (
  <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
    <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8">
      {loading ? <h1 className="text-center text-gray-600">Loading...</h1> : <Auth />}
    </div>
  </div>

  );
}
