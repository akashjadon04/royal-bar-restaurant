'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Award, Users, Clock, MapPin } from 'lucide-react';

export default function AboutPreview() {
  return (
    <section className="py-24 bg-royal-800 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-royal-gold/5 rounded-full blur-3xl" />

      <div className="royal-container relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ x: -60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-royal-gold text-sm uppercase tracking-[0.3em] font-body mb-4 block">Our Story</span>
            <h2 className="font-display text-4xl md:text-5xl text-royal-cream mb-6">
              A Legacy of <span className="text-royal-gold">Excellence</span>
            </h2>
            <p className="text-royal-cream/70 text-lg leading-relaxed mb-6">
              Since 1985, The Royal Bar and Villan Hall has been the crown jewel of British dining.
              Nestled in the heart of London, our establishment combines centuries-old culinary traditions
              with innovative modern techniques.
            </p>
            <p className="text-royal-cream/70 text-lg leading-relaxed mb-8">
              Every dish tells a story - from locally sourced ingredients to the hands of our
              master chefs who have trained under Michelin-starred mentors across Europe.
            </p>
            <Link href="/about" className="royal-button inline-block">
              Discover Our Story
            </Link>
          </motion.div>

          <motion.div
            initial={{ x: 60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 gap-6"
          >
            <div className="bg-royal-700 border border-royal-600 p-6 rounded-sharp-sm">
              <Award className="w-8 h-8 text-royal-gold mb-3" />
              <h3 className="font-display text-2xl text-royal-cream mb-1">Michelin</h3>
              <p className="text-royal-cream/60 text-sm">Starred Excellence</p>
            </div>
            <div className="bg-royal-700 border border-royal-600 p-6 rounded-sharp-sm">
              <Users className="w-8 h-8 text-royal-gold mb-3" />
              <h3 className="font-display text-2xl text-royal-cream mb-1">50K+</h3>
              <p className="text-royal-cream/60 text-sm">Happy Guests</p>
            </div>
            <div className="bg-royal-700 border border-royal-600 p-6 rounded-sharp-sm">
              <Clock className="w-8 h-8 text-royal-gold mb-3" />
              <h3 className="font-display text-2xl text-royal-cream mb-1">39</h3>
              <p className="text-royal-cream/60 text-sm">Years of Service</p>
            </div>
            <div className="bg-royal-700 border border-royal-600 p-6 rounded-sharp-sm">
              <MapPin className="w-8 h-8 text-royal-gold mb-3" />
              <h3 className="font-display text-2xl text-royal-cream mb-1">10 mi</h3>
              <p className="text-royal-cream/60 text-sm">Delivery Radius</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
