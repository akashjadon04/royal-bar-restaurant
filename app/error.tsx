'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Lottie from 'lottie-react';
import { ShieldAlert } from 'lucide-react';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    console.error('App Error Boundary caught:', error);
    fetch('/animation.json')
      .then((res) => res.json())
      .then(setAnimationData)
      .catch(() => {});
  }, [error]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-white px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full text-center flex flex-col items-center"
      >
        <div className="w-64 h-64 mb-6 relative">
          <div className="absolute inset-0 bg-red-50 rounded-full animate-pulse" />
          {animationData ? (
            <Lottie animationData={animationData} loop={true} className="relative z-10" />
          ) : (
            <div className="w-full h-full flex items-center justify-center relative z-10">
              <ShieldAlert className="w-24 h-24 text-zomato-red" />
            </div>
          )}
        </div>
        
        <h1 className="text-3xl font-display font-bold text-zomato-text mb-4">Oops! Something spilled.</h1>
        <p className="text-zomato-muted text-lg mb-8">
          We encountered an unexpected error in the kitchen. Our chefs are cleaning it up!
        </p>
        
        <div className="flex gap-4">
          <button 
            onClick={() => reset()}
            className="bg-zomato-red text-white px-8 py-3 rounded-full font-bold hover:bg-black transition-colors"
          >
            Try Again
          </button>
          <Link 
            href="/"
            className="bg-zomato-bg text-zomato-text px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition-colors"
          >
            Go Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
