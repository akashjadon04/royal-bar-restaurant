import fs from 'fs';
import path from 'path';
import os from 'os';

const isVercel = process.env.VERCEL === '1';
const dbPath = isVercel 
  ? path.join(os.tmpdir(), 'royal_bar_db.json')
  : path.join(process.cwd(), '.royal_bar_db.json');

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  role: 'ADMIN' | 'CUSTOMER';
  createdAt: string;
  loyaltyPoints?: number;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  imageUrl: string;
  isFeatured: boolean;
  isActive: boolean;
  categoryId?: string;
  createdAt?: string;
}

export interface Order {
  id: string;
  userId: string;
  type: string;
  status: string; // PENDING, COOKING, OUT_FOR_DELIVERY, DELIVERED, CANCELLED
  subtotal: number;
  deliveryFee: number;
  total: number;
  items: any[];
  createdAt: string;
}

export interface Address {
  id: string;
  userId: string;
  label: string;
  line1: string;
  city: string;
  postcode: string;
  isDefault: boolean;
}

export interface AppSettings {
  slideshowImages: string[];
  restaurantOpen: boolean;
  deliveryRadiusMiles: number;
  contactEmail: string;
  contactPhone: string;
  taxRate: number;
  globalNotice: string;
}

interface Database {
  users: User[];
  orders: Order[];
  menuItems: MenuItem[];
  addresses: Address[];
  settings: AppSettings;
}

const defaultDb: Database = {
  users: [],
  orders: [],
  menuItems: [
    {
      id: 'prod_1',
      name: 'Royal Classic Burger',
      description: 'Double beef patty, signature sauce, cheddar, brioche bun.',
      basePrice: 12.99,
      imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800',
      isFeatured: true,
      isActive: true,
    },
    {
      id: 'prod_2',
      name: 'Truffle Fries',
      description: 'Crispy fries tossed in truffle oil and parmesan.',
      basePrice: 5.99,
      imageUrl: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&q=80&w=800',
      isFeatured: true,
      isActive: true,
    },
    {
      id: 'prod_3',
      name: 'Spicy Margherita',
      description: 'Wood-fired crust, San Marzano tomatoes, fresh mozzarella, hot honey.',
      basePrice: 14.50,
      imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=80&w=800',
      isFeatured: false,
      isActive: true,
    }
  ],
  addresses: [],
  settings: {
    slideshowImages: [
      'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=2000',
      'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&q=80&w=2000',
      'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?auto=format&fit=crop&q=80&w=2000'
    ],
    restaurantOpen: true,
    deliveryRadiusMiles: 10,
    contactEmail: 'contact@royalbar.com',
    contactPhone: '+44 20 7123 4567',
    taxRate: 20,
    globalNotice: 'Welcome to Royal Bar! Enjoy free delivery on orders over £50.'
  }
};

function readDb(): Database {
  try {
    if (fs.existsSync(dbPath)) {
      const data = fs.readFileSync(dbPath, 'utf-8');
      const parsed = JSON.parse(data);
      return { ...defaultDb, ...parsed }; // Merge to ensure new fields like settings exist
    }
  } catch (error) {
    console.error('Error reading DB:', error);
  }
  
  writeDb(defaultDb);
  return defaultDb;
}

function writeDb(data: Database) {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing DB:', error);
  }
}

export const db = {
  users: {
    findMany: () => readDb().users,
    findUnique: (email: string) => readDb().users.find(u => u.email === email),
    findById: (id: string) => readDb().users.find(u => u.id === id),
    create: (user: Omit<User, 'id' | 'createdAt'>) => {
      const current = readDb();
      const newUser: User = {
        ...user,
        id: `user_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
        createdAt: new Date().toISOString(),
        loyaltyPoints: 0
      };
      current.users.push(newUser);
      writeDb(current);
      return newUser;
    },
    update: (id: string, updates: Partial<User>) => {
      const current = readDb();
      const idx = current.users.findIndex(u => u.id === id);
      if (idx === -1) return null;
      current.users[idx] = { ...current.users[idx], ...updates };
      writeDb(current);
      return current.users[idx];
    }
  },
  orders: {
    findMany: (userId?: string) => {
      const current = readDb();
      if (userId) return current.orders.filter(o => o.userId === userId).sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      return current.orders.sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    },
    findById: (id: string) => readDb().orders.find(o => o.id === id),
    create: (order: Omit<Order, 'id' | 'createdAt'>) => {
      const current = readDb();
      const newOrder: Order = {
        ...order,
        id: `order_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
        createdAt: new Date().toISOString()
      };
      current.orders.push(newOrder);
      writeDb(current);
      return newOrder;
    },
    updateStatus: (id: string, status: string) => {
      const current = readDb();
      const idx = current.orders.findIndex(o => o.id === id);
      if (idx > -1) {
        current.orders[idx].status = status;
        writeDb(current);
        return current.orders[idx];
      }
      return null;
    },
    delete: (id: string) => {
      const current = readDb();
      current.orders = current.orders.filter(o => o.id !== id);
      writeDb(current);
    }
  },
  menuItems: {
    findMany: () => readDb().menuItems,
    findById: (id: string) => readDb().menuItems.find(m => m.id === id),
    create: (item: Omit<MenuItem, 'id'>) => {
      const current = readDb();
      const newItem: MenuItem = {
        ...item,
        id: `prod_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
        createdAt: new Date().toISOString()
      };
      current.menuItems.push(newItem);
      writeDb(current);
      return newItem;
    },
    update: (id: string, updates: Partial<MenuItem>) => {
      const current = readDb();
      const idx = current.menuItems.findIndex(m => m.id === id);
      if (idx === -1) return null;
      current.menuItems[idx] = { ...current.menuItems[idx], ...updates };
      writeDb(current);
      return current.menuItems[idx];
    },
    delete: (id: string) => {
      const current = readDb();
      current.menuItems = current.menuItems.filter(m => m.id !== id);
      writeDb(current);
    }
  },
  settings: {
    get: () => readDb().settings,
    update: (updates: Partial<AppSettings>) => {
      const current = readDb();
      current.settings = { ...current.settings, ...updates };
      writeDb(current);
      return current.settings;
    }
  }
};
