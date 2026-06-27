"use client"

import { useEffect, useState } from "react"
import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { User, MapPin, Gift, Clock, Download, RefreshCw, ShoppingBag, Settings, LogOut, ChevronRight, Check } from "lucide-react"
import { getUserOrders } from "../admin/actions"
import { LottiePlayer } from '@/components/motion/LottiePlayer';
import { useCartStore } from "@/store/cartStore"

export default function AccountPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'loyalty' | 'settings'>('orders')
  const addItem = useCartStore(state => state.addItem)
  
  useEffect(() => {
    if (session?.user?.email) {
      getUserOrders(session.user.email).then((userOrders) => {
        setOrders(userOrders)
        setLoading(false)
      })
    } else if (status === "unauthenticated") {
      window.location.href = "/auth/signin"
    }
  }, [session, status])

  const handleReorder = (order: any) => {
    // Add all items to cart
    if (order.items && order.items.length > 0) {
      order.items.forEach((item: any) => {
        // Find menuItem details, or just construct a basic one if full details aren't stored
        addItem({
          id: item.menuItemId,
          name: item.name || `Item ${item.menuItemId}`,
          price: item.price,
          quantity: item.quantity,
          imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2000&auto=format&fit=crop" // Generic fallback
        } as any)
      });
      router.push('/checkout')
    }
  }

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
            <p className="text-sm text-gray-500 truncate" title={session?.user?.email || ''}>{session?.user?.email}</p>
          </div>

          <nav className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <button onClick={() => setActiveTab('orders')} className={`w-full flex items-center justify-between px-4 py-3 font-medium text-sm transition ${activeTab === 'orders' ? 'bg-red-50 text-red-700 border-l-4 border-red-600' : 'text-gray-600 hover:bg-gray-50 border-l-4 border-transparent'}`}>
              <span className="flex items-center"><ShoppingBag className="w-4 h-4 mr-3" /> Order History</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button onClick={() => setActiveTab('addresses')} className={`w-full flex items-center justify-between px-4 py-3 font-medium text-sm transition ${activeTab === 'addresses' ? 'bg-red-50 text-red-700 border-l-4 border-red-600' : 'text-gray-600 hover:bg-gray-50 border-l-4 border-transparent'}`}>
              <span className="flex items-center"><MapPin className="w-4 h-4 mr-3" /> Saved Addresses</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
            <button onClick={() => setActiveTab('loyalty')} className={`w-full flex items-center justify-between px-4 py-3 font-medium text-sm transition ${activeTab === 'loyalty' ? 'bg-red-50 text-red-700 border-l-4 border-red-600' : 'text-gray-600 hover:bg-gray-50 border-l-4 border-transparent'}`}>
              <span className="flex items-center"><Gift className="w-4 h-4 mr-3" /> Loyalty Points</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
            <button onClick={() => setActiveTab('settings')} className={`w-full flex items-center justify-between px-4 py-3 font-medium text-sm transition ${activeTab === 'settings' ? 'bg-red-50 text-red-700 border-l-4 border-red-600' : 'text-gray-600 hover:bg-gray-50 border-l-4 border-transparent'}`}>
              <span className="flex items-center"><Settings className="w-4 h-4 mr-3" /> Account Settings</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
          </nav>

          <button onClick={() => signOut({ callbackUrl: '/' })} className="w-full flex items-center justify-center px-4 py-3 mt-4 text-red-600 bg-white border border-red-200 rounded-xl hover:bg-red-50 transition font-medium text-sm">
            <LogOut className="w-4 h-4 mr-2" /> Sign Out
          </button>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 space-y-6">
          
          {activeTab === 'orders' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-fade-in-up">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-red-600" /> Recent Orders
              </h2>
              
              {orders.length === 0 ? (
                  <div className="text-center py-16 px-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex justify-center mb-4">
                      <LottiePlayer src="/lottie/anim_2.json" className="w-40 h-40" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No orders yet</h3>
                    <p className="text-gray-500 mb-6 max-w-md mx-auto">Looks like you haven't placed any orders yet. Discover our authentic Amritsari dishes and start ordering!</p>
                    <Link href="/menu" className="inline-block bg-zomato-red text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-red-500/30 hover:bg-red-700 transition">
                      Explore Menu
                    </Link>
                  </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="border border-gray-200 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="font-bold text-gray-900">Order #{order.id.slice(-6).toUpperCase()}</span>
                          <span className="px-2.5 py-1 text-xs font-bold bg-green-100 text-green-700 rounded-full">{order.status}</span>
                        </div>
                        <p className="text-sm text-gray-500 mb-1">{new Date(order.createdAt).toLocaleDateString()}</p>
                        <p className="text-sm font-medium text-gray-900">£{order.total.toFixed(2)}</p>
                      </div>
                      <div className="flex flex-wrap sm:flex-col gap-2 justify-end">
                        <Link href={`/track-order/${order.id}`} className="px-4 py-2 bg-red-50 text-red-700 rounded-lg text-sm font-medium hover:bg-red-100 text-center transition">
                          Track Order
                        </Link>
                        <button onClick={() => handleReorder(order)} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center justify-center transition">
                          <RefreshCw className="w-4 h-4 mr-2" /> Reorder
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'addresses' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-fade-in-up">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-red-600" /> Saved Addresses
                </h2>
                <button className="text-sm font-medium text-red-600 hover:text-red-700">Add New</button>
              </div>
              
              {/* Interactive Address Book Mock */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border-2 border-red-600 rounded-xl p-4 relative cursor-pointer hover:shadow-md transition">
                  <span className="absolute top-4 right-4 text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded">Default</span>
                  <h4 className="font-bold text-gray-900 mb-1">Home</h4>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">
                    123 Royal Street<br/>
                    London, UK<br/>
                    SW1A 1AA
                  </p>
                  <div className="flex items-center space-x-3 text-sm font-medium">
                    <button className="text-gray-600 hover:text-gray-900">Edit</button>
                    <button className="text-red-600 hover:text-red-700">Remove</button>
                  </div>
                </div>
                
                <div className="border border-dashed border-gray-300 rounded-xl p-4 flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition cursor-pointer min-h-[160px]">
                  <MapPin className="w-8 h-8 mb-2 text-gray-400" />
                  <span className="font-medium">Add new address</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'loyalty' && (
            <div className="space-y-6 animate-fade-in-up">
              <div className="bg-gradient-to-br from-red-600 to-red-900 rounded-xl shadow-md p-8 text-white relative overflow-hidden">
                <div className="relative z-10">
                  <p className="text-red-100 text-sm font-medium mb-2 uppercase tracking-wider">Royal Rewards</p>
                  <h3 className="text-5xl font-display font-bold mb-4">1,240 <span className="text-xl font-normal opacity-80">Pts</span></h3>
                  
                  {/* Dynamic Progress Bar */}
                  <div className="w-full bg-red-900/50 rounded-full h-3 mb-2">
                    <div className="bg-yellow-400 h-3 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  <p className="text-sm text-red-100 flex items-center justify-between">
                    <span>Gold Tier</span>
                    <span>760 pts to Platinum</span>
                  </p>
                </div>
                <Gift className="absolute -bottom-4 -right-4 w-40 h-40 opacity-10" />
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Rewards Unlocked</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-yellow-100 rounded-full text-yellow-700"><Check className="w-5 h-5" /></div>
                      <span className="font-bold text-yellow-900">Free Starter</span>
                    </div>
                    <button className="px-4 py-2 bg-yellow-400 text-yellow-900 font-bold rounded-lg text-sm hover:bg-yellow-500">Redeem</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-fade-in-up">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Settings className="w-5 h-5 mr-2 text-gray-600" /> Account Settings
              </h2>
              <form className="space-y-6 max-w-lg">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input type="text" defaultValue={session?.user?.name || ''} className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-red-500 focus:border-red-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input type="email" defaultValue={session?.user?.email || ''} readOnly className="w-full border-gray-200 bg-gray-50 rounded-lg shadow-sm text-gray-500 cursor-not-allowed" />
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Dietary Preferences</h3>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-red-600 focus:ring-red-500 mr-2" />
                      <span className="text-gray-700">Vegetarian</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-red-600 focus:ring-red-500 mr-2" />
                      <span className="text-gray-700">Vegan</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-red-600 focus:ring-red-500 mr-2" />
                      <span className="text-gray-700">Gluten-Free</span>
                    </label>
                  </div>
                </div>
                <button type="button" className="px-6 py-2 bg-gray-900 text-white font-bold rounded-lg hover:bg-gray-800">Save Changes</button>
              </form>
            </div>
          )}

        </main>
      </div>
    </div>
  )
}
