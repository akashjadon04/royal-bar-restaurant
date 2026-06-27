import prisma from "@/lib/prisma";
import Link from "next/link";
import { CheckCircle, Package } from "lucide-react";
import { redirect } from "next/navigation";
import { LottiePlayer } from "@/components/motion/LottiePlayer";

export default async function OrderConfirmedPage({ searchParams }: { searchParams: Promise<{ orderId?: string }> }) {
  const { orderId } = await searchParams;

  if (!orderId) {
    redirect("/");
  }

  // Update order status if it was pending payment
  const order = await prisma.order.findUnique({ where: { id: orderId } });
  
  if (order && order.status === 'PENDING_PAYMENT') {
    await prisma.order.update({
      where: { id: orderId },
      data: { status: 'PENDING' }
    });
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#fffbf7] p-4">
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-zomato-subtle border border-zomato-border max-w-lg w-full text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-2 bg-green-500" />
        
        <div className="w-48 h-48 mx-auto mb-2">
          {/* Lottie Animation 11: Success Checkmark */}
          <LottiePlayer src="/lottie/anim_11.json" className="w-full h-full" loop={false} />
        </div>

        <h1 className="text-3xl font-display font-bold text-gray-900 mb-4">Payment Successful!</h1>
        <p className="text-gray-600 mb-8 leading-relaxed">
          Your order <strong className="text-gray-900">#{orderId.split('_').pop()?.toUpperCase()}</strong> has been confirmed and sent to the kitchen.
        </p>

        <div className="space-y-4">
          <Link 
            href="/track-order"
            className="w-full flex items-center justify-center py-4 px-6 rounded-zomato text-white bg-zomato-red hover:bg-zomato-red-dark transition font-bold shadow-lg shadow-red-500/20"
          >
            <Package className="w-5 h-5 mr-2" />
            Track Order Status
          </Link>
          <Link 
            href="/menu"
            className="w-full flex items-center justify-center py-4 px-6 rounded-zomato text-zomato-text bg-gray-50 hover:bg-gray-100 transition font-medium border border-gray-200"
          >
            Return to Menu
          </Link>
        </div>
      </div>
    </div>
  );
}
