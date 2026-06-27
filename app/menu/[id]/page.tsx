'use client';

import { useParams, useRouter } from 'next/navigation';
import { menuItems } from '@/lib/data';
import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, Star, Clock, Flame, Info, Check, Plus, Minus, ShoppingBag, MapPinOff, Users, Thermometer } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useLocationStore } from '@/store/locationStore';

export default function ProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const item = menuItems.find((m) => m.id === id);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const bottomMarkerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  
  const addItem = useCartStore((state) => state.addItem);
  const isOutOfRange = useLocationStore((state) => state.isOutOfRange);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [spiceLevel, setSpiceLevel] = useState(2);
  const [viewers, setViewers] = useState(3);
  const [showFloatingBar, setShowFloatingBar] = useState(true);

  useEffect(() => {
    // Viewer count simulation
    const interval = setInterval(() => {
      setViewers(prev => Math.max(1, prev + Math.floor(Math.random() * 3) - 1));
    }, 8000);

    // Intersection observer for floating bar
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          setShowFloatingBar(!entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );
    
    if (bottomMarkerRef.current) observer.observe(bottomMarkerRef.current);
    
    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, []);

  if (!item) {
    return <div className="min-h-screen flex items-center justify-center">Product not found</div>;
  }

  const handleAddToCart = () => {
    // Add custom properties if needed in cart (e.g., spiceLevel)
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
          className="bg-white p-6 md:p-12 rounded-[2.5rem] shadow-2xl border border-zomato-border/50 backdrop-blur-lg"
        >
          <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-6">
            <span className="bg-green-100 text-green-800 font-bold px-3 md:px-4 py-1.5 rounded-full flex items-center gap-1.5 text-xs md:text-sm">
              {item.rating} <Star className="w-3 h-3 md:w-4 md:h-4 fill-green-800" />
            </span>
            <span className="bg-orange-100 text-orange-800 font-bold px-3 md:px-4 py-1.5 rounded-full flex items-center gap-1.5 text-xs md:text-sm">
              <Clock className="w-3 h-3 md:w-4 md:h-4" /> {item.prepTimeMin} mins prep
            </span>
            <span className="bg-blue-100 text-blue-800 font-bold px-3 md:px-4 py-1.5 rounded-full flex items-center gap-1.5 text-xs md:text-sm">
              <Users className="w-3 h-3 md:w-4 md:h-4" /> {viewers} people looking
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-display font-bold text-zomato-text mb-4 leading-tight">
            {item.name}
          </h1>
          <p className="text-lg md:text-xl text-zomato-muted font-light mb-8 leading-relaxed">
            {item.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-zomato-text mb-6 flex items-center gap-2">
                <Thermometer className="w-6 h-6 text-orange-500" /> Spice Level
              </h3>
              <div className="flex gap-2">
                {[1, 2, 3, 4].map((level) => (
                  <button
                    key={level}
                    onClick={() => setSpiceLevel(level)}
                    className={`flex-1 py-3 rounded-xl border-2 transition-all flex justify-center items-center ${spiceLevel === level ? 'border-orange-500 bg-orange-50' : 'border-gray-100 hover:border-orange-200 bg-gray-50'}`}
                  >
                    {Array.from({ length: level }).map((_, i) => (
                      <Flame key={i} className={`w-4 h-4 ${spiceLevel === level ? 'text-orange-500' : 'text-gray-400'}`} />
                    ))}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                {spiceLevel === 1 && "Mild - Just a hint of heat"}
                {spiceLevel === 2 && "Medium - The perfect balance"}
                {spiceLevel === 3 && "Hot - For the brave"}
                {spiceLevel === 4 && "Extra Hot - Authentic Indian heat"}
              </p>
            </div>

            {/* Nutritional Info */}
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-zomato-text mb-6 flex items-center gap-2">
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
              </div>
            </div>
          </div>
          
          <div className="mt-12" ref={bottomMarkerRef}>
            <div className="bg-gray-50 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 border border-gray-100">
               <div className="flex items-center gap-4 bg-white rounded-full px-6 py-3 border border-zomato-border shadow-sm">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1 hover:text-zomato-red transition-colors text-zomato-muted"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="font-bold text-zomato-text w-6 text-center text-xl">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1 hover:text-zomato-red transition-colors text-zomato-muted"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="flex-1 w-full flex items-center justify-between md:justify-end gap-6">
                  <div className="flex flex-col text-right">
                    <span className="text-sm text-zomato-muted font-bold uppercase">Total Price</span>
                    <span className="text-3xl font-display font-bold text-zomato-text">£{(item.price * quantity).toFixed(2)}</span>
                  </div>
                  <button 
                    onClick={handleAddToCart}
                    disabled={added || isOutOfRange}
                    className={`flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-lg transition-all w-full md:w-auto ${
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
                      <>Added <Check className="w-6 h-6" /></>
                    ) : (
                      <>Add to Cart <ShoppingBag className="w-6 h-6" /></>
                    )}
                  </button>
                </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating Add to Cart Bar */}
      <AnimatePresence>
        {showFloatingBar && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.4, type: 'spring' }}
            className="fixed bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 w-[95%] sm:w-[90%] max-w-2xl bg-white p-3 md:p-4 rounded-3xl md:rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.15)] border border-zomato-border flex flex-col md:flex-row items-center justify-between gap-3 z-50"
          >
            <div className="flex items-center justify-between w-full md:w-auto gap-4 md:pl-4">
              <div className="flex flex-col">
                <span className="text-xs md:text-sm text-zomato-muted font-bold uppercase">Total Price</span>
                <span className="text-xl md:text-2xl font-display font-bold text-zomato-text">£{(item.price * quantity).toFixed(2)}</span>
              </div>

              <div className="flex items-center gap-3 bg-[#fffbf7] rounded-full px-3 py-1.5 md:px-4 md:py-2 border border-zomato-border">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1 hover:text-zomato-red transition-colors text-zomato-muted"
                >
                  <Minus className="w-4 h-4 md:w-5 md:h-5" />
                </button>
                <span className="font-bold text-zomato-text w-4 md:w-6 text-center text-base md:text-lg">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1 hover:text-zomato-red transition-colors text-zomato-muted"
                >
                  <Plus className="w-4 h-4 md:w-5 md:h-5" />
                </button>
              </div>
            </div>

            <button 
              onClick={handleAddToCart}
              disabled={added || isOutOfRange}
              className={`w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 md:px-8 md:py-4 rounded-full font-bold text-base md:text-lg transition-all ${
                isOutOfRange 
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : added 
                    ? 'bg-green-600 text-white shadow-lg shadow-green-600/30' 
                    : 'bg-zomato-red text-white hover:bg-zomato-red-dark shadow-xl shadow-zomato-red/40 hover:scale-105'
              }`}
            >
              {isOutOfRange ? (
                <span className="flex items-center gap-2">Out of Range <MapPinOff className="w-5 h-5 md:w-6 md:h-6" /></span>
              ) : added ? (
                <span className="flex items-center gap-2">Added <Check className="w-5 h-5 md:w-6 md:h-6" /></span>
              ) : (
                <span className="flex items-center gap-2">Add to Cart <ShoppingBag className="w-5 h-5 md:w-6 md:h-6" /></span>
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
