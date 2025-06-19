"use client";
import React from 'react';
import GradientBody from '../components/GradientBody';
import Header from '../components/Header';

const ReturnsPage = () => {
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
                Returns & Exchanges
              </h1>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                Simple and hassle-free returns process
              </p>
            </div>

            <div className="space-y-8">
              {/* Return Policy Overview */}
              <div className="backdrop-blur-sm bg-white/10 rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-6">Return Policy Overview</h2>
                <div className="space-y-4 text-gray-200">
                  <p>
                    We want you to be completely satisfied with your purchase. If you're not happy with your order, we accept returns within 30 days of delivery for a full refund or exchange.
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Items must be unused and in original packaging</li>
                    <li>All accessories and documentation must be included</li>
                    <li>Return shipping costs are the responsibility of the customer</li>
                    <li>Refunds are processed within 5-7 business days</li>
                  </ul>
                </div>
              </div>

              {/* How to Return */}
              <div className="backdrop-blur-sm bg-white/10 rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-6">How to Return</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                      1
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Initiate Your Return</h3>
                      <p className="text-gray-200">Log into your account and select the order you wish to return. Click "Return Item" and follow the instructions.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                      2
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Pack Your Item</h3>
                      <p className="text-gray-200">Carefully pack the item in its original packaging with all accessories and documentation.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                      3
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Ship Your Return</h3>
                      <p className="text-gray-200">Use the provided return label or ship to our returns center. We recommend using a tracked shipping service.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Exchanges */}
              <div className="backdrop-blur-sm bg-white/10 rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-6">Exchanges</h2>
                <div className="space-y-4 text-gray-200">
                  <p>
                    Want to exchange your item for a different model or color? No problem! You can request an exchange instead of a return.
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Exchanges are processed as a return and new purchase</li>
                    <li>The new item will ship once we receive your return</li>
                    <li>Price differences will be charged or refunded accordingly</li>
                    <li>Same 30-day policy applies to exchanges</li>
                  </ul>
                </div>
              </div>

              {/* Warranty Returns */}
              <div className="backdrop-blur-sm bg-white/10 rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-6">Warranty Returns</h2>
                <div className="space-y-4 text-gray-200">
                  <p>
                    For items under warranty that need repair or replacement, please contact our support team for assistance.
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Warranty claims require proof of purchase</li>
                    <li>Shipping costs for warranty returns are covered by us</li>
                    <li>Processing time for warranty claims is 7-10 business days</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </GradientBody>
  );
};

export default ReturnsPage; 