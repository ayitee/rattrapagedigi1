"use client";
import React from 'react';
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import GradientBody from '../components/GradientBody';
import Header from '../components/Header';
import Link from 'next/link';

const AccountPage = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/login");
    },
  });

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
            {/* Account Section */}
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Account
              </h1>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                Manage your profile and view your orders
              </p>
            </div>

            <div className="space-y-8">
              {/* Profile Settings */}
              <div className="backdrop-blur-sm bg-white/10 rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-6">Profile Settings</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-lg font-medium text-white mb-2">Name</label>
                    <div className="flex items-center justify-between p-4 backdrop-blur-sm bg-white/5 rounded-lg border border-white/10">
                      <span className="text-gray-200">{session?.user?.name || "Not set"}</span>
                      <button className="text-blue-400 hover:text-blue-300">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-lg font-medium text-white mb-2">Email</label>
                    <div className="flex items-center justify-between p-4 backdrop-blur-sm bg-white/5 rounded-lg border border-white/10">
                      <span className="text-gray-200">{session?.user?.email || "Not set"}</span>
                      <button className="text-blue-400 hover:text-blue-300">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="w-full py-3 px-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-200"
                  >
                    Log out
                  </button>
                </div>
              </div>

              {/* Quick Links */}
              <div className="backdrop-blur-sm bg-white/10 rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-6">Quick Links</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link href="/account/orders" 
                    className="flex items-center justify-between p-4 backdrop-blur-sm bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition duration-200">
                    <span className="text-lg font-medium text-white">Order History</span>
                    <svg className="w-5 h-5 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                  <Link href="/shipping" 
                    className="flex items-center justify-between p-4 backdrop-blur-sm bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition duration-200">
                    <span className="text-lg font-medium text-white">Shipping Info</span>
                    <svg className="w-5 h-5 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </GradientBody>
  );
};

export default AccountPage; 