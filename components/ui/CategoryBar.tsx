'use client';

import { useState } from 'react';

const categories = [
  'All',
  'Starters',
  'Mains',
  'Desserts',
  'Signature Drinks',
  'Wines',
  'Beers'
];

export default function CategoryBar() {
  const [active, setActive] = useState('All');

  return (
    <div className="flex items-center gap-4 overflow-x-auto pb-4 scrollbar-hide">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setActive(category)}
          className={`px-6 py-2 rounded-full whitespace-nowrap transition-colors font-medium border ${
            active === category 
              ? 'bg-zomato-red text-white border-zomato-red' 
              : 'bg-white text-zomato-text border-zomato-border hover:bg-zomato-surface'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
