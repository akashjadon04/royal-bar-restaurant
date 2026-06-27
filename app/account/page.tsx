"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import Lottie from "lottie-react"
import { User, MapPin, Gift, Clock, Download, RefreshCw, ShoppingBag, Settings, LogOut, ChevronRight } from "lucide-react"

export default function AccountPage() {
  const { data: session, status } = useSession()
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [animationData, setAnimationData] = useState<any>(null)
  
  useEffect(() => {
    // Load local lottie file for empty state
    fetch('/lottie-cart.json')
      .then(res => res.json())
      .then(data => setAnimationData(data))
      .catch(console.error)

    if (session?.user) {
      // Fetch user's orders (mocked for UI demonstration purposes)
      // In a real app this would hit a /api/user/orders endpoint
      setLoading(false)
      setOrders([]) // Simulating empty order history to show the beautiful Lottie animation!
    } else if (status === "unauthenticated") {
      window.location.href = "/auth/signin"
    }
  }, [session, status])

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 shrink-0 space-y-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6 text-center">
            <div className="h-20 w-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              {session?.user?.name?.charAt(0) || session?.user?.email?.charAt(0) || 'U'}
            </div>
            <h2 className="text-lg font-bold text-gray-900">{session?.user?.name || 'Customer'}</h2>
            <p className="text-sm text-gray-500">{session?.user?.email}</p>
          </div>

          <nav className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <a href="#orders" className="flex items-center justify-between px-4 py-3 bg-red-50 text-red-700 border-l-4 border-red-600 font-medium text-sm">
              <span className="flex items-center"><ShoppingBag className="w-4 h-4 mr-3" /> Order History</span>
              <ChevronRight className="w-4 h-4" />
            </a>
            <a href="#addresses" className="flex items-center justify-between px-4 py-3 text-gray-600 hover:bg-gray-50 font-medium text-sm transition border-l-4 border-transparent">
              <span className="flex items-center"><MapPin className="w-4 h-4 mr-3" /> Saved Addresses</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </a>
            <a href="#loyalty" className="flex items-center justify-between px-4 py-3 text-gray-600 hover:bg-gray-50 font-medium text-sm transition border-l-4 border-transparent">
              <span className="flex items-center"><Gift className="w-4 h-4 mr-3" /> Loyalty Points</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </a>
            <a href="#settings" className="flex items-center justify-between px-4 py-3 text-gray-600 hover:bg-gray-50 font-medium text-sm transition border-l-4 border-transparent">
              <span className="flex items-center"><Settings className="w-4 h-4 mr-3" /> Account Settings</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </a>
          </nav>

          <button className="w-full flex items-center justify-center px-4 py-3 mt-4 text-red-600 bg-white border border-red-200 rounded-xl hover:bg-red-50 transition font-medium text-sm">
            <LogOut className="w-4 h-4 mr-2" /> Sign Out
          </button>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 space-y-6">
          
          {/* Feature 5: Loyalty Points Tracker */}
          <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-xl shadow-md p-6 text-white flex items-center justify-between">
            <div>
              <p className="text-red-100 text-sm font-medium mb-1">Royal Rewards</p>
              <h3 className="text-3xl font-bold">1,240 <span className="text-lg font-normal opacity-80">Points</span></h3>
            </div>
            <Gift className="w-12 h-12 opacity-20" />
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-red-600" /> Recent Orders
            </h2>
            
            {orders.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                {/* Feature: Lottie Animation for Empty State */}
                <div className="w-64 h-64 mb-6 relative">
                  {animationData ? (
                    <Lottie animationData={animationData} loop={true} className="w-full h-full" />
                  ) : (
                    <div className="absolute inset-0 bg-gray-100 rounded-full animate-pulse" />
                  )}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No orders yet!</h3>
                <p className="text-gray-500 mb-8 max-w-md">Looks like you haven't tasted our royal menu yet. Your stomach is rumbling, let's fix that.</p>
                <Link href="/menu" className="bg-red-600 text-white px-8 py-3 rounded-full font-bold hover:bg-red-700 transition shadow-lg shadow-red-200">
                  Browse Menu
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="border border-gray-200 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="font-bold text-gray-900">Order #{order.id}</span>
                        <span className="px-2.5 py-1 text-xs font-bold bg-green-100 text-green-700 rounded-full">{order.status}</span>
                      </div>
                      <p className="text-sm text-gray-500 mb-1">{new Date(order.createdAt).toLocaleDateString()}</p>
                      <p className="text-sm font-medium text-gray-900">£{order.total.toFixed(2)} • {order.items.length} items</p>
                    </div>
                    <div className="flex sm:flex-col gap-2">
                      {/* Feature 7: Track Order */}
                      <Link href={`/track-order/${order.id}`} className="px-4 py-2 bg-red-50 text-red-700 rounded-lg text-sm font-medium hover:bg-red-100 text-center transition">
                        Track Order
                      </Link>
                      {/* Feature 3: 1-Click Reorder */}
                      <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center justify-center transition">
                        <RefreshCw className="w-4 h-4 mr-2" /> Reorder
                      </button>
                      {/* Feature 6: PDF Receipt */}
                      <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center justify-center transition">
                        <Download className="w-4 h-4 mr-2" /> Receipt
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Feature 4: Saved Addresses */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-red-600" /> Saved Addresses
              </h2>
              <button className="text-sm font-medium text-red-600 hover:text-red-700">Add New</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border-2 border-red-600 rounded-xl p-4 relative">
                <span className="absolute top-4 right-4 text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded">Default</span>
                <h4 className="font-bold text-gray-900 mb-1">Home</h4>
                <p className="text-sm text-gray-500 leading-relaxed">
                  123 Royal Street<br/>
                  London, UK<br/>
                  SW1A 1AA
                </p>
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  )
}
