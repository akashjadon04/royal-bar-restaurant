# Royal Bar & Restaurant Platform

Hey everyone. This is the source code for the Royal Bar & Restaurant platform. It's a full-stack web application built from the ground up to handle everything from customer orders and checkout to an internal admin dashboard for managing the kitchen and menu.

The goal here was to build something highly performant, visually premium, and easily maintainable.

## Tech Stack & Architecture

I decided to go with a modern Next.js stack for this project. Here is a breakdown of the primary tools and libraries we are using:

### Core
*   **Next.js 15 (App Router)**: We're using the latest App Router for Server Components and optimized routing.
*   **React 19**: Standard UI library.
*   **TypeScript**: Strictly typed across the entire codebase to catch bugs early.

### Styling & UI
*   **Tailwind CSS**: Utility-first CSS for all styling. I've also pulled in `@tailwindcss/forms` and `@tailwindcss/typography` for cleaner base styles.
*   **Framer Motion**: Used heavily for page transitions, mounting animations, and general micro-interactions.
*   **Atropos**: Handles the 3D hover effects on the featured menu cards (disabled on mobile to preserve native scrolling).
*   **Lottie-react**: Renders the JSON-based vector animations used for empty states and order success screens.
*   **Lucide React**: Our icon set of choice. Clean and lightweight.

### Backend & Database
*   **Prisma ORM**: Handles our database schema and migrations. Currently configured to run locally (SQLite) for ease of development, but can easily be swapped to Postgres in `schema.prisma`.
*   **NextAuth.js (v5 Beta)**: Manages authentication. We're using the new beta which works seamlessly with Next 15 Server Components. It supports both credentials and OAuth (Google).
*   **Zustand**: A tiny, fast state management library used primarily for the shopping cart and global UI state.

### Integrations
*   **Stripe**: Powers the checkout flow. You'll need Stripe API keys to get this working locally.
*   **Leaflet & React-Leaflet**: Used for the interactive maps on the order tracking page.
*   **Chart.js**: Powers the analytics charts in the admin dashboard.

## Getting Started Locally

If you want to spin this up on your local machine, follow these steps.

### 1. Install Dependencies
Make sure you have Node 18+ installed.

```bash
npm install
```

### 2. Environment Variables
You'll need a `.env.local` file in the root directory. You can copy the `.env.local.example` file to get started.

```bash
cp .env.local.example .env.local
```

You will need to fill in:
*   Your Stripe keys (`STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`)
*   NextAuth secret (`NEXTAUTH_SECRET` - just generate a random string)
*   Google OAuth credentials if you want social login to work.

### 3. Database Setup
We are using Prisma, so you need to generate the client and push the schema to your local database.

```bash
# Generates the Prisma client types
npm run db:generate

# Pushes the schema and runs migrations
npm run db:migrate

# Optional: Seed the database with some initial menu items
npm run db:seed
```

### 4. Run the Dev Server
Fire up the local development server:

```bash
npm run dev
```

The app will be running at `http://localhost:3000`. 

## Admin Dashboard Access
Once the app is running, you can access the CMS and admin dashboard at `/admin`. 
If you seeded the database, you can log in with the default admin account:
*   **Email**: admin@royalbar.com
*   **Password**: admin123

Let me know if you run into any issues during setup!
