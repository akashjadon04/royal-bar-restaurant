'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, MapPin, Phone, ChefHat, Bike, Map } from 'lucide-react';
import Lottie from 'lottie-react';

const steps = [
  { id: 'PENDING', label: 'Order Placed', icon: CheckCircle2 },
  { id: 'COOKING', label: 'Preparing', icon: ChefHat },
  { id: 'OUT_FOR_DELIVERY', label: 'On the Way', icon: Bike },
  { id: 'DELIVERED', label: 'Delivered', icon: MapPin },
];

export default function TrackOrderPage() {
  const { id } = useParams();
  const [order, setOrder] = useState<any>(null);
  const [statusNotification, setStatusNotification] = useState('');
  const [lottieData, setLottieData] = useState(null);

  useEffect(() => {
    fetch('/animation.json')
      .then(res => res.json())
      .then(data => setLottieData(data))
      .catch(() => {});
  }, []);

  // Polling
  useEffect(() => {
    let lastStatus = '';
    const fetchOrder = async () => {
      try {
        const res = await fetch(`/api/orders/${id}`);
        if (res.ok) {
          const data = await res.json();
          setOrder(data);
          
          if (lastStatus && lastStatus !== data.status) {
             setStatusNotification(`Order status updated to: ${data.status.replace(/_/g, ' ')}`);
             setTimeout(() => setStatusNotification(''), 4000);
          }
          lastStatus = data.status;
        }
      } catch (err) {
        console.error(err);
      }
    };
    
    fetchOrder();
    const interval = setInterval(fetchOrder, 3000);
    return () => clearInterval(interval);
  }, [id]);

  if (!order) return <div className="min-h-screen bg-[#fffbf7] flex items-center justify-center pt-32"><p>Loading order details...</p></div>;

  const currentStepIndex = steps.findIndex(s => s.id === order.status);

  return (
    <div className="min-h-screen bg-[#fffbf7] pt-32 pb-24">
      {/* Toast Notification */}
      <AnimatePresence>
        {statusNotification && (
          <motion.div 
            initial={{ opacity: 0, y: -50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -50, x: '-50%' }}
            className="fixed top-24 left-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg font-medium"
          >
            {statusNotification}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="royal-container max-w-3xl">
        <div className="bg-white rounded-2xl shadow-zomato-subtle border border-zomato-border overflow-hidden">
          
          {/* Map/Animation Area */}
          <div className="h-64 bg-[#f3f4f6] relative flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")' }}></div>
            {order.status === 'OUT_FOR_DELIVERY' && lottieData ? (
              <Lottie animationData={lottieData} loop={true} className="w-64 h-64 z-10 drop-shadow-2xl" />
            ) : order.status === 'COOKING' && lottieData ? (
              <Lottie animationData={lottieData} loop={true} className="w-64 h-64 z-10 drop-shadow-2xl" />
            ) : (
              <div className="text-center z-10">
                 <Map className="w-16 h-16 text-gray-300 mx-auto mb-2" />
                 <p className="text-gray-500 font-medium tracking-wide text-sm">
                   {order.status === 'PENDING' ? 'Waiting for restaurant...' : 'Order Delivered! Enjoy!'}
                 </p>
              </div>
            )}
          </div>

          <div className="p-8">
            <div className="flex justify-between items-start mb-8 pb-8 border-b border-zomato-border">
              <div>
                <h1 className="text-2xl font-bold text-zomato-text mb-2">Order ID: {order.id.slice(-6).toUpperCase()}</h1>
                <p className="text-zomato-muted flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  Estimated delivery in 35 mins
                </p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-zomato-red/10 text-zomato-red font-medium rounded-full hover:bg-zomato-red hover:text-white transition-colors">
                <Phone className="w-4 h-4" /> Help
              </button>
            </div>

            {/* Progress Tracker */}
            <div className="relative mb-12">
              <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2 rounded-full"></div>
              <div 
                className="absolute top-1/2 left-0 h-1 bg-green-500 -translate-y-1/2 rounded-full transition-all duration-1000 ease-in-out"
                style={{ width: `${(Math.max(0, currentStepIndex) / (steps.length - 1)) * 100}%` }}
              ></div>
              
              <div className="relative flex justify-between">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  const isCompleted = currentStepIndex >= index;
                  const isCurrent = currentStepIndex === index;
                  
                  return (
                    <div key={step.id} className="flex flex-col items-center">
                      <motion.div 
                        initial={false}
                        animate={{
                          scale: isCurrent ? 1.2 : 1,
                          backgroundColor: isCompleted ? '#22c55e' : '#ffffff',
                          borderColor: isCompleted ? '#22c55e' : '#d1d5db',
                          color: isCompleted ? '#ffffff' : '#9ca3af'
                        }}
                        className="w-10 h-10 rounded-full border-2 flex items-center justify-center z-10 transition-colors duration-500 shadow-sm"
                      >
                        <Icon className="w-5 h-5" />
                      </motion.div>
                      <span className={`mt-3 text-xs font-medium ${isCurrent ? 'text-zomato-text' : 'text-zomato-muted'}`}>
                        {step.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Order Details Summary */}
            <div className="bg-gray-50 rounded-xl p-4">
               <h3 className="font-semibold text-gray-700 mb-2">Order Items</h3>
               <ul className="text-sm text-gray-600 space-y-1">
                 {order.items?.map((item: any) => (
                    <li key={item.id} className="flex justify-between">
                       <span>{item.quantity}x {item.menuItem?.name}</span>
                       <span>£{item.totalPrice.toFixed(2)}</span>
                    </li>
                 ))}
               </ul>
               <div className="border-t mt-4 pt-2 flex justify-between font-bold text-gray-800">
                  <span>Total</span>
                  <span>£{order.total.toFixed(2)}</span>
               </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
