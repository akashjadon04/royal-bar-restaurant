'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ShoppingBag, Eye, Truck, CheckCircle } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

interface Order {
  id: string;
  customer: string;
  items: number;
  total: number;
  status: 'PENDING' | 'CONFIRMED' | 'PREPARING' | 'READY' | 'DELIVERED';
  date: string;
}

const orders: Order[] = [
  { id: 'ORD-001', customer: 'John Smith', items: 3, total: 89.97, status: 'DELIVERED', date: '2024-06-25' },
  { id: 'ORD-002', customer: 'Emma Johnson', items: 2, total: 51.49, status: 'READY', date: '2024-06-25' },
  { id: 'ORD-003', customer: 'Michael Brown', items: 5, total: 142.50, status: 'PREPARING', date: '2024-06-25' },
  { id: 'ORD-004', customer: 'Sarah Davis', items: 1, total: 24.99, status: 'CONFIRMED', date: '2024-06-24' },
  { id: 'ORD-005', customer: 'James Wilson', items: 4, total: 112.00, status: 'PENDING', date: '2024-06-24' },
  { id: 'ORD-006', customer: 'Lisa Anderson', items: 2, total: 45.98, status: 'DELIVERED', date: '2024-06-23' },
  { id: 'ORD-007', customer: 'David Martinez', items: 6, total: 178.50, status: 'PREPARING', date: '2024-06-23' },
];

const statusColors: Record<string, string> = {
  PENDING: 'bg-yellow-500/20 text-yellow-400',
  CONFIRMED: 'bg-blue-500/20 text-blue-400',
  PREPARING: 'bg-orange-500/20 text-orange-400',
  READY: 'bg-purple-500/20 text-purple-400',
  DELIVERED: 'bg-green-500/20 text-green-400',
};

export default function OrdersManagement() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOrders = orders.filter((order) =>
    order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-royal-900 pt-32 pb-24">
      <div className="royal-container">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="font-display text-4xl text-royal-cream mb-2">
            Orders <span className="text-royal-gold">Management</span>
          </h1>
          <p className="text-royal-cream/60">View and manage customer orders</p>
        </motion.div>

        <div className="grid grid-cols-1 sm t-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Orders', value: '1,284', icon: ShoppingBag },
            { label: 'Pending', value: '12', icon: Truck },
            { label: 'Preparing', value: '8', icon: CheckCircle },
            { label: 'Delivered Today', value: '45', icon: CheckCircle },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-royal-800 border border-royal-600 p-6 rounded-sharp-sm">
                <Icon className="w-6 h-6 text-royal-gold mb-2" />
                <p className="font-display text-2xl text-royal-cream">{stat.value}</p>
                <p className="text-royal-cream/60 text-sm">{stat.label}</p>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-royal-cream/40" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="royal-input pl-12"
            />
          </div>
        </div>

        <div className="bg-royal-800 border border-royal-600 rounded-sharp-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-royal-600">
                <th className="text-left p-4 text-royal-gold font-body text-sm uppercase">Order ID</th>
                <th className="text-left p-4 text-royal-gold font-body text-sm uppercase">Customer</th>
                <th className="text-left p-4 text-royal-gold font-body text-sm uppercase">Items</th>
                <th className="text-left p-4 text-royal-gold font-body text-sm uppercase">Total</th>
                <th className="text-left p-4 text-royal-gold font-body text-sm uppercase">Status</th>
                <th className="text-left p-4 text-royal-gold font-body text-sm uppercase">Date</th>
                <th className="text-right p-4 text-royal-gold font-body text-sm uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-b border-royal-600/50 hover:bg-royal-700/50 transition-colors">
                  <td className="p-4 font-medium text-royal-cream">{order.id}</td>
                  <td className="p-4 text-royal-cream/80">{order.customer}</td>
                  <td className="p-4 text-royal-cream/80">{order.items}</td>
                  <td className="p-4 text-royal-gold font-semibold">{formatPrice(order.total)}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 text-royal-cream/60">{order.date}</td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-royal-cream/60彻底60 hover:text-royal-gold transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
