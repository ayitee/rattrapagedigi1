"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function Header() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const isAccount = pathname === "/account";
  const isDashboard = pathname.startsWith("/admin");

  return (
    <header className="w-full flex items-center justify-between px-8 py-4 bg-black/30 backdrop-blur-md border-b border-white/20 z-10 relative">
      <Link href="/" className="flex items-center">
        <img src="/logo.png" alt="Vellux Logo" className="h-10 w-auto" />
      </Link>
      <nav className="flex items-center gap-6">
        <Link href="/products" className="text-white font-medium hover:text-blue-300 transition">Products</Link>
        <Link href="/cart" className="text-white font-medium hover:text-blue-300 transition">Cart</Link>
        {(session?.user as any)?.role === "admin" || (session?.user as any)?.role === "superadmin" ? (
          <Link
            href="/admin/products"
            className={`font-semibold transition hover:text-green-400 ${isDashboard ? "text-green-400 font-bold" : "text-green-400"}`}
          >
            Dashboard
          </Link>
        ) : null}
        {session ? (
          <Link href="/account" className="text-white font-bold">
            {(session?.user as any)?.name || (session?.user as any)?.email}
          </Link>
        ) : (
          <Link href="/login" className="text-white font-medium hover:text-blue-300 transition">Login/Register</Link>
        )}
      </nav>
    </header>
  );
} 