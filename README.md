# The Royal Bar & Villan Hall

> A premium full-stack restaurant web application built with Next.js 15, Prisma, PostgreSQL, and Stripe.

## Live Demo

```bash
# Coming soon — see "Getting Started" below to run locally
```

## Features

### Public Pages
- **Home** — Cinematic hero, featured dishes, about preview, delivery info
- **Menu** — Full menu with search, category filters
- **About** — Story, stats, contact info
- **Cart** — Quantity control, free delivery over £40
- **Checkout** — Delivery/Collection toggle, address form, Stripe integration
- **Track Order** — Visual order progress tracker
- **Auth** — Sign in / Sign up pages

### Admin Dashboard (CMS)
- **Dashboard** — Revenue, orders, users, menu items stats
- **Menu Management** — CRUD operations, status toggle
- **Order Management** — Order status, filters, quick stats
- **Customer Management** — Customer list, contact info, order history

### Backend
- **Database**: Prisma + PostgreSQL with 15+ models
- **Auth**: NextAuth with Google + credentials, role-based access
- **Payments**: Stripe Checkout + Webhooks
- **Geolocation**: Haversine formula delivery radius (10 miles)
- **API**: RESTful routes with server-side validation

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Prisma ORM + PostgreSQL
- **Auth**: NextAuth.js
- **Payments**: Stripe
- **Maps**: Leaflet
- **Charts**: Chart.js
- **Animations**: Framer Motion

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL database

### 1. Clone & Install

```bash
git clone https://github.com/royal-bar/royal-bar-restaurant.git
cd royal-bar-restaurant
npm install
```

### 2. Environment Variables

Copy the example file and fill in your values:

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```env
# APP
NEXT_PUBLIC_URL=http://localhost:3000

# DATABASE
DATABASE_URL=postgresql://user:password@localhost:5432/royal_bar_db

# STRIPE
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# AUTH
NEXTAUTH_SECRET=your-super-secret-key-here
NEXTAUTH_URL=http://localhost:3000
AUTH_GOOGLE_ID=...
AUTH_GOOGLE_SECRET=...
```

### 3. Database Setup

```bash
# Generate Prisma client
npm run db:generate

# Run migrations
npm run db:migrate

# Seed with sample data
npm run db:seed
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 5. Admin Access

Default admin credentials:
- **Email**: `admin@royalbar.com`
- **Password**: `admin123`

### 6. Stripe Webhook (Optional)

For local Stripe webhook testing:

```bash
npx stripe listen --forward-to localhost:3000/api/webhook/stripe
```

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── admin/              # Admin CMS pages
│   ├── api/                # API routes
│   ├── auth/               # Authentication pages
│   ├── cart/               # Shopping cart
│   ├── checkout/           # Checkout flow
│   ├── menu/               # Menu page
│   ├── track-order/        # Order tracking
│   └── sections/           # Home page sections
├── components/
│   ├── ui/                 # UI components (Navbar, Footer, CategoryBar)
│   └── motion/             # Animated components (MenuCard)
├── lib/                    # Utilities (Prisma, Auth, Geo, Utils)
├── prisma/
│   └── schema.prisma       # Database schema
└── types/                  # TypeScript definitions
```

## Pages

| Route | Description |
|---|---|
| `/` | Home — Hero, featured dishes, about preview |
| `/menu` | Menu with search & filters |
| `/about` | About page with story, stats |
| `/cart` | Shopping cart |
| `/checkout` | Checkout with Stripe |
| `/track-order` | Track order in real-time |
| `/auth/signin` | Sign in / Sign up |
| `/admin/dashboard` | Admin overview & stats |
| `/admin/menu` | Manage menu items |
| `/admin/orders` | Manage orders |
| `/admin/customers` | Manage customers |

## Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:generate  # Generate Prisma client
npm run db:migrate   # Run database migrations
npm run db:seed      # Seed database
npm run db:studio    # Open Prisma Studio
```

## License

MIT License
"# royal-bar-restaurant" 
