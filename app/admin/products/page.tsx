"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Link from "next/link";

// Extend session.user type to include 'role', 'name', and 'email'
type UserWithRole = { role?: string; name?: string | null; email?: string | null };

export default function AdminProductsPage() {
  const { data: session, status } = useSession();

  // Extend session.user type to include 'role', 'name', and 'email'
  const user = session?.user as UserWithRole | undefined;

  const [products, setProducts] = useState<any[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [error, setError] = useState("");
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const selectedProduct = products.find((p) => p.id === selectedProductId) || products[0];
  const [editForm, setEditForm] = useState<any>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const PRODUCTS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = products.slice((currentPage - 1) * PRODUCTS_PER_PAGE, currentPage * PRODUCTS_PER_PAGE);

  useEffect(() => {
    if (user && (user.role === "admin" || user.role === "superadmin")) {
      setLoadingProducts(true);
      fetch("/api/products")
        .then(res => res.json())
        .then(data => {
          setProducts(data);
          setLoadingProducts(false);
        })
        .catch(() => {
          setError("Failed to load products");
          setLoadingProducts(false);
        });
    }
  }, [user]);

  useEffect(() => {
    if (selectedProduct && !isAdding) {
      setEditForm({ ...selectedProduct });
    } else if (isAdding) {
      setEditForm({
        name: '',
        price: '',
        description: '',
        photo: '',
      });
    }
  }, [selectedProductId, loadingProducts, isAdding]);

  if (status === "loading") return <div>Loading...</div>;
  if (!user || (user.role !== "admin" && user.role !== "superadmin")) {
    return <div className="p-8 text-center text-red-600 font-bold">Access Denied</div>;
  }

  return (
    <main className="min-h-screen flex flex-col bg-transparent text-white relative overflow-hidden">
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
      <div className="flex flex-col md:flex-row flex-1 w-full max-w-7xl mx-auto gap-8 p-4 md:p-8 flex-grow">
        {/* Left: Product Edit Form */}
        <section className="w-full md:max-w-md glassmorphic bg-white/10 border border-white/20 rounded-2xl shadow-lg p-4 md:p-6 flex flex-col mb-8 md:mb-0">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-extrabold text-white tracking-tight">{isAdding ? 'Add Product' : 'Edit Product'}</h2>
            <button
              type="button"
              className="px-4 py-2 rounded bg-green-700 text-white font-bold border border-green-700 shadow hover:bg-green-800 transition text-base focus:outline-none focus:ring-2 focus:ring-green-400"
              onClick={() => {
                setIsAdding(true);
                setSelectedProductId(null);
              }}
            >
              + New Product
            </button>
          </div>
          {editForm ? (
            <form className="flex flex-col gap-6">
              <label className="font-semibold text-white">Name
                <input
                  className="mt-1 w-full border border-white/20 rounded px-3 py-2 bg-white/10 text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={editForm.name || ''}
                  onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                />
              </label>
              <label className="font-semibold text-white">Price
                <input
                  type="number"
                  className="mt-1 w-full border border-white/20 rounded px-3 py-2 bg-white/10 text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={editForm.price || ''}
                  onChange={e => setEditForm({ ...editForm, price: parseFloat(e.target.value) })}
                />
              </label>
              <label className="font-semibold text-white">Description
                <textarea
                  className="mt-1 w-full border border-white/20 rounded px-3 py-2 min-h-[80px] bg-white/10 text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={editForm.description || ''}
                  onChange={e => setEditForm({ ...editForm, description: e.target.value })}
                />
              </label>
              <label className="font-semibold text-white">Image URL
                <input
                  className="mt-1 w-full border border-white/20 rounded px-3 py-2 bg-white/10 text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={editForm.photo || editForm.image || ''}
                  onChange={e => setEditForm({ ...editForm, photo: e.target.value })}
                />
              </label>
              <div className="flex gap-2 mt-4 flex-wrap">
                {isAdding ? (
                  <button
                    type="button"
                    className="px-4 py-2 rounded bg-green-700 text-white font-semibold hover:bg-green-800 transition focus:outline-none focus:ring-2 focus:ring-green-400"
                    onClick={() => {
                      const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
                      const newProduct = { ...editForm, id: newId };
                      setProducts([newProduct, ...products]);
                      setIsAdding(false);
                      setSelectedProductId(newId);
                      setFeedback('Product created!');
                      setTimeout(() => setFeedback(null), 2000);
                    }}
                  >
                    Create
                  </button>
                ) : (
                  <button type="button" className="px-4 py-2 rounded bg-blue-700 text-white font-semibold hover:bg-blue-800 transition focus:outline-none focus:ring-2 focus:ring-blue-400" onClick={() => { setFeedback('Product saved!'); setTimeout(() => setFeedback(null), 2000); }}>Save (demo)</button>
                )}
                <button
                  type="button"
                  className="px-4 py-2 rounded bg-white/10 text-white font-semibold hover:bg-white/20 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
                  onClick={() => {
                    if (isAdding) {
                      setIsAdding(false);
                      setEditForm(selectedProduct ? { ...selectedProduct } : null);
                    } else {
                      setEditForm({ ...selectedProduct });
                    }
                    setFeedback('Form reset.');
                    setTimeout(() => setFeedback(null), 2000);
                  }}
                >
                  Reset
                </button>
                {!isAdding && (
                  <button
                    type="button"
                    className="px-4 py-2 rounded bg-red-600 text-white font-semibold hover:bg-red-700 transition ml-auto focus:outline-none focus:ring-2 focus:ring-red-400"
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete this product?')) {
                        setProducts(products.filter(p => p.id !== selectedProduct.id));
                        setSelectedProductId(null);
                        setFeedback('Product deleted!');
                        setTimeout(() => setFeedback(null), 2000);
                      }
                    }}
                  >
                    Delete
                  </button>
                )}
              </div>
              {feedback && <div className="mt-4 text-center text-green-400 font-semibold animate-pulse">{feedback}</div>}
            </form>
          ) : (
            <div className="text-white/70">Select a product to edit.</div>
          )}
        </section>
        {/* Right: Product List */}
        <section className="flex-1 glassmorphic bg-white/10 rounded-2xl shadow-lg p-4 md:p-6 overflow-x-auto border-t md:border-t-0 md:border-l border-white/20">
          <h2 className="text-3xl font-extrabold mb-8 text-white tracking-tight">Products</h2>
          {loadingProducts ? (
            <div>Loading products...</div>
          ) : error ? (
            <div className="text-red-400 font-bold">{error}</div>
          ) : (
            <>
            <table className="w-full rounded-xl overflow-x-auto border border-white/20 shadow-md bg-white/10 text-white text-base md:text-lg">
                <thead>
                  <tr className="bg-white/10">
                    <th className="py-3 px-4 text-left">ID</th>
                    <th className="py-3 px-4 text-left">Image</th>
                    <th className="py-3 px-4 text-left">Name</th>
                    <th className="py-3 px-4 text-left">Price</th>
                  </tr>
                </thead>
                <tbody>
                 {paginatedProducts.map((product, idx) => (
                    <tr
                      key={product.id}
                      className={`border-t border-white/10 transition-colors cursor-pointer ${selectedProductId === product.id ? 'bg-white/20' : idx % 2 === 0 ? 'bg-transparent' : 'bg-white/10'} hover:bg-blue-900/20`}
                      onClick={() => setSelectedProductId(product.id)}
                    >
                      <td className="py-2 px-4 font-mono text-xs text-white/70">{product.id}</td>
                      <td className="py-2 px-4">
                        <img src={product.photo || product.image} alt={product.name} className="w-12 h-12 object-cover rounded shadow border border-white/20" />
                      </td>
                      <td className="py-2 px-4 font-semibold">
                        <Link href={`/products/${product.id}`} className="text-blue-300 underline hover:text-blue-100" target="_blank" rel="noopener noreferrer">
                          {product.name}
                        </Link>
                      </td>
                      <td className="py-2 px-4 font-semibold">${product.price.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            {/* Pagination Controls */}
            <div className="flex justify-center items-center gap-4 mt-6">
              <button
                className={`px-4 py-2 border border-white rounded bg-white/10 text-white ${currentPage === 1 ? 'pointer-events-none opacity-50' : 'hover:bg-white/20 hover:text-white transition'}`}
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="text-sm text-white/90 glassmorphic px-4 py-2 rounded border border-white/20">Page {currentPage} of {totalPages}</span>
              <button
                className={`px-4 py-2 border border-white rounded bg-white/10 text-white ${currentPage === totalPages ? 'pointer-events-none opacity-50' : 'hover:bg-white/20 hover:text-white transition'}`}
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
            </>
          )}
        </section>
      </div>
      <footer className="border-t border-white/20 p-6 text-center text-xs text-white bg-neutral-800/60 backdrop-blur-md w-full mt-auto shadow-[0_-4px_16px_0_rgba(255,255,255,0.08)]">
        &copy; {new Date().getFullYear()} Rattrapage Digi. All rights reserved.
      </footer>
    </main>
  );
} 