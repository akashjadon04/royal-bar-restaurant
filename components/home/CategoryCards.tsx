'use client';

import Atropos from 'atropos/react';
import 'atropos/css';
import Image from 'next/image';
import Link from 'next/link';
import { useLocationStore } from '@/store/locationStore';
import { MapPin, Flame } from 'lucide-react';

const categories = [
  {
    id: 1,
    title: 'Order Online',
    subtitle: 'Stay home and order to your door',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800&auto=format&fit=crop',
    href: '/menu',
    popularNear: true
  },
  {
    id: 2,
    title: 'Dining Out',
    subtitle: 'View the city\'s favourite dining venues',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop',
    href: '/reservations',
    popularNear: false
  },
  {
    id: 3,
    title: 'Nightlife & Clubs',
    subtitle: 'Explore the city\'s top nightlife outlets',
    image: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?q=80&w=800&auto=format&fit=crop',
    href: '/nightlife',
    popularNear: true
  },
];

export default function CategoryCards() {
  const { address } = useLocationStore();
  const cityMatch = address.match(/([^,]+),\s*[A-Z]{2}\s*\d{5}/) || address.match(/([^,]+),\s*[A-Z]{2}/) || address.match(/([^,]+),\s*UK/);
  const city = cityMatch ? cityMatch[1].trim() : 'your area';

  return (
    <section id="categories" className="py-12 md:py-16 bg-white overflow-hidden">
      <div className="royal-container px-4 sm:px-6">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <MapPin className="w-6 h-6 text-red-600" />
            Discover in {city}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {categories.map((category) => {
            const CardContent = () => (
              <Link href={category.href} className="block w-full h-full relative rounded-2xl overflow-hidden group border border-white/20">

                <div className="absolute inset-0 z-0" data-atropos-offset="-5">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover scale-[1.15]"
                    priority
                  />
                </div>
                

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" data-atropos-offset="0" />
                
                {category.popularNear && (
                  <div className="absolute top-4 left-4 z-30 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg" data-atropos-offset="10">
                    <Flame className="w-3 h-3" /> Popular near you
                  </div>
                )}


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
            );

            return (
              <div key={category.id} className="relative w-full h-[240px] md:h-[320px]">

                <div className="md:hidden w-full h-full rounded-2xl overflow-hidden shadow-card-hover">
                  <CardContent />
                </div>
                

                <div className="hidden md:block w-full h-full">
                  <Atropos
                    className="w-full h-full rounded-2xl cursor-pointer"
                    activeOffset={40}
                    shadowScale={1.05}
                    highlight={true}
                  >
                    <CardContent />
                  </Atropos>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
