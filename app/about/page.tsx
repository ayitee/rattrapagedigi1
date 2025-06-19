"use client";
import Link from "next/link";
import Header from "../components/Header";
import ProductCarousel from "../components/ProductCarousel";

export default function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col bg-transparent text-white relative overflow-hidden">
      <div aria-hidden="true" className="h-20 md:h-24 w-full"></div>
      <Header />
      <section className="flex flex-col items-center w-full flex-grow px-4 py-8">
        <div className="w-full max-w-7xl mx-auto mt-16">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-12 text-center bg-gradient-to-r from-fuchsia-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-lg tracking-tight">About Us</h1>
          <div className="flex flex-col gap-12">
            {/* Brand Introduction */}
            <div className="glassmorphic bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white tracking-tight flex items-center gap-2">
                <span className="inline-block w-2 h-8 bg-gradient-to-b from-fuchsia-400 to-blue-400 rounded-full mr-2"></span>
                Brand Introduction
              </h2>
              <div className="flex flex-col md:flex-row gap-10 items-center">
                <img src="/images/ATK_Blazing_Sky_F1_White.jpg.png" alt="Brand" className="w-56 h-56 object-cover rounded-xl border-2 border-fuchsia-400/40 shadow-xl" />
                <p className="text-white/90 text-lg md:text-xl leading-relaxed max-w-2xl">
                  Welcome to <span className="font-bold text-fuchsia-300">Vellux</span>, where <span className="text-blue-300 font-semibold">innovation</span> meets <span className="text-cyan-300 font-semibold">excellence</span> in gaming peripherals.<br className="hidden md:block" />
                  Our dedicated team brings together expertise from the gaming industry and industrial innovation.<br className="hidden md:block" />
                  With years of experience and a passion for esports, we are committed to <span className="text-fuchsia-300 font-semibold">understanding</span> and <span className="text-blue-300 font-semibold">fulfilling</span> the needs of players worldwide.
                </p>
              </div>
            </div>
            {/* Brand Philosophy */}
            <div className="glassmorphic bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white tracking-tight flex items-center gap-2">
                <span className="inline-block w-2 h-8 bg-gradient-to-b from-blue-400 to-cyan-400 rounded-full mr-2"></span>
                Brand Philosophy
              </h2>
              <p className="text-white/80 text-lg md:text-xl">
                <span className="font-semibold text-cyan-300">Dedicated</span> to exploring <span className="font-semibold text-fuchsia-300">cutting-edge peripheral technology</span> and making <span className="font-semibold text-blue-300">high-end innovation accessible to everyone</span>.
              </p>
            </div>
            {/* Brand Mission */}
            <div className="glassmorphic bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white tracking-tight flex items-center gap-2">
                <span className="inline-block w-2 h-8 bg-gradient-to-b from-cyan-400 to-fuchsia-400 rounded-full mr-2"></span>
                Brand Mission
              </h2>
              <p className="text-white/80 text-lg md:text-xl">
                <span className="font-semibold text-fuchsia-300">Vellux</span> is dedicated to delivering <span className="text-blue-300 font-semibold">high-performance</span>, <span className="text-cyan-300 font-semibold">high-configuration</span>, and <span className="text-fuchsia-300 font-semibold">cost-effective</span> electronic products.<br className="hidden md:block" />
                We prioritize <span className="text-blue-300 font-semibold">excellence</span> in both performance and quality, striving to lead the industry with <span className="text-cyan-300 font-semibold">cutting-edge technology</span>.<br className="hidden md:block" />
                Our mission is to provide gamers with an <span className="text-fuchsia-300 font-semibold">unparalleled experience</span>, elevating their gameplay to new heights.
              </p>
            </div>
            {/* Product Lineup Carousel */}
            <div className="glassmorphic bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white tracking-tight flex items-center gap-2">
                <span className="inline-block w-2 h-8 bg-gradient-to-b from-fuchsia-400 to-cyan-400 rounded-full mr-2"></span>
                Product Lineup
              </h2>
              <ProductCarousel
                products={[
                  {
                    image: "/images/ATK_Blazing_Sky_F1_White.jpg.png",
                    name: "ATK Blazing Sky F1 White",
                    description: "Wireless Mouse - Extreme Esports Edition",
                  },
                  {
                    image: "/images/ATK_Dragonfly_A9_White.jpg.png",
                    name: "ATK Dragonfly A9 White",
                    description: "Ultra-lightweight Gaming Mouse",
                  },
                  {
                    image: "/images/ATK68_White.jpg.png",
                    name: "ATK68 White",
                    description: "Compact Mechanical Keyboard",
                  },
                  {
                    image: "/images/ATK_RS6_Ultra_White_Shadow_Warrior.jpg.png",
                    name: "ATK RS6 Ultra White",
                    description: "Shadow Warrior Edition Keyboard",
                  },
                  {
                    image: "/images/ATK_Mercury_I_White.jpg.png",
                    name: "ATK Mercury I White",
                    description: "Wireless Tri-mode Headset",
                  },
                  {
                    image: "/images/ATK_Blaze_XSoft_eSport_Gaming_Mousepad.jpg.png",
                    name: "ATK Blaze XSoft Mousepad",
                    description: "eSport Gaming Mousepad",
                  },
                ]}
              />
            </div>
            {/* Contact Info */}
            <div className="glassmorphic bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white tracking-tight flex items-center gap-2">
                <span className="inline-block w-2 h-8 bg-gradient-to-b from-blue-400 to-fuchsia-400 rounded-full mr-2"></span>
                Contact
              </h2>
              <p className="text-white/80 text-lg md:text-xl">
                For inquiries, partnerships, or support, contact us at <a href="mailto:support@vellux.com" className="underline hover:text-blue-300 font-semibold">support@vellux.com</a>.
              </p>
            </div>
            <div className="text-center mt-8">
              <Link href="/" className="inline-block px-6 py-2 rounded bg-gradient-to-r from-fuchsia-400 to-blue-400 text-white font-semibold border border-white/30 hover:bg-white/30 transition shadow-lg">Back to Home</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 