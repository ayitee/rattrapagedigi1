"use client";
import React, { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import GradientBody from '../../components/GradientBody';
import Header from '../../components/Header';

const OrderHistoryPage = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/login");
    },
  });

  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/orders")
      .then(res => res.json())
      .then(data => {
        setOrders(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load orders");
        setLoading(false);
      });
  }, []);

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
                Order History
              </h1>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                View and track your orders
              </p>
            </div>

            {/* Orders List */}
            <div className="space-y-8">
              {loading ? (
                <div className="backdrop-blur-sm bg-white/10 rounded-xl p-8 border border-white/20 text-center">
                  <p className="text-white text-lg">Loading orders...</p>
                </div>
              ) : error ? (
                <div className="backdrop-blur-sm bg-white/10 rounded-xl p-8 border border-white/20 text-center">
                  <p className="text-red-400 text-lg font-semibold">{error}</p>
                </div>
              ) : orders.length === 0 ? (
                <div className="backdrop-blur-sm bg-white/10 rounded-xl p-8 border border-white/20 text-center">
                  <p className="text-gray-200 text-lg">No orders found</p>
                </div>
              ) : (
                orders.map((order) => (
                  <div key={order.id} className="backdrop-blur-sm bg-white/10 rounded-xl p-8 border border-white/20">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                      <div>
                        <h2 className="text-2xl font-bold text-white mb-2">Order #{order.id}</h2>
                        <p className="text-gray-300">{new Date(order.creationDate).toLocaleString()}</p>
                      </div>
                      <div className="mt-4 md:mt-0">
                        <span className="px-4 py-2 rounded-full bg-blue-500/20 text-blue-300 font-semibold">
                          {order.status || "Processing"}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {order.products.map((product: any, idx: number) => (
                        <div key={idx} className="flex flex-col md:flex-row items-start md:items-center gap-4 py-4 border-b border-white/10 last:border-b-0">
                          <div className="flex-shrink-0">
                            <img
                              src={product.photo}
                              alt={product.name}
                              className="w-24 h-24 object-cover rounded-lg border border-white/20"
                            />
                          </div>
                          <div className="flex-grow">
                            <h3 className="text-lg font-semibold text-white mb-2">{product.name}</h3>
                            <p className="text-gray-300">{product.description}</p>
                          </div>
                          <div className="text-xl font-bold text-white">${product.price.toFixed(2)}</div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 pt-6 border-t border-white/10">
                      <div className="flex justify-between items-center">
                        <span className="text-lg text-gray-200">Total</span>
                        <span className="text-2xl font-bold text-white">${order.totalPrice.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </GradientBody>
  );
};

export default OrderHistoryPage; 