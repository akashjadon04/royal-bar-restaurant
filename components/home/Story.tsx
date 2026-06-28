'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Atropos from 'atropos/react';
import 'atropos/css';
import Lottie from 'lottie-react';
import { useState, useEffect } from 'react';

export default function Story() {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch('/lottie-story.json')
      .then(res => res.json())
      .then(setAnimationData)
      .catch(() => {});
  }, []);

  return (
    <section className="py-24 bg-[#0a0a0f] text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-zomato-red/10 to-transparent pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-zomato-red/20 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="royal-container relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 space-y-8"
          >
            <h2 className="text-5xl md:text-6xl font-display font-bold leading-tight">
              A Legacy of <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c5a47e] to-[#d4bc9a]">Royal Taste</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#c5a47e] to-transparent rounded-full" />
            
            <p className="text-white/70 text-lg leading-relaxed font-light">
              Since 1998, Royal Bar Restaurant has been redefining luxury dining in the heart of London. We blend timeless culinary traditions with modern flair, crafting an atmosphere where every meal is a masterpiece and every guest is treated like royalty.
            </p>
            <p className="text-white/70 text-lg leading-relaxed font-light">
              From our globally-sourced premium ingredients to our masterclass mixology, we promise an unforgettable sensory journey.
            </p>
            
            <div className="pt-4 flex gap-6">
              <div className="text-center">
                <span className="block text-4xl font-display font-bold text-[#c5a47e]">25+</span>
                <span className="text-sm text-white/50 uppercase tracking-widest mt-1 block">Years of Excellence</span>
              </div>
              <div className="w-px bg-white/10" />
              <div className="text-center">
                <span className="block text-4xl font-display font-bold text-[#c5a47e]">50k+</span>
                <span className="text-sm text-white/50 uppercase tracking-widest mt-1 block">Happy Guests</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-1/2"
          >
            <Atropos
              className="w-full h-[500px] rounded-3xl"
              activeOffset={40}
              shadowScale={1.05}
              highlight={true}
            >
              <div className="w-full h-full relative rounded-3xl overflow-hidden border border-white/10 group bg-[#111115] flex items-center justify-center">
                {animationData ? (
                  <Lottie 
                    animationData={animationData} 
                    className="w-full h-full scale-125 object-cover opacity-80 group-hover:scale-110 transition-transform duration-1000" 
                    data-atropos-offset="-5" 
                  />
                ) : (
                  <div className="w-full h-full bg-[#111115]" />
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/40 to-transparent pointer-events-none" data-atropos-offset="0" />
                
                <div className="absolute bottom-8 left-8 right-8 z-20 pointer-events-none" data-atropos-offset="8">
                  <div className="glass-effect p-6 rounded-2xl border border-white/10 backdrop-blur-md">
                    <p className="text-white font-medium text-lg italic">
                      "An absolute pinnacle of fine dining. The ambiance, the cocktails, the food—flawless."
                    </p>
                    <div className="mt-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden relative">
                        <Image src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80" alt="Reviewer" fill className="object-cover" />
                      </div>
                      <div>
                        <div className="text-white font-bold text-sm">Sarah Jenkins</div>
                        <div className="text-[#c5a47e] text-xs font-medium">Food Critic</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Atropos>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
