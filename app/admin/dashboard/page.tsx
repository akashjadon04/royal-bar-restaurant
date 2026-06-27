'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { LayoutDashboard, Utensils, ShoppingBag, Users, TrendingUp, DollarSign } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-royal-900 pt-32 pb-24">
      <div className="royal-container">
        {/* Header */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h1 className="font-display text-4xl md:text-5xl text-royal-cream mb-2">
            Admin <span className="text-royal-gold">Dashboard</span>
          </h1>
          <p className="text-royal-cream/60">Manage your restaurant operations</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Total Orders', value: '1,284', icon: ShoppingBag, change: '+12%' },
            { label: 'Revenue', value: '£48,520', icon: DollarSign, change: '+8%' },
            { label: 'Active Users', value: '3,642', icon: Users, change: '+5%' },
            { label: 'Menu Items', value: '48', icon: Utensils, change: '+2' },
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-royal-800 border border-royal-600 p-6 rounded-sharp-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <Icon className="w-6 h-6 text-royal-gold" />
                  <span className="text-green-400 text-sm font-medium">{stat.change}</span>
                </div>
                <p className="font-display text-3xl text-royal-cream mb-1">{stat.value}</p>
                <p className="text-royal-cream/60 text-sm">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/admin/menu"
            className="bg-royal-800 border border-royal-600 p-8 rounded-sharp-sm hover:border-royal-gold/50 transition-colors group"
          >
            <Utensils className="w-10 h-10 text-royal-gold mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="font-display text-xl text-royal-cream mb-2">Manage Menu</h3>
            <p className="text-royal-cream/60 text-sm">Add, edit, or remove menu items and categories</p>
          </Link>

          <Link
            href="/admin/orders"
            className="bg-royal-800 border border-royal-600 p-8 rounded-sharp-sm hover:border-royal-gold/50 transition-colors group"
          >
            <ShoppingBag className="w-10 h-10 text-royal-gold mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="font-display text-xl text-royal-cream mb-2">View Orders</h3>
            <p className="text-royal-cream/60 text-sm">Track and manage customer orders</p>
          </Link>

          <Link
            href="/admin/customers"
            className="bg-royal-800 border border-royal-600 p-8 rounded-sharp-sm hover:border-royal-gold/50 transition-colors group"
          >
            <Users className="w-10 h-10 text-royal-gold mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="font-display text-xl text-royal-cream mb-2">Customers</h3>
            <p className="text-royal-cream/60 text-sm">View customer profiles and order history</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
