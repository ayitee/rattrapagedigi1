"use client";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Header from "../components/Header";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    setLoading(true);
    const res = await fetch("/api/checkout_sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cart }),
    });
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      setLoading(false);
      alert("Failed to start checkout");
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-transparent text-white relative overflow-hidden">
      {/* Background image and overlay */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/background.jpeg"
          alt="Background"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>
      <Header />
      <section className="flex flex-col items-center w-full max-w-5xl mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold mb-8 mt-8 text-white">Checkout</h1>
        {cart.length === 0 ? (
          <div className="text-lg text-gray-300 mb-12">Your cart is empty.</div>
        ) : (
          <div className="w-full max-w-2xl glassmorphic bg-white/10 border border-white/20 rounded-2xl shadow-lg backdrop-blur p-12">
            <ul className="mb-6">
              {cart.map(item => (
                <li key={item.id} className="flex justify-between py-2 border-b border-white/10">
                  <span>{item.name} x {item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="flex justify-between font-bold text-lg mb-6">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button
              className="w-full py-3 rounded bg-green-600 hover:bg-green-700 font-bold text-white text-lg transition"
              onClick={handleCheckout}
              disabled={loading}
            >
              {loading ? "Redirecting..." : "Pay with Stripe"}
            </button>
          </div>
        )}
      </section>
      <footer className="border-t border-white/20 p-6 text-center text-xs text-white bg-neutral-800/60 backdrop-blur-md w-full mt-auto shadow-[0_-4px_16px_0_rgba(255,255,255,0.08)]">
        &copy; {new Date().getFullYear()} Rattrapage Digi. All rights reserved.
      </footer>
    </main>
  );
} 