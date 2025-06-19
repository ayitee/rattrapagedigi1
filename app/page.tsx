import Link from 'next/link';
import Header from './components/Header';
import QnAAccordion from "./components/QnAAccordion";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-transparent text-black flex flex-col relative overflow-hidden">
      {/* Video background with overlay */}
      <div className="fixed inset-0 w-full h-full -z-10">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          src="/homebackgroundvideo.mp4"
        />
        <div className="absolute inset-0 bg-black/80" />
      </div>

      {/* Header */}
      <div aria-hidden="true" className="h-20 md:h-24 w-full"></div>
      <Header />

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

      {/* Q&A section */}
      <section className="relative flex flex-col items-center justify-center min-h-screen py-20 text-white">
        <div className="max-w-2xl w-full mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <QnAAccordion
            qna={[
              {
                question: "What is the warranty period?",
                answer: "All Vellux products come with a 1-year warranty covering manufacturing defects.",
              },
              {
                question: "Is international shipping available?",
                answer: "Yes, we ship worldwide. Shipping fees and delivery times vary by location.",
              },
              {
                question: "Can I return the product?",
                answer: "Returns are accepted within 30 days of delivery if the product is in original condition.",
              },
              {
                question: "How long does shipping take?",
                answer: "Shipping times vary by location. Domestic orders typically arrive within 3-7 business days, while international orders may take 7-21 business days.",
              },
              {
                question: "What payment methods are accepted?",
                answer: "We accept all major credit cards, PayPal, and Stripe payments.",
              },
              {
                question: "How do I track my order?",
                answer: "Once your order ships, you will receive a tracking number via email to monitor your shipment.",
              },
              {
                question: "Can I change or cancel my order?",
                answer: "Orders can be changed or canceled within 24 hours of placement. Please contact our support team as soon as possible.",
              },
              {
                question: "Do you offer bulk or business discounts?",
                answer: "Yes, we offer discounts for bulk and business orders. Please contact us for a custom quote.",
              },
            ]}
          />
        </div>
      </section>
    </main>
  );
}