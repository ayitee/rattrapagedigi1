"use client";
import { usePathname } from "next/navigation";

export default function GradientBody({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Match /products, /products/[id], /cart, /account
  const isGradient =
    pathname === "/products" ||
    pathname.startsWith("/products/") ||
    pathname === "/cart" ||
    pathname === "/account";

  if (isGradient) {
    return <div className="gradient-background min-h-screen w-full">{children}</div>;
  }
  return <>{children}</>;
} 