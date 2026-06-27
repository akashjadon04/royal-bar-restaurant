'use client';

import { useParams, useRouter } from 'next/navigation';
import { menuItems } from '@/lib/data';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { ChevronLeft, Star, Clock, Flame, Info, Check, Plus, Minus, ShoppingBag, MapPinOff } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useLocationStore } from '@/store/locationStore';

export default function ProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const item = menuItems.find((m) => m.id === id);
  
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Parallax effects
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const addItem = useCartStore((state) => state.addItem);
  const isOutOfRange = useLocationStore((state) => state.isOutOfRange);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!item) {
    return <div className="min-h-screen flex items-center justify-center">Product not found</div>;
  }

  const handleAddToCart = () => {
    addItem({ ...item, quantity });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div ref={containerRef} className="bg-[#fffbf7] min-h-screen relative pb-32 -mt-24">

      {/* Massive Hero Image Section */}
      <div className="relative h-[60vh] md:h-[75vh] w-full overflow-hidden bg-black">
        <motion.div 
          style={{ scale: imageScale, opacity: imageOpacity, y: imageY }} 
          className="absolute inset-0 origin-center"
        >
          <Image 
            src={item.imageUrl} 
            alt={item.name} 
            fill 
            quality={100}
            unoptimized
            className="object-cover" 
            priority
          />
        </motion.div>
        
        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#fffbf7] to-transparent" />
      </div>

      {/* Content Section */}
      <div className="royal-container relative -mt-32 z-10 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-zomato-border/50 backdrop-blur-lg"
        >
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="bg-green-100 text-green-800 font-bold px-4 py-1.5 rounded-full flex items-center gap-1.5 text-sm">
              {item.rating} <Star className="w-4 h-4 fill-green-800" />
            </span>
            <span className="bg-orange-100 text-orange-800 font-bold px-4 py-1.5 rounded-full flex items-center gap-1.5 text-sm">
              <Clock className="w-4 h-4" /> {item.prepTimeMin} mins prep
            </span>
            <span className="bg-red-100 text-red-800 font-bold px-4 py-1.5 rounded-full flex items-center gap-1.5 text-sm">
              <Flame className="w-4 h-4" /> Bestseller
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-display font-bold text-zomato-text mb-4 leading-tight">
            {item.name}
          </h1>
          <p className="text-xl text-zomato-muted font-light mb-12 leading-relaxed">
            {item.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Nutritional Info */}
            <div>
              <h3 className="text-2xl font-bold text-zomato-text mb-6 flex items-center gap-2">
                <Info className="w-6 h-6 text-zomato-red" /> Nutritional Value
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                  <span className="font-medium text-zomato-muted">Calories</span>
                  <span className="font-bold text-zomato-text">450 kcal</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                  <span className="font-medium text-zomato-muted">Proteins</span>
                  <span className="font-bold text-zomato-text">32g</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                  <span className="font-medium text-zomato-muted">Carbs</span>
                  <span className="font-bold text-zomato-text">45g</span>
                </div>
              </div>
            </div>

            {/* Ingredients */}
            <div>
              <h3 className="text-2xl font-bold text-zomato-text mb-6">Chef's Notes</h3>
              <p className="text-zomato-muted leading-relaxed mb-6">
                Sourced from the finest local farms, our {item.name.toLowerCase()} is crafted with a blend of secret spices and slow-cooked to perfection, guaranteeing a melt-in-the-mouth experience that is exclusively Royal Bar.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-zomato-text font-medium">
                  <Check className="w-5 h-5 text-green-500" /> 100% Organic Ingredients
                </li>
                <li className="flex items-center gap-3 text-zomato-text font-medium">
                  <Check className="w-5 h-5 text-green-500" /> Gluten-Free Option Available
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating Add to Cart Bar */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 0.5, type: 'spring' }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-2xl bg-white p-4 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-zomato-border flex items-center justify-between z-50"
      >
        <div className="flex items-center gap-6 pl-4">
          <div className="flex flex-col">
            <span className="text-sm text-zomato-muted font-bold uppercase">Total Price</span>
            <span className="text-2xl font-display font-bold text-zomato-text">£{(item.price * quantity).toFixed(2)}</span>
          </div>

          <div className="hidden sm:flex items-center gap-4 bg-[#fffbf7] rounded-full px-4 py-2 border border-zomato-border">
            <button 
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-1 hover:text-zomato-red transition-colors text-zomato-muted"
            >
              <Minus className="w-5 h-5" />
            </button>
            <span className="font-bold text-zomato-text w-6 text-center text-lg">{quantity}</span>
            <button 
              onClick={() => setQuantity(quantity + 1)}
              className="p-1 hover:text-zomato-red transition-colors text-zomato-muted"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>

        <button 
          onClick={handleAddToCart}
          disabled={added || isOutOfRange}
          className={`flex items-center gap-2 px-8 py-4 rounded-full font-bold text-lg transition-all ${
            isOutOfRange 
              ? 'bg-gray-400 text-white cursor-not-allowed'
              : added 
                ? 'bg-green-600 text-white shadow-lg shadow-green-600/30' 
                : 'bg-zomato-red text-white hover:bg-zomato-red-dark shadow-xl shadow-zomato-red/40 hover:scale-105'
          }`}
        >
          {isOutOfRange ? (
            <>Out of Range <MapPinOff className="w-6 h-6" /></>
          ) : added ? (
            <>Added to Cart <Check className="w-6 h-6" /></>
          ) : (
            <>Add to Cart <ShoppingBag className="w-6 h-6" /></>
          )}
        </button>
      </motion.div>
    </div>
  );
}
