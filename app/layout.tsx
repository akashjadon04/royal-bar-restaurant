import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/ui/Navbar';
import LocationGuard from '@/components/ui/LocationGuard';
import AuthProvider from '@/components/ui/AuthProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Royal Bar Restaurant | Premium Dining Experience',
  description: 'Experience authentic Amritsari flavours, rich Punjabi curries, and premium handcrafted cocktails at Royal Bar Restaurant. Discover the best food & drinks in London.',
  keywords: 'Royal Bar, Restaurant, London, Punjabi Food, Amritsari, Cocktails, Premium Dining, Best Restaurant',
  openGraph: {
    title: 'Royal Bar Restaurant',
    description: 'Experience authentic Amritsari flavours and premium dining.',
    url: 'https://royal-bar-restaurant.vercel.app',
    siteName: 'Royal Bar Restaurant',
    locale: 'en_GB',
    type: 'website',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${inter.className} bg-white text-zomato-text antialiased min-h-screen flex flex-col`}>
        <AuthProvider>
          <Navbar />
          <LocationGuard>
            <main className="flex-1">{children}</main>
          </LocationGuard>
          
          <footer className="bg-gray-900 text-white py-12 mt-auto border-t-4 border-red-600">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
              <h2 className="text-2xl font-bold font-display italic tracking-wider">Royal Bar</h2>
              <p className="text-gray-400 max-w-xl mx-auto">Experience the finest authentic Amritsari flavours, rich Punjabi curries, and premium handcrafted cocktails.</p>
              
              <div className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                <p>&copy; {new Date().getFullYear()} Royal Bar Restaurant. All rights reserved.</p>
                <div className="flex flex-wrap justify-center items-center gap-2">
                  <span className="font-semibold text-gray-400">Engineered by</span>
                  <a 
                    href="https://evolnex.digital" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-400 hover:to-orange-400 transition-all text-base"
                    title="Evonex - Digital Innovation & Web Development"
                  >
                    Evonex
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
