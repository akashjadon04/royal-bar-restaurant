'use client';

import Atropos from 'atropos/react';
import Image from 'next/image';
import Link from 'next/link';

const categories = [
  {
    id: 1,
    title: 'Order Online',
    subtitle: 'Stay home and order to your door',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800&auto=format&fit=crop',
    href: '/menu',
  },
  {
    id: 2,
    title: 'Dining Out',
    subtitle: 'View the city\'s favourite dining venues',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop',
    href: '/reservations',
  },
  {
    id: 3,
    title: 'Nightlife & Clubs',
    subtitle: 'Explore the city\'s top nightlife outlets',
    image: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?q=80&w=800&auto=format&fit=crop',
    href: '/nightlife',
  },
];

export default function CategoryCards() {
  return (
    <section id="categories" className="py-16 bg-white overflow-hidden">
      <div className="royal-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Atropos
              key={category.id}
              className="w-full h-[320px] rounded-2xl cursor-pointer"
              activeOffset={60}
              shadowScale={1.1}
              highlight={true}
            >
              <Link href={category.href} className="block w-full h-full relative rounded-2xl overflow-hidden group border border-white/20">
                {/* Background Layer (Moves backward) */}
                <div className="absolute inset-0 z-0" data-atropos-offset="-8">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover scale-[1.15]"
                  />
                </div>
                
                {/* Midground Gradient Overlay (Moves slightly) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" data-atropos-offset="0" />
                
                {/* Foreground Content (Pops out dramatically) */}
                <div className="absolute bottom-0 left-0 w-full p-8 text-white z-20 flex flex-col justify-end h-full pointer-events-none">
                  <h3 
                    className="text-4xl font-display font-bold mb-2 drop-shadow-xl" 
                    data-atropos-offset="8"
                  >
                    {category.title}
                  </h3>
                  <p 
                    className="text-white/90 font-medium text-lg drop-shadow-md" 
                    data-atropos-offset="4"
                  >
                    {category.subtitle}
                  </p>
                </div>
              </Link>
            </Atropos>
          ))}
        </div>
      </div>
    </section>
  );
}
