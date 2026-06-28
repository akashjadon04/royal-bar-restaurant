'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import Atropos from 'atropos/react';
import 'atropos/css';

const collections = [
  {
    id: 1,
    title: 'Newly Opened',
    places: '12 Places',
    images: [
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=800&auto=format&fit=crop',
    ],
    className: 'col-span-1 md:col-span-2 md:row-span-2 h-[320px] md:h-[420px]',
  },
  {
    id: 2,
    title: 'Trending This Week',
    places: '30 Places',
    images: [
      'https://images.unsplash.com/photo-1543362906-acfc16c67564?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=800&auto=format&fit=crop',
    ],
    className: 'col-span-1 md:col-span-1 md:row-span-1 h-[200px]',
  },
  {
    id: 3,
    title: 'Best Cocktails',
    places: '18 Places',
    images: [
      'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1536935338788-846bb9981813?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=800&auto=format&fit=crop',
    ],
    className: 'col-span-1 md:col-span-1 md:row-span-1 h-[200px]',
  },
  {
    id: 4,
    title: 'Luxury Dining',
    places: '24 Places',
    images: [
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop',
    ],
    className: 'col-span-1 md:col-span-3 md:row-span-1 h-[200px]',
  },
];

export default function Collections() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 3);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-12 bg-white">
      <div className="royal-container">
        <h2 className="text-4xl font-display font-semibold mb-2 text-zomato-text">Collections</h2>
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <p className="text-xl text-zomato-muted font-light">
            Explore curated lists of top restaurants, cafes, pubs, and bars in London, based on trends
          </p>
          <Link href="/collections" className="text-zomato-red hover:text-zomato-red-dark flex items-center font-medium mt-4 md:mt-0">
            All collections in London <ChevronRight className="w-5 h-5 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {collections.map((col) => (
            <div key={col.id} className={col.className}>
              <Atropos className="w-full h-full rounded-zomato-lg overflow-hidden" activeOffset={40} shadowScale={1.05} highlight={true}>
                <Link href={`/collections/${col.id}`} className="relative block w-full h-full group">
                  <div className="absolute inset-0" data-atropos-offset="-5">
                    {col.images.map((imgUrl, idx) => (
                      <Image
                        key={imgUrl}
                        src={imgUrl}
                        alt={col.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className={`absolute inset-0 object-cover transition-opacity duration-1000 ${
                          idx === activeIndex ? 'opacity-100' : 'opacity-0'
                        }`}
                      />
                    ))}
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
                  
                  <div className="absolute bottom-0 left-0 w-full p-6 text-white" data-atropos-offset="5">
                    <h3 className="text-xl font-display font-medium tracking-wide mb-1 flex items-center">
                      {col.title}
                    </h3>
                    <p className="text-sm font-light text-white/90 flex items-center">
                      {col.places} <ChevronRight className="w-4 h-4 ml-1" />
                    </p>
                  </div>
                </Link>
              </Atropos>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
