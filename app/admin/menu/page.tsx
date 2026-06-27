'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Search, Utensils } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  isActive: boolean;
}

const menuItems: MenuItem[] = [
  { id: '1', name: 'Signature Royal Burger', price: 24.99, category: 'Mains', isActive: true },
  { id: '2', name: 'Pan-Seared Scallops', price: 32.50, category: 'Starters', isActive: true },
  { id: '3', name: 'Truffle Risotto', price: 28.00, category: 'Mains', isActive: true },
  { id: '4', name: 'Wagyu Beef Fillet', price: 65.00, category: 'Mains', isActive: true },
  { id: '5', name: 'Lobster Thermidor', price: 58.00, category: 'Mains', isActive: true },
  { id: '6', name: 'Duck Confit', price: 29.50, category: 'Mains', isActive: true },
  { id: '7', name: 'Chocolate Fondant', price: 14.00, category: 'Desserts', isActive: true },
  { id: '8', name: 'Royal Seafood Platter', price: 85.00, category: 'Starters', isActive: true },
];

export default function MenuManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState(menuItems);

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleStatus = (id: string) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, isActive: !item.isActive } : item
    ));
  };

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
            Menu <span className="text-royal-gold">Management</span>
          </h1>
          <p className="text-royal-cream/60">Manage your restaurant menu items</p>
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-royal-cream/40" />
            <input
              type="text"
              placeholder="Search menu items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="royal-input pl-12"
            />
          </div>
          <button className="royal-button flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Item
          </button>
        </div>

        <div className="bg-royal-800 border border-royal-600 rounded-sharp-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-royal-600">
                <th className="text-left p-4 text-royal-gold font-body text-sm uppercase">Item</th>
                <th className="text-left p-4 text-royal-gold font-body text-sm uppercase">Category</th>
                <th className="text-left p-4 text-royal-gold font-body text-sm uppercase">Price</th>
                <th className="text-left p-4 text-royal-gold font-body text-sm uppercase">Status</th>
                <th className="text-right p-4 text-royal-gold font-body text-sm uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr key={item.id} className="border-b border-royal-600/50 hover:bg-royal-700/50 transition-colors">
                  <td className="p-4 font-medium text-royal-cream">
                    {item.name}
                  </td>
                  <td className="p-4 text-royal-cream/80">{item.category}</td>
                  <td className="p-4 text-royal-gold font-semibold">{formatPrice(item.price)}</td>
                  <td className="p-4">
                    <button
                      onClick={() => toggleStatus(item.id)}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.isActive
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}
                    >
                      {item.isActive ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-royal-cream/60 hover:text-royal-gold transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-red-400 hover:text-red-300 transition-colors">
                        <Trash2 className="w-4 h-4" />
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
