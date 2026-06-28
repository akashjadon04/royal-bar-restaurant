'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Utensils } from 'lucide-react';
import Atropos from 'atropos/react';
import 'atropos/css';

const signatureCollections = [
  {
    id: 1,
    title: 'Chef\'s Masterpieces',
    subtitle: 'Culinary perfection',
    items: [
      { slug: 'wagyu-beef-fillet', image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?q=100&w=2560&auto=format&fit=crop' },
      { slug: 'lobster-thermidor', image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=100&w=2560&auto=format&fit=crop' },
      { slug: 'truffle-risotto', image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?q=100&w=2560&auto=format&fit=crop' },
      { slug: 'rack-of-lamb', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=100&w=2560&auto=format&fit=crop' },
    ],
    className: 'col-span-1 md:col-span-2 md:row-span-2 h-[350px] md:h-[500px]',
  },
  {
    id: 2,
    title: 'Ocean\'s Finest',
    subtitle: 'Fresh & vibrant',
    items: [
      { slug: 'royal-seafood-platter', image: 'https://images.unsplash.com/photo-1534080564583-6be75777b70a?q=100&w=2560&auto=format&fit=crop' },
      { slug: 'pan-seared-scallops', image: 'https://images.unsplash.com/photo-1579240803525-2e6fb0a5b822?q=100&w=2560&auto=format&fit=crop' },
      { slug: 'caviar-blinis', image: 'https://images.unsplash.com/photo-1580554530778-cb3bdf1e8de8?q=100&w=2560&auto=format&fit=crop' },
    ],
    className: 'col-span-1 md:col-span-1 md:row-span-1 h-[240px]',
  },
  {
    id: 3,
    title: 'Signature Classics',
    subtitle: 'Bold & timeless',
    items: [
      { slug: 'signature-royal-burger', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=100&w=2560&auto=format&fit=crop' },
      { slug: 'duck-confit', image: 'https://images.unsplash.com/photo-1518013431117-eb1465fa5752?q=100&w=2560&auto=format&fit=crop' },
    ],
    className: 'col-span-1 md:col-span-1 md:row-span-1 h-[240px]',
  },
  {
    id: 4,
    title: 'Divine Desserts',
    subtitle: 'Sweet endings',
    items: [
      { slug: 'chocolate-fondant', image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?q=100&w=2560&auto=format&fit=crop' },
      { slug: 'creme-brulee', image: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?q=100&w=2560&auto=format&fit=crop' },
    ],
    className: 'col-span-1 md:col-span-3 md:row-span-1 h-[280px]',
  },
];

export default function Collections() {
  const [activeIndices, setActiveIndices] = useState<Record<number, number>>({
    1: 0, 2: 0, 3: 0, 4: 0
  });

  useEffect(() => {
    const timer1 = setInterval(() => setActiveIndices(prev => ({ ...prev, 1: (prev[1] + 1) % signatureCollections[0].items.length })), 7000);
    const timer2 = setInterval(() => setActiveIndices(prev => ({ ...prev, 2: (prev[2] + 1) % signatureCollections[1].items.length })), 5500);
    const timer3 = setInterval(() => setActiveIndices(prev => ({ ...prev, 3: (prev[3] + 1) % signatureCollections[2].items.length })), 6000);
    const timer4 = setInterval(() => setActiveIndices(prev => ({ ...prev, 4: (prev[4] + 1) % signatureCollections[3].items.length })), 6500);
    
    return () => { clearInterval(timer1); clearInterval(timer2); clearInterval(timer3); clearInterval(timer4); };
  }, []);

  return (
    <section className="py-24 bg-[#fffbf7]">
      <div className="royal-container">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-[#111115]">
              Exquisite <span className="text-transparent bg-clip-text bg-gradient-to-r from-zomato-red to-[#c5a47e]">Signatures</span>
            </h2>
            <p className="text-xl text-[#111115]/60 font-light leading-relaxed">
              Immerse yourself in our meticulously curated selection of culinary masterpieces, crafted with passion and precision.
            </p>
          </div>
          <Link href="/menu" className="group flex items-center gap-2 mt-6 md:mt-0 text-zomato-red font-medium hover:text-[#c5a47e] transition-colors">
            View Full Menu 
            <span className="w-8 h-8 rounded-full bg-zomato-red/10 flex items-center justify-center group-hover:bg-[#c5a47e]/10 transition-colors">
              <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {signatureCollections.map((col) => {
            const activeItem = col.items[activeIndices[col.id]];
            
            return (
              <div key={col.id} className={col.className}>
                <Atropos className="w-full h-full rounded-[2rem] overflow-hidden" activeOffset={40} shadowScale={1.05} highlight={true}>
                  <Link href={`/menu/${activeItem.slug}`} className="relative block w-full h-full group cursor-pointer">
                    
                    <div className="absolute inset-0" data-atropos-offset="-5">
                      {col.items.map((item, idx) => (
                        <Image
                          key={item.slug}
                          src={item.image}
                          alt={item.slug}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className={`absolute inset-0 object-cover transition-all duration-1000 ${
                            idx === activeIndices[col.id] ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                          }`}
                          priority={col.id === 1}
                        />
                      ))}
                    </div>
                    
                    {/* Glassmorphic Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10 transition-opacity duration-500 group-hover:opacity-90 pointer-events-none" />
                    
                    {/* Content */}
                    <div className="absolute inset-0 p-8 flex flex-col justify-between" data-atropos-offset="5">
                      <div className="self-end">
                        <div className="w-10 h-10 rounded-full glass-effect flex items-center justify-center border border-white/20 backdrop-blur-md">
                          <Utensils className="w-4 h-4 text-white" />
                        </div>
                      </div>
                      
                      <div>
                        <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white/90 text-xs font-semibold tracking-wider uppercase mb-3">
                          {col.subtitle}
                        </span>
                        <h3 className="text-3xl font-display font-bold tracking-wide text-white mb-2 group-hover:text-[#c5a47e] transition-colors">
                          {col.title}
                        </h3>
                        <p className="text-sm font-light text-white/70 flex items-center gap-2 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                          Order now <ArrowRight className="w-4 h-4" />
                        </p>
                      </div>
                    </div>
                  </Link>
                </Atropos>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
