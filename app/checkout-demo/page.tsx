import Link from "next/link";
import { CreditCard, CheckCircle, AlertCircle } from "lucide-react";
import { LottiePlayer } from '@/components/motion/LottiePlayer';

export default async function CheckoutDemo({ searchParams }: { searchParams: Promise<{ orderId: string }> }) {
  const { orderId } = await searchParams;

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-gray-100">
        <div className="flex justify-center mb-6">
          <div className="w-32 h-32 rounded-full flex items-center justify-center">
            <LottiePlayer src="/lottie/anim_12.json" className="w-full h-full" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">Demo Checkout</h1>
        <p className="text-center text-gray-500 mb-6 text-sm">
          This is a simulated payment gateway. Your real card will not be charged.
        </p>

        <div className="bg-gray-50 rounded-lg p-4 mb-8">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-900">Test Payment Required</p>
              <p className="text-xs text-gray-500 mt-1">
                Click the button below to simulate a successful Stripe payment. This will authorize the order and send it to the restaurant.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Link 
            href={`/order/confirmed?orderId=${orderId}`}
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-green-600 hover:bg-green-700 transition"
          >
            <CheckCircle className="w-5 h-5 mr-2" />
            Simulate Successful Payment
          </Link>
          <Link 
            href="/cart?cancelled=1"
            className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition"
          >
            Cancel Payment
          </Link>
        </div>
      </div>
    </div>
  );
}
