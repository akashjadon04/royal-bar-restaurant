'use client';

import { motion } from 'framer-motion';
import { MapPin, Truck, Clock } from 'lucide-react';

export default function DeliveryInfo() {
  return (
    <section className="py-24 bg-royal-900 relative">
      <div className="royal-container">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-royal-gold text-sm uppercase tracking-[0.3em] font-body mb-4 block">Delivery</span>
          <h2 className="font-display text-4xl md:text-5xl text-royal-cream mb-4">
            We Deliver <span className="text-royal-gold">Excellence</span>
          </h2>
          <p className="text-royal-cream/60 max-w-2xl mx-auto text-lg">
            Hot, fresh, and on time. We deliver within a 10-mile radius of our London location.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: MapPin,
              title: '10 Mile Radius',
              description: 'We deliver to addresses within 10 miles of our London location. Enter your postcode to verify.',
            },
            {
              icon: Truck,
              title: 'Free Delivery',
              description: 'Enjoy complimentary delivery on all orders over 40 pounds. Otherwise, a flat 2.99 pounds fee applies.',
            },
            {
              icon: Clock,
              title: 'Express Service',
              description: 'Most deliveries arrive within 45-60 minutes. You can track your order in real-time.',
            },
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-royal-800 border border-royal-600 p-8 rounded-sharp-sm hover:border-royal-gold/30 transition-colors"
              >
                <Icon className="w-10 h-10 text-royal-gold mb-4" />
                <h3 className="font-display text-xl text-royal-cream mb-2">{item.title}</h3>
                <p className="text-royal-cream/60">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
