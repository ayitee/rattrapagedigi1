import Link from 'next/link';
import Header from './components/Header';
import QnAAccordion from "./components/QnAAccordion";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-transparent text-black flex flex-col relative overflow-hidden">
      {/* Header always at the top */}
      <div className="fixed top-0 left-0 w-full z-20">
        <Header />
      </div>
      {/* Video background section */}
      <section className="relative min-h-screen flex flex-col justify-center items-center">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover -z-10"
          src="/homebackgroundvideo.mp4"
        />
        {/* Bottom gradient for transition */}
        <div className="absolute left-0 right-0 bottom-0 h-1/6 bg-gradient-to-b from-transparent to-black/90 pointer-events-none -z-10" />
      </section>
      {/* Hero section */}
      <section id="hero" className="flex flex-col justify-center items-center min-h-screen py-24 bg-gradient-to-b from-black/80 to-black/60">
        <div className="backdrop-blur-lg bg-neutral-800/60 border border-white/20 rounded-2xl shadow-lg px-12 py-20 flex flex-col items-center max-w-2xl w-full mx-auto text-white">
          <h2 className="text-4xl mb-6 tracking-tight font-bold">Elevate Your Setup</h2>
          <p className="text-lg mb-10 max-w-md font-normal">
            Discover the latest in gaming keyboards, mice, and accessories. Shop now for premium quality and performance.
          </p>
          <a
            href="/products"
            className="px-8 py-3 border border-black rounded-lg font-normal text-lg hover:bg-black hover:text-white transition bg-white text-black"
          >
            Shop Now
          </a>
        </div>
      </section>
      {/* Gradient transition line between hero and Q&A */}
      <div className="w-full h-24 bg-gradient-to-b from-black to-transparent" />
      {/* Q&A section */}
      <section className="relative flex flex-col items-center justify-center min-h-screen py-20 text-white">
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black to-transparent pointer-events-none" />
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
      {/* Footer */}
      <footer className="border-t border-white/20 p-6 text-center text-xs text-white bg-neutral-800/60 backdrop-blur-md w-full mt-auto shadow-[0_-4px_16px_0_rgba(255,255,255,0.08)]">
        &copy; {new Date().getFullYear()} Rattrapage Digi. All rights reserved.
      </footer>
    </main>
  );
}