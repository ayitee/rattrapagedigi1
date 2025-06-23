import Link from 'next/link';
import Header from './components/Header';
import ProductCarousel from './components/ProductCarousel';

export default function HomePage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed top-0 left-0 w-full h-full object-cover -z-10"
      >
        <source src="/29a51cfba66f4c4ab528ecc0351ace00.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay content */}
      <div className="relative z-10">
        <Header />
        <main className="min-h-screen flex flex-col items-center justify-center text-white relative overflow-hidden">
          {/* Hero section */}
          <section id="hero" className="flex flex-col justify-center items-center min-h-screen py-24">
            <div className="backdrop-blur-lg bg-neutral-800/30 border border-white/20 rounded-2xl shadow-lg p-8 md:p-12 flex flex-col items-center max-w-4xl w-full mx-auto text-white">
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 mb-8">
                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-gray-200 to-gray-400 text-transparent bg-clip-text">
                    Elevate Your Setup
                  </h1>
                  <p className="text-lg md:text-xl mb-6 text-gray-300 max-w-xl">
                    Discover the latest in gaming peripherals. Premium quality meets unmatched performance.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                    <Link
                      href="/products"
                      className="px-8 py-3 border border-black rounded-lg font-normal text-lg hover:bg-black hover:text-white transition bg-white text-black"
                    >
                      Shop Now
                    </Link>
                    <Link
                      href="/about"
                      className="px-8 py-3 border border-white/30 rounded-lg font-normal text-lg hover:bg-white/10 transition"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
                <div className="flex-1 relative">
                  <div className="aspect-square relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-full animate-pulse"></div>
                    <img
                      src="/images/ATK_RS6_Ultra_ATK_x_ASPAS.jpg.png"
                      alt="Featured Gaming Mouse"
                      className="relative z-10 w-full h-full object-contain transform hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
              </div>
              {/* Features section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full mt-8 pt-8 border-t border-white/10">
                <div className="flex flex-col items-center text-center p-4 backdrop-blur-sm bg-white/5 rounded-lg hover:bg-white/10 transition">
                  <svg className="w-8 h-8 mb-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                  <h3 className="text-lg font-semibold mb-2">Lightning Fast</h3>
                  <p className="text-sm text-gray-300">Ultra-responsive with 8000Hz polling rate</p>
                </div>
                <div className="flex flex-col items-center text-center p-4 backdrop-blur-sm bg-white/5 rounded-lg hover:bg-white/10 transition">
                  <svg className="w-8 h-8 mb-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                  </svg>
                  <h3 className="text-lg font-semibold mb-2">Built to Last</h3>
                  <p className="text-sm text-gray-300">Premium materials with 1-year warranty</p>
                </div>
                <div className="flex flex-col items-center text-center p-4 backdrop-blur-sm bg-white/5 rounded-lg hover:bg-white/10 transition">
                  <svg className="w-8 h-8 mb-3 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path>
                  </svg>
                  <h3 className="text-lg font-semibold mb-2">Customizable</h3>
                  <p className="text-sm text-gray-300">Full RGB and macro customization</p>
                </div>
              </div>
            </div>
          </section>
        </main>
        {/* --- New Content Below for Scrolling --- */}
        <section className="py-24 bg-white/10 backdrop-blur-md w-full flex flex-col items-center">
          <h2 className="text-3xl font-bold mb-8 text-white">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl px-4">
            <Link href="/products/7" className="bg-white/10 rounded-xl p-6 flex flex-col items-center shadow-lg hover:scale-105 transition-transform">
              <img src="/images/ATK_Blazing_Sky_Z1_White.jpg.png" alt="Blazing Sky Z1" className="w-32 h-32 object-contain mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Blazing Sky Z1</h3>
              <p className="text-gray-200 text-center mb-2">Ultra-lightweight wireless mouse for pro gamers.</p>
              <span className="text-lg font-bold text-green-300">$69.99</span>
            </Link>
            <Link href="/products/18" className="bg-white/10 rounded-xl p-6 flex flex-col items-center shadow-lg hover:scale-105 transition-transform">
              <img src="/images/ATK75_White.jpg.png" alt="ATK75 Keyboard" className="w-32 h-32 object-contain mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">ATK75 Keyboard</h3>
              <p className="text-gray-200 text-center mb-2">Hot-swappable, RGB, and magnetic switch technology.</p>
              <span className="text-lg font-bold text-green-300">$119.99</span>
            </Link>
            <Link href="/products/25" className="bg-white/10 rounded-xl p-6 flex flex-col items-center shadow-lg hover:scale-105 transition-transform">
              <img src="/images/ATK_Micro-Etched_Tempered_Glass_Mouse_Pad.jpg.png" alt="Glass Mouse Pad" className="w-32 h-32 object-contain mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Glass Mouse Pad</h3>
              <p className="text-gray-200 text-center mb-2">Micro-etched tempered glass for ultra-smooth glide.</p>
              <span className="text-lg font-bold text-green-300">$39.99</span>
            </Link>
          </div>
        </section>
        <section className="py-24 w-full flex flex-col items-center bg-black/30">
          <h2 className="text-3xl font-bold mb-8 text-white">Customer Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl px-4">
            <div className="bg-white/10 rounded-xl p-6 flex flex-col items-center shadow-lg">
              <p className="text-gray-100 italic mb-4">“Absolutely love the ATK75! The typing feel is amazing and the RGB is stunning.”</p>
              <span className="font-semibold text-white">— Alex P.</span>
            </div>
            <div className="bg-white/10 rounded-xl p-6 flex flex-col items-center shadow-lg">
              <p className="text-gray-100 italic mb-4">“The Blazing Sky Z1 is the best mouse I've ever used. Super light and responsive.”</p>
              <span className="font-semibold text-white">— Jamie L.</span>
            </div>
            <div className="bg-white/10 rounded-xl p-6 flex flex-col items-center shadow-lg">
              <p className="text-gray-100 italic mb-4">“Fast shipping and great customer service. Highly recommend ATK Gaming!”</p>
              <span className="font-semibold text-white">— Morgan S.</span>
            </div>
          </div>
        </section>
        <section className="py-24 w-full flex flex-col items-center bg-white/5">
          <h2 className="text-3xl font-bold mb-8 text-white">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl px-4">
            <div className="flex flex-col items-center">
              <svg className="w-12 h-12 mb-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              <h3 className="text-xl font-semibold text-white mb-2">Quality Guaranteed</h3>
              <p className="text-gray-200 text-center">All products are tested for peak performance and durability.</p>
            </div>
            <div className="flex flex-col items-center">
              <svg className="w-12 h-12 mb-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12c0 4.418-4.03 8-9 8s-9-3.582-9-8 4.03-8 9-8 9 3.582 9 8z"></path></svg>
              <h3 className="text-xl font-semibold text-white mb-2">Secure Shopping</h3>
              <p className="text-gray-200 text-center">Your data and payments are protected with industry-leading security.</p>
            </div>
            <div className="flex flex-col items-center">
              <svg className="w-12 h-12 mb-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3"></path></svg>
              <h3 className="text-xl font-semibold text-white mb-2">Fast Delivery</h3>
              <p className="text-gray-200 text-center">Get your gear quickly with our reliable shipping partners.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}