'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import LottieEmptyCart from '@/app/cart/page'; // wait, I can just fetch the animation locally
import Lottie from 'lottie-react';
import { useEffect, useState } from 'react';
import { ChefHat } from 'lucide-react';

export default function NotFound() {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch('/lottie-chef.json')
      .then((res) => res.json())
      .then(setAnimationData)
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-white px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full text-center flex flex-col items-center"
      >
        <div className="w-64 h-64 mb-8">
          {animationData ? (
            <Lottie animationData={animationData} loop={true} />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-zomato-bg rounded-full">
              <ChefHat className="w-20 h-20 text-zomato-muted" />
            </div>
          )}
        </div>
        <h1 className="text-4xl font-display font-bold text-zomato-text mb-4">404 - Dish Not Found</h1>
        <p className="text-zomato-muted text-lg mb-8">
          Looks like this page was taken off the menu. Don't worry, we have plenty of other delicious options!
        </p>
        <Link 
          href="/"
          className="bg-zomato-red text-white px-8 py-3 rounded-full font-bold hover:bg-black transition-colors"
        >
          Back to Menu
        </Link>
      </motion.div>
    </div>
  );
}
