"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Header from "../../components/Header";

export default function OrdersHistoryPage() {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (status === "authenticated") {
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
    }
  }, [status]);

  if (status === "loading") return <div>Loading...</div>;
  if (status === "unauthenticated") return <div className="p-8 text-center text-red-600 font-bold">Please log in to view your orders.</div>;

  // Filter orders by product name
  const filteredOrders = orders.filter(order =>
    order.products.some((p: any) => p.name.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <main className="min-h-screen flex flex-col bg-transparent text-white relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/background.jpeg"
          alt="Background"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>
      <Header />
      <section className="flex flex-col items-center w-full max-w-4xl mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold mb-8 mt-8 text-white">Order History</h1>
        <input
          type="text"
          placeholder="Search by product name..."
          className="mb-8 px-4 py-2 rounded border border-white/20 bg-white/10 text-white w-full max-w-md"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {loading ? (
          <div>Loading orders...</div>
        ) : error ? (
          <div className="text-red-400 font-bold">{error}</div>
        ) : filteredOrders.length === 0 ? (
          <div className="text-white/70">No orders found.</div>
        ) : (
          <div className="w-full flex flex-col gap-8">
            {filteredOrders.map(order => (
              <div key={order.id} className="glassmorphic bg-white/10 border border-white/20 rounded-2xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="font-bold text-lg">Order #{order.id}</div>
                  <div className="text-white/70 text-sm">{new Date(order.creationDate).toLocaleString()}</div>
                </div>
                <ul className="mb-4">
                  {order.products.map((product: any, idx: number) => (
                    <li key={idx} className="flex items-center gap-4 py-2 border-b border-white/10 last:border-b-0">
                      <img src={product.photo} alt={product.name} className="w-12 h-12 object-cover rounded border border-white/20" />
                      <div className="flex-1">
                        <div className="font-semibold text-white">{product.name}</div>
                        <div className="text-white/70 text-sm">{product.description}</div>
                      </div>
                      <div className="font-bold text-white">${product.price.toFixed(2)}</div>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-end font-bold text-lg text-white">Total: ${order.totalPrice.toFixed(2)}</div>
              </div>
            ))}
          </div>
        )}
      </section>
      <footer className="border-t border-white/20 p-6 text-center text-xs text-white bg-neutral-800/60 backdrop-blur-md w-full mt-auto shadow-[0_-4px_16px_0_rgba(255,255,255,0.08)]">
        &copy; {new Date().getFullYear()} Rattrapage Digi. All rights reserved.
      </footer>
    </main>
  );
} 