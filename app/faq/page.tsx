"use client";
import React from 'react';
import GradientBody from '../components/GradientBody';
import Header from '../components/Header';

const faqData = [
    {
      question: "What is the warranty period?",
      answer: "All ATK products come with a 1-year warranty covering manufacturing defects.",
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
];

const FAQPage = () => {
  return (
    <GradientBody>
        <Header />
        <main className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                        Find answers to common questions about our products and services
                    </p>
                </div>

                <div className="space-y-4">
                    {faqData.map((item, idx) => (
                        <details key={idx} className="backdrop-blur-sm bg-white/10 rounded-xl border border-white/20 overflow-hidden group">
                            <summary className="cursor-pointer p-6 font-semibold text-lg text-white flex items-center justify-between group-hover:bg-white/5 transition">
                                <span>{item.question}</span>
                                <span className="transform transition-transform duration-300 group-open:rotate-180">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </span>
                            </summary>
                            <div className="p-6 border-t border-white/10 text-gray-200">
                                <p>{item.answer}</p>
                            </div>
                        </details>
                    ))}
                </div>
            </div>
        </main>
    </GradientBody>
  );
};

export default FAQPage;
