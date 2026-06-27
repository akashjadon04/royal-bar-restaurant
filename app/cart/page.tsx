'use client';

import { useCartStore } from '@/store/cartStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Lottie from 'lottie-react';

const LottieEmptyCart = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch('/lottie-cart.json')
      .then(res => res.json())
      .then(setData)
      .catch(() => {});
  }, []);
  if (!data) return <ShoppingBag className="w-20 h-20 text-zomato-muted mb-6" />;
  return <Lottie animationData={data} className="w-48 h-48" />;
};

export default function CartPage() {
  const [isClient, setIsClient] = useState(false);
  const { items, removeItem, updateQuantity, getTotal } = useCartStore();
  const { isOutOfRange } = require('@/store/locationStore').useLocationStore();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-[#fffbf7] pt-32 pb-24">
      <div className="royal-container max-w-6xl">
        <h1 className="text-4xl font-display font-bold text-zomato-text mb-8">Your Cart</h1>
        
        {items.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-zomato-subtle border border-zomato-border flex flex-col items-center">
            <LottieEmptyCart />
            <h2 className="text-2xl font-bold text-zomato-text mb-4 mt-6">Your cart is empty</h2>
            <p className="text-zomato-muted mb-8">Looks like you haven't added anything to your cart yet.</p>
            <Link 
              href="/menu"
              className="bg-zomato-red hover:bg-zomato-red-dark text-white px-8 py-3 rounded-zomato font-medium transition-colors"
            >
              Explore Menu
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="flex-1 bg-white rounded-2xl p-6 shadow-zomato-subtle border border-zomato-border">
              <h2 className="text-xl font-bold text-zomato-text mb-6 border-b border-zomato-border pb-4">Items ({items.reduce((acc, item) => acc + item.quantity, 0)})</h2>
              <div className="space-y-6">
                <AnimatePresence>
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex flex-col sm:flex-row gap-4 items-center sm:items-start"
                    >
                      <div className="w-24 h-24 relative rounded-xl overflow-hidden shrink-0">
                        <Image src={item.imageUrl} alt={item.name} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" />
                      </div>
                      
                      <div className="flex-1 text-center sm:text-left">
                        <h3 className="font-semibold text-lg text-zomato-text">{item.name}</h3>
                        <p className="text-zomato-red font-bold mt-1">£{item.price.toFixed(2)}</p>
                      </div>

                      <div className="flex items-center gap-4 bg-[#fffbf7] rounded-full px-3 py-1 border border-zomato-border">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:text-zomato-red transition-colors text-zomato-muted"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-medium text-zomato-text w-4 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:text-zomato-red transition-colors text-zomato-muted"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <button 
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-zomato-muted hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Order Summary */}
            <div className="w-full lg:w-96 shrink-0">
              <div className="bg-white rounded-2xl p-6 shadow-zomato-subtle border border-zomato-border sticky top-32">
                <h2 className="text-xl font-bold text-zomato-text mb-6 border-b border-zomato-border pb-4">Bill Details</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-zomato-text">
                    <span className="text-zomato-muted">Item Total</span>
                    <span className="font-medium">£{getTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-zomato-text">
                    <span className="text-zomato-muted">Delivery Fee</span>
                    <span className="font-medium">£2.50</span>
                  </div>
                  <div className="flex justify-between text-zomato-text">
                    <span className="text-zomato-muted">Platform Fee</span>
                    <span className="font-medium">£0.50</span>
                  </div>
                  <div className="border-t border-zomato-border border-dashed pt-4 flex justify-between items-center text-lg font-bold text-zomato-text">
                    <span>Total Pay</span>
                    <span className="text-zomato-red">£{(getTotal() + 3.00).toFixed(2)}</span>
                  </div>
                </div>

                {isOutOfRange ? (
                  <button
                    disabled
                    className="w-full bg-gray-400 text-white font-medium py-4 rounded-zomato flex items-center justify-center gap-2 cursor-not-allowed text-lg"
                  >
                    Out of Serving Radius
                  </button>
                ) : (
                  <Link
                    href="/checkout"
                    className="w-full bg-zomato-red hover:bg-zomato-red-dark text-white font-medium py-4 rounded-zomato flex items-center justify-center gap-2 transition-colors text-lg"
                  >
                    Proceed to Checkout <ArrowRight className="w-5 h-5" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
