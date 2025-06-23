"use client";
import React from 'react';
import GradientBody from '../components/GradientBody';
import Header from '../components/Header';

const PrivacyPage = () => {
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
                Privacy Policy
              </h1>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                Your privacy is important to us
              </p>
            </div>

            <div className="space-y-8">
              {/* Introduction */}
              <div className="backdrop-blur-sm bg-white/10 rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-6">Introduction</h2>
                <div className="space-y-4 text-gray-200">
                  <p>
                    ATK Gaming ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website and services.
                  </p>
                  <p>
                    By using our website, you agree to the collection and use of information in accordance with this policy.
                  </p>
                </div>
              </div>

              {/* Information We Collect */}
              <div className="backdrop-blur-sm bg-white/10 rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-6">Information We Collect</h2>
                <div className="space-y-6 text-gray-200">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Personal Information</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Name and contact information</li>
                      <li>Billing and shipping addresses</li>
                      <li>Payment information</li>
                      <li>Email address</li>
                      <li>Phone number</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Usage Information</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Browser type and version</li>
                      <li>Operating system</li>
                      <li>Pages visited and time spent</li>
                      <li>IP address</li>
                      <li>Device information</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* How We Use Your Information */}
              <div className="backdrop-blur-sm bg-white/10 rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-6">How We Use Your Information</h2>
                <div className="space-y-4 text-gray-200">
                  <p>We use the collected information for various purposes:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Process and fulfill your orders</li>
                    <li>Send order confirmations and updates</li>
                    <li>Provide customer support</li>
                    <li>Send marketing communications (with your consent)</li>
                    <li>Improve our website and services</li>
                    <li>Prevent fraud and enhance security</li>
                  </ul>
                </div>
              </div>

              {/* Data Protection */}
              <div className="backdrop-blur-sm bg-white/10 rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-6">Data Protection</h2>
                <div className="space-y-4 text-gray-200">
                  <p>
                    We implement appropriate security measures to protect your personal information:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>SSL encryption for all data transmission</li>
                    <li>Secure storage of personal information</li>
                    <li>Regular security assessments</li>
                    <li>Limited access to personal information</li>
                    <li>Employee training on data protection</li>
                  </ul>
                </div>
              </div>

              {/* Your Rights */}
              <div className="backdrop-blur-sm bg-white/10 rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-6">Your Rights</h2>
                <div className="space-y-4 text-gray-200">
                  <p>You have the right to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Access your personal information</li>
                    <li>Correct inaccurate information</li>
                    <li>Request deletion of your information</li>
                    <li>Opt-out of marketing communications</li>
                    <li>Object to data processing</li>
                  </ul>
                </div>
              </div>

              {/* Contact Us */}
              <div className="backdrop-blur-sm bg-white/10 rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-6">Contact Us</h2>
                <div className="space-y-4 text-gray-200">
                  <p>
                    If you have any questions about this Privacy Policy, please contact us at:
                  </p>
                  <p>
                    Email: privacy@atkgaming.com<br />
                    Address: ATK Gaming Privacy Office<br />
                    Last updated: March 15, 2024
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

export default PrivacyPage; 