"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import GradientBody from '../components/GradientBody';
import Header from '../components/Header';
import PriceFilter from '../components/PriceFilter';
import { useCart } from '../context/CartContext';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  photo: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const { addToCart } = useCart();

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        // Convert string IDs to numbers
        const productsWithNumberIds = data.map((p: any) => ({
          ...p,
          id: Number(p.id)
        }));
        setProducts(productsWithNumberIds);
        setLoading(false);
      })
      .catch(err => {
        setError("Failed to load products");
        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPrice && matchesSearch;
  });

  return (
    <GradientBody>
      <main className="min-h-screen flex flex-col bg-transparent text-black relative overflow-hidden">
        <div aria-hidden="true" className="h-20 md:h-24 w-full"></div>
        <Header />
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Our Products
              </h1>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                Discover our premium gaming peripherals
              </p>
            </div>

            {/* Filters Section */}
            <div className="backdrop-blur-sm bg-white/10 rounded-xl p-6 mb-8 border border-white/20">
              <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
                <div className="w-full md:w-1/3">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="w-full md:w-2/3">
                  <PriceFilter
                    minPrice={minPrice}
                    maxPrice={maxPrice}
                    onMinPriceChange={setMinPrice}
                    onMaxPriceChange={setMaxPrice}
                  />
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {loading ? (
              <div className="text-center text-white text-xl">Loading products...</div>
            ) : error ? (
              <div className="text-center text-red-400 text-xl">{error}</div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center text-white text-xl">No products found</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="backdrop-blur-sm bg-white/10 rounded-xl border border-white/20 overflow-hidden transition-transform duration-300 hover:scale-105"
                  >
                    <div className="aspect-w-16 aspect-h-9 relative">
                      <img
                        src={product.photo}
                        alt={product.name}
                        className="w-full h-64 object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
                      <p className="text-gray-300 mb-4 line-clamp-2">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-white">${product.price}</span>
                        <div className="space-x-2">
                          <button
                            onClick={() => router.push(`/products/${product.id}`)}
                            className="px-4 py-2 bg-blue-600/20 text-blue-300 rounded-lg hover:bg-blue-600/30 transition-colors duration-200"
                          >
                            Details
                          </button>
                          <button
                            onClick={() => addToCart(product)}
                            className="px-4 py-2 bg-green-600/20 text-green-300 rounded-lg hover:bg-green-600/30 transition-colors duration-200"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </GradientBody>
  );
} 