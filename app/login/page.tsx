"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

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
    <main className="min-h-screen bg-white text-black flex flex-col">
      <header className="flex justify-between items-center p-6 border-b border-gray-200">
        <h1 className="text-xl font-semibold tracking-wide">Vellux</h1>
        <nav>
          <ul className="flex space-x-6 text-sm font-medium">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/products">Products</Link></li>
            <li><Link href="/cart">Cart</Link></li>
            <li><Link href="/login">Login</Link></li>
          </ul>
        </nav>
      </header>
      <div className="flex flex-col items-center justify-center flex-grow bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Login */}
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <p className="mb-6 text-gray-700">Please enter your email and password below to access your account</p>
            <form className="space-y-4" onSubmit={handleLogin}>
              <div>
                <label htmlFor="login-email" className="block font-medium mb-1">Email Address <span className="text-red-500">*</span></label>
                <input id="login-email" name="email" type="email" required className="w-full border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
              </div>
              <div>
                <label htmlFor="login-password" className="block font-medium mb-1">Password <span className="text-red-500">*</span></label>
                <input id="login-password" name="password" type="password" required className="w-full border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
              </div>
              {loginError && <div className="text-red-600 text-sm font-medium">{loginError}</div>}
              <div className="flex items-center gap-4 mt-4">
                <button type="submit" className="px-8 py-2 border border-black rounded bg-white text-black font-bold hover:bg-black hover:text-white transition">SIGN IN</button>
                <Link href="#" className="text-sm text-black underline hover:text-gray-700">Lost your password?</Link>
              </div>
            </form>
          </div>
          {/* Register */}
          <div className="flex flex-col justify-center bg-gray-50 rounded-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-bold mb-4 text-center md:text-left">Register</h2>
            <p className="mb-6 text-gray-700 text-center md:text-left">Please register below to create an account</p>
            <form className="space-y-4" onSubmit={handleRegister}>
              <div>
                <label htmlFor="register-firstname" className="block font-medium mb-1">First Name</label>
                <input id="register-firstname" name="firstname" type="text" className="w-full border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
              </div>
              <div>
                <label htmlFor="register-lastname" className="block font-medium mb-1">Last Name</label>
                <input id="register-lastname" name="lastname" type="text" className="w-full border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
              </div>
              <div>
                <label htmlFor="register-email" className="block font-medium mb-1">Your Email Address <span className="text-red-500">*</span></label>
                <input id="register-email" name="email" type="email" required className="w-full border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
              </div>
              <div>
                <label htmlFor="register-password" className="block font-medium mb-1">Your Password <span className="text-red-500">*</span></label>
                <input id="register-password" name="password" type="password" required className="w-full border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
              </div>
              {registerError && <div className="text-red-600 text-sm font-medium">{registerError}</div>}
              {registerSuccess && <div className="text-green-600 text-sm font-medium">{registerSuccess}</div>}
              <button type="submit" className="w-full px-8 py-2 border border-black rounded bg-black text-white font-bold hover:bg-gray-900 transition mt-4">CREATE AN ACCOUNT</button>
            </form>
          </div>
        </div>
      </div>
      <footer className="border-t border-gray-200 p-6 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} Rattrapage Digi. All rights reserved.
      </footer>
    </main>
  );
} 