import React from 'react';
import ConditionalBackground from '../components/ConditionalBackground';
import QnAAccordion, { QnAItem } from '../components/QnAAccordion';
import Header from '../components/Header';

const FAQPage = () => {
  const faqs: QnAItem[] = [
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay. All payments are processed securely through Stripe."
    },
    {
      question: "How long does shipping take?",
      answer: "Domestic orders typically arrive within 2-5 business days. International shipping can take 7-14 business days depending on the destination. Express shipping options are available at checkout."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for unused items in their original packaging. Please visit our Returns page for detailed information about our return process."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location. You can see exact shipping costs at checkout."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order ships, you'll receive a tracking number via email. You can also view your order status and tracking information in your account dashboard."
    },
    {
      question: "Are your products covered by warranty?",
      answer: "Yes, all our products come with a minimum 1-year manufacturer warranty. Some products have extended warranty options available at purchase."
    },
    {
      question: "Do you offer bulk discounts?",
      answer: "Yes, we offer special pricing for bulk orders. Please contact our sales team for a custom quote on bulk purchases."
    },
    {
      question: "How do I clean and maintain my gaming peripherals?",
      answer: "We recommend using compressed air for dust removal, and a slightly damp microfiber cloth for cleaning surfaces. Avoid using harsh chemicals that could damage the equipment."
    }
  ];

  return (
    <ConditionalBackground>
      <main className="min-h-screen flex flex-col bg-transparent text-black relative overflow-hidden">
        <div aria-hidden="true" className="h-20 md:h-24 w-full"></div>
        <Header />
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Frequently Asked Questions
              </h1>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                Find answers to common questions about our products and services
              </p>
            </div>

            {/* FAQ Accordion */}
            <QnAAccordion qna={faqs} />
          </div>
        </div>
      </main>
    </ConditionalBackground>
  );
};

export default FAQPage; 