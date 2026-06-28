'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Crown, Mail, Lock } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });
    
    if (res?.error) {
      alert('Invalid credentials');
    } else if (res?.ok) {
      window.location.href = '/'; // Hard redirect ensures Navbar session refreshes
    } else {
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex bg-[#fffbf7]">
      {/* Left Form Section */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-md bg-white p-8 md:p-12 rounded-2xl shadow-zomato-subtle border border-zomato-border">
          <div className="flex justify-center mb-8">
            <Link href="/" className="flex items-center gap-2 group">
              <Crown className="w-10 h-10 text-zomato-red group-hover:scale-110 transition-transform" />
            </Link>
          </div>
          
          <h1 className="text-3xl font-display font-bold text-center text-zomato-text mb-2">Welcome Back</h1>
          <p className="text-center text-zomato-muted font-light mb-8">Sign in to your Royal Bar account</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-zomato-text mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zomato-muted" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-zomato border border-zomato-border focus:border-zomato-red focus:ring-1 focus:ring-zomato-red outline-none transition-all text-zomato-text"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zomato-text mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zomato-muted" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-zomato border border-zomato-border focus:border-zomato-red focus:ring-1 focus:ring-zomato-red outline-none transition-all text-zomato-text"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-zomato-red hover:bg-zomato-red-dark text-white font-medium py-3 rounded-zomato transition-colors text-lg"
            >
              Log In
            </button>
          </form>

          <p className="text-center mt-6 text-sm text-zomato-muted">
            Don't have an account? <Link href="/auth/signup" className="text-zomato-red font-bold hover:underline">Sign up</Link>
          </p>
        </div>
      </div>

      {/* Right Image Section */}
      <div className="hidden lg:block lg:w-1/2 relative bg-black">
        <Image 
          src="https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=2000&auto=format&fit=crop"
          alt="Restaurant Ambiance"
          fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#fffbf7] to-transparent w-32" />
      </div>
    </div>
  );
}
