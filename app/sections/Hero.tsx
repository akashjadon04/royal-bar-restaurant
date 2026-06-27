'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { ChevronDown, Sparkles } from 'lucide-react';

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <div ref={ref} className="relative h-screen overflow-hidden bg-royal-900">
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{ y, scale, transform: 'translateZ(0)' }}
      >
        <div className="w-full h-full bg-gradient-to-b from-royal-700 via-royal-800 to-royal-900" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-royal-900/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-royal-900 via-transparent to-transparent" />
      </motion.div>

      {/* Floating Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-royal-gold/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-royal-gold/3 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4"
        style={{ opacity }}
      >
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-4"
        >
          <span className="inline-flex items-center gap-2 text-royal-gold text-sm uppercase tracking-[0.3em] font-body">
            <Sparkles className="w-4 h-4" />
            Fine Dining & Events
            <Sparkles className="w-4 h-4" />
          </span>
        </motion.div>

        <motion.h1
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-royal-cream mb-6 tracking-wide"
        >
          The Royal <span className="text-royal-gold">Bar</span>
          <br />
          <span className="text-3xl sm:text-4xl md:text-5xl text-royal-cream/80">
            & Villan Hall
          </span>
        </motion.h1>

        <motion.p
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="font-body text-lg md:text-2xl text-royal-gold tracking-widest uppercase mb-8 max-w-2xl"
        >
          Dining Redefined in the Heart of the UK
        </motion.p>

        <motion.p
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-royal-cream/70 text-base md:text-lg max-w-xl mb-10 leading-relaxed"
        >
          Experience exquisite British cuisine, curated cocktails, and an
          elegant像这样 elegant atmosphere. Delivery within 10 miles.
        </motion.p>

        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link href="/menu" className="royal-button text-center">
            Explore Menu
          </Link>
          <Link href="/about" className="royal-button-outline text-center">
            Our Story
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-royal-gold/60"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </div>
  );
}
