'use client';

import Atropos from 'atropos/react';
import 'atropos/css';
import Image from 'next/image';
import Link from 'next/link';
import { Star, ArrowRight } from 'lucide-react';
import { menuItems } from '@/lib/data';
import 'atropos/css';

export default function Featured() {
  const featuredItems = menuItems.filter(item => ['1', '5', '8'].includes(item.id)).slice(0, 3); // Take exactly 3 specific highly rated items

  return (
    <section className="py-24 bg-[#fffbf7] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-zomato-red/5 skew-x-12 -translate-x-32" />
      
      <div className="royal-container relative z-10">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16">
          <div>
            <span className="text-zomato-red font-bold uppercase tracking-[0.2em] text-sm mb-4 block">Chef's Selection</span>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-zomato-text leading-tight">
              Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-zomato-red to-orange-400">Masterpieces</span>
            </h2>
          </div>
          <Link href="/menu" className="hidden md:flex items-center gap-2 text-zomato-red font-bold hover:gap-4 transition-all uppercase tracking-widest text-sm">
            View Full Menu <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredItems.map((item) => (
            <Link href={`/menu/${item.id}`} key={item.id} className="block group">
              <Atropos
                activeOffset={40}
                shadowScale={1.05}
                className="my-atropos rounded-[2rem] overflow-hidden"
              >
                <div className="relative h-[400px] w-full rounded-[2rem] overflow-hidden">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                    data-atropos-offset="-5"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80" data-atropos-offset="0" />
                  
                  {/* Rating Pill */}
                  <div 
                    data-atropos-offset="5"
                    className="absolute top-6 right-6 bg-white/20 backdrop-blur-md text-white border border-white/30 text-sm font-bold px-4 py-2 rounded-full flex items-center shadow-lg"
                  >
                    {item.rating} <Star className="w-4 h-4 ml-1.5 fill-yellow-400 text-yellow-400" />
                  </div>

                  {/* Content inside image */}
                  <div className="absolute bottom-0 left-0 p-8 w-full" data-atropos-offset="8">
                    <h3 className="text-3xl font-display font-bold text-white mb-3 leading-tight drop-shadow-md">
                      {item.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-white drop-shadow-md">£{item.price.toFixed(2)}</span>
                      <span className="bg-zomato-red text-white p-3 rounded-full group-hover:scale-110 transition-transform shadow-lg">
                        <ArrowRight className="w-6 h-6" />
                      </span>
                    </div>
                  </div>
                </div>
              </Atropos>
            </Link>
          ))}
        </div>
        
        <Link href="/menu" className="md:hidden flex items-center justify-center mt-12 gap-2 text-zomato-red font-bold hover:gap-4 transition-all uppercase tracking-widest text-sm">
          View Full Menu <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </section>
  );
}
