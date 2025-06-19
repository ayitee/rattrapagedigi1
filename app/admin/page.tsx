"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import GradientBody from "../components/GradientBody";
import Header from "../components/Header";

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

export default function AdminPage() {
  const { data: session, status } = useSession() as { data: CustomSession | null; status: string };
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    } else if (session?.user?.role !== "ADMIN") {
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

  if (!session || session.user?.role !== "ADMIN") {
    return null;
  }

  return (
    <GradientBody>
      <main className="min-h-screen flex flex-col bg-transparent text-black relative overflow-hidden">
        <div aria-hidden="true" className="h-20 md:h-24 w-full"></div>
        <Header />
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Admin Dashboard
              </h1>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                Manage your store's products and users
              </p>
            </div>

            {/* Admin Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Products Management */}
              <div className="backdrop-blur-sm bg-white/10 rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-6">Products</h2>
                <div className="space-y-4">
                  <button
                    onClick={() => router.push("/admin/products")}
                    className="w-full px-6 py-4 bg-blue-600/20 text-blue-300 rounded-lg hover:bg-blue-600/30 transition-colors duration-200 font-semibold flex items-center justify-between"
                  >
                    <span>Manage Products</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                  <p className="text-gray-300 text-sm">
                    Add, edit, or remove products from your store
                  </p>
                </div>
              </div>

              {/* Users Management */}
              <div className="backdrop-blur-sm bg-white/10 rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-6">Users</h2>
                <div className="space-y-4">
                  <button
                    onClick={() => router.push("/admin/users")}
                    className="w-full px-6 py-4 bg-green-600/20 text-green-300 rounded-lg hover:bg-green-600/30 transition-colors duration-200 font-semibold flex items-center justify-between"
                  >
                    <span>Manage Users</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                  <p className="text-gray-300 text-sm">
                    View and manage user accounts and permissions
                  </p>
                </div>
              </div>

              {/* Orders Management */}
              <div className="backdrop-blur-sm bg-white/10 rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-6">Orders</h2>
                <div className="space-y-4">
                  <button
                    onClick={() => router.push("/admin/orders")}
                    className="w-full px-6 py-4 bg-purple-600/20 text-purple-300 rounded-lg hover:bg-purple-600/30 transition-colors duration-200 font-semibold flex items-center justify-between"
                  >
                    <span>View Orders</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                  <p className="text-gray-300 text-sm">
                    Track and manage customer orders
                  </p>
                </div>
              </div>

              {/* Analytics */}
              <div className="backdrop-blur-sm bg-white/10 rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-6">Analytics</h2>
                <div className="space-y-4">
                  <button
                    onClick={() => router.push("/admin/analytics")}
                    className="w-full px-6 py-4 bg-yellow-600/20 text-yellow-300 rounded-lg hover:bg-yellow-600/30 transition-colors duration-200 font-semibold flex items-center justify-between"
                  >
                    <span>View Analytics</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                  <p className="text-gray-300 text-sm">
                    View sales reports and performance metrics
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </GradientBody>
  );
} 