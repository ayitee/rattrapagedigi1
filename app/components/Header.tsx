"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const isAccount = pathname === "/account";
  const isDashboard = pathname.startsWith("/admin");
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  // Helper for mobile nav
  function handleNav(href: string) {
    setMenuOpen(false);
    router.push(href);
  }

  const navLinks = (
    <>
      {menuOpen ? (
        <button className="text-white font-medium hover:text-blue-300 transition block py-2 md:py-0 text-left w-full" onClick={() => handleNav("/products")}>Products</button>
      ) : (
        <Link href="/products" className="text-white font-medium hover:text-blue-300 transition block py-2 md:py-0">Products</Link>
      )}
      {menuOpen ? (
        <button className="text-white font-medium hover:text-blue-300 transition block py-2 md:py-0 text-left w-full" onClick={() => handleNav("/cart")}>Cart</button>
      ) : (
        <Link href="/cart" className="text-white font-medium hover:text-blue-300 transition block py-2 md:py-0">Cart</Link>
      )}
      {(session?.user as any)?.role === "admin" || (session?.user as any)?.role === "superadmin" ? (
        menuOpen ? (
          <button className={`font-semibold transition hover:text-green-400 block py-2 md:py-0 text-left w-full ${isDashboard ? "text-green-400 font-bold" : "text-green-400"}`} onClick={() => handleNav("/admin")}>Dashboard</button>
        ) : (
          <Link
            href="/admin"
            className={`font-semibold transition hover:text-green-400 block py-2 md:py-0 ${isDashboard ? "text-green-400 font-bold" : "text-green-400"}`}
          >
            Dashboard
          </Link>
        )
      ) : null}
      {session ? (
        menuOpen ? (
          <button className="text-white font-bold block py-2 md:py-0 text-left w-full" onClick={() => handleNav("/account")}>{(session?.user as any)?.name || (session?.user as any)?.email}</button>
        ) : (
          <Link href="/account" className="text-white font-bold block py-2 md:py-0">{(session?.user as any)?.name || (session?.user as any)?.email}</Link>
        )
      ) : (
        menuOpen ? (
          <button className="text-white font-medium hover:text-blue-300 transition block py-2 md:py-0 text-left w-full" onClick={() => handleNav("/login")}>Login/Register</button>
        ) : (
          <Link href="/login" className="text-white font-medium hover:text-blue-300 transition block py-2 md:py-0">Login/Register</Link>
        )
      )}
    </>
  );

  return (
    <>
      <header
        className={`fixed left-1/2 -translate-x-1/2 top-4 w-[95vw] max-w-5xl flex items-center justify-between px-4 md:px-8 py-3 bg-black/40 backdrop-blur-sm border border-white/20 rounded-full shadow-xl z-50 transition-all duration-300 ${menuOpen ? 'opacity-0 pointer-events-none' : ''}`}
      >
        <Link href="/" className="flex items-center z-40">
          <img src="/logo.png" alt="Vellux Logo" className="h-10 w-auto" />
        </Link>
        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">{navLinks}</nav>
        {/* Hamburger icon for mobile */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 z-40 ml-auto"
          aria-label="Open menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className={`block w-7 h-0.5 bg-white rounded transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
          <span className={`block w-7 h-0.5 bg-white rounded my-1 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}></span>
          <span className={`block w-7 h-0.5 bg-white rounded transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
        </button>
      </header>
      {/* Mobile menu overlay OUTSIDE header, covers everything */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex flex-col items-center justify-center md:hidden">
          <button
            className="absolute top-6 right-6 text-white text-3xl"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          >
            &times;
          </button>
          <nav className="flex flex-col gap-6 text-2xl mt-8 items-center w-full">{navLinks}</nav>
        </div>
      )}
    </>
  );
} 