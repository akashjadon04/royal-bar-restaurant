import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/ui/Navbar';
import LocationGuard from '@/components/ui/LocationGuard';
import AuthProvider from '@/components/ui/AuthProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Royal Bar Restaurant',
  description: 'Premium dining experience',
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${inter.className} bg-white text-zomato-text antialiased`}>
        <AuthProvider>
          <Navbar />
          <LocationGuard>
            <main>{children}</main>
          </LocationGuard>
        </AuthProvider>
      </body>
    </html>
  );
}
