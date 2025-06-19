"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import GradientBody from '../components/GradientBody';
import Header from '../components/Header';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const router = useRouter();
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    try {
      const response = await fetch('/api/checkout_sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: cart }),
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();
      router.push(data.url);
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  return (
    <GradientBody>
      <main className="min-h-screen flex flex-col bg-transparent text-black relative overflow-hidden">
        <div aria-hidden="true" className="h-20 md:h-24 w-full"></div>
        <Header />
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Shopping Cart
              </h1>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                Review and manage your selected items
              </p>
            </div>

            {/* Cart Content */}
            <div className="space-y-8">
              {cart.length === 0 ? (
                <div className="backdrop-blur-sm bg-white/10 rounded-xl p-8 border border-white/20 text-center">
                  <p className="text-xl text-gray-200 mb-6">Your cart is empty</p>
                  <button
                    onClick={() => router.push('/products')}
                    className="px-6 py-3 bg-blue-600/20 text-blue-300 rounded-lg hover:bg-blue-600/30 transition-colors duration-200 font-semibold"
                  >
                    Browse Products
                  </button>
                </div>
              ) : (
                <>
                  {/* Cart Items */}
                  <div className="backdrop-blur-sm bg-white/10 rounded-xl border border-white/20 overflow-hidden">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="p-6 flex flex-col md:flex-row items-start md:items-center gap-4 border-b border-white/10 last:border-b-0"
                      >
                        <div className="flex-shrink-0">
                          <img
                            src={item.photo}
                            alt={item.name}
                            className="w-24 h-24 object-cover rounded-lg border border-white/20"
                          />
                        </div>
                        <div className="flex-grow">
                          <h3 className="text-lg font-semibold text-white mb-4">{item.name}</h3>
                          <div className="flex flex-wrap items-center gap-4">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                              >
                                -
                              </button>
                              <span className="text-white font-medium w-8 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                              >
                                +
                              </button>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-400 hover:text-red-300 transition-colors"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                        <div className="text-xl font-bold text-white">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Cart Summary */}
                  <div className="backdrop-blur-sm bg-white/10 rounded-xl p-8 border border-white/20">
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-xl text-gray-200">Total</span>
                      <span className="text-3xl font-bold text-white">${total.toFixed(2)}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button
                        onClick={clearCart}
                        className="px-6 py-3 bg-red-600/20 text-red-300 rounded-lg hover:bg-red-600/30 transition-colors duration-200 font-semibold flex-1 sm:flex-none"
                      >
                        Clear Cart
                      </button>
                      <button
                        onClick={handleCheckout}
                        className="px-6 py-3 bg-green-600/20 text-green-300 rounded-lg hover:bg-green-600/30 transition-colors duration-200 font-semibold flex-1"
                      >
                        Proceed to Checkout
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </GradientBody>
  );
}