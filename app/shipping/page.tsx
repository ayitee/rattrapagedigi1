"use client";
import React from 'react';
import GradientBody from '../components/GradientBody';
import Header from '../components/Header';

const ShippingPage = () => {
  return (
    <GradientBody>
      <main className="min-h-screen flex flex-col bg-transparent text-black relative overflow-hidden">
        <div aria-hidden="true" className="h-20 md:h-24 w-full"></div>
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
        <Header />
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Shipping Information
              </h1>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                Fast and reliable shipping to your doorstep
              </p>
            </div>

            <div className="space-y-8">
              {/* Delivery Options */}
              <div className="backdrop-blur-sm bg-white/10 rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-6">Delivery Options</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center">
                      <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Standard Shipping</h3>
                      <p className="text-gray-200">3-5 business days</p>
                      <p className="text-gray-300">Free for orders over $50</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center">
                      <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Express Shipping</h3>
                      <p className="text-gray-200">1-2 business days</p>
                      <p className="text-gray-300">$15 flat rate</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Shipping Policies */}
              <div className="backdrop-blur-sm bg-white/10 rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-6">Shipping Policies</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Order Processing</h3>
                    <p className="text-gray-200">Orders are processed within 24 hours during business days.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">International Shipping</h3>
                    <p className="text-gray-200">We ship worldwide. International delivery times vary by location.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Tracking</h3>
                    <p className="text-gray-200">All orders include tracking information sent via email.</p>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="backdrop-blur-sm bg-white/10 rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-6">Additional Information</h2>
                <ul className="space-y-3 text-gray-200">
                  <li>• Signature may be required for orders over $200</li>
                  <li>• We do not ship to PO boxes</li>
                  <li>• Orders placed after 2 PM EST process the next business day</li>
                  <li>• Shipping times exclude weekends and holidays</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </GradientBody>
  );
};

export default ShippingPage; 