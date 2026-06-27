'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Plus, Star, Clock, Check, ChevronRight } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useState } from 'react';

interface MenuCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  prepTimeMin: number;
  rating: number;
}

export function MenuCard({ id, name, description, price, imageUrl, prepTimeMin, rating }: MenuCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to the product page when just clicking "Add"
    addItem({ id, name, price, quantity: 1, imageUrl });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <Link href={`/menu/${id}`} className="zomato-card flex flex-col h-full group block bg-white hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden border border-transparent hover:border-zomato-red/10 cursor-pointer">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={name}
          fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-zomato-text text-xs font-bold px-2.5 py-1.5 rounded-md shadow-sm flex items-center transform transition-transform group-hover:scale-105">
          <Clock className="w-3 h-3 mr-1.5 text-zomato-red" /> {prepTimeMin} min
        </div>
        <div className="absolute top-3 right-3 bg-green-700 text-white text-xs font-bold px-2.5 py-1.5 rounded-md flex items-center shadow-md transform transition-transform group-hover:scale-105">
          {rating} <Star className="w-3 h-3 ml-1.5 fill-white" />
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow relative">
        <h3 className="text-xl font-display font-bold text-zomato-text mb-2 group-hover:text-zomato-red transition-colors flex justify-between items-start">
          {name}
          <ChevronRight className="w-5 h-5 text-zomato-red opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300" />
        </h3>
        <p className="text-sm text-zomato-muted mb-6 line-clamp-2 leading-relaxed">{description}</p>
        
        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-zomato-muted uppercase tracking-wider font-bold mb-0.5">Price</span>
            <span className="text-2xl font-display font-bold text-zomato-text">£{price.toFixed(2)}</span>
          </div>
          <button 
            onClick={handleAdd}
            disabled={added}
            className={`${added ? 'bg-green-600 text-white shadow-green-600/30' : 'bg-zomato-red text-white shadow-zomato-red/30 hover:bg-zomato-red-dark hover:scale-105'} px-5 py-2.5 rounded-full shadow-lg transition-all flex items-center font-bold text-sm`}
          >
            {added ? (
              <>Added <Check className="w-4 h-4 ml-1.5" /></>
            ) : (
              <>Add to Cart <Plus className="w-4 h-4 ml-1.5" /></>
            )}
          </button>
        </div>
      </div>
    </Link>
  );
}
