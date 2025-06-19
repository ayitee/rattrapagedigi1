"use client";
import React from 'react';
import Link from "next/link";
import Header from "../components/Header";
import ProductCarousel from "../components/ProductCarousel";
import GradientBody from '../components/GradientBody';

export default function AboutPage() {
  return (
    <GradientBody>
      <main className="min-h-screen flex flex-col bg-transparent text-black relative overflow-hidden">
        <div aria-hidden="true" className="h-20 md:h-24 w-full"></div>
        <Header />
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                About ATK Gaming
              </h1>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                Crafting premium gaming peripherals for the ultimate gaming experience
              </p>
            </div>

            {/* About Content */}
            <div className="space-y-8">
              {/* Our Story */}
              <div className="backdrop-blur-sm bg-white/10 rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-4">Our Story</h2>
                <p className="text-gray-200 leading-relaxed mb-6">
                  Founded in 2020, ATK Gaming emerged from a simple vision: to create gaming peripherals that perfectly balance performance, comfort, and style. Our team of passionate gamers and engineers work tirelessly to develop products that enhance your gaming experience.
                </p>
                <p className="text-gray-200 leading-relaxed">
                  What started as a small project has grown into a trusted brand, serving gamers worldwide with our premium keyboards, mice, and accessories. Each product is meticulously designed and tested to ensure it meets our high standards of quality and performance.
                </p>
              </div>

              {/* Our Mission */}
              <div className="backdrop-blur-sm bg-white/10 rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
                <p className="text-gray-200 leading-relaxed">
                  At ATK Gaming, our mission is to empower gamers with tools that enhance their performance and enjoyment. We believe that every gamer deserves access to high-quality peripherals that don't compromise on features or reliability. Through continuous innovation and community feedback, we strive to push the boundaries of what's possible in gaming hardware.
                </p>
              </div>

              {/* Our Values */}
              <div className="backdrop-blur-sm bg-white/10 rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-6">Our Values</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">Quality</h3>
                    <p className="text-gray-300">
                      We never compromise on quality, using only the finest materials and most reliable components in our products.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">Innovation</h3>
                    <p className="text-gray-300">
                      We constantly push boundaries to bring new technologies and features that enhance your gaming experience.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">Community</h3>
                    <p className="text-gray-300">
                      We actively engage with our gaming community, incorporating feedback to improve our products and services.
                    </p>
                  </div>
                </div>
              </div>

              {/* Commitment to Sustainability */}
              <div className="backdrop-blur-sm bg-white/10 rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-4">Our Commitment to Sustainability</h2>
                <p className="text-gray-200 leading-relaxed">
                  We're committed to reducing our environmental impact through sustainable manufacturing practices, eco-friendly packaging, and responsible material sourcing. Learn more about our sustainability initiatives and how we're working to create a better future for gaming and our planet.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </GradientBody>
  );
} 