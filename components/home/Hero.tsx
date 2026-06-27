'use client';

import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import { motion } from 'framer-motion';
import { MapPin, Search, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const heroSlides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=2000&auto=format&fit=crop',
    title: 'Authentic Amritsari Flavours',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?q=80&w=2000&auto=format&fit=crop',
    title: 'Rich Punjabi Curries',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2000&auto=format&fit=crop',
    title: 'Premium Handcrafted Cocktails',
  },
];

export default function Hero() {
  const [isFocused, setIsFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      router.push(`/menu?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <section className="relative h-[65vh] md:h-[75vh] w-full bg-black overflow-hidden">
      {/* Background Slideshow */}
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        allowTouchMove={false}
        className="absolute inset-0 w-full h-full"
      >
        {heroSlides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              <Image
                src={slide.image}
                alt={slide.title}
                fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
                unoptimized
                className="object-cover object-center scale-105 animate-[float_20s_ease-in-out_infinite]"
              />
              <div className="absolute inset-0 bg-dark-overlay mix-blend-multiply" />
              <div className="absolute inset-0 bg-black/20" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Content Overlay */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-8xl font-display italic font-bold text-white mb-2 drop-shadow-2xl">
            Royal Bar
          </h1>
          <p className="text-xl md:text-3xl text-white/90 font-light mb-10 drop-shadow-md">
            Discover the best food & drinks in London
          </p>
        </motion.div>

        {/* Zomato-style Search Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className={`flex flex-col md:flex-row items-center bg-white rounded-zomato-lg md:rounded-full p-2 w-full max-w-4xl shadow-card-hover transition-all duration-300 ${
            isFocused ? 'ring-4 ring-zomato-red/30 scale-[1.02]' : ''
          }`}
        >
          {/* Location Selector */}
          <div className="flex items-center w-full md:w-1/3 px-4 py-3 md:py-2 border-b md:border-b-0 md:border-r border-zomato-border text-zomato-muted group cursor-pointer hover:bg-zomato-surface rounded-t-zomato-lg md:rounded-l-full md:rounded-tr-none transition-colors">
            <MapPin className="w-6 h-6 text-zomato-red mr-2 group-hover:scale-110 transition-transform" />
            <input
              type="text"
              placeholder="London, UK"
              className="w-full bg-transparent border-0 focus:ring-0 text-zomato-text placeholder:text-zomato-text text-lg outline-none cursor-pointer"
              readOnly
            />
            <ChevronDown className="w-5 h-5 ml-auto text-zomato-text" />
          </div>

          {/* Global Search */}
          <div className="flex items-center w-full md:w-2/3 px-4 py-3 md:py-2">
            <Search className="w-6 h-6 text-zomato-muted mr-3" />
            <input
              type="text"
              placeholder="Search for a dish (Press Enter)"
              className="w-full bg-transparent border-0 focus:ring-0 text-zomato-text placeholder:text-zomato-muted text-base md:text-lg outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyDown={handleSearch}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
