import Link from 'next/link';
import path from 'path';
import { promises as fs } from 'fs';
import { notFound } from 'next/navigation';
import Header from '../components/Header';

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
    <main className="min-h-screen bg-white text-black flex flex-col">
      {/* Header */}
      <Header />

      {/* Products Grid Section */}
      <section className="flex-grow px-4 py-12 max-w-[80vw] mx-auto w-full flex flex-col md:flex-row gap-8">
        {/* Sidebar for sorting/filtering */}
        <aside className="mb-8 md:mb-0 md:w-48 flex-shrink-0">
          <div className="sticky top-24">
            <h3 className="text-lg font-bold mb-4">Product Type</h3>
            <ul className="space-y-2 mb-8">
              <li>
                {(() => {
                  const allQuery: Record<string, any> = { ...searchParams, page: 1 };
                  Object.keys(allQuery).forEach((key: string) => {
                    if (allQuery[key] === undefined || allQuery[key] === '') delete allQuery[key];
                  });
                  return (
                    <Link
                      href={{ pathname: '/products', query: allQuery }}
                      className={`block px-4 py-2 rounded transition font-medium ${!typeQuery ? 'bg-black text-white' : 'hover:bg-gray-100 text-gray-900'}`}
                    >
                      All
                    </Link>
                  );
                })()}
              </li>
              {types.map((type: any) => {
                const typeQueryObj: Record<string, any> = { ...searchParams, type, page: 1 };
                Object.keys(typeQueryObj).forEach((key: string) => {
                  if (typeQueryObj[key] === undefined || typeQueryObj[key] === '') delete typeQueryObj[key];
                });
                return (
                  <li key={type}>
                    <Link
                      href={{ pathname: '/products', query: typeQueryObj }}
                      className={`block px-4 py-2 rounded transition font-medium ${typeQuery === type ? 'bg-black text-white' : 'hover:bg-gray-100 text-gray-900'}`}
                    >
                      {type}
                    </Link>
                  </li>
                );
              })}
            </ul>
            {/* Price Slider */}
            <form className="mb-8" action="/products" method="get">
              {/* Keep other filters in the query */}
              {typeQuery && <input type="hidden" name="type" value={typeQuery} />}
              <input type="hidden" name="search" value={getSearchParam(searchParams)} />
              <h3 className="text-lg font-bold mb-2">Price Range</h3>
              <div className="flex items-center justify-between text-sm mb-2">
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
                <div className="flex items-center border border-gray-400 rounded px-2 py-1 bg-white">
                  <span className="text-gray-500 mr-1">$</span>
                  <input
                    type="number"
                    name="minPrice"
                    min={minPrice}
                    max={selectedMax}
                    defaultValue={selectedMin}
                    className="w-16 text-center outline-none bg-transparent"
                  />
                </div>
                <span className="mx-2 text-gray-700">to</span>
                <div className="flex items-center border border-gray-400 rounded px-2 py-1 bg-white">
                  <span className="text-gray-500 mr-1">$</span>
                  <input
                    type="number"
                    name="maxPrice"
                    min={selectedMin}
                    max={maxPrice}
                    defaultValue={selectedMax}
                    className="w-16 text-center outline-none bg-transparent"
                  />
                </div>
              </div>
              <button type="submit" className="mt-3 w-full px-4 py-2 rounded bg-black text-white font-medium hover:bg-gray-800 transition">Apply</button>
            </form>
          </div>
        </aside>
        {/* Products grid */}
        <div className="flex-1">
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
            {paginatedProducts.map((product: any) => (
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
              href={`/products?page=${currentPage - 1}${searchQuery ? `&search=${encodeURIComponent(getSearchParam(searchParams))}` : ''}${typeQuery ? `&type=${encodeURIComponent(typeQuery)}` : ''}`}
              className={`px-4 py-2 border rounded ${currentPage === 1 ? 'pointer-events-none opacity-50' : 'hover:bg-black hover:text-white transition'}`}
              aria-disabled={currentPage === 1}
            >
              Previous
            </Link>
            <span className="text-sm">Page {currentPage} of {totalPages}</span>
            <Link
              href={`/products?page=${currentPage + 1}${searchQuery ? `&search=${encodeURIComponent(getSearchParam(searchParams))}` : ''}${typeQuery ? `&type=${encodeURIComponent(typeQuery)}` : ''}`}
              className={`px-4 py-2 border rounded ${currentPage === totalPages ? 'pointer-events-none opacity-50' : 'hover:bg-black hover:text-white transition'}`}
              aria-disabled={currentPage === totalPages}
            >
              Next
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 p-6 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} Rattrapage Digi. All rights reserved.
      </footer>
    </main>
  );
} 