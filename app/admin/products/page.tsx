"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import GradientBody from "../../components/GradientBody";
import Header from "../../components/Header";

interface User {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string;
}

interface CustomSession {
  user?: User;
  expires: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  photo: string;
  type: string;
}

export default function AdminProductsPage() {
  const { data: session, status } = useSession() as { data: CustomSession | null; status: string };
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [editForm, setEditForm] = useState<Partial<Product>>({});
  const [isAdding, setIsAdding] = useState(true);
  const [feedback, setFeedback] = useState<string>("");

  useEffect(() => {
    if (status === "unauthenticated" || (session?.user?.role !== "admin" && session?.user?.role !== "superadmin")) {
      window.location.href = "/";
    } else if (status === "authenticated") {
      fetchProducts();
    }
  }, [status, session]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/products?all=true`);
      const data = await response.json();
      if (!data || !data.data) throw new Error("Invalid data format");
      setProducts(data.data);
      setError(null);
    } catch (err) {
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!isAdding && !selectedProduct?.id) {
      setFeedback("No product selected for editing.");
      return;
    }
    try {
      const method = isAdding ? "POST" : "PUT";
      const url = isAdding ? "/api/products" : `/api/products/${selectedProduct!.id}`;
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });

      if (!response.ok) throw new Error("Failed to save product");

      const savedProduct = await response.json();
      if (isAdding) {
        setProducts([...products, savedProduct]);
      } else {
        setProducts(products.map(p => p.id === savedProduct.id ? savedProduct : p));
      }

      setFeedback(isAdding ? "Product created successfully!" : "Product updated successfully!");
      setIsAdding(true);
      setSelectedProduct(null);
      setEditForm({});
      setTimeout(() => setFeedback(""), 3000);
    } catch (err) {
      setFeedback("Error saving product. Please try again.");
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete product");

      setProducts(products.filter(p => p.id !== id));
      setSelectedProduct(null);
      setEditForm({});
      setFeedback("Product deleted successfully!");
      setTimeout(() => setFeedback(""), 3000);
    } catch (err) {
      setFeedback("Error deleting product. Please try again.");
    }
  };

  if (status === "loading" || loading) {
    return (
      <GradientBody>
        <main className="min-h-screen flex flex-col bg-transparent text-black relative overflow-hidden">
          <div aria-hidden="true" className="h-20 md:h-24 w-full"></div>
          <Header />
          <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="backdrop-blur-sm bg-white/10 rounded-xl p-8 border border-white/20 text-center">
                <p className="text-xl text-gray-200">Loading...</p>
              </div>
            </div>
          </div>
        </main>
      </GradientBody>
    );
  }

  if (!session || (session.user?.role !== "admin" && session.user?.role !== "superadmin")) {
    return null;
  }

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
                Product Management
              </h1>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                Add, edit, or remove products from your store
              </p>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Product Form */}
              <div className="lg:col-span-1">
                <div className="backdrop-blur-sm bg-white/10 rounded-xl p-8 border border-white/20">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white">
                      {isAdding ? "Add Product" : "Edit Product"}
                    </h2>
                    <button
                      onClick={() => {
                        setIsAdding(true);
                        setSelectedProduct(null);
                        setEditForm({});
                      }}
                      className="px-4 py-2 bg-green-600/20 text-green-300 rounded-lg hover:bg-green-600/30 transition-colors duration-200 font-semibold"
                    >
                      + New
                    </button>
                  </div>

                  <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        value={editForm.name || ""}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter product name"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2">
                        Price
                      </label>
                      <input
                        type="number"
                        value={editForm.price || ""}
                        onChange={(e) => setEditForm({ ...editForm, price: Number(e.target.value) })}
                        className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter price"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2">
                        Description
                      </label>
                      <textarea
                        value={editForm.description || ""}
                        onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                        placeholder="Enter product description"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2">
                        Photo URL
                      </label>
                      <input
                        type="text"
                        value={editForm.photo || ""}
                        onChange={(e) => setEditForm({ ...editForm, photo: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter photo URL"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2">
                        Type
                      </label>
                      <select
                        value={editForm.type || ""}
                        onChange={(e) => setEditForm({ ...editForm, type: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        <option value="" disabled>Select type</option>
                        <option value="keyboard">Keyboard</option>
                        <option value="mouse">Mouse</option>
                        <option value="mousepad">Mousepad</option>
                        <option value="accessory">Accessory</option>
                        <option value="audio">Audio</option>
                      </select>
                    </div>

                    <div className="flex gap-4">
                      <button
                        type="submit"
                        className="flex-1 px-6 py-3 bg-blue-600/20 text-blue-300 rounded-lg hover:bg-blue-600/30 transition-colors duration-200 font-semibold"
                      >
                        {isAdding ? "Create" : "Save"}
                      </button>
                      {!isAdding && selectedProduct && (
                        <button
                          type="button"
                          onClick={() => handleDelete(selectedProduct.id)}
                          className="px-6 py-3 bg-red-600/20 text-red-300 rounded-lg hover:bg-red-600/30 transition-colors duration-200 font-semibold"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </form>

                  {feedback && (
                    <div className={`mt-4 p-4 rounded-lg text-center ${feedback.includes("Error") ? "bg-red-500/20 text-red-300" : "bg-green-500/20 text-green-300"}`}>
                      {feedback}
                    </div>
                  )}
                </div>
              </div>

              {/* Products List */}
              <div className="lg:col-span-2">
                <div className="backdrop-blur-sm bg-white/10 rounded-xl border border-white/20 overflow-hidden">
                  {error ? (
                    <div className="p-8 text-center text-red-300">{error}</div>
                  ) : (
                    <div className="divide-y divide-white/10">
                      {products.map((product) => (
                        <div
                          key={product.id}
                          className={`p-6 flex items-center gap-6 cursor-pointer transition-colors ${
                            selectedProduct?.id === product.id
                              ? "bg-white/20"
                              : "hover:bg-white/10"
                          }`}
                          onClick={() => {
                            setSelectedProduct(product);
                            setEditForm(product);
                            setIsAdding(false);
                          }}
                        >
                          <img
                            src={product.photo}
                            alt={product.name}
                            className="w-20 h-20 object-cover ro safunded-lg border border-white/20"
                          />
                          <div className="flex-grow">
                            <h3 className="text-lg font-semibold text-white">
                              {product.name}
                            </h3>
                            <p className="text-gray-300 line-clamp-1">
                              {product.description}
                            </p>
                          </div>
                          <div className="text-xl font-bold text-white">
                            ${product.price}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </GradientBody>
  );
} 