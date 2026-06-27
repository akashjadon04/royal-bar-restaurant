// Mock Prisma Client for Frontend-Only Vercel Deployment
// This removes the dependency on a Postgres database so it can be deployed for free

import { db } from './db';

const prismaMock = {
  order: {
    findMany: async (args?: any) => {
      // Basic mock of findMany
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
    findMany: async () => [],
    findFirst: async () => null,
    create: async () => ({}),
    count: async () => 0,
    update: async () => ({}),
    delete: async () => ({})
  },
  orderItem: {
    findMany: async () => []
  },
  $transaction: async (queries: any) => {
    return Promise.all(queries);
  }
};

export default prismaMock as any;
