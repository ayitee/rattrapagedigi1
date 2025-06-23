"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import GradientBody from '../components/GradientBody';
import Header from '../components/Header';
import PriceFilter from '../components/PriceFilter';
import { useCart } from '../context/CartContext';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  photo: string;
  type: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [highestPrice, setHighestPrice] = useState(1000);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState('id-asc');
  const router = useRouter();
  const { addToCart } = useCart();

  useEffect(() => {
    setLoading(true);
    const [sortBy, sortOrder] = sortOption.split('-');
    fetch(`/api/products?page=${currentPage}&limit=12&sortBy=${sortBy}&sortOrder=${sortOrder}`)
      .then(res => res.json())
      .then(data => {
        if (!data || !data.data) throw new Error("Invalid data format");

        const productsWithNumberIds = data.data.map((p: any) => ({
          ...p,
          id: Number(p.id)
        }));
        setProducts(productsWithNumberIds);
        setTotalPages(Math.ceil(data.total / 12));

        if (currentPage === 1 && productsWithNumberIds.length > 0) {
          const maxProductPrice = Math.max(...productsWithNumberIds.map((p: Product) => p.price));
          setHighestPrice(maxProductPrice);
          setMaxPrice(maxProductPrice);
        }

        setLoading(false);
      })
      .catch(err => {
        setError("Failed to load products");
        setLoading(false);
      });
  }, [currentPage, sortOption]);

  const productTypes = Array.from(new Set(products.map(p => p.type)));

  const filteredProducts = products.filter(product => {
    const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType ? product.type === selectedType : true;
    return matchesPrice && matchesSearch && matchesType;
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                {/* Left Side: Search, Sort, Price */}
                <div className="flex flex-col gap-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="search-input" className="block text-sm font-medium text-gray-200 mb-2">Search</label>
                      <input id="search-input" type="text" placeholder="Search products..." className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                    </div>
                    <div>
                      <label htmlFor="sort-select" className="block text-sm font-medium text-gray-200 mb-2">Sort by</label>
                      <div className="relative">
                        <select
                          id="sort-select"
                          value={sortOption}
                          onChange={(e) => setSortOption(e.target.value)}
                          className="appearance-none w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
                        >
                          <option value="id-asc" className="bg-gray-800">Relevance</option>
                          <option value="price-asc" className="bg-gray-800">Price: Low to High</option>
                          <option value="price-desc" className="bg-gray-800">Price: High to Low</option>
                          <option value="name-asc" className="bg-gray-800">Name: A to Z</option>
                          <option value="name-desc" className="bg-gray-800">Name: Z to A</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <PriceFilter minPrice={minPrice} maxPrice={maxPrice} highestPrice={highestPrice} onMinPriceChange={setMinPrice} onMaxPriceChange={setMaxPrice} />
                  </div>
                </div>

                {/* Right Side: Type Filters */}
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Filter by Type</label>
                  <div className="flex flex-wrap gap-2">
                    <button onClick={() => setSelectedType(null)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${!selectedType ? 'bg-blue-600/30 text-blue-200' : 'bg-white/10 text-gray-200 hover:bg-white/20'}`}>
                      All
                    </button>
                    {productTypes.map(type => (
                      <button key={type} onClick={() => setSelectedType(type)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${selectedType === type ? 'bg-blue-600/30 text-blue-200' : 'bg-white/10 text-gray-200 hover:bg-white/20'}`}>
                        {type}
                      </button>
                    ))}
                  </div>
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
                  <Link href={`/products/${product.id}`} key={product.id}>
                    <div
                      className="cursor-pointer backdrop-blur-sm bg-white/10 rounded-xl border border-white/20 overflow-hidden transition-transform duration-300 hover:scale-105 h-full flex flex-col"
                    >
                      <div className="aspect-w-16 aspect-h-9 relative">
                        <img
                          src={product.photo}
                          alt={product.name}
                          className="w-full h-64 object-contain"
                        />
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <h3 className="text-xl font-bold text-white mb-2">{product.name.replace(/ATK\s/g, '')}</h3>
                        <p className="text-gray-300 mb-4 line-clamp-2 flex-grow">{product.description}</p>
                        <div className="flex items-center justify-between mt-auto">
                          <span className="text-2xl font-bold text-white">${product.price}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent navigation
                              e.preventDefault(); // Prevent default link behavior
                              addToCart(product);
                            }}
                            className="px-4 py-2 bg-green-600/20 text-green-300 rounded-lg hover:bg-green-600/30 transition-colors duration-200 z-10"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
            {/* Pagination Controls */}
            <div className="flex justify-center items-center mt-12 gap-4">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="text-white">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </main>
    </GradientBody>
  );
} 