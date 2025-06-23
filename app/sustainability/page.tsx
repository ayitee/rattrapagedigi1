"use client";
import React from 'react';
import GradientBody from '../components/GradientBody';
import Header from '../components/Header';

const SustainabilityPage = () => {
  return (
    <GradientBody>
      <main className="min-h-screen flex flex-col bg-transparent text-black relative overflow-hidden">
        <div aria-hidden="true" className="h-20 md:h-24 w-full"></div>
        <Header />
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Our Commitment to Sustainability
              </h1>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                Building a better future through responsible gaming technology
              </p>
            </div>

            {/* Initiatives Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {/* Eco-Friendly Packaging */}
              <div className="backdrop-blur-sm bg-white/10 rounded-xl p-6 border border-white/20 hover:bg-white/20 transition duration-300">
                <h3 className="text-2xl font-semibold text-white mb-4">Eco-Friendly Packaging</h3>
                <p className="text-gray-200">
                  Our products are packaged using 100% recyclable materials, and we're working towards eliminating all single-use plastics from our packaging by 2024.
                </p>
              </div>

              {/* Energy Efficiency */}
              <div className="backdrop-blur-sm bg-white/10 rounded-xl p-6 border border-white/20 hover:bg-white/20 transition duration-300">
                <h3 className="text-2xl font-semibold text-white mb-4">Energy Efficiency</h3>
                <p className="text-gray-200">
                  All our gaming peripherals are designed with energy efficiency in mind, featuring smart power management and eco-friendly LED technologies.
                </p>
              </div>

              {/* Recycling Program */}
              <div className="backdrop-blur-sm bg-white/10 rounded-xl p-6 border border-white/20 hover:bg-white/20 transition duration-300">
                <h3 className="text-2xl font-semibold text-white mb-4">Recycling Program</h3>
                <p className="text-gray-200">
                  Send us your old gaming peripherals, and we'll ensure they're properly recycled. Plus, get a discount on your next purchase!
                </p>
              </div>
            </div>

            {/* Environmental Impact Section */}
            <div className="backdrop-blur-sm bg-white/10 rounded-xl p-8 border border-white/20 mb-16">
              <h2 className="text-3xl font-bold text-white mb-6">Our Environmental Impact</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <p className="text-4xl font-bold text-green-400 mb-2">75%</p>
                  <p className="text-gray-200">Reduction in packaging waste since 2022</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-green-400 mb-2">100%</p>
                  <p className="text-gray-200">Renewable energy in our facilities</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-green-400 mb-2">10K+</p>
                  <p className="text-gray-200">Devices recycled through our program</p>
                </div>
              </div>
            </div>

            {/* Future Goals */}
            <div className="backdrop-blur-sm bg-white/10 rounded-xl p-8 border border-white/20">
              <h2 className="text-3xl font-bold text-white mb-6">Future Goals</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="h-4 w-4 rounded-full bg-green-400 mr-4"></div>
                  <p className="text-gray-200">Carbon neutral operations by 2025</p>
                </div>
                <div className="flex items-center">
                  <div className="h-4 w-4 rounded-full bg-green-400 mr-4"></div>
                  <p className="text-gray-200">100% sustainable materials in all products by 2026</p>
                </div>
                <div className="flex items-center">
                  <div className="h-4 w-4 rounded-full bg-green-400 mr-4"></div>
                  <p className="text-gray-200">Zero waste to landfill by 2027</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </GradientBody>
  );
};

export default SustainabilityPage; 