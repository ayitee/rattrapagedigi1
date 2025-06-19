"use client";
import React from 'react';
import GradientBody from '../components/GradientBody';
import Header from '../components/Header';

const TermsPage = () => {
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
                Terms & Conditions
              </h1>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                Please read these terms carefully before using our services
              </p>
            </div>

            <div className="space-y-8">
              {/* Agreement to Terms */}
              <div className="backdrop-blur-sm bg-white/10 rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-6">Agreement to Terms</h2>
                <div className="space-y-4 text-gray-200">
                  <p>
                    By accessing or using ATK Gaming's website and services, you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, you may not access our services.
                  </p>
                  <p>
                    These Terms and Conditions constitute a legally binding agreement between you and ATK Gaming regarding your use of our website and services.
                  </p>
                </div>
              </div>

              {/* Intellectual Property */}
              <div className="backdrop-blur-sm bg-white/10 rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-6">Intellectual Property</h2>
                <div className="space-y-4 text-gray-200">
                  <p>
                    The website and its original content, features, and functionality are owned by ATK Gaming and are protected by international copyright, trademark, and other intellectual property laws.
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>All content is the exclusive property of ATK Gaming</li>
                    <li>Our trademarks may not be used without prior written consent</li>
                    <li>You may not reproduce or distribute our content without permission</li>
                  </ul>
                </div>
              </div>

              {/* User Accounts */}
              <div className="backdrop-blur-sm bg-white/10 rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-6">User Accounts</h2>
                <div className="space-y-4 text-gray-200">
                  <p>When creating an account with us, you must provide accurate and complete information.</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>You are responsible for maintaining account security</li>
                    <li>You must notify us of any unauthorized account access</li>
                    <li>We reserve the right to terminate accounts at our discretion</li>
                    <li>Users must be at least 18 years old to create an account</li>
                  </ul>
                </div>
              </div>

              {/* Product Information */}
              <div className="backdrop-blur-sm bg-white/10 rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-6">Product Information</h2>
                <div className="space-y-4 text-gray-200">
                  <p>
                    We strive to provide accurate product information, but we do not warrant that product descriptions are accurate, complete, reliable, current, or error-free.
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Prices are subject to change without notice</li>
                    <li>We reserve the right to limit order quantities</li>
                    <li>Product availability is not guaranteed</li>
                    <li>Colors may vary from images shown</li>
                  </ul>
                </div>
              </div>

              {/* Shipping and Delivery */}
              <div className="backdrop-blur-sm bg-white/10 rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-6">Shipping and Delivery</h2>
                <div className="space-y-4 text-gray-200">
                  <p>
                    Delivery times are estimates only and are not guaranteed. We are not responsible for delays beyond our control.
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Shipping costs are calculated at checkout</li>
                    <li>International orders may be subject to customs fees</li>
                    <li>Risk of loss transfers upon delivery</li>
                  </ul>
                </div>
              </div>

              {/* Limitation of Liability */}
              <div className="backdrop-blur-sm bg-white/10 rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-6">Limitation of Liability</h2>
                <div className="space-y-4 text-gray-200">
                  <p>
                    ATK Gaming shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services.
                  </p>
                  <p>
                    In no event shall our liability exceed the amount paid by you for the product in question.
                  </p>
                </div>
              </div>

              {/* Changes to Terms */}
              <div className="backdrop-blur-sm bg-white/10 rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-6">Changes to Terms</h2>
                <div className="space-y-4 text-gray-200">
                  <p>
                    We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to the website.
                  </p>
                  <p>
                    Last updated: March 15, 2024<br />
                    ATK Gaming<br />
                    Email: legal@atkgaming.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </GradientBody>
  );
};

export default TermsPage; 