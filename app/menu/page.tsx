'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MenuCard } from '@/components/motion/MenuCard';
import CategoryBar from '@/components/ui/CategoryBar';
import { Search, SlidersHorizontal } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';

import { menuItems } from '@/lib/data';

function MenuContent() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const [searchQuery, setSearchQuery] = useState(initialSearch);

  // Update when URL changes
  useEffect(() => {
    setSearchQuery(searchParams.get('search') || '');
  }, [searchParams]);

  const filteredItems = menuItems.filter(item => {
    const q = searchQuery.toLowerCase();
    const matchesName = item.name?.toLowerCase().includes(q) || false;
    const matchesDesc = item.description?.toLowerCase().includes(q) || false;
    const matchesCat = (item as any).category?.toLowerCase().includes(q) || false;
    return matchesName || matchesDesc || matchesCat;
  });

  return (
    <div className="min-h-screen bg-white pt-32 pb-24">
      <div className="royal-container">
        {/* Header */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="text-zomato-red text-sm uppercase tracking-[0.3em] font-body mb-4 block font-bold">Our Menu</span>
          <h1 className="font-display text-4xl md:text-6xl text-zomato-text mb-4 font-bold">
            Culinary <span className="text-zomato-red">Masterpieces</span>
          </h1>
          <p className="text-zomato-muted max-w-2xl mx-auto text-lg font-light">
            Every dish is crafted with passion, precision, and the finest ingredients.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zomato-muted" />
            <input
              type="text"
              placeholder="Search dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-zomato border border-zomato-border focus:border-zomato-red focus:ring-1 focus:ring-zomato-red outline-none transition-all text-zomato-text"
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-zomato border border-zomato-border hover:bg-zomato-red/5 hover:text-zomato-red hover:border-zomato-red transition-all text-zomato-text font-medium whitespace-nowrap">
            <SlidersHorizontal className="w-5 h-5" />
            Filters
          </button>
        </div>

        {/* Categories */}
        <div className="mb-12">
          <CategoryBar />
        </div>

        {/* Menu Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-zomato-text mb-2">No dishes found</h2>
            <p className="text-zomato-muted">Try adjusting your search terms.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
              >
                <MenuCard {...item} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function MenuPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white pt-32 flex justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-zomato-red"></div></div>}>
      <MenuContent />
    </Suspense>
  );
}
