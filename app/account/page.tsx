"use client";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "../components/Header";

export default function AccountPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [profileName, setProfileName] = useState("");
  const [profileEmail, setProfileEmail] = useState("");
  const [profileMsg, setProfileMsg] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/orders")
        .then(res => res.json())
        .then(data => {
          setOrders(data);
          setLoading(false);
        })
        .catch(() => {
          setError("Failed to load orders");
          setLoading(false);
        });
    }
  }, [status]);

  useEffect(() => {
    if (session?.user) {
      setProfileName((session.user as any).name || "");
      setProfileEmail((session.user as any).email || "");
    }
  }, [session]);

  if (status === "loading") {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (!session) return null;

  async function handleDeleteAccount() {
    if (!window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) return;
    setDeleting(true);
    const res = await fetch("/api/account/delete", { method: "DELETE" });
    setDeleting(false);
    if (res.ok) {
      await signOut({ callbackUrl: "/" });
    } else {
      alert("Failed to delete account. Please try again.");
    }
  }

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileMsg("");
    const res = await fetch("/api/account/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: profileName, email: profileEmail }),
    });
    const data = await res.json();
    if (res.ok) setProfileMsg("Profile updated!");
    else setProfileMsg(data.error || "Failed to update profile");
  };

  return (
    <main className="min-h-screen flex flex-col bg-transparent text-white relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/background.jpeg"
          alt="Background"
          className="w-full h-full object-cover object-center"
        />
        {/* Overlay for contrast */}
        <div className="absolute inset-0 bg-black/30" />
      </div>
      <Header />
      <section className="flex flex-col items-center w-full flex-grow px-4 py-8">
        <div className="w-full max-w-2xl mx-auto">
          <div className="glassmorphic bg-white/10 border border-white/20 rounded-2xl shadow-lg p-8 mb-12">
            <h1 className="text-3xl font-bold mb-6 text-white">Account</h1>
            <form onSubmit={handleProfileSave} className="mb-6 flex flex-col gap-4">
              <h2 className="text-xl font-bold mb-2 text-white">Profile Settings</h2>
              <label className="text-white font-semibold">Name
                <input
                  className="mt-1 w-full border border-white/20 rounded px-3 py-2 bg-white/10 text-white placeholder:text-gray-300"
                  value={profileName}
                  onChange={e => setProfileName(e.target.value)}
                />
              </label>
              <label className="text-white font-semibold">Email
                <input
                  className="mt-1 w-full border border-white/20 rounded px-3 py-2 bg-white/10 text-white placeholder:text-gray-300"
                  value={profileEmail}
                  onChange={e => setProfileEmail(e.target.value)}
                />
              </label>
              <button type="submit" className="px-4 py-2 rounded bg-blue-700 text-white font-bold border border-blue-700 shadow hover:bg-blue-800 transition text-base mt-2">Save</button>
              {profileMsg && <div className="mt-2 text-green-400 font-semibold">{profileMsg}</div>}
            </form>
            <div className="mb-4 font-semibold text-lg">Welcome, {session?.user?.name || session?.user?.email}!</div>
            <div className="text-white/70 text-sm mb-2">Email: {session?.user?.email}</div>
            <div className="text-white/70 text-sm mb-2">Role: {(session?.user as any)?.role}</div>
            {/* Log Out and Delete Account buttons here if needed */}
          </div>
          <h2 className="text-2xl font-bold mb-6 text-white">Order History</h2>
          {loading ? (
            <div>Loading orders...</div>
          ) : error ? (
            <div className="text-red-400 font-bold">{error}</div>
          ) : orders.length === 0 ? (
            <div className="text-white/70">No orders found.</div>
          ) : (
            <div className="flex flex-col gap-8">
              {orders.map(order => (
                <div key={order.id} className="glassmorphic bg-white/10 border border-white/20 rounded-2xl shadow-lg p-6 w-full">
                  <div className="flex justify-between items-center mb-4">
                    <div className="font-bold text-lg">Order #{order.id}</div>
                    <div className="text-white/70 text-sm">{new Date(order.creationDate).toLocaleString()}</div>
                  </div>
                  <ul className="mb-4">
                    {order.products.map((product: any, idx: number) => (
                      <li key={idx} className="flex items-center gap-4 py-2 border-b border-white/10 last:border-b-0">
                        <img src={product.photo} alt={product.name} className="w-12 h-12 object-cover rounded border border-white/20" />
                        <div className="flex-1">
                          <div className="font-semibold text-white text-base">{product.name}</div>
                          <div className="text-white/70 text-sm">{product.description}</div>
                        </div>
                        <div className="font-bold text-white text-base">${product.price.toFixed(2)}</div>
                      </li>
                    ))}
                  </ul>
                  <div className="flex justify-end font-bold text-lg text-white">Total: ${order.totalPrice.toFixed(2)}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      <footer className="border-t border-white/20 p-6 text-center text-xs text-white bg-neutral-800/60 backdrop-blur-md w-full mt-auto shadow-[0_-4px_16px_0_rgba(255,255,255,0.08)]">
        &copy; {new Date().getFullYear()} Rattrapage Digi. All rights reserved.
      </footer>
    </main>
  );
} 