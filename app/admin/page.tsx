"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import GradientBody from "../components/GradientBody";
import Header from "../components/Header";
import Link from "next/link";

interface User {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string;
}

interface CustomSession {
  user?: User;
  expires: string;
}

export default function AdminDashboard() {
  const { data: session, status } = useSession() as { data: CustomSession | null; status: string };
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    } else if (session?.user?.role !== "admin" && session?.user?.role !== "superadmin") {
      router.replace("/");
    }
  }, [status, session, router]);

  if (status === "loading") {
    return (
      <GradientBody>
        <main className="min-h-screen flex flex-col bg-transparent text-black relative overflow-hidden">
          <div aria-hidden="true" className="h-20 md:h-24 w-full"></div>
          <Header />
          <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="backdrop-blur-sm bg-white/10 rounded-xl p-8 border border-white/20 text-center">
                <p className="text-xl text-gray-200">Loading...</p>
              </div>
            </div>
          </div>
        </main>
      </GradientBody>
    );
  }

  if (!session || (session.user?.role !== "admin" && session.user?.role !== "superadmin")) {
    return null;
  }

  return (
    <GradientBody>
      <Header />
      <main className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Admin Dashboard
            </h1>
            <p className="text-lg text-gray-300">
              Welcome, {session?.user?.name || "Admin"}.
            </p>
          </div>

          <div className="max-w-2xl mx-auto grid grid-cols-1 gap-8">
            {/* Manage Products */}
            <Link href="/admin/products" className="block p-8 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 transition-colors duration-300 transform hover:-translate-y-1">
              <h2 className="text-2xl font-bold text-white mb-3">Manage Products</h2>
              <p className="text-gray-300">Add, edit, or remove products from the store.</p>
            </Link>

            {/* Manage Users */}
            <Link href="/admin/users" className="block p-8 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 transition-colors duration-300 transform hover:-translate-y-1">
              <h2 className="text-2xl font-bold text-white mb-3">Manage Users</h2>
              <p className="text-gray-300">View, edit roles, or delete users.</p>
            </Link>
          </div>
        </div>
      </main>
    </GradientBody>
  );
} 