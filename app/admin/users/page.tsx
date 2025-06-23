"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import GradientBody from "../../components/GradientBody";
import Header from "../../components/Header";

interface User {
  id: number;
  name?: string | null;
  email?: string | null;
  role: string;
}

export default function AdminUsersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (status === "loading") return;
    if (status === "unauthenticated" || ((session?.user as any)?.role !== "admin" && (session?.user as any)?.role !== "superadmin")) {
      router.replace("/");
    } else {
      fetchUsers();
    }
  }, [status, session, router, currentPage]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/users?page=${currentPage}&limit=12`);
      if (!response.ok) throw new Error("Failed to fetch users");
      const data = await response.json();
      setUsers(data.data);
      setTotalPages(Math.ceil(data.total / 12));
    } catch (err) {
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId: number, newRole: string) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole }),
      });

      if (!response.ok) throw new Error("Failed to update role");

      setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
      setFeedback("User role updated successfully!");
      setTimeout(() => setFeedback(""), 3000);
    } catch (err) {
      setFeedback("Error updating role. Please try again.");
    }
  };

  const handleDelete = async (userId: number) => {
    if (!window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) return;

    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error("Failed to delete user");

      setUsers(users.filter(u => u.id !== userId));
      setFeedback("User deleted successfully!");
      setTimeout(() => setFeedback(""), 3000);
    } catch (err) {
      setFeedback("Error deleting user. Please try again.");
    }
  };

  if (status === "loading" || loading) {
    return (
      <GradientBody>
        <main className="min-h-screen flex flex-col items-center justify-center">
          <p className="text-xl text-gray-200">Loading...</p>
        </main>
      </GradientBody>
    );
  }

  if (error) {
    return (
      <GradientBody>
        <main className="min-h-screen flex flex-col items-center justify-center">
          <p className="text-xl text-red-400">{error}</p>
        </main>
      </GradientBody>
    );
  }

  return (
    <GradientBody>
      <Header />
      <main className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              User Management
            </h1>
            <p className="text-lg text-gray-300">
              Manage user roles and permissions
            </p>
          </div>

          {feedback && (
            <div className="mb-4 text-center bg-green-500/20 text-green-300 p-3 rounded-lg">
              {feedback}
            </div>
          )}

          <div className="backdrop-blur-sm bg-white/10 rounded-xl border border-white/20 overflow-hidden">
            <table className="w-full text-left text-gray-200">
              <thead className="bg-white/10 text-sm uppercase">
                <tr>
                  <th scope="col" className="px-6 py-3">Name</th>
                  <th scope="col" className="px-6 py-3">Email</th>
                  <th scope="col" className="px-6 py-3">Role</th>
                  <th scope="col" className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-t border-white/10 hover:bg-white/5">
                    <td className="px-6 py-4 font-medium">{user.name || 'N/A'}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">
                      <div className="relative w-40">
                        <select
                          value={user.role}
                          onChange={(e) => handleRoleChange(user.id, e.target.value)}
                          className="appearance-none w-full bg-white/10 border border-white/20 text-white py-2 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white/20 focus:border-blue-500 disabled:opacity-50"
                          disabled={(session?.user as any)?.id === String(user.id)}
                        >
                          <option value="user" className="bg-gray-900 text-white">User</option>
                          <option value="admin" className="bg-gray-900 text-white">Admin</option>
                          <option value="superadmin" className="bg-gray-900 text-white">Superadmin</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path>
                          </svg>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="font-medium text-red-400 hover:text-red-500 disabled:opacity-50"
                        disabled={(session?.user as any)?.id === String(user.id)} // Disable deleting self
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination Controls */}
          <div className="flex justify-center items-center mt-8 gap-4">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="text-white">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </main>
    </GradientBody>
  );
} 