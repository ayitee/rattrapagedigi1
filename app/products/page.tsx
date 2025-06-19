import Link from 'next/link';
import path from 'path';
import { promises as fs } from 'fs';
import { notFound } from 'next/navigation';
import Header from '../components/Header';

const PRODUCTS_PER_PAGE = 8;

async function getProducts() {
  try {
    const filePath = path.join(process.cwd(), 'prisma/products.json');
    console.log('Reading products from:', filePath);
    const data = await fs.readFile(filePath, 'utf-8');
    const products = JSON.parse(data);
    console.log('Loaded products:', products.length);
    return products;
  } catch (err) {
    console.error('Error loading products.json:', err);
    return [];
  }
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

function getTypeParam(searchParams: { [key: string]: string | string[] | undefined }) {
  const type = searchParams?.type;
  if (!type) return '';
  if (Array.isArray(type)) return type[0];
  return type;
}

function getMinPriceParam(searchParams: { [key: string]: string | string[] | undefined }) {
  const min = searchParams?.minPrice;
  if (!min) return '';
  if (Array.isArray(min)) return min[0];
  return min;
}

function getMaxPriceParam(searchParams: { [key: string]: string | string[] | undefined }) {
  const max = searchParams?.maxPrice;
  if (!max) return '';
  if (Array.isArray(max)) return max[0];
  return max;
}

export default async function ProductsPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const products = await getProducts();
  const searchQuery = getSearchParam(searchParams).toLowerCase();
  const typeQuery = getTypeParam(searchParams);
  // Get unique types from products
  const types = Array.from(new Set(products.map((p: any) => p.type)));
  const minPrice = Math.floor(Math.min(...products.map((p: any) => p.price)));
  const maxPrice = Math.ceil(Math.max(...products.map((p: any) => p.price)));
  const minPriceQuery = getMinPriceParam(searchParams);
  const maxPriceQuery = getMaxPriceParam(searchParams);
  const selectedMin = minPriceQuery ? Number(minPriceQuery) : minPrice;
  const selectedMax = maxPriceQuery ? Number(maxPriceQuery) : maxPrice;
  const filteredProducts = products.filter((p: any) => {
    const matchesSearch = searchQuery ? p.name.toLowerCase().includes(searchQuery) : true;
    const matchesType = typeQuery ? p.type === typeQuery : true;
    const matchesMin = p.price >= selectedMin;
    const matchesMax = p.price <= selectedMax;
    return matchesSearch && matchesType && matchesMin && matchesMax;
  });
  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);
  const currentPage = Math.max(1, Math.min(getPageParam(searchParams), totalPages));
  const startIdx = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIdx = startIdx + PRODUCTS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIdx, endIdx);

  if (currentPage > totalPages && totalPages !== 0) notFound();

  return (
    <main className="min-h-screen bg-transparent text-black flex flex-col relative overflow-hidden gradient-background">
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

      {/* Header */}
      <Header />

      {/* Products Grid Section */}
      <section className="flex-grow px-2 py-12 max-w-[90vw] mx-auto w-full flex flex-col gap-8">
        {/* Collapsible Filters Dropdown */}
        <div className="max-w-2xl w-full mx-auto mb-8">
          <details className="glassmorphic p-6 rounded-2xl shadow-lg border border-white/20 group" open>
            <summary className="flex items-center gap-2 text-lg font-semibold text-white cursor-pointer select-none outline-none focus:ring-2 focus:ring-white px-3 py-2 rounded mb-4 transition-colors group-open:bg-white/10 hover:bg-white/10">
              <span className="tracking-wide">Filters</span>
              <span className="ml-1 flex items-center">
                <img
                  src="/icons/chevron-down.png"
                  alt="Show filters"
                  className="w-5 h-5 transition-transform duration-200 group-open:rotate-180"
                  style={{ transform: 'rotate(var(--chevron-rotation, 0deg))' }}
                />
              </span>
            </summary>
            <form action="/products" method="get" className="flex flex-col gap-6">
              <div>
                <h3 className="text-lg font-bold mb-2 text-white">Product Type</h3>
                <ul className="space-y-2 mb-4">
                  <li>
                    {(() => {
                      const allQuery: Record<string, string> = {};
                      Object.entries(searchParams).forEach(([key, value]) => {
                        if (typeof value === 'string') allQuery[key] = value;
                      });
                      allQuery.page = '1';
                      return (
                        <Link
                          href={{ pathname: '/products', query: allQuery }}
                          className={`block px-4 py-2 rounded transition font-medium ${!typeQuery ? 'bg-white/20 text-white' : 'hover:bg-white/10 text-white/80'}`}
                        >
                          All
                        </Link>
                      );
                    })()}
                  </li>
                  {types.map((type: any) => {
                    const typeQueryObj: Record<string, string> = {};
                    Object.entries(searchParams).forEach(([key, value]) => {
                      if (typeof value === 'string') typeQueryObj[key] = value;
                    });
                    typeQueryObj.type = type;
                    typeQueryObj.page = '1';
                    return (
                      <li key={type}>
                        <Link
                          href={{ pathname: '/products', query: typeQueryObj }}
                          className={`block px-4 py-2 rounded transition font-medium ${typeQuery === type ? 'bg-white/20 text-white' : 'hover:bg-white/10 text-white/80'}`}
                        >
                          {type}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2 text-white">Price Range</h3>
                <div className="flex items-center justify-between text-sm mb-2 text-white">
                  <span>${selectedMin}</span>
                  <span>${selectedMax}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <input
                    type="range"
                    name="minPrice"
                    min={minPrice}
                    max={selectedMax}
                    defaultValue={selectedMin}
                    className="custom-black-slider"
                    step="1"
                  />
                  <input
                    type="range"
                    name="maxPrice"
                    min={selectedMin}
                    max={maxPrice}
                    defaultValue={selectedMax}
                    className="custom-black-slider"
                    step="1"
                  />
                </div>
                <div className="flex items-center justify-between mt-4 mb-2">
                  <div className="flex items-center border border-gray-400 rounded px-2 py-1 bg-white/10">
                    <span className="text-gray-200 mr-1">$</span>
                    <input
                      type="number"
                      name="minPrice"
                      min={minPrice}
                      max={selectedMax}
                      defaultValue={selectedMin}
                      className="w-16 text-center outline-none bg-transparent text-white"
                    />
                  </div>
                  <span className="mx-2 text-gray-200">to</span>
                  <div className="flex items-center border border-gray-400 rounded px-2 py-1 bg-white/10">
                    <span className="text-gray-200 mr-1">$</span>
                    <input
                      type="number"
                      name="maxPrice"
                      min={selectedMin}
                      max={maxPrice}
                      defaultValue={selectedMax}
                      className="w-16 text-center outline-none bg-transparent text-white"
                    />
                  </div>
                </div>
                <button type="submit" className="mt-3 w-full px-4 py-2 rounded bg-white/20 text-white font-medium hover:bg-white/30 transition">Apply</button>
              </div>
            </form>
          </details>
        </div>
        {/* Products grid */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-white">Our products</h2>
            {/* Search Bar */}
            <form className="flex" action="/products" method="get">
              <input
                type="text"
                name="search"
                defaultValue={getSearchParam(searchParams)}
                placeholder="Search products..."
                className="border border-gray-300 rounded-l px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-white bg-white/10 text-white placeholder:text-gray-300"
              />
              <button
                type="submit"
                className="px-4 py-2 border border-white border-l-0 rounded-r bg-white/20 text-white font-medium hover:bg-white/30 transition"
              >
                Search
              </button>
            </form>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {paginatedProducts.map((product: any) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="glassmorphic bg-white/10 p-4 flex flex-col items-center text-center transition-transform duration-200 transform hover:scale-105 hover:shadow-2xl border border-white/20 cursor-pointer rounded-2xl"
                prefetch={false}
              >
                <img src={product.photo} alt={product.name} className="w-32 h-32 object-cover mb-4 rounded" />
                <h3 className="text-lg font-semibold mb-1 line-clamp-2 text-white">{product.name}</h3>
                <div className="font-bold mb-2 text-white">${product.price.toFixed(2)}</div>
              </Link>
            ))}
          </div>
          {/* Pagination Controls */}
          <div className="flex justify-center items-center gap-4 mt-12">
            <Link
              href={`/products?page=${currentPage - 1}${searchQuery ? `&search=${encodeURIComponent(getSearchParam(searchParams))}` : ''}${typeQuery ? `&type=${encodeURIComponent(typeQuery)}` : ''}`}
              className={`px-4 py-2 border border-white rounded bg-white/10 text-white ${currentPage === 1 ? 'pointer-events-none opacity-50' : 'hover:bg-white/20 hover:text-white transition'}`}
              aria-disabled={currentPage === 1}
            >
              Previous
            </Link>
            <span className="text-sm text-white/90 glassmorphic px-4 py-2 rounded border border-white/20">Page {currentPage} of {totalPages}</span>
            <Link
              href={`/products?page=${currentPage + 1}${searchQuery ? `&search=${encodeURIComponent(getSearchParam(searchParams))}` : ''}${typeQuery ? `&type=${encodeURIComponent(typeQuery)}` : ''}`}
              className={`px-4 py-2 border border-white rounded bg-white/10 text-white ${currentPage === totalPages ? 'pointer-events-none opacity-50' : 'hover:bg-white/20 hover:text-white transition'}`}
              aria-disabled={currentPage === totalPages}
            >
              Next
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/20 p-6 text-center text-xs text-white bg-neutral-800/60 backdrop-blur-md w-full mt-auto shadow-[0_-4px_16px_0_rgba(255,255,255,0.08)]">
        &copy; {new Date().getFullYear()} Rattrapage Digi. All rights reserved.
      </footer>
    </main>
  );
} 