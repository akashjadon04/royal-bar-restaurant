// Mock Prisma Client for Frontend-Only Vercel Deployment
// This removes the dependency on a Postgres database so it can be deployed for free

const mockOrders: any[] = [];
const mockUsers: any[] = [];
const mockMenuItems: any[] = [];

const prismaMock = {
  order: {
    findMany: async () => mockOrders,
    findUnique: async () => mockOrders[0],
    findFirst: async () => mockOrders[0],
    create: async (args: any) => {
      const newOrder = { id: `order_${Date.now()}`, ...args.data };
      mockOrders.push(newOrder);
      return newOrder;
    },
    count: async () => mockOrders.length,
    aggregate: async () => ({ _sum: { total: 0 } }),
    update: async () => ({ id: "mock-order-id" })
  },
  user: {
    findMany: async () => mockUsers,
    findUnique: async () => null,
    findFirst: async () => null,
    upsert: async () => null,
    count: async () => mockUsers.length
  },
  menuItem: {
    findMany: async () => mockMenuItems,
    findFirst: async () => null,
    create: async () => ({}),
    count: async () => mockMenuItems.length,
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
