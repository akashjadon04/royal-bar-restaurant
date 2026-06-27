'use client';

import { useCartStore } from '@/store/cartStore';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle2, ArrowLeft, MapPin, CreditCard, Banknote } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const [isClient, setIsClient] = useState(false);
  const { items, getTotal, clearCart } = useCartStore();
  const router = useRouter();
  
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;
  if (items.length === 0 && !isSuccess) {
    router.push('/cart');
    return null;
  }

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, total: getTotal() + 3 })
      });
      
      const data = await res.json();
      if (res.ok) {
        clearCart();
        router.push(`/track-order/${data.orderId}`);
      } else {
        alert("Failed to create order: " + data.error);
        setIsProcessing(false);
      }
    } catch (err) {
      console.error(err);
      setIsProcessing(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#fffbf7] flex items-center justify-center p-4">
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-zomato-subtle border border-zomato-border text-center max-w-md w-full">
          <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-6" />
          <h1 className="text-3xl font-display font-bold text-zomato-text mb-4">Order Placed!</h1>
          <p className="text-zomato-muted mb-8">
            Your order has been successfully placed. You will receive an SMS confirmation shortly.
          </p>
          <Link 
            href="/track-order"
            className="block w-full bg-zomato-red hover:bg-zomato-red-dark text-white font-medium py-3 rounded-zomato transition-colors"
          >
            Track Order
          </Link>
          <Link 
            href="/"
            className="block w-full text-zomato-red font-medium py-3 mt-3 hover:bg-zomato-red/5 rounded-zomato transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fffbf7] pt-32 pb-24">
      <div className="royal-container max-w-5xl">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/cart" className="p-2 bg-white rounded-full border border-zomato-border hover:bg-gray-50 text-zomato-text transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-3xl font-display font-bold text-zomato-text">Checkout</h1>
        </div>

        <form onSubmit={handlePlaceOrder} className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Details */}
          <div className="flex-1 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-zomato-subtle border border-zomato-border">
              <h2 className="text-xl font-bold text-zomato-text mb-6 flex items-center gap-2 border-b border-zomato-border pb-4">
                <MapPin className="w-5 h-5 text-zomato-red" /> Delivery Address
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-zomato-text mb-1">First Name</label>
                    <input type="text" required className="w-full px-4 py-2 rounded-zomato border border-zomato-border focus:border-zomato-red focus:ring-1 focus:ring-zomato-red outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zomato-text mb-1">Last Name</label>
                    <input type="text" required className="w-full px-4 py-2 rounded-zomato border border-zomato-border focus:border-zomato-red focus:ring-1 focus:ring-zomato-red outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zomato-text mb-1">Phone Number</label>
                  <input type="tel" required className="w-full px-4 py-2 rounded-zomato border border-zomato-border focus:border-zomato-red focus:ring-1 focus:ring-zomato-red outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zomato-text mb-1">Full Address</label>
                  <textarea required rows={3} className="w-full px-4 py-2 rounded-zomato border border-zomato-border focus:border-zomato-red focus:ring-1 focus:ring-zomato-red outline-none resize-none"></textarea>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-zomato-subtle border border-zomato-border">
              <h2 className="text-xl font-bold text-zomato-text mb-6 flex items-center gap-2 border-b border-zomato-border pb-4">
                <CreditCard className="w-5 h-5 text-zomato-red" /> Payment Method
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div 
                  onClick={() => setPaymentMethod('card')}
                  className={`border-2 rounded-xl p-4 cursor-pointer flex items-center gap-3 transition-colors ${paymentMethod === 'card' ? 'border-zomato-red bg-zomato-red/5' : 'border-zomato-border hover:border-gray-300'}`}
                >
                  <CreditCard className={`w-6 h-6 ${paymentMethod === 'card' ? 'text-zomato-red' : 'text-zomato-muted'}`} />
                  <div>
                    <h3 className="font-semibold text-zomato-text">Credit / Debit Card</h3>
                    <p className="text-xs text-zomato-muted">Pay securely online</p>
                  </div>
                </div>
                <div 
                  onClick={() => setPaymentMethod('cash')}
                  className={`border-2 rounded-xl p-4 cursor-pointer flex items-center gap-3 transition-colors ${paymentMethod === 'cash' ? 'border-zomato-red bg-zomato-red/5' : 'border-zomato-border hover:border-gray-300'}`}
                >
                  <Banknote className={`w-6 h-6 ${paymentMethod === 'cash' ? 'text-zomato-red' : 'text-zomato-muted'}`} />
                  <div>
                    <h3 className="font-semibold text-zomato-text">Cash on Delivery</h3>
                    <p className="text-xs text-zomato-muted">Pay when food arrives</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Summary */}
          <div className="w-full lg:w-96 shrink-0">
            <div className="bg-white rounded-2xl p-6 shadow-zomato-subtle border border-zomato-border sticky top-32">
              <h2 className="text-xl font-bold text-zomato-text mb-6 border-b border-zomato-border pb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center text-sm">
                    <span className="text-zomato-text font-medium">{item.quantity}x {item.name}</span>
                    <span className="text-zomato-muted">£{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4 mb-6 border-t border-zomato-border pt-4">
                <div className="flex justify-between text-sm text-zomato-text">
                  <span className="text-zomato-muted">Item Total</span>
                  <span>£{getTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-zomato-text">
                  <span className="text-zomato-muted">Delivery Fee</span>
                  <span>£2.50</span>
                </div>
                <div className="flex justify-between text-sm text-zomato-text">
                  <span className="text-zomato-muted">Platform Fee</span>
                  <span>£0.50</span>
                </div>
                <div className="border-t border-zomato-border border-dashed pt-4 flex justify-between items-center text-lg font-bold text-zomato-text">
                  <span>Total to Pay</span>
                  <span className="text-zomato-red">£{(getTotal() + 3.00).toFixed(2)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-zomato-red hover:bg-zomato-red-dark text-white font-medium py-4 rounded-zomato flex items-center justify-center gap-2 transition-colors text-lg disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isProcessing ? 'Processing...' : 'Place Order'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
