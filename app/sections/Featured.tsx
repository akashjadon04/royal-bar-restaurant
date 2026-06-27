'use client';

import { motion } from 'framer-motion';
import { MenuCard } from '@/components/motion/MenuCard';
import { Sparkles } from 'lucide-react';

const featuredItems = [
  { id: '1', name: 'Signature Royal Burger', description: '28-day aged beef, smoked cheddar, truffle aioli, brioche bun', price: 24.99, imageUrl: 'https://images.unsplash.com/photo-1568901346375-4c9f5f9b6b9c?w=500&q=80', prepTimeMin: 25, rating: 4.8 },
  { id: '2', name: 'Pan-Seared Scallops', description: 'Cauliflower puree, crispy pancetta, lemon butter sauce', price: 32.50, imageUrl: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc4?w=500&q=80', prepTimeMin: 20, rating: 4.9 },
  { id: '3', name: 'Truffle Risotto', description: 'Arborio rice, wild mushrooms, aged parmesan, black truffle', price: 28.00, imageUrl: 'https://images.unsplash.com/photo-1476124369499-a0c0ab26788a?w=500&q=80', prepTimeMin: 30, rating: 4.7 },
  { id: '4', name: 'Wagyu Beef Fillet', description: '250g fillet, bone marrow butter, roasted vine tomatoes', price: 65.00, imageUrl: 'https://images.unsplash.com/photo-1546833999-b99f3c6f5b3d?w=500&q=80', prepTimeMin: 35, rating: 5.0 },
];

export default function FeaturedSection() {
  return (
    <section className="py-24 bg-royal-900 relative">
      <div className="royal-container">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-royal-gold text-sm uppercase tracking-[0.3em] font-body mb-4">
            <Sparkles className="w-4 h-4" />
            Chef's Selection
            <Sparkles className="w-4 h-4" />
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-royal-cream mb-4">
            Featured <span className="text-royal-gold">Dishes</span>
          </h2>
          <p className="text-royal-cream/60 max-w-2xl mx-auto text-lg">
            Handpicked by our executive chef, these dishes represent the pinnacle of British culinary excellence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ y: 60, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <MenuCard {...item} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
