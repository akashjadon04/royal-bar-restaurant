'use client';

import { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import { Loader2 } from 'lucide-react';

interface LottiePlayerProps {
  src: string;
  className?: string;
  loop?: boolean;
}

export function LottiePlayer({ src, className = "w-48 h-48", loop = true }: LottiePlayerProps) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(src)
      .then(res => res.json())
      .then(setData)
      .catch(() => {});
  }, [src]);

  if (!data) return (
    <div className={`flex items-center justify-center ${className}`}>
      <Loader2 className="w-8 h-8 text-gray-300 animate-spin" />
    </div>
  );
  
  return <Lottie animationData={data} className={className} loop={loop} />;
}
