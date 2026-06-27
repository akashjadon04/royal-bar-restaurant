'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

const localities = [
  { name: 'Mayfair', places: 145 },
  { name: 'Soho', places: 210 },
  { name: 'Covent Garden', places: 180 },
  { name: 'Chelsea', places: 120 },
  { name: 'Shoreditch', places: 165 },
  { name: 'Notting Hill', places: 95 },
  { name: 'Camden Town', places: 230 },
  { name: 'Islington', places: 110 },
];

export default function Localities() {
  return (
    <section className="py-12 bg-white">
      <div className="royal-container">
        <h2 className="text-4xl font-display font-semibold mb-8 text-zomato-text text-center md:text-left">
          Popular localities in and around <span className="font-bold">London</span>
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {localities.map((loc, idx) => (
            <Link
              key={idx}
              href={`/location/${loc.name.toLowerCase().replace(' ', '-')}`}
              className="group bg-white border border-zomato-border rounded-zomato p-4 flex items-center justify-between hover:shadow-zomato-subtle transition-shadow"
            >
              <div>
                <h3 className="text-xl text-zomato-text font-medium mb-1 group-hover:text-zomato-red transition-colors">
                  {loc.name}
                </h3>
                <p className="text-zomato-muted font-light">{loc.places} places</p>
              </div>
              <ChevronRight className="w-5 h-5 text-zomato-text group-hover:text-zomato-red transition-colors" />
            </Link>
          ))}
          
          <Link
            href="/locations"
            className="group bg-white border border-zomato-border rounded-zomato p-4 flex items-center justify-center hover:shadow-zomato-subtle transition-shadow"
          >
            <span className="text-lg text-zomato-text font-medium mr-2 group-hover:text-zomato-red transition-colors">
              See more
            </span>
            <ChevronRight className="w-5 h-5 text-zomato-text group-hover:text-zomato-red transition-colors" />
          </Link>
        </div>
      </div>
    </section>
  );
}
