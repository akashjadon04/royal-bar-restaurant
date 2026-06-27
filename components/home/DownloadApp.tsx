'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function DownloadApp() {
  const [method, setMethod] = useState<'email' | 'phone'>('email');

  return (
    <section className="py-20 bg-[#fffbf7]">
      <div className="royal-container max-w-5xl">
        <div className="flex flex-col md:flex-row items-center gap-12">
          
          {/* Phone Mockup Image */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            <div className="relative w-[300px] h-[400px] overflow-hidden rounded-t-[40px] shadow-2xl border-[12px] border-white bg-white">
               <Image 
                src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop"
                alt="App screenshot"
                fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
               />
               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-white rounded-b-xl" />
            </div>
          </div>

          {/* Form Content */}
          <div className="w-full md:w-1/2">
            <h2 className="text-4xl md:text-5xl font-display font-semibold mb-4 text-zomato-text">
              Get the Royal Bar app
            </h2>
            <p className="text-lg text-zomato-muted font-light mb-8 max-w-md">
              We will send you a link, open it on your phone to download the app
            </p>

            <div className="flex items-center gap-6 mb-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="method" 
                  checked={method === 'email'} 
                  onChange={() => setMethod('email')}
                  className="w-5 h-5 text-zomato-red focus:ring-zomato-red"
                />
                <span className="text-lg text-zomato-text">Email</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="method" 
                  checked={method === 'phone'} 
                  onChange={() => setMethod('phone')}
                  className="w-5 h-5 text-zomato-red focus:ring-zomato-red"
                />
                <span className="text-lg text-zomato-text">Phone</span>
              </label>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <input 
                type={method === 'email' ? 'email' : 'tel'} 
                placeholder={method === 'email' ? 'Email' : 'Phone Number'}
                className="flex-1 bg-white border border-zomato-border text-zomato-text px-4 py-3 rounded-zomato outline-none focus:border-zomato-red focus:ring-1 focus:ring-zomato-red transition-all"
              />
              <button className="bg-zomato-red text-white px-8 py-3 rounded-zomato hover:bg-zomato-red-dark transition-colors font-medium text-lg whitespace-nowrap">
                Share App Link
              </button>
            </div>

            <p className="text-zomato-muted font-light text-sm mb-4">Download app from</p>
            <div className="flex gap-4">
              <div className="w-36 h-12 relative cursor-pointer hover:opacity-80 transition-opacity">
                <Image 
                  src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" 
                  alt="App Store" 
                  fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
                  className="object-contain"
                />
              </div>
              <div className="w-40 h-12 relative cursor-pointer hover:opacity-80 transition-opacity">
                <Image 
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                  alt="Google Play" 
                  fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
                  className="object-contain"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
