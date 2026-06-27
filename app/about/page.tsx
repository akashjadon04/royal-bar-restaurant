'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Award } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-royal-900 pt-32 pb-24">
      <div className="royal-container">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-royal-gold text-sm uppercase tracking-wider mb-4 block">About Us</span>
          <h1 className="font-display text-5xl md:text-7xl text-royal-cream mb-6">
            Our <span className="text-royal-gold">Story</span>
          </h1>
          <p className="text-royal-cream/60 max-w-3xl mx-auto text-lg leading-relaxed">
            The Royal Bar and Villan Hall has been a cornerstone of British fine dining since 1985.
            What began as a small family-owned tavern has evolved into one of the most celebrated
            dining destinations in the United Kingdom.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ x: -60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[400px] rounded-sm overflow-hidden"
          >
            <div className="w-full h-full bg-gradient-to-br from-royal-700 to-royal-800" />
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          </motion.div>

          <motion.div
            initial={{ x: 60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="font-display text-3xl md:text-4xl text-royal-cream mb-6">
              Four Decades of <span className="text-royal-gold">Excellence</span>
            </h2>
            <p className="text-royal-cream/70 text-lg leading-relaxed mb-6">
              Founded by the Villan family in 1985, our restaurant has always been driven by a simple
              philosophy: source the finest ingredients, treat them with respect, and serve them with
              warmth and generosity.
            </p>
            <p className="text-royal-cream/70 text-lg leading-relaxed mb-6">
              Our head chef, Marcus Sterling, brings over 25 years of experience from Michelin-starred
              kitchens across Europe. Under his leadership, our menu has earned critical acclaim and
              a loyal following of discerning diners.
            </p>
            <div className="flex items-center gap-4">
              <Award className="w-12 h-12 text-royal-gold" />
              <div>
                <p className="font-display text-royal-cream text-lg">Michelin Star</p>
                <p className="text-royal-cream/60 text-sm">Since 2012</p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-royal-800 border border-royal-600 rounded-sm p-12 mb-24"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '39', label: 'Years of Excellence' },
              { value: '50K+', label: 'Happy Guests' },
              { value: '28', label: 'Team Members' },
              { value: '4.9', label: 'Average Rating' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-4xl md:text-5xl text-royal-gold mb-2">{stat.value}</p>
                <p className="text-royal-cream/60 text-sm uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="text-royal-gold text-sm uppercase tracking-wider mb-4 block">Contact</span>
          <h2 className="font-display text-3xl md:text-4xl text-royal-cream mb-8">
            Visit <span className="text-royal-gold">Us</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: MapPin,
              title: 'Address',
              content: '12 High Street, Royal Villan, Greater London, SW1A 1AA',
            },
            {
              icon: Phone,
              title: 'Phone',
              content: '+44 1234 567 890',
            },
            {
              icon: Mail,
              title: 'Email',
              content: 'hello@royalbarvillanhall.co.uk',
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-royal-800 border border-royal-600 p-8 rounded-sm text-center"
              >
                <Icon className="w-8 h-8 text-royal-gold mx-auto mb-4" />
                <h3 className="font-display text-xl text-royal-cream mb-2">{item.title}</h3>
                <p className="text-royal-cream/60">{item.content}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
