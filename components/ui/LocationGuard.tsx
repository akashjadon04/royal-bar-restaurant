'use client';

import { useState, useEffect } from 'react';
import { MapPinOff, Navigation, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLocationStore } from '@/store/locationStore';

// Haversine formula to calculate distance in miles
function getDistanceInMiles(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 3958.8; // Radius of earth in miles
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
  const d = R * c; 
  return d;
}

export default function LocationGuard({ children }: { children: React.ReactNode }) {
  const [distance, setDistance] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { setOutOfRange, setDistance: setGlobalDistance } = useLocationStore();

  // Parse env vars or use default (London Eye for development)
  const restaurantLat = parseFloat(process.env.NEXT_PUBLIC_RESTAURANT_LAT || '51.5033');
  const restaurantLng = parseFloat(process.env.NEXT_PUBLIC_RESTAURANT_LNG || '-0.1195');

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const dist = getDistanceInMiles(
          position.coords.latitude,
          position.coords.longitude,
          restaurantLat,
          restaurantLng
        );
        setDistance(dist);
        setGlobalDistance(dist);
        setOutOfRange(dist > 10);
        setLoading(false);
      },
      (err) => {
        // If they deny location, we'll let them browse but maybe show a warning later
        setLoading(false);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  }, [restaurantLat, restaurantLng]);

  // If we are checking location, show children normally (don't block render)
  if (loading) return <>{children}</>;

  // If distance > 10 miles, show a warning banner at the top but don't block the whole app
  const isOutOfRange = distance !== null && distance > 10;

  return (
    <>
      {isOutOfRange && (
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-zomato-red text-white py-3 px-4 flex items-center justify-center gap-3 z-[60] relative top-0"
        >
          <AlertTriangle className="w-5 h-5" />
          <span className="font-medium text-sm md:text-base">
            You are {distance.toFixed(1)} miles away. Delivery is unavailable outside our 10-mile radius.
          </span>
        </motion.div>
      )}
      {children}
    </>
  );
}
