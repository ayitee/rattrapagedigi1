"use client";
import Link from "next/link";
import Header from "../components/Header";

export default function TermsPage() {
  return (
    <main className="min-h-screen flex flex-col bg-transparent text-white relative overflow-hidden">
      <div aria-hidden="true" className="h-20 md:h-24 w-full"></div>
      <Header />
      <section className="flex flex-col items-center w-full flex-grow px-4 py-8">
        <div className="w-full max-w-2xl mx-auto glassmorphic bg-white/10 border border-white/20 rounded-2xl shadow-lg p-8 mt-8">
          <h1 className="text-3xl font-bold mb-6 text-white text-center">Terms of Service</h1>
          <div className="text-white/80 space-y-4 text-sm md:text-base">
            <p>
              Welcome to Vellux! By using our website and services, you agree to the following terms and conditions. Please read them carefully.
            </p>
            <h2 className="text-xl font-semibold mt-6 mb-2 text-white">1. Acceptance of Terms</h2>
            <p>
              By accessing or using our site, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree, please do not use our site.
            </p>
            <h2 className="text-xl font-semibold mt-6 mb-2 text-white">2. Use of the Site</h2>
            <p>
              You may use the site for lawful purposes only. You agree not to use the site in any way that may damage, disable, or impair the site or interfere with any other party's use.
            </p>
            <h2 className="text-xl font-semibold mt-6 mb-2 text-white">3. Intellectual Property</h2>
            <p>
              All content, trademarks, and data on this site are the property of Vellux or its licensors. You may not use, reproduce, or distribute any content without our written permission.
            </p>
            <h2 className="text-xl font-semibold mt-6 mb-2 text-white">4. Limitation of Liability</h2>
            <p>
              Vellux is not liable for any damages arising from your use of the site. The site is provided "as is" without warranties of any kind.
            </p>
            <h2 className="text-xl font-semibold mt-6 mb-2 text-white">5. Changes to Terms</h2>
            <p>
              We reserve the right to update these Terms at any time. Changes will be posted on this page. Continued use of the site means you accept the new terms.
            </p>
            <h2 className="text-xl font-semibold mt-6 mb-2 text-white">6. Contact</h2>
            <p>
              If you have any questions about these Terms, please contact us at <a href="mailto:support@vellux.com" className="underline hover:text-blue-300">support@vellux.com</a>.
            </p>
          </div>
          <div className="mt-8 text-center">
            <Link href="/" className="inline-block px-6 py-2 rounded bg-white/20 text-white font-semibold border border-white/30 hover:bg-white/30 transition">Back to Home</Link>
          </div>
        </div>
      </section>
    </main>
  );
} 