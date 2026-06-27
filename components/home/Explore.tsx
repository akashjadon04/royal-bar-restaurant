'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const exploreOptions = [
  {
    id: 1,
    title: 'Popular cuisines near me',
    content: 'Italian restaurant near me • Indian restaurant near me • Chinese restaurant near me • Sushi restaurant near me • Thai restaurant near me • Mexican restaurant near me • Cafe near me • Pub near me',
  },
  {
    id: 2,
    title: 'Popular restaurant types near me',
    content: 'Bakeries near me • Bars near me • Beverage Shops near me • Cafés near me • Casual Dining near me • Clubs near me • Dessert Parlors near me • Fine Dining near me',
  },
  {
    id: 3,
    title: 'Top Restaurant Chains',
    content: 'Burger King • KFC • McDonald\'s • Pizza Hut • Starbucks • Subway • Domino\'s',
  },
];

export default function Explore() {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggle = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-16 bg-white">
      <div className="royal-container max-w-4xl">
        <h2 className="text-3xl font-display font-semibold mb-8 text-zomato-text">
          Explore options near me
        </h2>
        
        <div className="space-y-4">
          {exploreOptions.map((option) => (
            <div key={option.id} className="border border-zomato-border rounded-zomato overflow-hidden bg-white hover:shadow-zomato-subtle transition-shadow">
              <button
                onClick={() => toggle(option.id)}
                className="w-full px-6 py-5 flex items-center justify-between bg-white text-left focus:outline-none"
              >
                <span className="text-xl text-zomato-text font-medium">{option.title}</span>
                <ChevronDown 
                  className={`w-6 h-6 text-zomato-text transition-transform duration-300 ${openId === option.id ? 'rotate-180' : ''}`} 
                />
              </button>
              
              <div 
                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                  openId === option.id ? 'max-h-96 pb-5 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="text-zomato-muted font-light leading-relaxed border-t border-zomato-border pt-4">
                  {option.content.split(' • ').map((item, idx, arr) => (
                    <span key={idx}>
                      <a href="#" className="hover:text-zomato-text transition-colors">{item}</a>
                      {idx < arr.length - 1 && <span className="mx-2 text-zomato-border">•</span>}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
