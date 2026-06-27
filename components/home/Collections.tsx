'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

const collections = [
  {
    id: 1,
    title: 'Newly Opened',
    places: '12 Places',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Trending This Week',
    places: '30 Places',
    image: 'https://images.unsplash.com/photo-1543362906-acfc16c67564?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Best Cocktails',
    places: '18 Places',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'Luxury Dining',
    places: '24 Places',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop',
  },
];

export default function Collections() {
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((col) => (
            <Link key={col.id} href={`/collections/${col.id}`} className="relative h-[320px] rounded-zomato-lg overflow-hidden group shadow-zomato-subtle">
              <Image
                src={col.image}
                alt={col.title}
                fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Premium Gradient Overlay instead of basic linear gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              
              <div className="absolute bottom-0 left-0 w-full p-4 text-white">
                <h3 className="text-xl font-display font-medium tracking-wide mb-1 flex items-center">
                  {col.title}
                </h3>
                <p className="text-sm font-light text-white/90 flex items-center">
                  {col.places} <ChevronRight className="w-4 h-4 ml-1" />
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
