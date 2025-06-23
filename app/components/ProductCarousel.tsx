"use client";
import React, { useRef, useEffect, useState } from "react";
import Link from 'next/link';

interface Product {
  image: string;
  name: string;
  description?: string;
  id: string;
}

export default function ProductCarousel({ products }: { products: Product[] }) {
  const [windowWidth, setWindowWidth] = useState(1200);
  const visibleCount = windowWidth < 768 ? 1 : 3;
  const total = products.length;
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  // Animation duration: longer if more products
  const duration = Math.max(10, total * 3);

  // Duplicate products for seamless loop
  const displayProducts = [...products, ...products];

  return (
    <div className="relative w-full overflow-hidden" style={{ minHeight: 260 }}>
      <div
        ref={marqueeRef}
        className="flex gap-6"
        style={{
          width: `${(displayProducts.length * 100) / visibleCount}%`,
          animation: `marquee ${duration}s linear infinite`,
        }}
      >
        {displayProducts.map((product, idx) => (
          <div
            key={idx}
            className="min-w-0 flex-1 flex justify-center"
            style={{ width: `${100 / displayProducts.length}%` }}
          >
            <Link href={`/products/${product.id}`} className="min-w-[220px] max-w-xs bg-white/10 border border-white/20 rounded-2xl shadow-lg p-4 flex flex-col items-center glassmorphic backdrop-blur-md transition hover:scale-105 cursor-pointer">
              <img src={product.image} alt={product.name} className="w-28 h-28 object-cover rounded-xl border border-white/20 mb-3" />
              <div className="font-bold text-white text-lg text-center mb-1">{product.name}</div>
              {product.description && <div className="text-white/70 text-sm text-center">{product.description}</div>}
            </Link>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
} 