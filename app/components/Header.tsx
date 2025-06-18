"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Header() {
  const { data: session, status } = useSession();
  // Extend session.user type to include 'role', 'name', and 'email'
  type UserWithRole = { role?: string; name?: string | null; email?: string | null };
  const user = session?.user as UserWithRole | undefined;

  return (
    <header className="flex justify-between items-center p-6 border-b border-white/20 bg-neutral-800/60 backdrop-blur-md rounded-b-2xl mx-2 mt-2 text-white shadow-[0_4px_16px_0_rgba(255,255,255,0.08)]" style={{borderTopLeftRadius: '1.5rem', borderTopRightRadius: '1.5rem'}}>
      <h1 className="text-2xl font-bold tracking-wide">Vellux</h1>
      <nav>
        <ul className="flex space-x-10 text-base font-normal items-center text-white">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/products">Products</Link></li>
          <li><Link href="/cart">Cart</Link></li>
          {status === "authenticated" && user && (user.role === "admin" || user.role === "superadmin") && (
            <li>
              <Link href="/admin/products" className="text-gray-700 hover:underline">
                Dashboard
              </Link>
            </li>
          )}
          {status === "authenticated" && user ? (
            <li>
              <Link href="/account" className="text-gray-700 hover:underline">
                {user.name || user.email}
              </Link>
            </li>
          ) : (
            <li><Link href="/login">Login/Register</Link></li>
          )}
        </ul>
      </nav>
    </header>
  );
} 