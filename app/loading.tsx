import { LottiePlayer } from '@/components/motion/LottiePlayer';

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
      <div className="w-48 h-48 mb-4">
        <LottiePlayer src="/lottie/anim_5.json" className="w-full h-full drop-shadow-lg" />
      </div>
      <h2 className="text-2xl font-display font-bold text-zomato-text animate-pulse">
        Preparing your experience...
      </h2>
    </div>
  );
}
