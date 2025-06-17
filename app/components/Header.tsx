"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Header() {
  const { data: session, status } = useSession();

  return (
    <header className="flex justify-between items-center p-6 border-b border-gray-200">
      <h1 className="text-xl font-semibold tracking-wide">Vellux</h1>
      <nav>
        <ul className="flex space-x-6 text-sm font-medium items-center">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/products">Products</Link></li>
          <li><Link href="/cart">Cart</Link></li>
          {status === "authenticated" && session.user ? (
            <li>
              <Link href="/account" className="text-gray-700 hover:underline">
                {session.user.name || session.user.email}
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