"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Header from "../components/Header";

export default function AccountPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (!session) return null;

  return (
    <main className="min-h-screen flex flex-col bg-white text-black">
      <Header />
      <div className="flex flex-col items-center justify-center flex-grow">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 shadow-md w-full max-w-md mt-8">
          <h1 className="text-2xl font-bold mb-4">Account</h1>
          <div className="mb-2">
            <span className="font-medium">Name:</span> {session.user?.name || <span className="italic text-gray-500">(not set)</span>}
          </div>
          <div className="mb-2">
            <span className="font-medium">Email:</span> {session.user?.email}
          </div>
          {/* Add more profile info or edit functionality here if desired */}
        </div>
      </div>
    </main>
  );
} 