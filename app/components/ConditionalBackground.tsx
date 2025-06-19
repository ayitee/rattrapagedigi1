"use client";
import { usePathname } from "next/navigation";
import React from "react";

export default function ConditionalBackground({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/admin/products");
  const isHome = pathname === "/";
  if (isDashboard || isHome) {
    return <>{children}</>;
  }
  return <div className="gradient-background">{children}</div>;
} 