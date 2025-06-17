"use client";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "../components/Header";

export default function AccountPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

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
        {/* Action buttons */}
        <div className="flex flex-col gap-4 mt-10 w-full max-w-md">
          <button
            style={{
              width: '100%',
              padding: '0.5rem 1rem',
              background: '#000',
              color: 'white',
              borderRadius: '0.375rem',
              fontWeight: 600,
              minHeight: 40,
              fontSize: '1rem',
              transition: 'background 0.2s',
              cursor: 'pointer',
            }}
            onMouseOver={e => { e.currentTarget.style.background = '#333'; }}
            onMouseOut={e => { e.currentTarget.style.background = '#000'; }}
            onClick={() => signOut({ callbackUrl: '/' })}>
            Log Out
          </button>
          <button
            style={{
              width: '100%',
              padding: '0.5rem 1rem',
              background: deleting ? '#f87171' : '#dc2626',
              color: 'white',
              borderRadius: '0.375rem',
              fontWeight: 600,
              minHeight: 40,
              fontSize: '1rem',
              transition: 'background 0.2s',
              cursor: deleting ? 'not-allowed' : 'pointer',
            }}
            onMouseOver={e => { if (!deleting) e.currentTarget.style.background = '#f87171'; }}
            onMouseOut={e => { if (!deleting) e.currentTarget.style.background = '#dc2626'; }}
            onClick={handleDeleteAccount}
            disabled={deleting}
          >
            {deleting ? 'Deleting Account...' : 'Delete Account'}
          </button>
        </div>
      </div>
    </main>
  );
} 