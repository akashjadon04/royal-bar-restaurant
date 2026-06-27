import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const passwordHash = await bcrypt.hash('admin123', 12);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@royalbar.com' },
    update: {},
    create: {
      email: 'admin@royalbar.com',
      passwordHash,
      firstName: 'Admin',
      lastName: 'User',
      phone: '+44 1234 567 890',
      role: 'ADMIN',
    },
  });

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'starters' },
      update: {},
      create: { name: 'Starters', slug: 'starters', sortOrder: 1 },
    }),
    prisma.category.upsert({
      where: { slug: 'mains' },
      update: {},
      create: { name: 'Mains', slug: 'mains', sortOrder: 2 },
    }),
    prisma.category.upsert({
      where: { slug: 'desserts' },
      update: {},
      create: { name: 'Desserts', slug: 'desserts', sortOrder: 3 },
    }),
  ]);

  const starters = categories.find(c => c.slug === 'starters')!;
  const mains = categories.find(c => c.slug === 'mains')!;
  const desserts = categories.find(c => c.slug === 'desserts')!;

  const items = [
    { name: 'Signature Royal Burger', description: '28-day aged beef, smoked cheddar, truffle aioli, brioche bun', basePrice: 24.99, imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=2000&auto=format&fit=crop', prepTimeMin: 25, categoryId: mains.id, isFeatured: true },
    { name: 'Pan-Seared Scallops', description: 'Cauliflower puree, crispy pancetta, lemon butter sauce', basePrice: 32.50, imageUrl: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=2000&auto=format&fit=crop', prepTimeMin: 20, categoryId: starters.id, isFeatured: false },
    { name: 'Truffle Risotto', description: 'Arborio rice, wild mushrooms, aged parmesan, black truffle', basePrice: 28.00, imageUrl: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?q=80&w=2000&auto=format&fit=crop', prepTimeMin: 30, categoryId: mains.id, isFeatured: true },
    { name: 'Wagyu Beef Fillet', description: '250g fillet, bone marrow butter, roasted vine tomatoes', basePrice: 65.00, imageUrl: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=2000&auto=format&fit=crop', prepTimeMin: 35, categoryId: mains.id, isFeatured: true },
    { name: 'Lobster Thermidor', description: 'Whole lobster, cognac cream, gruyere crust, buttered asparagus', basePrice: 58.00, imageUrl: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=2000&auto=format&fit=crop', prepTimeMin: 40, categoryId: mains.id, isFeatured: true },
    { name: 'Duck Confit', description: 'Slow-cooked duck leg, white bean cassoulet, cherry gastrique', basePrice: 29.50, imageUrl: 'https://images.unsplash.com/photo-1518013431117-eb1465fa5752?q=80&w=2000&auto=format&fit=crop', prepTimeMin: 28, categoryId: mains.id, isFeatured: false },
    { name: 'Chocolate Fondant', description: '70% dark chocolate, salted caramel core, vanilla ice cream', basePrice: 14.00, imageUrl: 'https://images.unsplash.com/photo-1617426176517-57faed8b46a5?q=80&w=2000&auto=format&fit=crop', prepTimeMin: 15, categoryId: desserts.id, isFeatured: true },
    { name: 'Royal Seafood Platter', description: 'Oysters, king prawns, langoustines, crab, champagne mignonette', basePrice: 85.00, imageUrl: 'https://images.unsplash.com/photo-1534080564583-6be75777b70a?q=80&w=2000&auto=format&fit=crop', prepTimeMin: 20, categoryId: starters.id, isFeatured: true },
  ];

  for (const item of items) {
    const slug = item.name.toLowerCase().replace(/ /g, '-');
    await prisma.menuItem.upsert({
      where: { slug },
      update: { ...item },
      create: { slug, ...item },
    });
  }

  console.log('Seed completed successfully!');
  console.log('Admin user:', admin.email);
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
