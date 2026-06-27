'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Home, RefreshCcw } from 'lucide-react';
import { LottiePlayer } from '@/components/motion/LottiePlayer';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md w-full">
        <div className="w-64 h-64 mx-auto mb-8 relative">
          <LottiePlayer src="/lottie/anim_4.json" className="w-full h-full drop-shadow-xl" />
        </div>

        <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Something went wrong</h1>
        <p className="text-gray-500 mb-8 leading-relaxed">
          Looks like we spilled some curry on the server. Don't worry, we're cleaning it up!
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => reset()}
            className="w-full sm:w-auto px-6 py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-full hover:bg-gray-50 hover:border-gray-400 transition flex items-center justify-center"
          >
            <RefreshCcw className="w-5 h-5 mr-2" />
            Try Again
          </button>
          
          <Link 
            href="/"
            className="w-full sm:w-auto bg-red-600 text-white px-8 py-3 rounded-full font-bold hover:bg-red-700 transition shadow-lg shadow-red-200 flex items-center justify-center"
          >
            <Home className="w-5 h-5 mr-2" />
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
