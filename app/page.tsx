import Link from 'next/link';
import Header from './components/Header';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-black flex flex-col">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="flex flex-col justify-center items-center flex-grow p-12 text-center max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-4 tracking-tight">Elevate Your Setup</h2>
        <p className="text-lg mb-8 max-w-md">
          High-end PC peripherals for professionals who demand performance and style.
        </p>
        <Link
          href="/products"
          className="px-6 py-3 border border-black font-semibold hover:bg-black hover:text-white transition"
        >
          Shop Now
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 p-6 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} Rattrapage Digi. All rights reserved.
      </footer>
    </main>
  );
}