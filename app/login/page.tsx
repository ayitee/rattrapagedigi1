"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import Header from '../components/Header';

export default function LoginPage() {
  const [loginError, setLoginError] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState('');

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoginError('');
    const form = e.currentTarget;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;
    
    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
    
    if (res?.error) {
      setLoginError('Invalid email or password.');
    } else {
      window.location.href = "/";
    }
  }

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setRegisterError('');
    setRegisterSuccess('');
    const form = e.currentTarget;
    const firstname = (form.elements.namedItem('firstname') as HTMLInputElement).value;
    const lastname = (form.elements.namedItem('lastname') as HTMLInputElement).value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;
    
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstname, lastname, email, password }),
    });
    
    const data = await res.json();
    if (!res.ok) {
      setRegisterError(data.error || 'Registration failed.');
    } else {
      setRegisterSuccess('Registration successful! You can now log in.');
      form.reset();
    }
  }

  return (
    <main className="min-h-screen bg-transparent text-white flex flex-col">
      <div aria-hidden="true" className="h-20 md:h-24 w-full"></div>
      <Header />
      <div className="flex flex-col items-center justify-center flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Login */}
          <div className="flex flex-col justify-center glassmorphic bg-white/10 border border-white/20 rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-4 text-white">Login</h2>
            <p className="mb-6 text-white/70">Please enter your email and password below to access your account</p>
            <form className="space-y-4" onSubmit={handleLogin}>
              <div>
                <label htmlFor="login-email" className="block font-medium mb-1 text-white">Email Address <span className="text-red-400">*</span></label>
                <input id="login-email" name="email" type="email" required className="w-full border border-white/30 rounded px-3 py-2 bg-white/10 text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" />
              </div>
              <div>
                <label htmlFor="login-password" className="block font-medium mb-1 text-white">Password <span className="text-red-400">*</span></label>
                <input id="login-password" name="password" type="password" required className="w-full border border-white/30 rounded px-3 py-2 bg-white/10 text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" />
              </div>
              {loginError && <div className="text-red-400 text-sm font-medium">{loginError}</div>}
              <div className="flex items-center gap-4 mt-4">
                <button type="submit" className="px-8 py-2 rounded bg-gradient-to-r from-blue-700 to-blue-500 text-white font-bold shadow border border-white/30 hover:from-blue-800 hover:to-blue-600 transition">SIGN IN</button>
                <Link href="#" className="text-sm text-white underline hover:text-blue-300">Lost your password?</Link>
              </div>
            </form>
          </div>
          {/* Register */}
          <div className="flex flex-col justify-center glassmorphic bg-white/10 border border-white/20 rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-4 text-center md:text-left text-white">Register</h2>
            <p className="mb-6 text-white/70 text-center md:text-left">Please register below to create an account</p>
            <form className="space-y-4" onSubmit={handleRegister}>
              <div>
                <label htmlFor="register-firstname" className="block font-medium mb-1 text-white">First Name</label>
                <input id="register-firstname" name="firstname" type="text" className="w-full border border-white/30 rounded px-3 py-2 bg-white/10 text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" />
              </div>
              <div>
                <label htmlFor="register-lastname" className="block font-medium mb-1 text-white">Last Name</label>
                <input id="register-lastname" name="lastname" type="text" className="w-full border border-white/30 rounded px-3 py-2 bg-white/10 text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" />
              </div>
              <div>
                <label htmlFor="register-email" className="block font-medium mb-1 text-white">Your Email Address <span className="text-red-400">*</span></label>
                <input id="register-email" name="email" type="email" required className="w-full border border-white/30 rounded px-3 py-2 bg-white/10 text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" />
              </div>
              <div>
                <label htmlFor="register-password" className="block font-medium mb-1 text-white">Your Password <span className="text-red-400">*</span></label>
                <input id="register-password" name="password" type="password" required className="w-full border border-white/30 rounded px-3 py-2 bg-white/10 text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" />
              </div>
              {registerError && <div className="text-red-400 text-sm font-medium">{registerError}</div>}
              {registerSuccess && <div className="text-green-400 text-sm font-medium">{registerSuccess}</div>}
              <button type="submit" className="w-full px-8 py-2 rounded bg-gradient-to-r from-green-700 to-green-500 text-white font-bold shadow border border-white/30 hover:from-green-800 hover:to-green-600 transition mt-4">CREATE AN ACCOUNT</button>
            </form>
          </div>
        </div>
      </div>
      <footer className="border-t border-white/20 p-6 text-center text-xs text-white/60 bg-transparent">
        &copy; {new Date().getFullYear()} Rattrapage Digi. All rights reserved.
      </footer>
    </main>
  );
} 