'use client';

import { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import { motion } from 'framer-motion';

export default function Loading() {
  const [animationData, setAnimationData] = useState<any>(null);

  useEffect(() => {
    fetch('/lottie-chef.json')
      .then((res) => res.json())
      .then(setAnimationData)
      .catch(() => {});
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-32 h-32 md:w-48 md:h-48 flex flex-col items-center justify-center"
      >
        {animationData ? (
          <Lottie animationData={animationData} loop={true} />
        ) : (
          <div className="w-12 h-12 border-4 border-zomato-red border-t-transparent rounded-full animate-spin"></div>
        )}
      </motion.div>
    </div>
  );
}
