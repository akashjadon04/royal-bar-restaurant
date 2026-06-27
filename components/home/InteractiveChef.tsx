'use client';

import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChefHat } from 'lucide-react';

export default function InteractiveChef() {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    // Fetching a public high-quality Lottie JSON for a chef/cooking animation
    fetch('/animation.json')
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((err) => console.log('Error loading lottie', err));
  }, []);

  return (
    <section className="py-24 bg-zomato-text relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
      
      <div className="royal-container relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Lottie Animation Side */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 flex justify-center"
          >
            <div className="w-full max-w-md h-[400px] bg-white/5 backdrop-blur-xl rounded-[3rem] border border-white/10 p-8 shadow-2xl relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-zomato-red/20 to-transparent rounded-[3rem] blur-2xl -z-10" />
              {animationData ? (
                <Lottie animationData={animationData} loop={true} className="w-full h-full drop-shadow-2xl" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="animate-pulse flex flex-col items-center gap-4">
                    <ChefHat className="w-16 h-16 text-white/50" />
                    <div className="text-white/50 font-medium tracking-widest uppercase">The Kitchen is heating up...</div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-1/2 text-white"
          >
            <span className="text-zomato-red font-bold uppercase tracking-[0.2em] text-sm mb-4 block">Meet The Master</span>
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight">
              Culinary <span className="text-transparent bg-clip-text bg-gradient-to-r from-zomato-red to-orange-400">Excellence</span>
            </h2>
            <p className="text-white/70 text-lg mb-8 leading-relaxed font-light">
              Our Head Chef curates every dish with passion, using only the finest ingredients sourced directly from local farmers and authentic Indian spice merchants. Watch the magic unfold as traditional recipes meet modern gastronomy.
            </p>
            
            <Link href="/menu">
              <button className="group relative px-8 py-4 bg-white text-zomato-text font-bold rounded-full overflow-hidden transition-all hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.3)]">
                <span className="relative z-10 flex items-center gap-2">
                  Taste the Magic
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-zomato-red to-orange-500 opacity-0 group-hover:opacity-10 transition-opacity" />
              </button>
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
