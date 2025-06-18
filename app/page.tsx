import Link from 'next/link';
import Header from './components/Header';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-transparent text-black flex flex-col relative overflow-hidden">
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

      {/* Hero Section */}
      <section className="flex flex-col justify-center items-center flex-grow p-12">
        <div className="backdrop-blur-lg bg-neutral-800/60 border border-white/20 rounded-2xl shadow-lg px-12 py-16 flex flex-col items-center max-w-2xl w-full mx-auto text-white">
          <h2 className="text-5xl mb-6 tracking-tight">Elevate Your Setup</h2>
          <p className="text-lg mb-10 max-w-md font-normal">
            High-end PC peripherals for professionals who demand performance and style.
          </p>
          <Link
            href="/products"
            className="px-8 py-3 border border-black rounded-lg font-normal text-lg hover:bg-black hover:text-white transition"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/20 p-6 text-center text-xs text-white bg-neutral-800/60 backdrop-blur-md w-full mt-auto shadow-[0_-4px_16px_0_rgba(255,255,255,0.08)]">
        &copy; {new Date().getFullYear()} Rattrapage Digi. All rights reserved.
      </footer>
    </main>
  );
}