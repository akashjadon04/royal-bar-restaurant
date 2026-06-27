'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Crown, Mail, Lock, User, Gift, Clock, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const benefits = [
  { icon: Gift, title: 'Earn Royal Points', desc: 'Get 5% back on every order.' },
  { icon: Clock, title: 'Priority Delivery', desc: 'Skip the queue during rush hours.' },
  { icon: Sparkles, title: 'Exclusive Invites', desc: 'Access to tasting menus and events.' },
];

export default function SignUp() {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success === false) {
          setError(data.message || 'Something went wrong');
        } else {
          router.push('/auth/signin?registered=true');
        }
      } else {
        setError('Something went wrong');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#fffbf7]">
      {/* Left Form Section */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 md:p-16 lg:p-24 relative z-10">
        <div className="w-full max-w-md mx-auto">
          <Link href="/" className="flex items-center gap-2 group mb-12">
            <Crown className="w-10 h-10 text-zomato-red group-hover:scale-110 transition-transform" />
            <span className="font-display text-2xl font-bold tracking-wide text-zomato-text">Royal Bar</span>
          </Link>
          
          <h1 className="text-4xl font-display font-bold text-zomato-text mb-2">Join the Club</h1>
          <p className="text-zomato-muted font-light mb-8">Experience dining like royalty. Create your account today.</p>

          {error && (
            <div className="bg-red-50 text-red-500 p-4 rounded-zomato mb-6 text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zomato-text mb-1">First Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zomato-muted" />
                  <input
                    type="text"
                    required
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 rounded-zomato border border-zomato-border focus:border-zomato-red focus:ring-1 focus:ring-zomato-red outline-none transition-all text-zomato-text"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-zomato-text mb-1">Last Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zomato-muted" />
                  <input
                    type="text"
                    required
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 rounded-zomato border border-zomato-border focus:border-zomato-red focus:ring-1 focus:ring-zomato-red outline-none transition-all text-zomato-text"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zomato-text mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zomato-muted" />
                <input
                  type="email"
                  required
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 rounded-zomato border border-zomato-border focus:border-zomato-red focus:ring-1 focus:ring-zomato-red outline-none transition-all text-zomato-text"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zomato-text mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zomato-muted" />
                <input
                  type="password"
                  required
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 rounded-zomato border border-zomato-border focus:border-zomato-red focus:ring-1 focus:ring-zomato-red outline-none transition-all text-zomato-text"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-zomato-text hover:bg-black text-white font-medium py-4 rounded-zomato transition-colors text-lg mt-4 disabled:opacity-70"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <p className="text-center mt-8 text-sm text-zomato-muted">
            Already have an account? <Link href="/auth/signin" className="text-zomato-text font-bold hover:underline">Log In</Link>
          </p>
        </div>
      </div>

      {/* Right Benefits Section */}
      <div className="hidden lg:block lg:w-1/2 relative bg-zomato-text overflow-hidden">
        <Image 
          src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=2000&auto=format&fit=crop"
          alt="Restaurant Ambiance"
          fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover opacity-40 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-zomato-text/90 to-zomato-red/80" />
        
        <div className="absolute inset-0 flex flex-col justify-center px-24 z-20">
          <h2 className="text-4xl font-display font-bold text-white mb-12">Member Benefits</h2>
          <div className="space-y-10">
            {benefits.map((benefit, i) => (
              <div key={i} className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/20">
                  <benefit.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{benefit.title}</h3>
                  <p className="text-white/70">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
