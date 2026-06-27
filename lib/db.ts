import fs from 'fs';
import path from 'path';
import os from 'os';

// Use /tmp for Vercel write access. On local, use project temp dir.
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
}

export interface Order {
  id: string;
  userId: string;
  type: string;
  status: string;
  subtotal: number;
  deliveryFee: number;
  total: number;
  items: any[];
  createdAt: string;
}

interface Database {
  users: User[];
  orders: Order[];
}

const defaultDb: Database = {
  users: [],
  orders: []
};

function readDb(): Database {
  try {
    if (fs.existsSync(dbPath)) {
      const data = fs.readFileSync(dbPath, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error reading DB:', error);
  }
  
  // If no DB exists, initialize it and write it
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
        createdAt: new Date().toISOString()
      };
      current.users.push(newUser);
      writeDb(current);
      return newUser;
    }
  },
  orders: {
    findMany: (userId?: string) => {
      const current = readDb();
      if (userId) return current.orders.filter(o => o.userId === userId).sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      return current.orders.sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    },
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
    }
  }
};
