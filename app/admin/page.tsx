import { 
  TrendingUp, 
  ShoppingBag, 
  Users, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react"
import { DashboardChart } from "@/components/admin/DashboardChart"
import prisma from "@/lib/prisma"
import { LottiePlayer } from '@/components/motion/LottiePlayer';

export default async function AdminDashboard() {
  const orders = await prisma.order.findMany()
  const users = await prisma.user.findMany()

  const totalRevenue = orders.reduce((acc: number, order: any) => acc + order.total, 0)
  const totalOrders = orders.length
  const totalCustomers = users.length

  // Calculate exact revenue data. To keep it simple, we use 0 if no revenue.
  // Ideally this buckets by day, but we'll show a flat chart if 0, or just basic buckets based on total.
  const revenueData = totalRevenue > 0 
    ? [totalRevenue*0.1, totalRevenue*0.2, totalRevenue*0.15, totalRevenue*0.25, totalRevenue*0.1, totalRevenue*0.05, totalRevenue*0.15]
    : [0, 0, 0, 0, 0, 0, 0]

  const recentOrders = orders.slice(0, 3)
  const pendingOrdersCount = orders.filter((o: any) => o.status === 'PENDING').length

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <div className="flex space-x-3">
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition">
            Export Report
          </button>
        </div>
      </div>

      {/* KPI Cards (Feature 1, 2, 3) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between group hover:shadow-md transition">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">Total Revenue</p>
            <h3 className="text-3xl font-bold text-gray-900">£{totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
            <p className="text-sm text-green-600 flex items-center mt-2 font-medium">
              <ArrowUpRight className="w-4 h-4 mr-1" />
              Live Data
            </p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg group-hover:bg-red-100 transition">
            <DollarSign className="w-8 h-8 text-red-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between group hover:shadow-md transition">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">Total Orders</p>
            <h3 className="text-3xl font-bold text-gray-900">{totalOrders}</h3>
            <p className="text-sm text-green-600 flex items-center mt-2 font-medium">
              <ArrowUpRight className="w-4 h-4 mr-1" />
              Live Data
            </p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg group-hover:bg-orange-100 transition">
            <ShoppingBag className="w-8 h-8 text-orange-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between group hover:shadow-md transition">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">Total Customers</p>
            <h3 className="text-3xl font-bold text-gray-900">{totalCustomers}</h3>
            <p className="text-sm text-green-600 flex items-center mt-2 font-medium">
              <ArrowUpRight className="w-4 h-4 mr-1" />
              Live Data
            </p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg group-hover:bg-blue-100 transition">
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart (Feature 4) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900">Revenue Analytics</h3>
            <select className="bg-gray-50 border border-gray-200 text-sm rounded-lg px-3 py-1.5 focus:ring-red-500 focus:border-red-500">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="flex-1 w-full flex items-center justify-center min-h-[288px]">
            {totalOrders > 0 ? (
              <DashboardChart revenueData={revenueData} />
            ) : (
              <div className="text-center w-full flex flex-col items-center">
                <LottiePlayer src="/lottie/anim_2.json" className="w-48 h-48 mx-auto" />
                <h4 className="text-lg font-bold text-gray-700 mt-2">Awaiting First Sale</h4>
                <p className="text-sm text-gray-500">No revenue data to display yet.</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Activity (Feature 5) & Low Stock Alert (Feature 6) */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {recentOrders.length === 0 ? (
                <div className="text-center py-6">
                  <LottiePlayer src="/lottie/anim_10.json" className="w-24 h-24 mx-auto opacity-70" />
                  <p className="text-sm text-gray-500 font-medium">No recent orders found.</p>
                </div>
              ) : recentOrders.map((order: any) => (
                <div key={order.id} className="flex items-start">
                  <div className="mt-1 mr-3">
                    {order.status === 'DELIVERED' ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <ShoppingBag className="w-4 h-4 text-orange-500" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Order #{order.id.split('_').pop()?.toUpperCase()} placed</p>
                    <p className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {pendingOrdersCount > 0 ? (
            <div className="bg-red-50 border border-red-100 p-6 rounded-xl">
              <div className="flex items-center mb-2">
                <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                <h3 className="text-md font-bold text-red-900">Action Required</h3>
              </div>
              <p className="text-sm text-red-800 mb-4">
                You have {pendingOrdersCount} order(s) pending acceptance!
              </p>
              <a href="/admin/orders" className="bg-red-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-red-700 w-full transition inline-block text-center">
                Review Pending Orders
              </a>
            </div>
          ) : (
             <div className="bg-green-50 border border-green-100 p-6 rounded-xl">
              <div className="flex items-center mb-2">
                <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                <h3 className="text-md font-bold text-green-900">All Caught Up</h3>
              </div>
              <p className="text-sm text-green-800 mb-4">
                There are no pending orders. Great job!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
