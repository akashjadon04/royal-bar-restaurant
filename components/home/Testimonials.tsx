'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import Image from 'next/image';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    role: 'Food Critic',
    text: 'An absolute revelation. The Truffle Risotto transported me straight to culinary heaven. Royal Bar sets a new standard for fine dining in the city.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 2,
    name: 'David Chen',
    role: 'Local Guide',
    text: 'The 3D interactive menu is mind-blowing, but the food itself is even better. The Signature Royal Burger is quite literally the best I have ever had.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 3,
    name: 'Emma Thompson',
    role: 'Regular Guest',
    text: 'From the stunning app interface to the lightning-fast delivery and impeccable packaging, they nail every single detail. Pure perfection.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop'
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-orange-100 rounded-full blur-3xl opacity-50 -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-50 rounded-full blur-3xl opacity-50 translate-x-1/3" />
      
      <div className="royal-container relative z-10">
        <div className="text-center mb-16">
          <span className="text-zomato-red font-bold uppercase tracking-[0.2em] text-sm mb-4 block">Guest Experiences</span>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-zomato-text leading-tight">
            Words from our <span className="text-transparent bg-clip-text bg-gradient-to-r from-zomato-red to-orange-400">Royals</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="bg-[#fffbf7] p-8 rounded-3xl border border-zomato-border hover:shadow-2xl transition-all duration-300 relative group"
            >
              <Quote className="absolute top-6 right-6 w-12 h-12 text-zomato-red/10 group-hover:text-zomato-red/20 transition-colors" />
              
              <div className="flex gap-1 mb-6">
                {[...Array(t.rating)].map((_, idx) => (
                  <Star key={idx} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              
              <p className="text-zomato-text text-lg leading-relaxed mb-8 italic relative z-10">
                "{t.text}"
              </p>
              
              <div className="flex items-center gap-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-md">
                  <Image src={t.avatar} alt={t.name} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-zomato-text">{t.name}</h4>
                  <p className="text-sm text-zomato-muted uppercase tracking-wider font-semibold">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
