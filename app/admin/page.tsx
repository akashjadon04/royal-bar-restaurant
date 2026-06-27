"use client";

import { useEffect, useState } from "react"
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
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    revenue: 12450.50,
    orders: 142,
    customers: 89,
    growth: 12.5
  });

  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        fill: true,
        label: 'Revenue (£)',
        data: [1200, 1900, 1500, 2200, 2800, 3500, 2900],
        borderColor: 'rgb(220, 38, 38)',
        backgroundColor: 'rgba(220, 38, 38, 0.1)',
        tension: 0.4
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: false }
    },
    scales: {
      y: { beginAtZero: true }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <div className="flex space-x-3">
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition">
            Export Report
          </button>
          <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition">
            Add Product
          </button>
        </div>
      </div>

      {/* KPI Cards (Feature 1, 2, 3) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between group hover:shadow-md transition">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">Total Revenue</p>
            <h3 className="text-3xl font-bold text-gray-900">£{stats.revenue.toLocaleString()}</h3>
            <p className="text-sm text-green-600 flex items-center mt-2 font-medium">
              <ArrowUpRight className="w-4 h-4 mr-1" />
              +12.5% from last week
            </p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg group-hover:bg-red-100 transition">
            <DollarSign className="w-8 h-8 text-red-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between group hover:shadow-md transition">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">Total Orders</p>
            <h3 className="text-3xl font-bold text-gray-900">{stats.orders}</h3>
            <p className="text-sm text-green-600 flex items-center mt-2 font-medium">
              <ArrowUpRight className="w-4 h-4 mr-1" />
              +8.2% from last week
            </p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg group-hover:bg-orange-100 transition">
            <ShoppingBag className="w-8 h-8 text-orange-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between group hover:shadow-md transition">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">New Customers</p>
            <h3 className="text-3xl font-bold text-gray-900">{stats.customers}</h3>
            <p className="text-sm text-red-600 flex items-center mt-2 font-medium">
              <ArrowDownRight className="w-4 h-4 mr-1" />
              -2.4% from last week
            </p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg group-hover:bg-blue-100 transition">
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart (Feature 4) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900">Revenue Analytics</h3>
            <select className="bg-gray-50 border border-gray-200 text-sm rounded-lg px-3 py-1.5 focus:ring-red-500 focus:border-red-500">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="h-72 w-full">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* Recent Activity (Feature 5) & Low Stock Alert (Feature 6) */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {[
                { text: "Order #5892 placed by John D.", time: "2 mins ago", icon: <ShoppingBag className="w-4 h-4 text-orange-500" /> },
                { text: "Order #5891 marked as Delivered", time: "15 mins ago", icon: <CheckCircle className="w-4 h-4 text-green-500" /> },
                { text: "New customer registered", time: "1 hr ago", icon: <Users className="w-4 h-4 text-blue-500" /> },
              ].map((activity, i) => (
                <div key={i} className="flex items-start">
                  <div className="mt-1 mr-3">{activity.icon}</div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{activity.text}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-6 w-full text-sm text-red-600 font-medium hover:text-red-700">View All Activity &rarr;</button>
          </div>

          <div className="bg-red-50 border border-red-100 p-6 rounded-xl">
            <div className="flex items-center mb-2">
              <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
              <h3 className="text-md font-bold text-red-900">Action Required</h3>
            </div>
            <p className="text-sm text-red-800 mb-4">
              You have 5 orders pending acceptance for more than 10 minutes.
            </p>
            <button className="bg-red-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-red-700 w-full transition">
              Review Pending Orders
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
