import Link from 'next/link';
import path from 'path';
import { promises as fs } from 'fs';
import { notFound } from 'next/navigation';

const PRODUCTS_PER_PAGE = 8;

async function getProducts() {
  const filePath = path.join(process.cwd(), 'prisma/products.json');
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data);
}

function getPageParam(searchParams: { [key: string]: string | string[] | undefined }) {
  const pageParam = searchParams?.page;
  if (!pageParam) return 1;
  if (Array.isArray(pageParam)) return parseInt(pageParam[0], 10) || 1;
  return parseInt(pageParam, 10) || 1;
}

function getSearchParam(searchParams: { [key: string]: string | string[] | undefined }) {
  const search = searchParams?.search;
  if (!search) return '';
  if (Array.isArray(search)) return search[0];
  return search;
}

export default async function ProductsPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const products = await getProducts();
  const searchQuery = getSearchParam(searchParams).toLowerCase();
  const filteredProducts = searchQuery
    ? products.filter((p: any) => p.name.toLowerCase().includes(searchQuery))
    : products;
  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);
  const currentPage = Math.max(1, Math.min(getPageParam(searchParams), totalPages));
  const startIdx = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIdx = startIdx + PRODUCTS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIdx, endIdx);

  if (currentPage > totalPages && totalPages !== 0) notFound();

  return (
    <main className="min-h-screen bg-white text-black flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center p-6 border-b border-gray-200">
        <h1 className="text-xl font-semibold tracking-wide">Vellux</h1>
        <nav>
          <ul className="flex space-x-6 text-sm font-medium">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/products">Products</Link></li>
            <li><Link href="/cart">Cart</Link></li>
            <li><Link href="/login">Login</Link></li>
          </ul>
        </nav>
      </header>

      {/* Products Grid Section */}
      <section className="flex-grow p-12 max-w-6xl mx-auto w-full">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Products</h2>
          {/* Search Bar */}
          <form className="flex" action="/products" method="get">
            <input
              type="text"
              name="search"
              defaultValue={getSearchParam(searchParams)}
              placeholder="Search products..."
              className="border border-gray-300 rounded-l px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button
              type="submit"
              className="px-4 py-2 border border-black border-l-0 rounded-r bg-black text-white font-medium hover:bg-gray-800 transition"
            >
              Search
            </button>
          </form>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {paginatedProducts.map(product => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="bg-white rounded-lg p-4 flex flex-col items-center text-center shadow transition-transform duration-200 transform hover:scale-105 hover:border-2 hover:border-black border border-transparent cursor-pointer"
              prefetch={false}
            >
              <img src={product.photo} alt={product.name} className="w-32 h-32 object-cover mb-4 rounded" />
              <h3 className="text-lg font-semibold mb-1 line-clamp-2">{product.name}</h3>
              <div className="font-bold mb-2">${product.price.toFixed(2)}</div>
            </Link>
          ))}
        </div>
        {/* Pagination Controls */}
        <div className="flex justify-center items-center gap-4 mt-12">
          <Link
            href={`/products?page=${currentPage - 1}${searchQuery ? `&search=${encodeURIComponent(getSearchParam(searchParams))}` : ''}`}
            className={`px-4 py-2 border rounded ${currentPage === 1 ? 'pointer-events-none opacity-50' : 'hover:bg-black hover:text-white transition'}`}
            aria-disabled={currentPage === 1}
          >
            Previous
          </Link>
          <span className="text-sm">Page {currentPage} of {totalPages}</span>
          <Link
            href={`/products?page=${currentPage + 1}${searchQuery ? `&search=${encodeURIComponent(getSearchParam(searchParams))}` : ''}`}
            className={`px-4 py-2 border rounded ${currentPage === totalPages ? 'pointer-events-none opacity-50' : 'hover:bg-black hover:text-white transition'}`}
            aria-disabled={currentPage === totalPages}
          >
            Next
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 p-6 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} Rattrapage Digi. All rights reserved.
      </footer>
    </main>
  );
} 