'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, Package, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { LottiePlayer } from '@/components/motion/LottiePlayer';

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState('');
  const router = useRouter();

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId.trim()) {
      router.push(`/track-order/${orderId.trim()}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#fffbf7] pt-32 pb-16 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-40 h-40 mx-auto mb-2">
            <LottiePlayer src="/lottie/anim_8.json" className="w-full h-full opacity-90" />
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-zomato-text mb-4">Track Your Order</h1>
          <p className="text-zomato-muted text-lg mb-10 font-light">
            Enter your unique Order ID below to get real-time updates on your Royal Bar delivery.
          </p>

          <form onSubmit={handleTrack} className="flex flex-col md:flex-row items-center gap-4 max-w-lg mx-auto mb-16">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zomato-muted" />
              <input
                type="text"
                placeholder="e.g. ORD-123456"
                required
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-full border border-zomato-border focus:border-zomato-red focus:ring-1 focus:ring-zomato-red outline-none text-lg text-zomato-text transition-all"
              />
            </div>
            <button
              type="submit"
              className="w-full md:w-auto bg-zomato-red text-white px-8 py-4 rounded-full font-bold hover:bg-black transition-colors"
            >
              Track
            </button>
          </form>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-zomato-border/50">
              <Clock className="w-8 h-8 text-zomato-red mb-4" />
              <h3 className="font-bold text-zomato-text mb-2">Real-time Updates</h3>
              <p className="text-sm text-zomato-muted">Know exactly when your food is being prepared and picked up.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-zomato-border/50">
              <MapPin className="w-8 h-8 text-zomato-red mb-4" />
              <h3 className="font-bold text-zomato-text mb-2">Live Location</h3>
              <p className="text-sm text-zomato-muted">Watch your order arrive on the map right to your doorstep.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-zomato-border/50">
              <Package className="w-8 h-8 text-zomato-red mb-4" />
              <h3 className="font-bold text-zomato-text mb-2">Quality Sealed</h3>
              <p className="text-sm text-zomato-muted">Your food is sealed fresh by our master chefs.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
