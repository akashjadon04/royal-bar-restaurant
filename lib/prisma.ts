// Local Testing Environment Fallback
// This provides a fallback for local testing without requiring a connected database

import { db } from './db';

const localFallbackClient = {
  order: {
    findMany: async (args?: any) => {
      // Fallback response for findMany
      return db.orders.findMany(args?.where?.userId);
    },
    findUnique: async () => db.orders.findMany()[0] || null,
    findFirst: async () => db.orders.findMany()[0] || null,
    create: async (args: any) => {
      return db.orders.create(args.data);
    },
    count: async () => db.orders.findMany().length,
    aggregate: async () => ({ _sum: { total: 0 } }),
    update: async () => db.orders.findMany()[0]
  },
  user: {
    findMany: async () => db.users.findMany(),
    findUnique: async (args: any) => db.users.findUnique(args?.where?.email),
    findFirst: async (args: any) => db.users.findUnique(args?.where?.email) || db.users.findMany()[0],
    create: async (args: any) => db.users.create(args.data),
    upsert: async () => null,
    count: async () => db.users.findMany().length
  },
  menuItem: {
    findMany: async () => db.menuItems.findMany(),
    findUnique: async (args: any) => db.menuItems.findById(args?.where?.id),
    findFirst: async (args: any) => db.menuItems.findById(args?.where?.id) || db.menuItems.findMany()[0],
    create: async (args: any) => db.menuItems.create(args.data),
    count: async () => db.menuItems.findMany().length,
    update: async (args: any) => db.menuItems.update(args?.where?.id, args.data),
    delete: async (args: any) => db.menuItems.delete(args?.where?.id)
  },
  orderItem: {
    findMany: async () => []
  },
  category: {
    findFirst: async () => ({ id: 'cat_1', name: 'Default' })
  },
  $transaction: async (queries: any) => {
    return Promise.all(queries);
  }
};

export default localFallbackClient as any;
