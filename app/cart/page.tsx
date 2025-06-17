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
    <main className="min-h-screen flex flex-col bg-white text-black">
      <Header />
      <section className="flex flex-col items-center w-full max-w-[80vw] mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold mb-8 mt-8">Your Cart</h1>
        {cart.length === 0 ? (
          <div className="text-lg text-gray-600 mb-12">Your cart is empty. <Link href="/products" className="text-black underline">Shop now</Link></div>
        ) : (
          <div className="w-full bg-gray-50 border border-gray-200 rounded-lg shadow-md px-4 py-8 pb-24">
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
                  <tr key={item.id} className="border-b align-middle">
                    <td className="py-4 flex items-center gap-4">
                      <img src={item.photo} alt={item.name} className="w-16 h-16 object-cover rounded" />
                      <span className="font-medium">{item.name}</span>
                    </td>
                    <td className="py-4">${item.price.toFixed(2)}</td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <button
                          className="px-2 py-1 border rounded bg-white hover:bg-gray-100"
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          aria-label="Decrease quantity"
                        >-</button>
                        <span className="px-2">{item.quantity}</span>
                        <button
                          className="px-2 py-1 border rounded bg-white hover:bg-gray-100"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          aria-label="Increase quantity"
                        >+</button>
                      </div>
                    </td>
                    <td className="py-4">${(item.price * item.quantity).toFixed(2)}</td>
                    <td className="py-4">
                      <button
                        className="text-red-600 hover:underline"
                        onClick={() => removeFromCart(item.id)}
                        aria-label="Remove item"
                      >Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-between items-center mt-8">
              <button
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-black font-semibold"
                onClick={clearCart}
              >
                Clear Cart
              </button>
              <div className="text-xl font-bold">Total: ${total.toFixed(2)}</div>
            </div>
            <div className="flex justify-end mt-8">
              <button
                className="px-6 py-3 bg-black text-white rounded font-semibold hover:bg-gray-800 transition"
                onClick={() => alert('Checkout coming soon!')}
              >
                Checkout
              </button>
            </div>
            <div className="h-8" />
          </div>
        )}
      </section>
      <footer className="border-t border-gray-200 p-6 text-center text-xs text-gray-500 w-full mt-auto">
        &copy; {new Date().getFullYear()} Rattrapage Digi. All rights reserved.
      </footer>
    </main>
  );
}