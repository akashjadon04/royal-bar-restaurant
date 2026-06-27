'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Users, Mail, Phone, ShoppingBag, Eye } from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  orders: number;
  totalSpent: number;
  joinedDate: string;
}

const customers: Customer[] = [
  { id: '1', name: 'John Smith', email: 'john@example.com', phone: '+44 7700 900001', orders: 12, totalSpent: 449.88, joinedDate: '2023-01-15' },
  { id: '2', name: 'Emma Johnson', email: 'emma@example.com', phone: '+44 7700 900002', orders: 8, totalSpent: 298.50, joinedDate: '2023-03-22' },
  { id: '3', name: 'Michael Brown', email: 'michael@example.com', phone: '+44 7700 900003', orders: 25, totalSpent: 1240.00, joinedDate: '2022-11-08' },
  { id: '4', name: 'Sarah Davis', email: 'sarah@example.com', phone: '+44 7700 900004', orders: 5, totalSpent: 149.95, joinedDate: '2024-02-14' },
  { id: '5', name: 'James Wilson', email: 'james@example.com', phone: '+44 7700 900005', orders: 18, totalSpent: 678.50, joinedDate: '2023-05-30' },
];

export default function CustomersManagement() {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = customers.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase())
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
            Customer <span className="text-royal-gold">Management</span>
          </h1>
          <p className="text-royal-cream/60">View and manage registered customers</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total Customers', value: '3,642', icon: Users },
            { label: 'New This Month', value: '142', icon: Users },
            { label: 'Avg. Order Value', value: '£45.50', icon: ShoppingBag },
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
              placeholder="Search customers..."
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
                <th className="text-left p-4 text-royal-gold font-body text-sm uppercase">Name</th>
                <th className="text-left p-4 text-royal-gold font-body text-sm uppercase">Contact</th>
                <th className="text-left p-4 text-royal-gold font-body text-sm uppercase">Orders</th>
                <th className="text-left p-4 text-royal-gold font-body text-sm uppercase">Total Spent</th>
                <th className="text-left p-4 text-royal-gold font-body text-sm uppercase">Joined</th>
                <th className="text-right p-4 text-royal-gold font-body text-sm uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((customer) => (
                <tr key={customer.id} className="border-b border-royal-600/50 hover:bg-royal-700/50 transition-colors">
                  <td className="p-4 font-medium text-royal-cream">{customer.name}</td>
                  <td className="p-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-royal-cream/80 text-sm flex items-center gap-1">
                        <Mail className="w-3 h-3 text-royal-gold" />{customer.email}</span>
                      <span className="text-royal-cream/60 text-sm flex items-center gap-1">
                        <Phone className="w-3 h-3 text-royal-gold" />{customer.phone}</span>
                    </div>
                  </td>
                  <td className="p-4 text-royal-cream/80">{customer.orders}</td>
                  <td className="p-4 text-royal-gold font-semibold">£{customer.totalSpent.toFixed(2)}</td>
                  <td className="p-4 text-royal-cream/60">{customer.joinedDate}</td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-royal-cream/60 hover:text-royal-gold transition-colors">
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
