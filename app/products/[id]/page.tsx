'use client';
import { notFound } from 'next/navigation';
import Header from '../../components/Header';
import { useCart } from '../../context/CartContext';
import { useState, useEffect } from 'react';
import GradientBody from '../../components/GradientBody';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  photo: string;
  type: string;
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showAdded, setShowAdded] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(false);
    fetch(`/api/products/${params.id}`)
      .then(res => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [params.id]);

  if (loading) {
    return (
      <GradientBody>
        <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>
      </GradientBody>
    );
  }
  if (error || !product) {
    return notFound();
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setShowAdded(product.name);
    setTimeout(() => setShowAdded(null), 2000);
  };

  return (
    <GradientBody>
      <Header />
      <main className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Main Product Section */}
          <div className="grid md:grid-cols-2 gap-12 items-start backdrop-blur-sm bg-white/10 p-8 rounded-2xl border border-white/20">
            {/* Image */}
            <div className="flex justify-center items-center">
              <img src={product.photo} alt={product.name} className="w-full max-w-sm h-auto object-cover rounded-lg" />
            </div>
            
            {/* Info */}
            <div className="flex flex-col h-full">
              <h1 className="text-3xl font-bold text-white mb-3">{product.name}</h1>
              <div className="text-2xl font-semibold text-white/90 mb-6">${product.price.toFixed(2)}</div>
              
              <div className="mb-6 flex items-center gap-4">
                <label className="text-white font-medium">Quantity</label>
                <div className="flex items-center gap-2">
                  <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center font-bold text-lg hover:bg-white/20 transition">-</button>
                  <span className="w-12 text-center text-white font-semibold">{quantity}</span>
                  <button onClick={() => setQuantity(q => q + 1)} className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center font-bold text-lg hover:bg-white/20 transition">+</button>
                </div>
              </div>
              
              <button
                className="w-full px-6 py-3 bg-blue-600/20 text-blue-300 rounded-lg hover:bg-blue-600/30 transition-colors duration-200 font-semibold"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
              
              {showAdded && (
                <div className="mt-4 px-4 py-2 bg-green-500/20 text-green-300 rounded-lg text-center font-semibold animate-fade-in border border-green-500/30">
                  {showAdded} added to cart
                </div>
              )}
            </div>
          </div>
          
          {/* Description */}
          <div className="mt-10 backdrop-blur-sm bg-white/10 p-8 rounded-2xl border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-4">Description</h2>
            <p className="text-white/80 text-base md:text-lg whitespace-pre-line">{product.description}</p>
          </div>
          
        </div>
      </main>
    </GradientBody>
  );
} 