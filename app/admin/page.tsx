"use client";
import Header from "../components/Header";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const userRole = (session?.user as any)?.role;
  const [tab, setTab] = useState<'products' | 'users'>('products');

  // --- Product Management State/Logic ---
  const [products, setProducts] = useState<any[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [productError, setProductError] = useState("");
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const selectedProduct = products.find((p) => p.id === selectedProductId) || products[0];
  const [editForm, setEditForm] = useState<any>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [productFeedback, setProductFeedback] = useState<string | null>(null);
  const PRODUCTS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = products.slice((currentPage - 1) * PRODUCTS_PER_PAGE, currentPage * PRODUCTS_PER_PAGE);

  useEffect(() => {
    if (userRole === "admin" || userRole === "superadmin") {
      setLoadingProducts(true);
      fetch("/api/products")
        .then(res => res.json())
        .then(data => {
          setProducts(data);
          setLoadingProducts(false);
        })
        .catch(() => {
          setProductError("Failed to load products");
          setLoadingProducts(false);
        });
    }
  }, [userRole]);

  useEffect(() => {
    if (selectedProduct && !isAdding) {
      setEditForm({ ...selectedProduct });
    } else if (isAdding) {
      setEditForm({ name: '', price: '', description: '', photo: '' });
    }
  }, [selectedProductId, loadingProducts, isAdding]);

  // --- User Management State/Logic ---
  const [users, setUsers] = useState<any[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [userError, setUserError] = useState("");
  const [editUserId, setEditUserId] = useState<number | null>(null);
  const [editUserForm, setEditUserForm] = useState<any>({});
  const [userFeedback, setUserFeedback] = useState<string | null>(null);

  useEffect(() => {
    if (userRole === "admin" || userRole === "superadmin") {
      fetch("/api/users")
        .then(res => res.json())
        .then(data => {
          setUsers(data);
          setLoadingUsers(false);
        })
        .catch(() => {
          setUserError("Failed to load users");
          setLoadingUsers(false);
        });
    }
  }, [userRole]);

  const handleEditUser = (user: any) => {
    setEditUserId(user.id);
    setEditUserForm({ ...user });
  };
  const handleCancelUser = () => {
    setEditUserId(null);
    setEditUserForm({});
  };
  const handleSaveUser = async () => {
    setUserFeedback(null);
    const res = await fetch("/api/users", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editUserForm),
    });
    const data = await res.json();
    if (res.ok) {
      setUsers(users.map(u => u.id === editUserForm.id ? { ...u, ...editUserForm } : u));
      setEditUserId(null);
      setUserFeedback("User updated!");
    } else {
      setUserFeedback(data.error || "Failed to update user");
    }
  };

  if (status === "loading") return <div>Loading...</div>;
  if (!session || (userRole !== "admin" && userRole !== "superadmin")) {
    return <div className="p-8 text-center text-red-600 font-bold">Access Denied</div>;
  }

  return (
    <main className="min-h-screen flex flex-col bg-transparent text-white relative overflow-hidden">
      <div aria-hidden="true" className="h-20 md:h-24 w-full"></div>
      <div className="absolute inset-0 -z-10">
        <img src="/background.jpeg" alt="Background" className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-black/30" />
      </div>
      <Header />
      <div className="max-w-7xl mx-auto w-full p-8">
        <h1 className="text-3xl font-bold mb-8 text-white">Admin Dashboard</h1>
        <div className="flex gap-4 mb-8">
          <button onClick={() => setTab('products')} className={`px-6 py-2 rounded-t-lg font-bold text-lg transition ${tab === 'products' ? 'bg-white/20 text-white border-b-2 border-blue-400' : 'bg-white/10 text-white/70 hover:bg-white/20'}`}>Produits</button>
          <button onClick={() => setTab('users')} className={`px-6 py-2 rounded-t-lg font-bold text-lg transition ${tab === 'users' ? 'bg-white/20 text-white border-b-2 border-blue-400' : 'bg-white/10 text-white/70 hover:bg-white/20'}`}>Utilisateurs</button>
        </div>
        <div className="bg-white/10 rounded-b-2xl p-6 border border-white/20 shadow-lg">
          {tab === 'products' && (
            <div className="flex flex-col md:flex-row gap-8">
              {/* Product Edit Form */}
              <section className="w-full md:max-w-md">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-extrabold text-white tracking-tight">{isAdding ? 'Add Product' : 'Edit Product'}</h2>
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
                            setProductFeedback('Product created!');
                            setTimeout(() => setProductFeedback(null), 2000);
                          }}
                        >
                          Create
                        </button>
                      ) : (
                        <button type="button" className="px-4 py-2 rounded bg-blue-700 text-white font-semibold hover:bg-blue-800 transition focus:outline-none focus:ring-2 focus:ring-blue-400" onClick={() => { setProductFeedback('Product saved!'); setTimeout(() => setProductFeedback(null), 2000); }}>Save (demo)</button>
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
                          setProductFeedback('Form reset.');
                          setTimeout(() => setProductFeedback(null), 2000);
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
                              setProductFeedback('Product deleted!');
                              setTimeout(() => setProductFeedback(null), 2000);
                            }
                          }}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                    {productFeedback && <div className="mt-4 text-center text-green-400 font-semibold animate-pulse">{productFeedback}</div>}
                  </form>
                ) : (
                  <div className="text-white/70">Select a product to edit.</div>
                )}
              </section>
              {/* Product List */}
              <section className="flex-1">
                <h2 className="text-2xl font-extrabold mb-8 text-white tracking-tight">Products</h2>
                {loadingProducts ? (
                  <div>Loading products...</div>
                ) : productError ? (
                  <div className="text-red-400 font-bold">{productError}</div>
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
                              <a href={`/products/${product.id}`} className="text-blue-300 underline hover:text-blue-100" target="_blank" rel="noopener noreferrer">
                                {product.name}
                              </a>
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
          )}
          {tab === 'users' && (
            <div>
              <h2 className="text-2xl font-extrabold mb-8 text-white tracking-tight">Users</h2>
              {loadingUsers ? (
                <div>Loading users...</div>
              ) : userError ? (
                <div className="text-red-400 font-bold">{userError}</div>
              ) : (
                <table className="w-full rounded-xl overflow-x-auto border border-white/20 shadow-md bg-white/10 text-white text-base md:text-lg">
                  <thead>
                    <tr className="bg-white/10">
                      <th className="py-3 px-4 text-left">ID</th>
                      <th className="py-3 px-4 text-left">Name</th>
                      <th className="py-3 px-4 text-left">Email</th>
                      <th className="py-3 px-4 text-left">Role</th>
                      <th className="py-3 px-4 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user.id} className="border-t border-white/10">
                        <td className="py-2 px-4 font-mono text-xs text-white/70">{user.id}</td>
                        <td className="py-2 px-4">
                          {editUserId === user.id ? (
                            <input className="w-full border border-white/20 rounded px-2 py-1 bg-white/10 text-white" value={editUserForm.name || ""} onChange={e => setEditUserForm({ ...editUserForm, name: e.target.value })} />
                          ) : user.name}
                        </td>
                        <td className="py-2 px-4">
                          {editUserId === user.id ? (
                            <input className="w-full border border-white/20 rounded px-2 py-1 bg-white/10 text-white" value={editUserForm.email || ""} onChange={e => setEditUserForm({ ...editUserForm, email: e.target.value })} />
                          ) : user.email}
                        </td>
                        <td className="py-2 px-4">
                          {editUserId === user.id ? (
                            <select className="w-full border border-white/20 rounded px-2 py-1 bg-white/10 text-white" value={editUserForm.role || "user"} onChange={e => setEditUserForm({ ...editUserForm, role: e.target.value })}>
                              <option value="user">user</option>
                              <option value="admin">admin</option>
                              <option value="superadmin">superadmin</option>
                            </select>
                          ) : user.role}
                        </td>
                        <td className="py-2 px-4">
                          {editUserId === user.id ? (
                            <>
                              <button className="px-3 py-1 rounded bg-blue-700 text-white font-bold border border-blue-700 shadow hover:bg-blue-800 transition text-sm mr-2" onClick={handleSaveUser}>Save</button>
                              <button className="px-3 py-1 rounded bg-white/10 text-white border border-white/20 hover:bg-white/20 transition text-sm" onClick={handleCancelUser}>Cancel</button>
                            </>
                          ) : (
                            <button className="px-3 py-1 rounded bg-white/10 text-white border border-white/20 hover:bg-white/20 transition text-sm" onClick={() => handleEditUser(user)}>Edit</button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {userFeedback && <div className="mt-4 text-center text-green-400 font-semibold animate-pulse">{userFeedback}</div>}
            </div>
          )}
        </div>
      </div>
    </main>
  );
} 