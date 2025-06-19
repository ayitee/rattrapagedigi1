"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useCart } from "../context/CartContext";
import Link from "next/link";
import Header from "../components/Header";

export default function CartPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <main className="min-h-screen flex flex-col bg-transparent text-black relative overflow-hidden gradient-background">
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
      <section className="flex flex-col items-center w-full max-w-[80vw] mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold mb-8 mt-8 text-white">Your Cart</h1>
        {cart.length === 0 ? (
          <div className="text-lg text-gray-600 mb-12">Your cart is empty. <Link href="/products" className="text-black underline">Shop now</Link></div>
        ) : (
          <div className="w-full max-w-3xl mx-auto backdrop-blur-lg bg-neutral-800/60 border border-white/20 rounded-2xl shadow-lg px-8 pt-10 pb-16 flex flex-col text-white">
            <div className="flex-grow">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b">
                    <th className="py-2">Product</th>
                    <th className="py-2">Price</th>
                    <th className="py-2">Quantity</th>
                    <th className="py-2">Subtotal</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map(item => (
                    <tr key={item.id} className="border-b align-middle glassmorphic">
                      <td className="py-4 flex items-center gap-4">
                        <img src={item.photo} alt={item.name} className="w-16 h-16 object-cover rounded border border-white/20 bg-white/10" />
                        <span className="font-medium text-white">{item.name}</span>
                      </td>
                      <td className="py-4 text-white">${item.price.toFixed(2)}</td>
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          <button
                            className="px-2 py-1 border border-white/20 rounded bg-white/10 text-white hover:bg-white/20 transition"
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            aria-label="Decrease quantity"
                          >-</button>
                          <span className="px-2 text-white">{item.quantity}</span>
                          <button
                            className="px-2 py-1 border border-white/20 rounded bg-white/10 text-white hover:bg-white/20 transition"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            aria-label="Increase quantity"
                          >+</button>
                        </div>
                      </td>
                      <td className="py-4 text-white">${(item.price * item.quantity).toFixed(2)}</td>
                      <td className="py-4">
                        <button
                          className="text-red-400 hover:underline"
                          onClick={() => removeFromCart(item.id)}
                          aria-label="Remove item"
                        >Remove</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-between items-center mt-8 gap-4">
                <button
                  className="px-4 py-2 rounded-lg border border-white/30 bg-white/20 backdrop-blur-md text-white font-semibold hover:bg-white/40 transition shadow"
                  onClick={clearCart}
                >
                  Clear Cart
                </button>
                <div className="flex items-center gap-4">
                  <div className="text-xl font-bold">Total: ${total.toFixed(2)}</div>
                  <button
                    className="px-6 py-3 rounded-lg bg-white text-black font-bold shadow hover:bg-gray-100 transition border border-white/40"
                    onClick={() => router.push('/checkout')}
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
      <footer className="border-t border-white/20 p-6 text-center text-xs text-white bg-neutral-800/60 backdrop-blur-md w-full mt-auto shadow-[0_-4px_16px_0_rgba(255,255,255,0.08)]">
        &copy; {new Date().getFullYear()} Rattrapage Digi. All rights reserved.
      </footer>
    </main>
  );
}